//const superagent = require('superagent');
import superagent from 'superagent';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
const URI = 'https://i0n5tznua4.execute-api.us-east-2.amazonaws.com';

const users = [
    {
        email: "aditya.sudarshan@gatech.edu",
        pass: "password",
        name: 'Aditya Sudarshan',
        major: 'Computer Science',
        skills: 'Porgamming',
        degree: 'B.S',
        interests: 'Sports, Gaming, Programming' 
    },
    {
        email: "sam.sanders@gatech.edu",
        pass: "password",
        name: 'Sam Sanders',
        interests: 'Sports, Music',
        major: 'Computer Science',
        skills: 'Porgamming',
        degree: 'B.S',
    }
]

/*
 Function checks whether the student with the given gtUsername
*/
export function userExists( params ) {
    let exists = false;
    const { email, pass } = params;
    var gtUsername = email.split('@')[0];
    console.log(gtUsername);

    superagent.get(URI + '/student')
    .query({'gtUsername': gtUsername})
    .send()
}

/*
    Logs in the user with the given username and password combination
*/
export async function userLogin( params ) {
    const { email, pass } = params;
    const gtUsername = email.split('@')[0];
    console.log(gtUsername + " GT Username");
    const sessionId = await AsyncStorage.getItem('sessionId');
    console.log(sessionId + " Session ID")
    //var value = false;
    if (sessionId != null && sessionId != '') {
        // console.log("Session ID Found")
        // return superagent.get(URI + '/login')
        // .query({'gtUsername': gtUsername, 'sessionId': sessionId})
        // .send()
    }
    console.log("Session ID NOT Found")
    return superagent.post(URI + '/login')
    .send({'gtUsername': gtUsername, 'password': pass})
}


export function addUser( params ) {
    superagent.post(URI + '/student')
    .send( params )
};

export function updateUser( params ) {
    let rtrUser = null;
    const { email } = params;
    var gtUsername = email.split('@')[0];
    console.log(gtUsername);

    superagent.put(URI + '/student')
    .send( params )
} 


export function getUser( params ) {
    const { email }  = ( params != null ) ? params : {};
    if (email != 'undefined' && email != null) {
        var gtUsername = email.split('@')[0];
        console.log(gtUsername);

        return superagent.get(URI + '/student')
        .query({'gtUsername':  gtUsername})
        .send()
    }
} 

export function getAllUsers ( params ) {
    superagent.get(URI + '/student')
    .send()
}

//getUser({'gtUsername': 'asudarshan30@gatech.edu'});
//getAllUsers();
    