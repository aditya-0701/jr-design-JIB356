const connection = require('../dbInit');
const bcrypt = require('bcrypt');
// var connection = db.dbConn;

const Alumni = function (alumni) {
  this.alumniID = alumni.alumniID;
  this.username = alumni.username;
  this.firstName = alumni.firstName;
  this.lastName = alumni.lastName;
  this.middleName = alumni.middleName;
  this.email = alumni.email;
  this.pwd = alumni.pwd;
  this.bio = alumni.bio;
};

Alumni.createAlumni = async ( params ) => {
  // params = JSON.parse(params)
  //console.log(JSON.parse(params))
  console.log(params['username'], params.firstName, params.lastName, params.email, params.pwd)
  // params should include all columns even if null
  if (params.username && params.firstName && params.lastName && params.email && params.pwd) {
    let hash = '';
    try {
      hash = await bcrypt.hash(params.pwd, 10);
    } catch (e) {
      throw e;
      //throw new Error('ERROR OCCURRED');
    }
    params.pwd = hash;
    const query = 'INSERT INTO Alumni SET ?';
    var alumni = await connection.query(query, params);
    return alumni;
  } else {
    throw new Error('ERROR OCCURRED');
  }
};

Alumni.updateAlumni = async ( params ) => {
  const { username } = params;
  const inputs = Object.assign({}, params);
  delete inputs.username;
  const query = `UPDATE Alumni SET ? WHERE username = "${username}"`;
  let hash = '';
  if (Object.prototype.hasOwnProperty.call(inputs, 'pwd')) {
    if (inputs.pwd != null && inputs.pwd !== '') {
      try {
        hash = await bcrypt.hash(params.pwd, 10);
      } catch (e) {
        throw new Error('ERROR OCCURRED');
      }
    }
    inputs.pwd = hash;
  }
  const alumni = await connection.query(query, inputs);
  return alumni;
};

Alumni.findAlumniByName = async ( params ) => {
  // name can be first/middle/last name or username
  const { name } = params;
  let query = 'SELECT username, email, firstName, lastName, middleName, mobile FROM Alumni';
  if (name) {
    query = `SELECT username, email, firstName, lastName, middleName, mobile FROM Alumni WHERE username = '${name}'`;
  }
  const alumni = await connection.query(query);
  return alumni;
};

Alumni.getAll = async ( params ) => {
  const query = 'SELECT username, email, firstName, lastName, middleName, bio FROM Alumni';
  const alumni = await connection.query(query);
  return alumni;
};

Alumni.deleteAlumniAccount = async ( params ) => {
  // deletes via the Alumni username NOT id
  const { username } = params;
  const query = `DELETE FROM Alumni WHERE username = ${username}`;
  const alumni = await connection.query(query);
  return alumni;
};

Alumni.addProject = async ( params ) => {
  // Add basic Project info
  const inputs = Object.assign({}, params);
  delete inputs.skills;
  delete inputs.interests;
  delete inputs.major;
  delete inputs.degree;
  delete inputs.links;
  delete inputs.alumni;
  
  if (params.projectAlumni) {
    // const projectParams = [[params.projectTitle, params.projectDescription, params.startDate, params.endDate, params.projectAlumni, params.createdAt, params.visible, params.weekHours]];
    const query = 'INSERT INTO Projects SET ?;';
    var project = await connection.query(query, inputs);
  } else {
    throw new Error('ERROR OCCURRED');
  }
  console.log(project);
  const id = project.insertId;
  try {
    if (project) {
      // Add additional project info if given
      if (params.skills) {
        const skillsVals = [];
        // Format data for bulk
        for (let i = 0; i < params.skills.length; i++) {
          skillsVals.push([id, params.skills[i]]);
        }
        const skillQuery = 'INSERT IGNORE INTO ProjectSkills (projectId, skillId) VALUES ?';
        project.skills = await connection.query(skillQuery, [skillsVals]);
      }
      if (params.interests) {
        const interestsVals = [];
        // Format data for bulk insertion
        for (let i = 0; i < params.interests.length; i++) {
          interestsVals.push([id, params.interests[i]]);
        }
        const interestQuery = 'INSERT IGNORE INTO ProjectInterests (projectId, interestId) VALUES ?';
        project.interests = await connection.query(interestQuery, [interestsVals]);
      }
      if (params.links) {
        // assumes params.links follows:
        // [[label, address], ...]
        const linksVals = [];
        // Format data for bulk insertion
        for (let i = 0; i < params.links.length; i++) {
          linksVals.push([id, params.links[i].label, params.links[i].address]);
        }
        const linkQuery = 'INSERT IGNORE INTO ProjectLinks (projectId, label, address) VALUES ?';
        project.links = await connection.query(linkQuery, [linksVals]);
      }
    }
  }
  catch(e) {
    var deleteQuery = 'DELETE FROM Projects WHERE id = ' + id;
    var del = await connection.query(deleteQuery, inputs);
    throw(e);
  }

  return project;
};

