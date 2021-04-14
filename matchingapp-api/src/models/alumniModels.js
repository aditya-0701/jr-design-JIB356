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
  // params should include all columns even if null
  if (params.username && params.firstName && params.lastName && params.email && params.pwd && params.bio) {
    let hash = '';
    try {
      hash = await bcrypt.hash(params.pwd, 10);
    } catch (e) {
      throw new Error('ERROR OCCURRED');
    }
    params.pwd = hash;
    const query = 'INSERT INTO Alumni VALUES ?';
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
  const query = `UPDATE alumni SET ? WHERE username = "${username}"`;
  let hash = '';
  if (Object.prototype.hasOwnProperty.call(inputs, 'pwd')) {
    if (inputs.pwd != null && inputs.pwd !== '') {
      try {
        hash = await bcrypt.hash(params.pwd, 10);
      } catch (e) {
        throw new Error('ERROR OCCURRED');
      }
    }
    params.pwd = hash;
  } else {
    const alumni = await connection.query(query, inputs);
    return alumni;
  }
};

Alumni.findAlumniByName = async ( params ) => {
  // name can be first/middle/last name or username
  const { name } = params;
  let query = 'SELECT username, email, firstName, lastName, middleName, bio FROM Alumni';
  if (name) {
    query = `SELECT username, email, firstName, lastName, middleName, bio FROM Alumni WHERE firstName like %${name}% or lastName like %${name}% or middleName like %${name}% or username like %${name}%;`;
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
  // params
  if (params.projectAlumni && params.createdAt) {
    const projectParams = [[params.projectTitle, params.projectDescription, params.startDate, params.endDate, params.projectAlumni, params.createdAt, params.visible, params.weekHours]];
    const query = 'INSERT INTO Projects (projectTitle, projectDescription, startDate, endDate, projectAlumni, createdAt, visible, weekHours) VALUES ?;';
    var project = await connection.query(query, [projectParams]);
  } else {
    throw new Error('ERROR OCCURRED');
  }
  console.log(project);
  // let getProjIdQuery = `SELECT id FROM Projects WHERE projectAlumni = ${connection.escape(params.projectAlumni)} AND createdAt = ${connection.escape(params.createdAt)};`;
  const id = project.insertId;// await connection.query(getProjIdQuery);

  if (project) {
    if (params.skills) {
      const skillsVals = [];
      for (let i = 0; i < params.skills.length; i++) {
        skillsVals.push([id, params.skills[i]]);
      }
      const skillQuery = 'INSERT IGNORE INTO ProjectSkills (projectId, skillId) VALUES ?';
      project.skills = await connection.query(skillQuery, [skillsVals]);
    }
    if (params.interests) {
      const interestsVals = [];
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
      for (let i = 0; i < params.links.length; i++) {
        linksVals.push([id, null].concat(params.links[i]));
      }
      const linkQuery = 'INSERT IGNORE INTO ProjectLinks (projectId, id, label, address) VALUES ?';
      project.links = await connection.query(linkQuery, [linksVals]);
    }
  }

  return project;
};

Alumni.getAlumniProjects = async ( params ) => {
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

  // To be implemented in DB
  // if (params.degree) {
  //     let degrees = 'SELECT projectId from ProjectDegrees WHERE degreeId IN ' + connection.escape([params.degree]);
  //     let degreeIds = await connection.query(degrees);
  //     projIds.push(degreeIds.map(element => element['gtUsername']));
  // }

  // if (params.major) {
  //     let majors = 'SELECT projectId from ProjectMajors WHERE majorId IN ' + connection.escape([params.major]);
  //     let majorIds = await connection.query(majors);
  //     projIds.push(majorIds.map(element => element['gtUsername']));
  // }
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

Alumni.findProject = async ( params ) => {
  const { projectId } = params;
  var id = projectId;
  // We can use knex to remove the need to do string interpolation to perform our DB transactions.
  const query = `SELECT id, projectTitle, projectDescription, startDate, endDate, projectAlumni, weekHours FROM Projects WHERE id = ${id}`;
  let student = (await connection.query(query))[0];
  student = student || null;
  if (student) {
    console.log('Student exists');
    const skillQuery = `SELECT skill, id FROM Skills
            WHERE id IN ( SELECT skillId FROM ProjectSkills WHERE projectId = "${id}")`;
    student.skills = await connection.query(skillQuery);
    const interestQuery = `SELECT interest, id FROM Interests
            WHERE id IN ( SELECT interestId FROM ProjectInterests WHERE projectId = "${id}")`;
    student.interests = await connection.query(interestQuery);
    const majorQuery = `SELECT major, id FROM Majors
            WHERE id IN ( SELECT majorId FROM ProjectMajors WHERE projectId = "${id}")`;
    student.major = await connection.query(majorQuery);
    const degreeQuery = `SELECT degree, id FROM Degrees
            WHERE id IN ( SELECT degreeId FROM ProjectDegrees WHERE projectId = "${id}")`;
    student.degree = await connection.query(degreeQuery);
    const expQuery = `SELECT * FROM Experience WHERE gtUsername = "${id}"`;
    student.experiences = await connection.query(expQuery);
    const linkQuery = `SELECT * FROM ProjectLinks WHERE projectId = "${id}"`;
    student.links = await connection.query(linkQuery);
    const alumniQuery = `SELECT email, CONCAT(firstName, ' ',lastName) AS 'name' FROM Alumni WHERE id = "${student.projectAlumni}"`;
    student.alumni = await connection.query(alumniQuery);
    return student;
  }
};

Alumni.deleteAlumniProject = async (params) => {
  const query = `DELETE FROM Projects WHERE id = ${params.projectId} AND projectAlumni = ${params.alumniId}`;
  var projects = await connection.query(query);
  return projects;
};

Alumni.updateProject = async (params) => {
  // need projectId
  if (params.projectId) {
    const projectParams = [params.projectTitle, params.projectDescription, params.startDate, params.endDate, params.projectAlumni, params.createdAt, params.visible, params.weekHours, params.projectId];
    const query = 'UPDATE Projects SET projectTitle = ?, projectDescription = ?, startDate = ?, endDate = ?, projectAlumni = ?, createdAt = ?, visible = ?, weekHours = ? WHERE id = ?';
    var project = await connection.query(query, projectParams);
  } else {
    throw new Error('ERROR OCCURRED');
  }
  if (project) {
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
        linksVals.push([params.projectId, null].concat(params.links[i]));
      }
      const deleteQuery = `DELETE FROM ProjectLinks WHERE projectId = ${connection.escape(params.projectId)}`;
      const linkQuery = 'INSERT INTO ProjectLinks (projectId, id, label, address) VALUES ?';
      await connection.query(deleteQuery);
      project.links = await connection.query(linkQuery, [linksVals]);
    }
  }

  return project;
};

module.exports = Alumni;
