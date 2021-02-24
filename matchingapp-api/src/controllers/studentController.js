const Student = require('../models/studentModels');

const four04 = {
    'body': JSON.stringify({
        message: 'Record not found with the given input parameters.',
        status: 404
    }),
    'statusCode': 404,
    'contentType': 'appliction/json'
};

const four00 = (err) => {
    return {
        'body': JSON.stringify({
            'message': 'Invalid request. Please check your input parameters and retry.',
            'status': 400,
            'body': err
        }),
        'statusCode': 400,
        'contentType': 'appliction/json'
    }
}

// Create and Save a new Student
exports.create = async ( req ) => {
    try {
        var result = await Student.addStudent( req );
        if (result === null) {
            rtr.body = JSON.stringify({
                message: 'Record not found with the given input parameters.',
                status: 404
            });
            rtr.statusCode = 404;
            return rtr;
        }
      } catch (e) {
        return four00(e);
      }
    return result;
};

// Retrieve all Students from the database.
exports.getAll = async ( req = null ) => {
    try {
        var result = await Student.getAll( req );
        console.log(result);
        if (result === null) {
            rtr.body = JSON.stringify({
                message: 'Record not found with the given input parameters.',
                status: 404
            });
            rtr.statusCode = 404;
            return rtr;
        }
    } catch (e) {
    return four00(e);
    }
      
    return result;
};

// Find a single Student with a StudentId
exports.findOne = async ( req ) => {
  try {
    var result = await Student.findStudent( req );
    if (result === null) {
        rtr.body = JSON.stringify({
            'message': 
            'Record not found with the given input parameters.',
            'status': 404
        });
        rtr.statusCode = 404;
        return rtr;
    }

  } catch (e) {
    return four00(e);
  }
  
  return result;
    
};

// Update a Student identified by the StudentId in the request
exports.update = async ( req ) => {
    try {
        var result = await Student.updateStudent( req );
        if (result === null) {
            rtr.body = JSON.stringify({
                message: 'Record not found with input ',
                status: 404
            });
            rtr.statusCode = 404;
            return rtr;
        }
    
        return result;
      } catch (e) {
        return four00(e);
      }
        
};

// Delete a Student with the specified StudentId in the request
exports.delete = async ( req ) => {
    try {
        var result = await Student.deleteStudent( req );
        if (result === null) {
            rtr.body = JSON.stringify({
                message: 'Record not found with the given input parameters.',
                status: 404
            });
            rtr.statusCode = 404;
            return rtr;
        }
    
        return result;
      } catch (e) {
        return four00(e);
      }
        
};
