const student = require('./src/controllers/studentController.js');
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
    let parsedBody = (body) ? JSON.parse(body) : null;
    var query = (rawQueryString != null && rawQueryString != '') ? parseQuery(rawQueryString) : null;
    var method = event.requestContext.http.method;
    
    switch( rawPath ) {
        case '/student':
            switch( method ) {
                case 'GET':
                    if (query) {
                        return await student.findOne(query);
                    } else {
                        return await student.getAll();
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
        case '/alumni':
            switch (method) {
                case 'GET':
                    if (query) {
                        return student.findOne(query);
                    } else {
                        return student.getAll();
                    }
                case 'PUT':
                    return student.update( body );
                    
                case 'POST':
                    return student.create( body );
                
                case 'DELETE':
                    return student.delete( query );
                
                default: 
                    return four03();
            }
        case '/login':
            switch (method) {
                case 'GET':
                    if (query) {
                        return login.findOne(query);
                    } else {
                        return student.getAll();
                    }
                case 'POST':
                    return student.create( body );
                default: 
                    return four03();
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

