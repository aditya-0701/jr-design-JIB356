const Student = require('../models/studentModels');

// Create and Save a new Student
exports.create = async ( req ) => {
    try {
        var result = await Student.addStudent( req );
        if (result === null) {
            return {
                'statusCode': 404
            }
        }
      } catch (e) {
          return {
              'statusCode': 400,
              'body': JSON.stringify({
                  'message': 
                  'Invalid request. You cannot add two users with same gtUsername',
                  'status': 400
              })
          } 
      }
    return result;
};

// Retrieve all Students from the database.
exports.getAll = async ( req = null ) => {
    try {
        var result = await Student.getAll( req );
        console.log(result);
        if (result === null) {
            return {
                'statusCode': 404
            }
        }
      } catch (e) {
          return {
              'statusCode': 400,
              'body': JSON.stringify({
                  'message': 
                  'Invalid request. Please check your input parameters and retry.',
                  'status': 400,
                  'body': e
              })
          }
      }
      
    return result;
};

// Find a single Student with a StudentId
exports.findOne = async ( req ) => {
  try {
    var result = await Student.findStudent( req );
    if (result === null) {
        return {
            'statusCode': 400,
            'body': JSON.stringify({
                'message': 
                'Record not found with the given input parameters.',
                'status': 404
            })
        }
    }

  } catch (e) {
      return {
          'statusCode': 400
      } 
  }
  
  return result;
    
};

// Update a Student identified by the StudentId in the request
exports.update = async ( req ) => {
    try {
        var result = await Student.updateStudent( req );
        if (result === null) {
            return {
                'statusCode': 404
            }
        }
    
        return result;
      } catch (e) {
          return {
              'statusCode': 400
          } 
      }
        
};

// Delete a Student with the specified StudentId in the request
exports.delete = async ( req ) => {
    try {
        var result = await Student.deleteStudent( req );
        if (result === null) {
            return {
                'statusCode': 404
            }
        }
    
        return result;
      } catch (e) {
          return {
              'statusCode': 400
          } 
      }
        
};
