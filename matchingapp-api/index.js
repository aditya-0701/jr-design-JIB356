//Can follow this structure to create our API https://bezkoder.com/node-js-rest-api-express-mysql/
// var config = require('./config.js')
// var mysql = require('mysql');
// var connection = mysql.createConnection(config.dbconfig);

// connection.connect();
// connection.query('SELECT * FROM Students', (error, result, fields) => {
//     if (error) {
//         console.error(error);
//     }
//     console.log(result);
//     console.log(`Fields: ${fields}`)
// });

// connection.end();
const connection = require('./src/dbInit');

const Student = require('./src/models/studentModels');

var stu = new Student({
    'gtUsername': 'randomUser',
    'firstName': 'random',
    'lastName': 'user',
    'pwd': 'password',
    'email': 'random.user@gatech.edu'
});

//return stud.Student.getAll({filter: `WHERE gtUsername = "asudarshan30" `});
//stud.Student.addStudent(stu);
async function test () {
    //await Student.updateStudent({gtUsername: 'randomUser', firstName: 'New', lastName: 'NewLast'});
    console.log(await Student.findStudent({gtUsername: 'randomUser'}))
    connection.end();
}
//stud.Student.getAll();
//Student.test();

//stud.getAll();
test();

