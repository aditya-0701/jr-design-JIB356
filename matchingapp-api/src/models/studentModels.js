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
        const {  gtUsername } = params;
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
    const {  query } = params; 
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
        let query = "INSERT INTO Students SET ?";
        try {
            var students = await connection.query(query, params);
        } catch (e) {
            throw e;
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

module.exports = Student;
