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
        skills: 'Programming',
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

var gtUname = '';

export function setGTUsername( params ) {
    gtUname = params.gtUsername;
}

export function getGTUsername( ) {
    return gtUname;
}
/*
 Function checks whether the student with the given gtUsername
*/
export function userExists(params) {
    let exists = false;
    const { email, pass } = params;
    var gtUsername = email.split('@')[0];
    console.log(gtUsername);
    superagent.get(URI + '/student')
        .query({ 'gtUsername': gtUsername })
        .send()
}
/*
    Logs in the user with the given username and password combination
*/
export async function userLogin(params) {
    const { email, pass, role } = params;
    const gtUsername = email.split('@')[0];
    const username = email.split('@')[0];
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
        .send({ 'gtUsername': gtUsername, 'password': pass, 'role': role, 'username': username })
}


export function addStudent( params ) {
    return superagent.post(URI + '/student')
    .send( params )
};

export function updateStudent( params ) {
    const { email } = params;
    var gtUsername = email.split('@')[0];
    console.log(gtUsername);
    return superagent.put(URI + '/student')
    .send( params )
} 


export function getStudent( params ) {
    const { gtUsername }  = ( params != null ) ? params : {};
    if (gtUsername != 'undefined' && gtUsername != null) {
        return superagent.get(URI + `/student/${gtUsername}`)
        .send()
    }
} 

export function getAllStudents ( query ) {
    return superagent.get(URI + '/student')
    .query( query )
    .send()
}


//getUser({'gtUsername': 'asudarshan30@gatech.edu'});
//getAllUsers();


// export function userExists( params ) {
//     let exists = false;
//     const { email, pass } = params;
//     var gtUsername = email.split('@')[0];
//     console.log(gtUsername);
//     superagent.get(URI + '/student')
//     .query({'gtUsername': gtUsername})
//     .send()
// }
/*
    To be implemented on backend, might not be necessary to have a separate function in store.js
*/
// export async function alumni( params ) {
//     const { email, pass } = params;
//     const gtUsername = email.split('@')[0];
//     console.log(gtUsername + " GT Username");
//     const sessionId = await AsyncStorage.getItem('sessionId');
//     console.log(sessionId + " Session ID")
//     //var value = false;
//     if (sessionId != null && sessionId != '') {
//         // console.log("Session ID Found")
//         // return superagent.get(URI + '/login')
//         // .query({'gtUsername': gtUsername, 'sessionId': sessionId})
//         // .send()
//     }
//     console.log("Session ID NOT Found")
//     return superagent.post(URI + '/login')
//     .send({'gtUsername': gtUsername, 'password': pass})
// }


export function addAlumni( params ) {
   return  superagent.post(URI + '/alumni')
    .send( params )
};

export function updateAlumni( params ) {
   return  superagent.put(URI + '/alumni')
    .send( params )
} 


export function getAlumni( params ) {
    const { name }  = ( params != null ) ? params : {};
    console.log(name);
    if (name != 'undefined' && name != null) {
        return superagent.get(URI + '/alumni')
        .query({'name':  name})
        .send()
    }
} 

export function getAllAlumni ( ) {
   return  superagent.get(URI + '/alumni')
    .send()
}


// Skills
export function getStudentSkills ( params ) {
    const { email }  = ( params != null ) ? params : {};
    if (email != 'undefined' && email != null) {
        var gtUsername = email.split('@')[0];
        console.log(gtUsername);

        return superagent.get(URI + '/skills')
        .query({'gtUsername':  gtUsername})
        .send()
    }
}

export function updateSkills ( params ) {
    return superagent.put(URI + '/skills')
    .send( params )
}

    // TBD in backend
export function addSkills ( params ) {
    return superagent.post(URI + '/skills')
    .send( params )
}

    // TBD in backend
export function getAllSkills ( ) {
    superagent.get(URI + '/skills')
}

