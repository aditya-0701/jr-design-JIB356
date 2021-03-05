const connection = require('../dbInit.js');
const bcrypt = require('bcrypt');

const Student = function(student) {
    this.gtUsername = student.gtUsername;
    this.firstName = student.firstName;
    this.lastName = student.lastName; 
    this.middleName = student.middleName;
    this.email = student.email;
    this.pwd = student.pwd;
    this.bio = student.bio;
}

Student.findStudent = async ( params ) => {
    try {
        const { gtUsername } = params;
    //We can use knex to remove the need to do string interpolation to perform our DB transactions.
        let query = `SELECT gtUsername, 
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
            console.log("Student exists");
            let skillQuery = `SELECT skill FROM Skills 
                WHERE id IN ( SELECT skillId FROM StudentSkills WHERE gtUsername = "${gtUsername}")`
            student['skills'] = await connection.query(skillQuery); 

            let interestQuery = `SELECT interest FROM Interests 
                WHERE id IN ( SELECT interestId FROM StudentInterests WHERE gtUsername = "${gtUsername}")`
            student['interests'] = await connection.query(interestQuery);
        }
        return student;
    } catch (e) {
        console.error(e);
    }
    
}

Student.queryStudent = async ( params ) => {
    const { query } = params; 
    var students = await connection.query(query);
    return students;
};


Student.getAll = async ( params ) => {
    params = params || {filter: null};
    const {  filter } = params;
    let query = `SELECT gtUsername, firstName, lastName FROM Students`;
    if (filter != null) {
        query += " " +  filter;
    }
    var students = await connection.query(query);
    return students;
    
};

Student.addStudent = async ( params ) => {
    if (params.gtUsername && params.pwd && params.firstName && params.lastName && params.email) {
        let hash = '';
        try {
            hash = await bcrypt.hash(params.pwd, 10);
        } catch (e) {
            throw 'ERROR OCCURRED'
        }
        params.pwd = hash;
        let studentParams = [params.gtUsername, params.email, params.firstName, params.lastName, params.middleName, params.bio, params.pwd];
        let query = "INSERT INTO Students (gtUsername, email, firstName, lastName, middleName, bio, pwd) VALUES ?";
        try {
            var students = await connection.query(query, studentParams);
        } catch (e) {
            throw e;
        }
        if (students) {
            if (params.skills) {
                skillsVals = [];
                for (i = 0; i < params.skills.length; i++) {
                    skillsVals.push([params.gtUsername, params.skills[i]]);
                }
                let skillQuery = `INSERT INTO StudentSkills (gtUsername, skillId) VALUES ?`;
                students['skills'] = await connection.query(skillQuery, skillsVals); 
            }
            
            if (params.interests) {
                interestsVals = [];
                for (i = 0; i < params.interests.length; i++) {
                    skillsVals.push([params.gtUsername, params.interests[i]]);
                }
                let skillQuery = `INSERT INTO StudentInterests (gtUsername, interestId) VALUES ?`;
                students['interests'] = await connection.query(skillQuery, interestsVals); 
            }

            if (params.experiences) {
                // assumes params.experience follows:
                // [[description, company name, start date, end date], ...]
                experiencesVals = [];
                for (i = 0; i < params.experiences.length; i++) {
                    experiencesVals.push([gtUsername].concat(params.experiences[i]));
                }
                let experiencesQuery = `INSERT INTO Experience (gtUsername, expDescription, companyName, start_date, end_date) VALUES ?`;
                students['experiences'] = await connection.query(experiencesQuery, experiencesVals);
            }
        }
        return students;
    } else {
        throw 'ERROR OCCURRED';
    }
}

Student.deleteStudent = async ( params ) => {
    const { gtUsername } = params;
    let query = `DELETE FROM Students WHERE gtUsername = "${gtUsername}"`;
    let student = await connection.query(query);
    return student;
}

Student.updateStudent = async ( params ) => {
    const { gtUsername } = params;
    const inputs = Object.assign({}, params);
    delete inputs.gtUsername;
    var query = `UPDATE Students SET ? WHERE gtUsername = "${gtUsername}"`;

    if (inputs.hasOwnProperty('pwd')) {
        if (inputs.pwd != null && inputs.pwd != '') {
            return bcrypt.hash(inputs.pwd, 10, (err, hash) => {
                if (err) throw 'ERROR OCCURRED WHILE ADDING USER';
                inputs.pwd = hash;
                let students = {};
                try {
                    //students = await connection.query(query, inputs);
                } catch (e) {
                    throw e;
                }
                return students;
            });
        }
    } else {
        let student = await connection.query(query, inputs);
        return student;
    }
}

Student.getStudentSkills = async ( params ) => {
    const { gtUsername } = params;
    let query = `SELECT skill FROM Skills WHERE id IN (SELECT skillId from StudentSkills WHERE gtUsername = ${gtUsername})`;
    let skills = await connection.query(query);
    return skills;
}

Student.updateStudentSkills = async (params) => {
    const {gtUsername, newSkills} = params;
    skillsVals = [];
    for (i = 0; i < newSkills.length; i++) {
        skillsVals.push([gtUsername, newSkills[i]]);
    }
    let skillQuery1 = `DELETE FROM StudentSkills WHERE gtUsername = ${gtUsername} AND sillId NOT IN ${newSkills}`;
    let skillQuery2 = `INSERT IGNORE INTO StudentSkills (gtUsername, skillId) VALUES ?`;
    await connection.query(skillQuery1);
    let skills = await connection.query(skillQuery2, skillsVals); 
    return skills
}

Student.deleteAllStudentSkills = async (params) => {
    const {gtUsername} = params;
    let skillQuery = `DELETE FROM StudentSkills WHERE gtUsername = ${gtUsername}`;
    let skills = await connection.query(skillQuery); 
    return skills
}

Student.getStudentInterests = async ( params ) => {
    const { gtUsername } = params;
    let query = `SELECT interest FROM Interests WHERE id IN (SELECT interestId FROM StudentInterests WHERE gtUsername = ${gtUsername})`;
    let interests = await connection.query(query);
    return interests;
}

Student.updateStudentInterests = async ( params ) => {
    const {gtUsername, newInterests} = params;
    interestVals = [];
    for (i = 0; i < newInterests.length; i++) {
        interestVals.push([gtUsername, newInterests[i]]);
    }
    let query1 = `DELETE FROM StudentInterests WHERE gtUsername = ${gtUsername} AND interestId NOT IN ${newInterests}`;
    let query2 = `INSERT IGNORE INTO StudentInterests (gtUsername, interestId) VALUES ?`;
    await connection.query(query1);
    let interests = await connection.query(query2, interestVals); 
    return interests;
}

Student.deleteAllStudentInterests = async (params) => {
    const {gtUsername} = params;
    let query = `DELETE FROM Interests WHERE gtUsername = ${gtUsername}`;
    let interests = await connection.query(query);
    return interests;
}

Student.getStudentExperiences = async ( params ) => {
    const { gtUsername } = params;
    let query = `SELECT * FROM Experience WHERE gtUsername = ${gtUsername}`;
    let experiences = connection.query(query);
    return experiences;
}

Student.updateStudentExperiences = async ( params ) => {
    // newExperiences must have all the columns from Experience
    // if experience already exists then id must be included, otherwise id must be null
    const {gtUsername, newExperiences}
    experiencesVals = [];
    for (i = 0; i < newExperiences.length; i++) {
        experiencesVals.push(newExperiences[i].splice(1, 0, gtUsername));
    }
    let experiencesQuery1 = `DELETE FROM Experience WHERE gtUsername = ${gtUsername}`;
    let experiencesQuery2 = `INSERT IGNORE INTO Experience (id, gtUsername, expDescription, companyName, start_date, end_date) VALUES ?`;
    // find way to batch update
    await connection.query(experiencesQuery1);
    let experiences = await connection.query(experiencesQuery2, experiencesVals);
    return experiences;
}

Student.deleteAllStudentExperiences = async (params) => {
    const {gtUsername} = params;
    query = `DELECT FROM Experience WHERE gtUsername = ${gtUsername}`;
    let experiences = await connection.query(query);
    return experiences;
}

Student.getStudentProjectInterests = async (params) => {
    const { gtUsername } = params;
    let query = `SELECT * FROM Projects WHERE id IN (SELECT projectId from StudentSavedProjects WHERE gtUsername = ${gtUsername})`;
    let projects = connection.query(query);
    return projects;
}

Student.addProjectInterest = async ( params ) => {
    const { gtUsername, projectIDs } = params;
    var interestParams = [];
    for (i = 0; i < projectIDs.length; i++) {
        interestParams.push([gtUsername, projectIDs[i]]);
    }
    let query = `INSERT INTO StudentSavedProjects VALUES ?`;
    var projects = await connection.query(query, interestParams);
    return projects;
}

Student.updateProjectInterests = async (params) => {
    const { gtUsername, projectIDs } = params;
    var interestParams = [];
    for (i = 0; i < projectIDs.length; i++) {
        interestParams.push([gtUsername, projectIDs[i]]);
    }
    let query = `INSERT IGNORE INTO StudentSavedProjects VALUES ?`;
    var projects = await connection.query(query, interestParams);
    return projects;
}

Student.deleteAllStudentProjectInterests = async (params) => {
    const {gtUsername} = params;
    let query = `DELETE FROM StudentSavedProjects WHERE gtUsername = ${gtUsername}`;
    var interests = await connection.query(query);
    return interests;
}

module.exports = Student;
