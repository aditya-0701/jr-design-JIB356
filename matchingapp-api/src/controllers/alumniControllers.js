const Alumni = require('../models/alumniModels');

var rtr = {
    'body': '',
    'statusCode': 0,
    'contentType': 'appliction/json'
}

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

exports.create = (req) => {
    try {
        var result = Alumni.createAlumni(req);
        if (result === null) {
            return four04;
        }
        return result;
    } catch (e) {
        return four00(e);
    }
};

exports.update = (req) => {
    try {
        var result = Alumni.updateAlumni(req);
        if (result === null) {
            return four04;
        }
        return result;
    } catch (e) {
        return four00(e);
    }
};



exports.findByName = (req) => {
    try {
        var result = Alumni.findAlumniByName(req);
        if (result === null) {
            return four04;
        }
        return result;
    } catch (e) {
        return four00(e);
    }
};

exports.getAll = (req) => {
    try {
        var result = Alumni.getAll(req);
        if (result === null) {
            return four04;
        }
        return result;
    } catch (e) {
        return four00(e);
    }
};

exports.delete = (req) => {
    try {
        var result = Alumni.deleteAlumniAccount(req);
        if (result === null) {
            return four04;
        }
        return result;
    } catch (e) {
        return four00(e);
    }
};


