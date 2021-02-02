var db = require('../dbInit');
var connection = db.dbConn;

const Student = function(student) {
    this.gtUsername = student.gtUsername;
    this.firstName = student.firstName;
    this.lastName = student.lastName; 
    this.middleName = student.middleName;
    this.email = student.email;
    this.pwd = student.pwd;
    this.bio = student.bio;
}

Student.findStudent = ( params ) => {
    var { gtUsername } = params;
    //We can use knex to remove the need to do string interpolation to perform our DB transactions.
    var query = `SELECT * FROM Students WHERE gtUsername = ${gtUsername}`;
    connection.query(query, (error, result, fields) => {
        if (error) {
            console.error(error);
        }
        console.log(result);
        console.log(`Fields: ${fields}`);
        return result;
    });
}

Student.queryStudent = ( params ) => {
    var { query } = params; 
    connection.query(query, (error, result, fields) => {
        if (error) {
            console.error(error);
        }
        console.log(result);
        return result;
    });
};


Student.getAll = ( params ) => {
    var { filter } = params;
    var query = `SELECT * FROM Students`;
    if (filter != null) {
        query += " " +  filter;
    }
    connection.query(query, (error, result, fields) => {
        if (error) {
            console.error(error);
        }
        console.log(result);
        console.log(`Fields: ${fields}`);
        return result;
    });
};

Student.addStudent = ( params ) => {
    if (params.gtUsername && params.pwd && params.firstName && params.lastName) {
        var query = "INSERT INTO Students SET ?";
        connection.query(query, params, (error, result, fields) => {
            if (error) {
                console.error(error);
            }
            console.log(result);
            console.log(`Fields: ${fields}`);
            return result;
        });
    }
}

exports.Student = Student;
