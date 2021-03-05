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
    if (params.username && params.firstName && params.lastName && params.email && params.pwd && params.bio) {
        let hash = '';
        try {
            hash = await bcrypt.hash(params.pwd, 10);
        } catch (e) {
            throw 'ERROR OCCURED';
        }
        params.pwd = hash;
        let query = `INSERT INTO Alumni SET ?`;
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

module.exports = Alumni