const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
var connection = require('../dbInit');

var failure = (err = 'unauthorized access') => {
    return {
        'body': JSON.stringify({
            'message': 'Unauthorized access attempted. Please check your login parameters.',
            'error': err
        }),
        'statusCode': 401,
        'contentType': 'appliction/json'
    }
};

const Login = {};

Login.loginUser = async ( username, pass, role ) => {
    // Need to implement for Alumni
    if (role == "Students" /*|| role == "Alumni"*/) {
        let query = `SELECT gtUsername, pwd
        FROM Students
        WHERE gtUsername = "${gtUsername}"`;
        try {
            let user = (await connection.query(query))[0];
            if (!user) return failure('User not found');
            let match = await bcrypt.compare(password, user.pwd);
            if (match) {
                //Randomly generated session ID
                let uid = uuid();
                //Expiry set to 1 hour from current time
                let expiry = ((new Date()).getTime() + 3600000) / 1000; 
                let insert = `insert INTO StudentSessions SET ?`
                let session = await connection.query(query, {
                    'sessionId': uid,
                    'gtUsername': user.gtUsername,
                    'expiry':expiry
                });
                return {
                    'body': JSON.stringify({
                        'message': 'Successful login. Session active for 1 hour.',
                    }),
                    'statusCode': 200,
                    'contentType': 'appliction/json'
                };
            }
        } catch (e) {
            return failure(e);
        }
    } else { 
        return failure();
    }
};

Login.validateSession = ( username, sessionId ) => {
    let query = `SELECT gtUsername
        FROM Students
        WHERE gtUsername = "${gtUsername}"`;
    try {
        let user = (await connection.query(query))[0];
        if (!user) return failure('User not found');

        let sessionQuery = `SELECT gtUsername, sessionId, expiry
            FROM StudentSessions
            WHERE gtUsername = "${gtUsername}"`;
        let session = await connection.query(sessionQuery)[0];
        let currTime = (new Date()).getTime() / 1000;
        if (session.sessionId === this.sessionId && 
            session.expiry < currTime) {
                return {
                    'body': JSON.stringify({
                        'message': 'Successful login. Session currently active.',
                        'expiry': session.expiry
                    }),
                    'statusCode': 200,
                    'contentType': 'appliction/json'
                };
        } else {
            return {
                'body': JSON.stringify({
                    'message': 'Session not active. The session is expired or invalid session ID.',
                }),
                'statusCode': 401,
                'contentType': 'appliction/json'
            };
        }
    } catch (e) {
        return failure(e);
    }     
}

module.exports = Login;
