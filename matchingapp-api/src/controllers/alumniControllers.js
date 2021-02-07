const Alumni = require('../models/alumniModels');

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

exports.update = (req) => {
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



exports.findByName = (req) => {
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

exports.delete = (req) => {
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


