const connection = require('../dbInit');
const bcrypt = require('bcrypt');
//var connection = db.dbConn;

const Alumni = function(alumni) {
    this.alumniID = alumni.alumniID;
    this.username = alumni.username;
    this.firstName = alumni.firstName;
    this.lastName = alumni.lastName;
    this.middleName = alumni.middleName
    this.email = alumni.email;
    this.pwd = alumni.pwd;
    this.bio = alumni.bio;
}

Alumni.createAlumni = async ( params ) => {
    // params should include all columns even if null 
    if (params.username && params.firstName && params.lastName && params.email && params.pwd && params.bio) {
        let hash = '';
        try {
            hash = await bcrypt.hash(params.pwd, 10);
        } catch (e) {
            throw 'ERROR OCCURED';
        }
        params.pwd = hash;
        let query = `INSERT INTO Alumni VALUES ?`;
        try {
            var alumni = await connection.query(query, params);
        } catch (e) {
            throw e;
        }
        return alumni;
    } else {
        throw 'ERROR OCCURRED';
    }
}

Alumni.updateAlumni = async ( params ) => {
    const {username} = params;
    const inputs = Object.assign({}, params);
    delete inputs.username;
    let query = `UPDATE alumni SET ? WHERE username = "${username}"`;
    if (inputs.hasOwnProperty('pwd')) {
        if (inputs.pwd != null && inputs.pwd != '') {
            return bcrypt.hash(inputs.pwd, 10, (err, hash) => {
                if (err) throw 'ERROR OCCURRED WHILE UPDATING ALUMNI';
                inputs.pwd = hash;
                let alumni = {};
                try {
                    // alumni = await connection.query(query, inputs);
                } catch (e) {
                    throw e;
                }
                return alumni;
            });
        }
    } else {
        let alumni = await connection.query(query, inputs);
        return alumni;
    }
}

Alumni.findAlumniByName = async ( params ) => {
    // name can be first/middle/last name or username
    const {name} = params;
    let query = `SELECT username, email, firstName, lastName, middleName, bio FROM Alumni`;
    if (name) {
        query = `SELECT username, email, firstName, lastName, middleName, bio FROM Alumni WHERE firstName like %${name}% or lastName like %${name}% or middleName like %${name}% or username like %${name}%;`;
    }
    let alumni = await connection.query(query);
    return alumni;
};

Alumni.getAll = async ( params ) => {
    let query = `SELECT username, email, firstName, lastName, middleName, bio FROM Alumni`;
    let alumni = await connection.query(query);
    return alumni;
};

Alumni.deleteAlumniAccount = async ( params ) => {
    // deletes via the Alumni username NOT id
    const {username} = params;
    let query = `DELETE FROM Alumni WHERE username = ${username}`;
    let alumni = await connection.query(query);
    return alumni;
};

Alumni.addProject = async ( params ) => {
    // params
    if (params.alumniId && params.createdAt) {
        let projectParams = [params.projectTitle, params.projectDescription, params.startDate, params.endDate, params.alumniId, params.createdAt, params.visible];
        let query = "INSERT INTO Projects (projectTitle, projectDescription, startDate, endDate, projectAlumni, createdAt, visible) VALUES ?";
        var project = await connection.query(query, connection.escape(projectParams));
    } else {
        throw 'ERROR OCCURRED';
    }

    let getProjIdQuery = `SELECT id FROM Projects WHERE projectAlumni = ${connection.escape(params.alumniId)} AND createdAt = ${connection.escape(params.createdAt)};`; 
    project['id'] = await connection.query();

    if (project) {
        if (params.skills) {
            let skillsVals = [];
            for (let i = 0; i < params.skills.length; i++) {
                skillsVals.push([project['id'], params.skills[i]]);
            }
            let skillQuery = `INSERT INTO ProjectSkills (projectId, skillId) VALUES ?`;
            project['skills'] = await connection.query(skillQuery, connection.escape(skillsVals));
        }
        if (params.interests) {
            let interestsVals = [];
            for (let i = 0; i < params.interests.length; i++) {
                interestsVals.push([project['id'], params.interests[i]]);
            }
            let interestQuery = `INSERT INTO ProjectInterests (projectId, interestId) VALUES ?`;
            project['interests'] = await connection.query(interestQuery, connection.escape(interestsVals));
        }
        if (params.links) {
            // assumes params.links follows:
            // [[label, address], ...]
            let linksVals = [];
            for (let i = 0; i < params.links.length; i++) {
                linksVals.push([project['id'], null].concat(params.links[i]));
            }
            let linkQuery = `INSERT INTO ProjectLinks (projectId, id, label, address) VALUES ?`;
            project['links'] = await connection.query(linkQuery, connection.escape(linksVals));
        }
    }
    
    return project;
};

