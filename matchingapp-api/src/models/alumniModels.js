var db = require('../dbInit');
var connection = db.dbConn;

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

Alumni.createAlumni = ( params ) => {
    var { username, firstName, lastName, middleName, email, pwd, bio } = params;
    var query = `INSERT INTO Alumni values (${username}, ${pwd}, ${email}, ${firstName}, ${lastName}, ${middleName}, ${bio})`;
    connection.query(query, (error, result, fields) => {
        if (error) {
            console.error(error);
        }
        console.log(result);
        console.log(`Fields: ${fields}`);
        return result;
    });
}

Alumni.updateAlumni = ( params ) => {
    var { username, firstName, lastName, middleName, email, pwd, bio, alumniID } = params;
    var query = `UPDATE alumni SET username = ${username}, pwd = ${pwd}, email = ${email}, firstName = ${firstName}, lastName = ${lastName}, middleName = ${middleName}, bio = ${bio} WHERE id = ${alumniID}`;
    connection.query(query, (error, result, fields) => {
        if (error) {
            console.log(error);
        }
        console.log(result);
        console.log(`Fields: ${fields}`);
        return result;
    });
}

Alumni.findAlumniByName = ( name ) => {
    var query = `SELECT username, email, firstName, lastName, middleName, bio FROM Alumni WHERE firstName like %${name}% or lastName like %${name}% or middleName like %${name}%`;
    connection.query(query, (error, result, fields) => {
        if (error) {
            console.error(error);
        }
        console.log(`Fields: ${fields}`);
        console.log(result);
        return result;
    });
};

Alumni.getAll = ( name ) => {
    var query = `SELECT username, email, firstName, lastName, middleName, bio FROM Alumni`;
    connection.query(query, (error, result, fields) => {
        if (error) {
            console.error(error);
        }
        console.log(`Fields: ${fields}`);
        console.log(result);
        return result;
    });
};

Alumni.deleteAlumniAccount = (alumni) => {
    var query = `DELETE FROM Alumni WHERE id = ${alumni.alumniID}`;
    connection.query(query, (error, result, fields) => {
        if (error) {
            console.error(error);
        }
        console.log(`Fields: ${fields}`);
        console.log(result);
        return result;
    });
};

module.exports = Alumni