// Search for projects from all projects
Alumni.getAllProjects = async ( params ) => {
  let query = 'SELECT id, projectTitle, projectDescription, startDate, endDate, projectAlumni, weekHours FROM Projects';
  let projIds = [];
  let onlySearch = true;

  if (params.skills) {
    onlySearch = false;
    const skills = 'SELECT projectId from ProjectSkills WHERE skillId IN ' + connection.escape([params.skills]);
    const skillIds = await connection.query(skills);
    projIds.push(skillIds.map(element => element.projectId));
  }

  if (params.interests) {
    onlySearch = false;
    const interests = 'SELECT projectId from ProjectInterests WHERE interestId IN ' + connection.escape([params.interests]);
    const interestIds = await connection.query(interests);
    projIds.push(interestIds.map(element => element.projectId));
  }
  var whereActive = false;
  projIds = projIds.flat();
  if (projIds != null && projIds !== [] && projIds.length !== 0) {
    whereActive = true;
    query += ' WHERE id IN ' + connection.escape(projIds);
  } else {
    if (!onlySearch) {
      return [];
    }
  }
  // Append additional filters if given
  if (params.hours || params.startDate || params.endDate) {
    if (whereActive) {
      query += ' AND ';
    } else {
      whereActive = true;
      query += ' WHERE ';
    }
    if (params.hours && params.startDate && params.endDate) {
      query += 'weekHours >= ' + connection.escape(params.hours);
      query += ' AND ' + 'startDate >= ' + connection.escape(params.startDate);
      query += ' AND ' + 'endDate <= ' + connection.escape(params.endDate);
    } else if (params.hours && params.startDate) {
      query += 'weekHours >= ' + connection.escape(params.hours);
      query += ' AND ' + 'startDate >= ' + connection.escape(params.startDate);
    } else if (params.hours && params.endDate) {
      query += 'weekHours >= ' + connection.escape(params.hours);
      query += ' AND ' + 'endDate <= ' + connection.escape(params.endDate);
    } else if (params.startDate && params.endDate) {
      query += 'startDate >= ' + connection.escape(params.startDate);
      query += ' AND ' + 'endDate <= ' + connection.escape(params.endDate);
    } else if (params.hours) {
      query += 'weekHours >= ' + connection.escape(params.hours);
    } else if (params.startDate) {
      query += 'startDate >= ' + connection.escape(params.startDate);
    } else if (params.endDate) {
      query += 'endDate <= ' + connection.escape(params.endDate);
    }
  }
  // Search Projects against title and desc
  if (params.search) {
    var searchString = connection.escape(params.search);
    if (whereActive) {
      query += ' AND ';
    } else {
      query += ' WHERE ';
    }
    query += `MATCH(projectTitle, projectDescription) AGAINST (${searchString})`;
  }

  var students = await connection.query(query);
  return students;
};


// Get all projects that a specific alumni created
Alumni.getAlumniProjects = async ( params ) => {
  // return params;
  const { username } = params;
  const query = `SELECT * FROM Projects WHERE projectAlumni = ${connection.escape(username)}`
  var projects = await connection.query(query);
  return projects;
}

// Get Specific Project Info
Alumni.findProject = async ( params ) => {
  const { projectId } = params;
  var id = projectId;
  const query = `SELECT id, projectTitle, projectDescription, startDate, endDate, projectAlumni, weekHours FROM Projects WHERE id = ${id}`;
  let project = (await connection.query(query))[0];
  // return project;
  project = project || null;
  if (project) {
    console.log('project exists');
    const skillQuery = `SELECT skill, id FROM Skills
            WHERE id IN ( SELECT skillId FROM ProjectSkills WHERE projectId = "${id}")`;
    project.skills = await connection.query(skillQuery);
    const interestQuery = `SELECT interest, id FROM Interests
            WHERE id IN ( SELECT interestId FROM ProjectInterests WHERE projectId = "${id}")`;
    project.interests = await connection.query(interestQuery);
    const majorQuery = `SELECT major, id FROM Majors
            WHERE id IN ( SELECT majorId FROM ProjectMajors WHERE projectId = "${id}")`;
    project.major = await connection.query(majorQuery);
    const degreeQuery = `SELECT degree, id FROM Degrees
            WHERE id IN ( SELECT degreeId FROM ProjectDegrees WHERE projectId = "${id}")`;
    project.degree = await connection.query(degreeQuery);
    // const expQuery = `SELECT * FROM Experience WHERE gtUsername = "${id}"`;
    // project.experiences = await connection.query(expQuery);
    const linkQuery = `SELECT * FROM ProjectLinks WHERE projectId = "${id}"`;
    project.links = await connection.query(linkQuery);
    const alumniQuery = `SELECT email, CONCAT(firstName, ' ',lastName) AS 'name' FROM Alumni WHERE username = "${project.projectAlumni}"`;
    project.alumni = await connection.query(alumniQuery);
    return project;
  }
};

