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
                    alumni = await connection.query(query, inputs);
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
    if (name) {
        let query = `SELECT username, email, firstName, lastName, middleName, bio FROM Alumni WHERE firstName like %${name}% or lastName like %${name}% or middleName like %${name}% or username like %${name}%;`;
    } else {
        let query = `SELECT username, email, firstName, lastName, middleName, bio FROM Alumni`;
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
        let query = "INSERT INTO Projects (projectTitle, projectDescription, startDate, endDate, projectAlumni, createdAt, visible) SET ?";
        var project = await connection.query(query, projectParams);
    } else {
        throw 'ERROR OCCURRED';
    }

    let getProjIdQuery = `SELECT id FROM Projects WHERE projectAlumni = ${params.alumniId} AND createdAt = ${params.createdAt};`; 
    project['id'] = await connection.query();

    if (project) {
        if (params.skills) {
            skillsVals = [];
            for (i = 0; i < params.skills.length; i++) {
                skillsVals.push([project['id'], params.skills[i]]);
            }
            let skillQuery = `INSERT INTO ProjectSkills (projectId, skillId) VALUES ?`;
            project['skills'] = await connection.query(skillQuery, skillsVals);
        }
        if (params.interests) {
            interestsVals = [];
            for (i = 0; i < params.interests.length; i++) {
                interestsVals.push([project['id'], params.interests[i]]);
            }
            let interestQuery = `INSERT INTO ProjectInterests (projectId, interestId) VALUES ?`;
            project['interests'] = await connection.query(interestQuery, interestsVals);
        }
        if (params.links) {
            // assumes params.links follows:
            // [[label, address], ...]
            linksVals = [];
            for (i = 0; i < params.links.length; i++) {
                linksVals.push([project['id'], null].concat(params.links[i]));
            }
            let linkQuery = `INSERT INTO ProjectLinks (projectId, id, label, address) VALUES ?`;
            project['links'] = await connection.query(linkQuery, linksVals);
        }
    }
    
    return project;
};

module.exports = Alumni