Alumni.getAlumniProjects = async ( params ) => {
    let query = `SELECT projectTitle, projectDescription, startDate, endDate, projectAlumni, weekHours FROM Projects`;
    let projIds = [];
    
    if (params.skills) {
        let skills = 'SELECT projectId from ProjectSkills WHERE skillId IN ' + connection.escape([params.skills]);
        let skillIds = await connection.query(skills);
        projIds.push(skillIds.map(element => element['gtUsername']));
        
    }
    
    if (params.interests) {
        let interests = 'SELECT projectId from ProjectInterests WHERE interestId IN ' + connection.escape([params.interests]);
        let interestIds = await connection.query(interests);
        projIds.push(interestIds.map(element => element['gtUsername']));
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
    
    if (projIds != null && projIds != [] && projIds.length != 0) {
        whereActive = true;
        query += ' WHERE gtUsername IN ' + connection.escape(projIds);
    }
    
    
    
    if (params.hours || params.startDate || params.endDate) {
        if (whereActive) {
            query += ' AND '    
        } else {
            whereActive = true;
            query += ' WHERE '
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
            query += ' AND '
        } else {
            query += ' WHERE '
        }
        query += `MATCH(projectTitle, projectDescription) AGAINST (${searchString})`
    }
    
    var students = await connection.query(query);
    return students;
};

Alumni.deleteAlumniProject = async (params) => {
    let query = `DELETE FROM Projects WHERE id = ${connectio.escape(params.projectId)} AND projectAlumni = ${connection.escape(params.alumniId)}`;
    var projects = await connection.query(query);
    return projects;
};

Alumni.updateProject = async (params) => {
    // need projectId
    if (params.projectId) {
        let projectParams = [params.projectTitle, params.projectDescription, params.startDate, params.endDate, params.visible, params.projectId];
        let query = "UPDATE Projects SET projectTitle = ?, projectDescription = ?, startDate = ?, endDate = ?, projectAlumni = ?, createdAt = ?, visible = ? WHERE id = ?";
        var project = await connection.query(query, connection.escape(projectParams));
    } else {
        throw 'ERROR OCCURRED';
    }
    if (project) {
        if (params.skills) {
            let skillsVals = [];
            for (let i = 0; i < params.skills.length; i++) {
                skillsVals.push([params.projectId, params.skills[i]]);
            }
            let deleteQuery = `DELETE FROM ProjectSkills WHERE projectId = ${connection.escape(params.projectId)}`;
            let skillQuery = `INSERT INTO ProjectSkills (projectId, skillId) VALUES ?`;
            await connection.query(deleteQuery);
            project['skills'] = await connection.query(skillQuery, connection.escape(skillsVals));
        }
        if (params.interests) {
            let interestsVals = [];
            for (let i = 0; i < params.interests.length; i++) {
                interestsVals.push([params.projectId, params.interests[i]]);
            }
            let deleteQuery = `DELETE FROM ProjectInterests WHERE projectId = ${connection.escape(params.projectId)}`;
            let interestQuery = `INSERT INTO ProjectInterests (projectId, interestId) VALUES ?`;
            await connection.query(deleteQuery);
            project['interests'] = await connection.query(interestQuery, connection.escape(interestsVals));
        }
        if (params.links) {
            // assumes params.links follows:
            // [[label, address], ...]
            let linksVals = [];
            for (let i = 0; i < params.links.length; i++) {
                linksVals.push([params.projectId, null].concat(params.links[i]));
            }
            let deleteQuery = `DELETE FROM ProjectLinks WHERE projectId = ${connection.escape(params.projectId)}`;
            let linkQuery = `INSERT INTO ProjectLinks (projectId, id, label, address) VALUES ?`;
            await connection.query(deleteQuery);
            project['links'] = await connection.query(linkQuery, connection.escape(linksVals));
        }
    }
    
    return project;
};

module.exports = Alumni