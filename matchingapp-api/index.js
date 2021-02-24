const student = require('./src/controllers/studentController.js');
const dbinit = require('./src/dbInit.js');

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
                    return {
                    'statusCode': 400
                }
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
                    return {
                    'statusCode': 400
                }
            }
            
        default: 
            return {
            'statusCode': 400
        }
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

