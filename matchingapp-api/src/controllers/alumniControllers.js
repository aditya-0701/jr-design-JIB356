const Alumni = require('../models/studentModels');

exports.create = (req) => {
    try {
        var result = Alumni.createAlumni(req);
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

exports.updateAlumni = (req) => {
    try {
        var result = Alumni.updateAlumni(req);
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



exports.findAlumniByName = (req) => {
    try {
        var result = Alumni.findAlumniByName(req);
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

exports.getAll = (req) => {
    try {
        var result = Alumni.getAll(req);
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

exports.deleteAlumniAccount = (req) => {
    try {
        var result = Alumni.deleteAlumniAccount(req);
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