// Interests
export function getStudentInterests ( params ) {
    const { email }  = ( params != null ) ? params : {};
    if (email != 'undefined' && email != null) {
        var gtUsername = email.split('@')[0];
        console.log(gtUsername);

        return superagent.get(URI + '/interests')
        .query({'gtUsername':  gtUsername})
        .send()
    }
}

export function updateInterests ( params ) {
    return superagent.put(URI + '/skills')
    .send( params )
}

    // TBD in backend
export function addInterests ( params ) {
    return superagent.post(URI + '/skills')
    .send( params )
}

    // TBD in backend
export function getAllInterests ( params ) {
    return superagent.get(URI + '/skills')
}

// Experiences
export function getStudentExperiences ( params ) {
    const { email }  = ( params != null ) ? params : {};
    if (email != 'undefined' && email != null) {
        var gtUsername = email.split('@')[0];
        console.log(gtUsername);

        return superagent.get(URI + '/experiences')
        .query({'gtUsername':  gtUsername})
        .send()
    }
}

export function updateExperiences ( params ) {
    return superagent.put(URI + '/experiences')
    .send( params )
}

    // TBD in backend
export function addExperiences ( params ) {
    return superagent.post(URI + '/experiences')
    .send( params )
}

    // TBD in backend
export function getAllExperiences ( params ) {
    return superagent.get(URI + '/experiences')
}


// Student Projects
export function getStudentProjectInterests ( params ) {
    const { gtUsername }  = ( params != null ) ? params : {};
    if (gtUsername != 'undefined' && gtUsername != null) {
        // var gtUsername = email.split('@')[0];
        console.log(gtUsername);

        return superagent.get(URI + '/projectInterests')
        .query({'gtUsername':  gtUsername})
        .send()
    }
}

export function updateProjectInterests ( params ) {
    return superagent.put(URI + '/projectInterests')
    .send( params )
}

export function addProjectInterests ( params ) {
    console.log(params);
    return superagent.post(URI + '/projectInterests')
    .send( params )
}

export function deleteProjectInterest ( params ) {
    const { gtUsername, projectId } = params;
    console.log(`/projectInterests/${gtUsername}/${projectId}`);
    return superagent.delete(URI + `/projectInterests/${gtUsername}/${projectId}`)
    .send( )
}

// Projects

/*
    Optional fields:
    - search: The search string
    - skills: an array of skills IDs converted to a string and inserted into URL in
    this format: skills

*/
export function getAllProjects ( params ) {
    return superagent.get(URI + '/projects')
    .query ( params )
    .send()
}

export function getAlumniProjects ( params ) {
    return superagent.get(URI + '/alumniProjects')
    .query ( params )
    .send()
}

export function getProject ( params ) {
    var projId = params.projId;
    return superagent.get(URI + '/projects/' + projId)
    .send()
}


export function updateProject ( params ) {
    return superagent.put(URI + '/projects')
    .send( params )
}

export function addProject ( params ) {
    return superagent.post(URI + '/projects')
    .send( params )
}

export function deleteProject ( params ) {
    return superagent.delete(URI + '/projects')
    .query ( params )
    .send( )
}


// Alumni Saved Students
export function getAlumniSavedStudents ( params ) {
    return superagent.get(URI + '/alumniSavedStudents')
    .query ( params )
    .send()
}

export function deleteAllAlumniSavedStudents ( params ) {
    var { username } = params;
    return superagent.delete(URI + '/alumniSavedStudents/')
    .send()
}

export function deleteAlumniSavedStudents ( params ) {
    var { username, gtUsername } = params; 
    console.log('/alumniSavedStudents/'
    + `${username}/${gtUsername}`);
    return superagent.delete(URI + '/alumniSavedStudents/'
    + `${username}/${gtUsername}`)
    .send()
}


export function addAlumniSavedStudents ( params ) {
    return superagent.post(URI + '/alumniSavedStudents')
    .send( params )
}

// export function addAlumniSavedStudents ( params ) {
//     return superagent.post(URI + '/alumniSavedStudents')
//     .send( params )
// }