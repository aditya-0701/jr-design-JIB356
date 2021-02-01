var stud = require('../models/studentModels');

var stu = new stud.Student({
    gtUsername: 'randomUser',
    firstName: 'random',
    lastName: 'user',
    pwd: 'password'
});

stu.addStudent();