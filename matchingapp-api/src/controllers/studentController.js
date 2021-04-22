const Student = require('../models/studentModels');

// Basic Requests errors
const rtr = {
  body: '',
  statusCode: 0,
  headers: {
    'Content-Type': 'appliction/json'
  }
};

// const four04 = {
//   body: JSON.stringify({
//     message: 'Record not found with the given input parameters.',
//     status: 404
//   }),
//   statusCode: 404,
//   headers: {
//     'Content-Type': 'appliction/json'
//   }
// };

const four00 = (err) => {
  return {
    body: JSON.stringify({
      message: 'Invalid request. Please check your input parameters and retry.',
      status: 400,
      error: err
    }),
    statusCode: 400,
    headers: {
      'Content-Type': 'appliction/json'
    }
  };
};

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
    console.log(e);
    return four00(e);
  }
  return result;
};

// Retrieve all Students from the database.
exports.getAll = async ( req = {} ) => {
  try {
    req = (req == null) ? {} : req;
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

// Get a Student's skills with the specified gtUsername in the request
exports.getStudentSkills = async ( req ) => {
  try {
    var result = await Student.getStudentSkills( req );
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

// Update Student skills with specified gtUsername and [skillIds]
exports.updateStudentSkills = async ( req ) => {
  try {
    var result = await Student.updateStudentSkills( req );
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

// Delete all student skills with specified gtUsername
exports.deleteAllStudentSkills = async ( req ) => {
  try {
    var result = await Student.deleteAllStudentSkills( req );
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

// Get all student interests with specified gtUsername
exports.getStudentInterests = async ( req ) => {
  try {
    var result = await Student.getStudentInterests( req );
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

// Update student interests with specified gtUsername and [interestIDs]
exports.updateStudentInterests = async ( req ) => {
  try {
    var result = await Student.updateStudentInterests( req );
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

// Delete all student interests with specified gtUsername
exports.deleteAllStudentInterests = async ( req ) => {
  try {
    var result = await Student.deleteAllStudentInterests( req );
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

// Get student experiences with specified gtUsername
exports.getStudentExperiences = async ( req ) => {
  try {
    var result = await Student.getStudentExperiences( req );
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

// Update student experiences with specified gtUsername and [[experiences]] NOTE: see model comments for format of new experiences
exports.updateStudentExperiences = async ( req ) => {
  try {
    var result = await Student.updateStudentExperiences( req );
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

// Delete all student experiences with specified gtUsername
exports.deleteAllStudentExperiences = async ( req ) => {
  try {
    var result = await Student.deleteAllStudentExperiences( req );
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

// Get student project interests with specified gtUsername
exports.getStudentProjectInterests = async ( req ) => {
  try {
    var result = await Student.getStudentProjectInterests( req );
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

// Add Student project interests with specified gtUsername and [projectIDs]
exports.addProjectInterest = async ( req ) => {
  try {
    var result = await Student.addProjectInterest( req );
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

// Update Student project interest with specified gtUsername and [projectIDs]
exports.updateProjectInterests = async ( req ) => {
  try {
    var result = await Student.updateProjectInterests( req );
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

// Delete all student project interests with specified gtUsername
exports.deleteAllStudentProjectInterests = async ( req ) => {
  try {
    var result = await Student.deleteAllStudentProjectInterests( req );
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

exports.deleteStudentProjectInterests = async ( req ) => {
  try {
    var result = await Student.deleteStudentProjectInterests( req );
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

exports.getStudentMajor = async ( req ) => {
  try {
    var result = await Student.getStudentMajor( req );
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

exports.updateStudentMajor = async ( req ) => {
  try {
    var result = await Student.updateStudentMajor( req );
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

exports.deleteStudentMajor = async ( req ) => {
  try {
    var result = await Student.deleteStudentMajor( req );
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

exports.getStudentDegree = async ( req ) => {
  try {
    var result = await Student.getStudentDegree( req );
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

exports.updateStudentDegree = async ( req ) => {
  try {
    var result = await Student.updateStudentDegree( req );
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

exports.deleteStudentDegree = async ( req ) => {
  try {
    var result = await Student.deleteStudentDegree( req );
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

exports.getStudentLinks = async ( req ) => {
  try {
    var result = await Student.getStudentLinks( req );
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

exports.updateStudentLinks = async ( req ) => {
  try {
    var result = await Student.updateStudentLinks( req );
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

exports.deleteStudentLinks = async ( req ) => {
  try {
    var result = await Student.deleteStudentLinks( req );
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
