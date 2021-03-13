const student = require('./src/controllers/studentController.js');
const alumni = require('./src/controllers/alumniController.js');
const login = require('./src/login.js');
const dbinit = require('./src/dbInit.js');

const four03 = () => {
    return {
        'body': JSON.stringify({
            'message': 'Invalid request. Method not found or invalid endpoint.',
            'status': 403,
        }),
        'statusCode': 403,
        'contentType': 'appliction/json'
    }
}


/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - tableName: required for operations that interact with DynamoDB
 *   - payload: a parameter to pass to the operation being performed
 */
exports.handler = async (event) => {
    const { rawPath, routeKey, rawQueryString=null, body } = event;
    let mainPath = rawPath.split('/')[1];
    let parsedBody = (body) ? JSON.parse(body) : null;
    let query = (rawQueryString != null && rawQueryString != '') ? parseQuery(rawQueryString) : null;
    let method = event.requestContext.http.method;
    let pathParams = event.pathParameters || null;
    switch( mainPath ) {
        case 'student':
            switch( method ) {
                case 'GET':
                    if (pathParams) {
                        return await student.findOne( pathParams );
                    } else {
                        return await student.getAll( query );
                    }
                case 'PUT':
                    return student.update( parsedBody );
                    
                case 'POST':
                    return student.create( parsedBody );
                
                case 'DELETE':
                    return student.delete( query );
                
                default: 
                    return four03();
            }
        case 'alumni':
            switch (method) {
                case 'GET':
                    if (query) {
                        return alumni.findByName(query);
                    } else {
                        return alumni.getAll();
                    }
                case 'PUT':
                    return alumni.update( body );
                    
                case 'POST':
                    return alumni.create( body );
                
                case 'DELETE':
                    return alumni.delete( query );
                
                default: 
                    return four03();
            }
        case 'login':
            switch (method) {
                case 'GET':
                    if (query) {
                        return login.validateSession( query );
                    } else {
                        return login.loginUser( parsedBody );
                    }
                case 'POST':
                    return login.loginUser( parsedBody );
                default: 
                    return four03();
            }
        case 'skills':
            switch(method) {
                case 'GET':
                    return student.getStudentSkills(query);
                case 'PUT':
                    return student.updateStudentSkills(parsedBody);
                case 'DELETE':
                    return student.deleteAllStudentSkills(query);
            }
        case 'interests':
            switch(method) {
                case 'GET':
                    return student.getStudentInterests(query);
                case 'PUT':
                    return student.updateStudentInterests(parsedBody);
                case 'DELETE':
                    return student.deleteAllStudentInterests(query);
            }
        case 'experiences':
            switch(method) {
                case 'GET':
                    return student.getStudentExperiences(query);
                case 'PUT':
                    return student.updateStudentExperiences(parsedBody);
                case 'DELETE':
                    return student.deleteAllStudentExperiences(query);
            }
        case 'projectInterests':
            switch(method) {
                case 'GET':
                    return student.getStudentProjectInterests(query);
                case 'PUT':
                    return student.updateProjectInterests(parsedBody);
                case 'POST':
                    return student.addProjectInterest(parsedBody);
                case 'DELETE':
                    return student.deleteAllStudentProjectInterests(query);
            }
        case 'projects':
            switch(method) {
                case 'GET':
                    // return student.getStudentProjectInterests(query);
                case 'PUT':
                    // return student.updateProjectInterests(parsedBody);
                case 'POST':
                    return alumni.addProject( parsedBody );
                case 'DELETE':
                    // return student.deleteAllStudentProjectInterests(query);
            }
        default: 
            return four03();
    }
};

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

