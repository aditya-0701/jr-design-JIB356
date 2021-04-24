const connection = require('../dbInit.js');
const bcrypt = require('bcrypt');

const Student = function (student) {
  this.gtUsername = student.gtUsername;
  this.firstName = student.firstName;
  this.lastName = student.lastName;
  this.middleName = student.middleName;
  this.email = student.email;
  this.pwd = student.pwd;
  this.bio = student.bio;
};

const selectVals = `gtUsername, 
                    firstName,
                    lastName,
                    middleName,
                    email,
                    bio`;

// Gets info about a specific student
Student.findStudent = async ( params ) => {
  try {
    const { gtUsername } = params;
    // Get basic student info
    const query = `SELECT gtUsername, 
                     firstName,
                     lastName,
                     middleName,
                     email,
                     bio
                     FROM Students 
                     WHERE gtUsername = "${gtUsername}"`;

    let student = (await connection.query(query))[0];
    student = student || null;
    if (student) {
      console.log('Student exists');
      // Get additional student info
      const skillQuery = `SELECT skill, id FROM Skills 
                WHERE id IN ( SELECT skillId FROM StudentSkills WHERE gtUsername = "${gtUsername}")`;
      student.skills = await connection.query(skillQuery);

      const interestQuery = `SELECT interest, id FROM Interests 
                WHERE id IN ( SELECT interestId FROM StudentInterests WHERE gtUsername = "${gtUsername}")`;
      student.interests = await connection.query(interestQuery);

      const majorQuery = `SELECT major, id FROM Majors 
                WHERE id IN ( SELECT majorId FROM StudentMajors WHERE gtUsername = "${gtUsername}")`;
      student.major = await connection.query(majorQuery);

      const degreeQuery = `SELECT degree, id FROM Degrees 
                WHERE id IN ( SELECT degreeId FROM StudentDegrees WHERE gtUsername = "${gtUsername}")`;
      student.degree = await connection.query(degreeQuery);

      const expQuery = `SELECT * FROM Experience WHERE gtUsername = "${gtUsername}"`;
      student.experiences = await connection.query(expQuery);

      const linkQuery = `SELECT * FROM StudentLinks WHERE gtUsername = "${gtUsername}"`;
      student.links = await connection.query(linkQuery);
    }
    return student;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// Custom query to get student info not user facing
Student.queryStudent = async ( params ) => {
  const { query } = params;
  var students = await connection.query(query);
  return students;
};

// Gets basic sutdent info based on given filters
Student.getAll = async ( params ) => {
  let query = 'SELECT gtUsername, firstName, lastName, email, bio, weekHours FROM Students';
  let gtUnames = [];
  let onlySearch = true;

  if (params.skills) {
    onlySearch = false;
    const skills = 'SELECT gtUsername from StudentSkills WHERE skillId IN ' + connection.escape([params.skills]);
    const skillIds = await connection.query(skills);
    gtUnames.push(skillIds.map(element => element.gtUsername));
  }

  if (params.interests) {
    onlySearch = false;
    const interests = 'SELECT gtUsername from StudentInterests WHERE interestId IN ' + connection.escape([params.interests]);
    const interestIds = await connection.query(interests);
    gtUnames.push(interestIds.map(element => element.gtUsername));
  }

  if (params.degree) {
    onlySearch = false;
    const degrees = 'SELECT gtUsername from StudentDegrees WHERE degreeId IN ' + connection.escape([params.degree]);
    const degreeIds = await connection.query(degrees);
    gtUnames.push(degreeIds.map(element => element.gtUsername));
  }

  if (params.major) {
    onlySearch = false;
    const majors = 'SELECT gtUsername from StudentMajors WHERE majorId IN ' + connection.escape([params.major]);
    const majorIds = await connection.query(majors);
    gtUnames.push(majorIds.map(element => element.gtUsername));
  }

  var whereActive = false;
  gtUnames = gtUnames.flat();
  if (gtUnames != null && gtUnames !== [] && gtUnames.length !== 0) {
    console.log(gtUnames);
    whereActive = true;
    query += ' WHERE gtUsername IN ' + connection.escape(gtUnames);
  } else {
    if (!onlySearch) {
      return [];
    }
  }

  if (params.hours) {
    if (whereActive) {
      query += ' AND ';
    } else {
      query += ' WHERE ';
      whereActive = true;
    }
    query += 'weekHours >= ' + connection.escape(params.hours);
  }
  // Search for students based on name and bio
  if (params.search) {
    var searchString = connection.escape(params.search);
    if (whereActive) {
      query += ' AND ';
    } else {
      query += ' WHERE ';
    }
    query += `MATCH(firstName, lastName, middleName, bio) AGAINST (${searchString})`;
  }

  var students = await connection.query(query);
  return students;
};

Student.addStudent = async ( params ) => {
  const inputs = Object.assign({}, params);
  delete inputs.skills;
  delete inputs.interests;
  delete inputs.experiences;
  delete inputs.degree;
  delete inputs.major;
  delete inputs.links;

  if (inputs.gtUsername && inputs.pwd && inputs.firstName && inputs.lastName && inputs.email) {
    let hash = '';
    try {
      hash = await bcrypt.hash(inputs.pwd, 10);
    } catch (e) {
      throw new Error('ERROR OCCURRED');
    }
    inputs.pwd = hash;
    // let studentParams = [params.gtUsername, params.email, params.firstName, params.lastName, params.middleName, params.bio, params.pwd];
    const query = 'INSERT INTO Students SET ?';
    var students = await connection.query(query, inputs);
    if (students) {
      if (params.skills) {
        var skillsVals = [];
        for (let i = 0; i < params.skills.length; i++) {
          skillsVals.push([params.gtUsername, params.skills[i]]);
        }
        const skillQuery = 'INSERT INTO StudentSkills (gtUsername, skillId) VALUES ?';
        students.skills = await connection.query(skillQuery, [skillsVals]);
      }

      if (params.interests) {
        var interestsVals = [];
        // Format data for bulk insertion
        for (let i = 0; i < params.interests.length; i++) {
          interestsVals.push([params.gtUsername, params.interests[i]]);
        }
        const skillQuery = 'INSERT INTO StudentInterests (gtUsername, interestId) VALUES ?';
        students.interests = await connection.query(skillQuery, [interestsVals]);
      }

      if (params.experiences) {
        // assumes params.experience follows:
        // [[description, company name, start date, end date], ...]
        var experiencesVals = [];
        // Format data for bulk insertion
        for (let i = 0; i < params.experiences.length; i++) {
          const exp = params.experiences[i];
          const gtU = params.gtUsername;
          const expVals = [gtU, exp.expDescription, exp.companyName, exp.start_date, exp.end_date, exp.position];
          // experiencesVals.push(connection.escape(expVals));
          experiencesVals.push(expVals);
        }
        const experiencesQuery = 'INSERT INTO Experience (gtUsername, expDescription, companyName, start_date, end_date, position) VALUES ?';
        students.experiences = await connection.query(experiencesQuery, [experiencesVals]);
      }
      if (params.major) {
        const majorQuery = `INSERT INTO StudentMajors (gtUsername, majorId) VALUES (${connection.escape(params.gtUsername)}, ${connection.escape(params.major)})`;
        students.major = await connection.query(majorQuery);
      }
      if (params.degree) {
        const degreeQuery = `INSERT INTO StudentDegrees (gtUsername, degreeId) VALUES (${connection.escape(params.gtUsername)}, ${connection.escape(params.degree)})`;
        students.degree = await connection.query(degreeQuery);
      }
      if (params.links) {
        var linksVals = [];
        const gtU = params.gtUsername;
        // Format data for bulk insertion
        for (let i = 0; i < params.links.length; i++) {
          const link = params.links[i];
          const linkVal = [gtU, link.label, link.address];
          linksVals.push(linkVal);
        }
        const linkQuery = 'INSERT INTO StudentLinks (gtUsername, label, address) VALUES ?';
        students.links = await connection.query(linkQuery, [linksVals]);
      }
    }
    return students;
  } else {
    throw new Error('ERROR OCCURRED');
  }
};

Student.deleteStudent = async ( params ) => {
  const { gtUsername } = params;
  const query = `DELETE FROM Students WHERE gtUsername = "${gtUsername}"`;
  const student = await connection.query(query);
  return student;
};

// Updates all basic student info
// Only updates additional student info if provided
Student.updateStudent = async ( params ) => {
  const { gtUsername } = params;
  const inputs = Object.assign({}, params);
  delete inputs.gtUsername;
  delete inputs.skills;
  delete inputs.interests;
  delete inputs.experiences;
  delete inputs.degree;
  delete inputs.major;
  delete inputs.links;

  var query = 'UPDATE Students SET ? WHERE gtUsername = ' + connection.escape(gtUsername);
  let hash = '';
  if (Object.prototype.hasOwnProperty.call(inputs, 'pwd')) {
    if (inputs.pwd != null && inputs.pwd !== '') {
      try {
        hash = await bcrypt.hash(inputs.pwd, 10);
      } catch (e) {
        throw new Error('ERROR OCCURRED');
      }
    }
    inputs.pwd = hash;
  }

  if (inputs == null || JSON.stringify(inputs) === JSON.stringify({})) { query = `SELECT ${selectVals} FROM Students WHERE gtUsername = ` + connection.escape(gtUsername); }

  const student = await connection.query(query, inputs);

  if (params.skills) {
    var skillsVals = [];
    for (let i = 0; i < params.skills.length; i++) {
      skillsVals.push([gtUsername, params.skills[i]]); // Should we connection escape here too?
    }
    // TODO: delete before insert
    const deleteQuery = `DELETE FROM StudentSkills WHERE gtUsername = ${connection.escape(gtUsername)}`;
    const skillQuery = 'INSERT INTO StudentSkills (gtUsername, skillId) VALUES ?';
    await connection.query(deleteQuery);
    student.skills = await connection.query(skillQuery, [skillsVals]);
  }

  if (params.interests) {
    var interestsVals = [];
    // Format data for bulk insertion
    for (let i = 0; i < params.interests.length; i++) {
      interestsVals.push([params.gtUsername, params.interests[i]]);
    }
    const deleteQuery = `DELETE FROM StudentInterests WHERE gtUsername = ${connection.escape(gtUsername)}`;
    const skillQuery = 'INSERT INTO StudentInterests (gtUsername, interestId) VALUES ?';
    await connection.query(deleteQuery);
    student.interests = await connection.query(skillQuery, [interestsVals]);
  }

  if (params.experiences) {
    // assumes params.experience follows:
    // [[description, company name, start date, end date], ...]
    var experiencesVals = [];
    // Format data for bulk insertion
    for (let i = 0; i < params.experiences.length; i++) {
      const exp = params.experiences[i];
      const gtU = params.gtUsername;
      const expVals = [gtU, exp.expDescription, exp.companyName, exp.start_date, exp.end_date, exp.position];
      // experiencesVals.push(connection.escape(expVals));
      experiencesVals.push(expVals);
    }
    const deleteQuery = `DELETE FROM Experience WHERE gtUsername = ${connection.escape(gtUsername)}`;
    const experiencesQuery = 'INSERT INTO Experience (gtUsername, expDescription, companyName, start_date, end_date, position) VALUES ?';
    await connection.query(deleteQuery);
    student.experiences = await connection.query(experiencesQuery, [experiencesVals]);
  }

  if (params.major) {
    const deleteQuery = `DELETE FROM StudentMajors WHERE gtUsername = ${connection.escape(gtUsername)}`;
    const insertQuery = `INSERT INTO StudentMajors (gtUsername, majorId) VALUES (${connection.escape(gtUsername)}, ${connection.escape(params.major)})`;
    await connection.query(deleteQuery);
    student.major = await connection.query(insertQuery);
  }

  if (params.degree) {
    const deleteQuery = `DELETE FROM StudentDegrees WHERE gtUsername = ${connection.escape(gtUsername)}`;
    const insertQuery = `INSERT INTO StudentDegrees (gtUsername, degreeId) VALUES (${connection.escape(gtUsername)}, ${connection.escape(params.degree)})`;
    await connection.query(deleteQuery);
    student.degree = await connection.query(insertQuery);
  }

  if (params.links) {
    var linksVals = [];
    // Format data for bulk insertion
    for (let i = 0; i < params.links.length; i++) {
      const link = params.links[i];
      const linkVal = [gtUsername, link.label, link.address];
      linksVals.push(linkVal);
    }
    const deleteQuery = `DELETE FROM StudentLinks WHERE gtUsername = ${connection.escape(gtUsername)}`;
    const linkQuery = 'INSERT INTO StudentLinks (gtUsername, label, address) VALUES ?';
    await connection.query(deleteQuery);
    student.links = await connection.query(linkQuery, [linksVals]);
  }

  return student;
};

Student.getStudentSkills = async ( params ) => {
  const { gtUsername } = params;
  const query = `SELECT skill FROM Skills WHERE id IN (SELECT skillId from StudentSkills WHERE gtUsername = ${connection.escape(gtUsername)})`;
  const skills = await connection.query(query);
  return skills;
};

Student.updateStudentSkills = async (params) => {
  const { gtUsername, newSkills } = params;
  var skillsVals = [];
  // Format data for bulk insertion
  for (let i = 0; i < newSkills.length; i++) {
    skillsVals.push([gtUsername, newSkills[i]]);
  }
  const skillQuery1 = `DELETE FROM StudentSkills WHERE gtUsername = ${connection.escape(gtUsername)}`;
  const skillQuery2 = 'INSERT IGNORE INTO StudentSkills (gtUsername, skillId) VALUES ?';
  await connection.query(skillQuery1);
  const skills = await connection.query(skillQuery2, [skillsVals]);
  return skills;
};

Student.deleteAllStudentSkills = async (params) => {
  const { gtUsername } = params;
  const skillQuery = `DELETE FROM StudentSkills WHERE gtUsername = ${connection.escape(gtUsername)}`;
  const skills = await connection.query(skillQuery);
  return skills;
};

Student.getStudentInterests = async ( params ) => {
  const { gtUsername } = params;
  const query = `SELECT interest FROM Interests WHERE id IN (SELECT interestId FROM StudentInterests WHERE gtUsername = ${connection.escape(gtUsername)})`;
  const interests = await connection.query(query);
  return interests;
};

Student.updateStudentInterests = async ( params ) => {
  const { gtUsername, newInterests } = params;
  const interestVals = [];
  // Format data for bulk insertion
  for (let i = 0; i < newInterests.length; i++) {
    interestVals.push([gtUsername, newInterests[i]]);
  }
  const query1 = `DELETE FROM StudentInterests WHERE gtUsername = ${connection.escape(gtUsername)}`;
  const query2 = 'INSERT IGNORE INTO StudentInterests (gtUsername, interestId) VALUES ?';
  await connection.query(query1);
  const interests = await connection.query(query2, [interestVals]);
  return interests;
};

Student.deleteAllStudentInterests = async (params) => {
  const { gtUsername } = params;
  const query = `DELETE FROM StudentInterests WHERE gtUsername = ${connection.escape(gtUsername)}`;
  const interests = await connection.query(query);
  return interests;
};

Student.getStudentExperiences = async ( params ) => {
  const { gtUsername } = params;
  const query = `SELECT * FROM Experience WHERE gtUsername = ${connection.escape(gtUsername)}`;
  const experiences = connection.query(query);
  return experiences;
};

Student.updateStudentExperiences = async ( params ) => {
  // newExperiences must have all the columns from Experience except gtUsername
  // if experience already exists then id must be included, otherwise id must be null
  const { gtUsername, newExperiences } = params;
  var experiencesVals = [];
  // Format data for bulk insertion
  for (let i = 0; i < newExperiences.length; i++) {
    newExperiences[i].splice(1, 0, gtUsername);
    experiencesVals.push(newExperiences[i]);
  }
  const experiencesQuery1 = `DELETE FROM Experience WHERE gtUsername = ${connection.escape(gtUsername)}`;
  const experiencesQuery2 = 'INSERT IGNORE INTO Experience (id, gtUsername, expDescription, companyName, start_date, end_date, position) VALUES ?';
  // find way to batch update
  await connection.query(experiencesQuery1);
  const experiences = await connection.query(experiencesQuery2, [experiencesVals]);
  return experiences;
};

Student.deleteAllStudentExperiences = async (params) => {
  const { gtUsername } = params;
  const query = `DELETE FROM Experience WHERE gtUsername = ${connection.escape(gtUsername)}`;
  const experiences = await connection.query(query);
  return experiences;
};

Student.getStudentProjectInterests = async (params) => {
  const { gtUsername } = params;
  const query = `SELECT * FROM Projects WHERE id IN (SELECT projectId from StudentSavedProjects WHERE gtUsername = ${connection.escape(gtUsername)})`;
  const projects = connection.query(query);
  return projects;
};

Student.addProjectInterest = async ( params ) => {
  const { gtUsername, projectIDs } = params;
  var interestParams = [];
  // Format data for bulk insertion
  for (let i = 0; i < projectIDs.length; i++) {
    interestParams.push([gtUsername, projectIDs[i]]);
  }
  const query = 'INSERT IGNORE INTO StudentSavedProjects (gtUsername, projectId) VALUES ?';
  var projects = await connection.query(query, [interestParams]);
  return projects;
};

Student.updateProjectInterests = async (params) => {
  const { gtUsername, projectIDs } = params;
  var interestParams = [];
  // Format data for bulk insertion
  for (let i = 0; i < projectIDs.length; i++) {
    interestParams.push([gtUsername, projectIDs[i]]);
  }
  const deleteQuery = `DELETE FROM StudentSavedProjects WHERE gtUsername = ${connection.escape(gtUsername)}`;
  const query = 'INSERT IGNORE INTO StudentSavedProjects (gtUsername, projectId) VALUES ?';
  await connection.query(deleteQuery);
  var projects = await connection.query(query, [interestParams]);
  return projects;
};

Student.deleteAllStudentProjectInterests = async (params) => {
  const { gtUsername } = params;
  const query = `DELETE FROM StudentSavedProjects WHERE gtUsername = ${connection.escape(gtUsername)}`;
  var interests = await connection.query(query);
  return interests;
};

Student.deleteStudentProjectInterests = async (params) => {
  const { gtUsername, id } = params;
  const query = `DELETE FROM StudentSavedProjects WHERE gtUsername = ${connection.escape(gtUsername)} AND projectId = ${id}`;
  var interests = await connection.query(query);
  return interests;
};

Student.getStudentMajor = async (params) => {
  const { gtUsername } = params;
  const query = `SELECT major FROM Majors WHERE id IN (SELECT majorId FROM StudentMajors WHERE gtUsername = ${connection.escape(gtUsername)})`;
  var major = await connection.query(query);
  return major;
};
Student.updateStudentMajor = async (params) => {
  const { gtUsername, newMajor } = params;
  const deleteQuery = `DELETE FROM StudentMajors WHERE gtUsername = ${connection.escape(gtUsername)}`;
  const insertQuery = `INSERT INTO StudentMajors (gtUsername, majorId) VALUES (${connection.escape(gtUsername)}, ${connection.escape(newMajor)})`;
  await connection.query(deleteQuery);
  var major = await connection.query(insertQuery);
  return major;
};
Student.deleteStudentMajor = async (params) => {
  const { gtUsername } = params;
  const deleteQuery = `DELETE FROM StudentMajors WHERE gtUsername = ${connection.escape(gtUsername)}`;
  var major = await connection.query(deleteQuery);
  return major;
};

Student.getStudentDegree = async (params) => {
  const { gtUsername } = params;
  const query = `SELECT degree FROM Degrees WHERE id IN (SELECT degreeId FROM StudentDegrees WHERE gtUsername = ${connection.escape(gtUsername)})`;
  var degree = await connection.query(query);
  return degree;
};

Student.updateStudentDegree = async (params) => {
  const { gtUsername, newDegree } = params;
  const deleteQuery = `DELETE FROM StudentDegrees WHERE gtUsername = ${connection.escape(gtUsername)}`;
  const insertQuery = `INSERT INTO StudentDegrees (gtUsername, degreeId) VALUES (${connection.escape(gtUsername)}, ${connection.escape(newDegree)})`;
  await connection.query(deleteQuery);
  var degree = await connection.query(insertQuery);
  return degree;
};

Student.deleteStudentDegree = async (params) => {
  const { gtUsername } = params;
  const deleteQuery = `DELETE FROM StudentDegrees WHERE gtUsername = ${connection.escape(gtUsername)}`;
  var degree = await connection.query(deleteQuery);
  return degree;
};

Student.getStudentLinks = async (params) => {
  const { gtUsername } = params;
  const query = `SELECT * FROM StudentLinks WHERE gtUsername = ${connection.escape(gtUsername)}`;
  var links = await connection.query(query);
  return links;
};

Student.updateStudentLinks = async (params) => {
  const { gtUsername, newLinks } = params;
  var linksVals = [];

  for (let i = 0; i < newLinks.length; i++) {
    newLinks[i].splice(0, 0, gtUsername, null);
    linksVals.push(newLinks[i]);
  }
  const deleteQuery = `DELETE FROM StudentLinks WHERE gtUsername = ${connection.escape(gtUsername)}`;
  const linkQuery = 'INSERT INTO StudentLinks (gtUsername, id, label, address) VALUES ?';
  await connection.query(deleteQuery);
  var links = await connection.query(linkQuery, [linksVals]);
  return links;
};

Student.deleteStudentLinks = async (params) => {
  const { gtUsername } = params;
  const deleteQuery = `DELETE FROM StudentLinks WHERE gtUsername = ${connection.escape(gtUsername)}`;
  var links = await connection.query(deleteQuery);
  return links;
};

module.exports = Student;