// Deletes specific project
Alumni.deleteAlumniProject = async (params) => {
  const query = `DELETE FROM Projects WHERE id = ${params.projectId}`; //` AND projectAlumni = ${params.alumniId}`;
  var projects = await connection.query(query);
  return projects;
};

Alumni.updateProject = async (params) => {
  // needs projectId
  // Update basic project info
  
  const inputs = Object.assign({}, params);
  delete inputs.skills;
  delete inputs.interests;
  delete inputs.major;
  delete inputs.degree;
  delete inputs.links;
  delete inputs.alumni;
  params.projectId = params.id;
  if (params.id) {
    // const projectParams = [params.projectTitle, params.projectDescription, params.startDate, params.endDate, params.projectAlumni, params.createdAt, params.visible, params.weekHours, params.projectId];
    // const query = 'UPDATE Projects SET projectTitle = ?, projectDescription = ?, startDate = ?, endDate = ?, projectAlumni = ?, createdAt = ?, visible = ?, weekHours = ? WHERE id = ?';
    const query = 'UPDATE Projects SET ? WHERE id = ' + connection.escape(params.id);
    var project = await connection.query(query, inputs);
    console.log(project);
  } else {
    throw new Error('ERROR OCCURRED');
  }
  if (project) {
    // Updates Addditional info if given
    if (params.skills) {
      const skillsVals = [];
      for (let i = 0; i < params.skills.length; i++) {
        skillsVals.push([params.projectId, params.skills[i]]);
      }
      const deleteQuery = `DELETE FROM ProjectSkills WHERE projectId = ${connection.escape(params.projectId)}`;
      const skillQuery = 'INSERT INTO ProjectSkills (projectId, skillId) VALUES ?';
      await connection.query(deleteQuery);
      project.skills = await connection.query(skillQuery, [skillsVals]);
    }
    if (params.interests) {
      const interestsVals = [];
      for (let i = 0; i < params.interests.length; i++) {
        interestsVals.push([params.projectId, params.interests[i]]);
      }
      const deleteQuery = `DELETE FROM ProjectInterests WHERE projectId = ${connection.escape(params.projectId)}`;
      const interestQuery = 'INSERT INTO ProjectInterests (projectId, interestId) VALUES ?';
      await connection.query(deleteQuery);
      project.interests = await connection.query(interestQuery, [interestsVals]);
    }
    if (params.links) {
      // assumes params.links follows:
      // [[label, address], ...]
      const linksVals = [];
      for (let i = 0; i < params.links.length; i++) {
        linksVals.push([params.projectId, params.links[i].label, params.links[i].address]);
      }
      const deleteQuery = `DELETE FROM ProjectLinks WHERE projectId = ${connection.escape(params.projectId)}`;
      const linkQuery = 'INSERT INTO ProjectLinks (projectId, label, address) VALUES ?';
      await connection.query(deleteQuery);
      project.links = await connection.query(linkQuery, [linksVals]);
    }
  }

  return project;
};


Alumni.getSavedStudents = async (params) => {
    console.log("in the function");
    console.log(params);
    const { username } = params;
    const query = `SELECT gtUsername, firstName, lastName, email FROM Students 
    WHERE gtUsername IN 
    (SELECT gtUsername from AlumniSavedStudents WHERE username = ${connection.escape(username)})`;
    console.log(query);
    var students = '';
    try {
      students = await connection.query(query);
    } catch(e) {
      console.log(e);
    }
    console.log(students);
    return students;
  };

Alumni.addSavedStudent = async ( params ) => {
    const { username, gtUsername } = params;
    console.log(params);
    var insertParams = [];
    // Format data for bulk insertion
    // for (let i = 0; i < gtUsernames.length; i++) {
    //   insertParams.push([username, gtUsernames[i]]);
    // }
    const query = 'INSERT IGNORE INTO AlumniSavedStudents SET ?';
    var students = await connection.query(query, params);
    return students;
  };

Alumni.updateSavedStudents = async (params) => {
  const { username, gtUsernames } = params;
  var insertParams = [];
  // Format data for bulk insertion
  for (let i = 0; i < gtUsernames.length; i++) {
    insertParams.push([username, gtUsernames[i]]);
  }
  const deleteQuery = `DELETE FROM AlumniSavedStudents WHERE username = ${connection.escape(username)}`;
  const query = 'INSERT IGNORE INTO AlumniSavedStudents (username, gtUsername) VALUES ?';
  await connection.query(deleteQuery);
  var students = await connection.query(query, [insertParams]);
  return students;
};

Alumni.deleteAllSavedStudents = async (params) => {
  const { username } = params;
  const query = `DELETE FROM AlumniSavedStudents WHERE username = ${connection.escape(username)}`;
  var students = await connection.query(query);
  return students;
};

Alumni.deleteSavedStudent = async (params) => {
  const { username, gtUsername } = params;
  console.log(params);
  const query = `DELETE FROM AlumniSavedStudents WHERE username = ${connection.escape(username)} AND gtUsername = ${connection.escape(gtUsername)}`;
  var students = await connection.query(query);
  return students;
};

module.exports = Alumni;
