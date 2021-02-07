const Student = require('../models/studentModels');

// Create and Save a new Student
exports.create = (req) => {
    try {
        var result = Student.addStudent( req );
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

// Retrieve all Students from the database.
exports.getAll = (req) => {
    try {
        var result = Student.getAll( req );
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

// Find a single Student with a StudentId
exports.findOne = (req) => {
  try {
    var result = Student.findStudent( req );
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

// Update a Student identified by the StudentId in the request
exports.update = (req) => {
    try {
        var result = Student.updateStudent( req );
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
exports.delete = (req) => {
    try {
        var result = Student.deleteStudent( req );
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