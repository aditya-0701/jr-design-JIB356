const connection = require('../dbInit');

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

Student.queryStudent = ( params ) => {
    const {  query } = params; 
    connection.query(query, (error, result, fields) => {
        if (error) {
            console.error(error);
        }
        console.log(result);
        return result;
    });
};


Student.getAll = ( params ) => {
    params = params || {filter: null};
    const {  filter } = params;
    let query = `SELECT gtUsername, firstName, lastName FROM Students`;
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
    if (params.gtUsername && params.pwd && params.firstName && params.lastName && params.email) {
        let query = "INSERT INTO Students SET ?";
        connection.query(query, params, (error, result, fields) => {
            if (error) {
                console.error(error);
            }
            console.log(result);
            return result;
        });
    }
}

Student.deleteStudent = ( params ) => {
    const { gtUsername } = params;
    let query = `DELETE FROM Students WHERE gtUsername = "${gtUsername}"`;
    connection.query(query, (error, results, fields) => {
        if (error) console.error(error);
        return result;
    });
}

Student.updateStudent = ( params ) => {
    const { gtUsername } = params;
    const inputs = Object.assign({}, params);
    delete inputs.gtUsername;

    let query = `UPDATE Students SET ? WHERE gtUsername = "${gtUsername}"`;
    connection.query(query, inputs, (error, results, fields) => {
        if (error) console.error(error);
        console.log(JSON.stringify(results));
        console.log(JSON.stringify(fields));
        return results;
    });
}

module.exports = Student;
