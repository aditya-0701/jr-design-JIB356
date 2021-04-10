import  React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, TouchableOpacity, Linking } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { getStudent, getAlumni } from '../../store.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import styles from '../../globalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import EditProfile from '../EditProfile'
import ViewProfile from '../ViewProfile'
import ViewProject from '../ViewProject'
import ViewSaved from '../ViewSaved'
import NewProject from '../NewProject'

//import MainLogin from './mainLogin.js';
// import AlumniLogin from './alumniLogin.js';
// import StudentLogin from './studentLogin.js';
// import ViewProject from '../ViewProject/index.js'

var gtUname= '';

const Tab = new createBottomTabNavigator();
const Stack = createStackNavigator();

const Home = (props) => {
    const { navigation } = props;
    const createNewProject = () => {
        navigation.navigate("NewProject");
    }
    const viewProjects = () => {
        navigation.navigate("ViewProject", {gtUsername: gtUname});
    }
    const viewProfiles = () => {
        navigation.navigate("ViewProfile");
    }
    const savedProjects = () => {
        navigation.navigate("ViewSaved", {gtUsername: gtUname});
    }

    return (
        <View style={[styles.container, { alignItems: 'center' }]}>
            <Text style={styles.title}>Welcome!</Text>
            <TouchableOpacity style={styles.button} onPress={createNewProject}>
                <Text style={styles.buttonText}>Create Project</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={viewProjects}>
                <Text style={styles.buttonText}>View Projects</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.button} onPress={viewProfiles}>
                <Text style={styles.buttonText}>View Profiles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={savedProjects}>
                <Text style={styles.buttonText}>Saved Projects</Text>
            </TouchableOpacity>
        </View>
    )
};

const Profile = (props) => {
    //alert(JSON.stringify(props));
    const { navigation } = props;
    const [firstName, onChangeFirstName] = React.useState('');
    const [lastName, onChangeLastName] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [skills, onChangeSkills] = React.useState('');
    const [major, onChangeMajor] = React.useState('');
    const [interests, onChangeInterests] = React.useState('');
    const [degree, onChangeDegree] = React.useState('');
    const [experiences, onChangeExperience] = React.useState([]);
    const [links, onChangeLinks] = React.useState([]);

    // console.log(userDetails);
    const logout = () => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'Login'
                }
            ],
        });
    }

    const refresh = () => {
        getStudent({gtUsername: gtUname})
        .then((resp) => {
            console.log(resp.body);
            onChangeFirstName(resp.body.firstName)
            onChangeLastName(resp.body.lastName);
            onChangeEmail(resp.body.email);
            onChangeDegree(resp.body.degree[0].degree)
            onChangeMajor(resp.body.major[0].major)
            let skills = resp.body.skills.map( ({skill}) => skill).join(', ');
            let interests = resp.body.interests.map( ({interest}) => interest).join(', ');
            onChangeSkills(skills);
            onChangeInterests(interests);
            onChangeExperience(resp.body.experiences);
            onChangeLinks(resp.body.links);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const editProfile = () => {
        navigation.navigate("EditProfile", {
            gtUsername: gtUname 
        })
    }

    useEffect(() => {
        console.log(props)
        // var em = (props != 'undefined' && props != null) ? props.route.params.gtUsername : null;
        if (gtUname == null) return;
        getStudent({gtUsername: gtUname})
        .then((resp) => {
            console.log(resp.body);
            onChangeFirstName(resp.body.firstName)
            onChangeLastName(resp.body.lastName);
            onChangeEmail(resp.body.email);
            onChangeDegree(resp.body.degree[0].degree)
            onChangeMajor(resp.body.major[0].major)
            let skills = resp.body.skills.map( ({skill}) => skill).join(', ');
            let interests = resp.body.interests.map( ({interest}) => interest).join(', ');
            onChangeSkills(skills);
            onChangeInterests(interests);
            onChangeExperience(resp.body.experiences);
            onChangeLinks(resp.body.links);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [gtUname])

    return (
        <View style = { styles.container }>
            <Text style = {styles.title}>Profile Details</Text>
            <ScrollView>
            <View style = { styles.info }>
                <Text style = {styles.label}>Name</Text>
                <Text>{ firstName || "" } {lastName || ""}</Text>
                <Text style = {styles.label}>Email</Text>
                <Text 
                    onPress = {() => Linking.openURL('mailto:'+ email)}
                    style = {{color: '#0000EE', fontWeight: 'bold'}}
                >
                    { email || "" }
                </Text>
                <Text style = {styles.label}>Degree</Text>
                <Text>{ degree || "" }</Text>
                <Text style = {styles.label}>Major</Text>
                <Text>{ major || "" }</Text>
                <Text style = {styles.label}>Skills</Text>
                <Text>{ skills || "" }</Text>
                <Text style = {styles.label}>Interests</Text>
                <Text>{ interests || "" }</Text>
                <Text style = {styles.label}>Experiences</Text>
                {experiences.map((element, index) => {
                    return (<View key = {index}>
                        <Text style={[styles.label, {fontSize: 18, fontStyle: 'italic'}]}>Company</Text>
                        <Text style={{color: 'black'}}>{element.companyName || "not found"}</Text>
                        <Text style={[styles.label, {fontSize: 18, fontStyle: 'italic'}]}>Position</Text>
                        <Text style={{color: 'black'}}>{element.position || "not found"}</Text>
                        <View style={ {textAlign: 'stretch', flexDirection: "row",alignItems: 'stretch',justifyContent: 'center'}}>
                            <Text style={[styles.label, 
                                {marginHorizontal: 20, width: '45%'}, 
                                {fontSize: 18, fontStyle: 'italic'}]}>Start Date</Text>
                            <Text style={[styles.label, 
                                {marginHorizontal: 20, width: '45%'},
                                {fontSize: 18, fontStyle: 'italic'}]}>End Date</Text>
                        </View>
                        <View style={ {textAlign: 'center', flexDirection: "row",alignItems: 'stretch',justifyContent: 'center' }}>
                            {<Text style={{marginHorizontal: 20, width: '45%'}}>{element.start_date.split('T')[0]}</Text>}
                            {<Text style={{marginHorizontal: 20, width: '45%'}}>{element.end_date.split('T')[0]}</Text> }
                        </View>
                        <Text style={[styles.label, {fontSize: 18, fontStyle: 'italic'}]}>Description</Text>
                        <Text style={{color: 'black'}}>{element.expDescription}</Text>
                    </View>
                )})}
                <Text style = {styles.label}>External Links</Text>
                {links.map((element, index) => {
                    return (<View key = {index}>
                        <Text style={[styles.label, {fontSize: 18, fontStyle: 'italic'}]}>Link Label</Text>
                        <Text style={{color: 'black'}}>{element.label || "not found"}</Text>
                        <Text style={[styles.label, {fontSize: 18, fontStyle: 'italic'}]}>Link Address</Text>
                        <Text style={{color: 'black'}}>{element.address || "not found"}</Text>
                    </View>
                )})}
            </View>
            </ScrollView>
            <TouchableOpacity style = { styles.button } onPress = { logout }>
                <Text style = { styles.buttonText }>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.button } onPress = { editProfile }>
                <Text style = { styles.buttonText }>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    )
};

// const ViewProjects = (props) => {
//     const { navigation } = props;
//     const viewProjects = () => {
//         navigation.navigate("ViewProject");
//     }
//     return (
//         <View style={[styles.container, { alignItems: 'center' }]}>
//             <TouchableOpacity style={styles.button} onPress={viewProjects}>
//                 <Text style={styles.buttonText}>View Projects</Text>
//             </TouchableOpacity>
//         </View>
//     )
// };

const ProfileEdit = ( props ) => {
    const { email, gtUsername } = props.route.params ;
    return (
        <Stack.Navigator screenOptions = {{headerShown: false}}>
            <Stack.Screen name = "Profile" component = { Profile } initialParams = 
             {{email: email, gtUsername: gtUsername}}/>
            <Stack.Screen name = "EditProfile" component = { EditProfile } initialParams = 
             {{gtUsername: gtUsername}}/>
        </Stack.Navigator>
    )
}

const ProfileView = ( props ) => {
    return (
        <Stack.Navigator screenOptions = {{headerShown: false}}>
            <Stack.Screen name = "ViewProfile" component = { ViewProfile }/>
        </Stack.Navigator>
    )
}

const ProjectView = ( props ) => {
    return (
        <Stack.Navigator screenOptions = {{headerShown: false}}>
            <Stack.Screen name = "ViewProject" component = { ViewProject } initialParams =
            {{gtUsername: gtUname}}/>
        </Stack.Navigator>
    )
}

const ProjectsSaved = ( props ) => {
    return (
        <Stack.Navigator screenOptions = {{headerShown: false}}>
            <Stack.Screen name = "ViewSaved" component = { ViewSaved } initialParams =
            {{gtUsername: gtUname}}/>
        </Stack.Navigator>
    )
}

const StudentsSaved = ( props ) => {
    return (
        <Stack.Navigator screenOptions = {{headerShown: false}}>
            <Stack.Screen name = "ViewSaved" component = { ViewSaved } initialParams =
            {{gtUsername: gtUname}}/>
        </Stack.Navigator>
    )
}

const MyProjects = ( props ) => {
    return (
        <Stack.Navigator screenOptions = {{headerShown: false}}>
            <Stack.Screen name = "NewProject" component = { NewProject } initialParams =
            {{gtUsername: gtUname}}/>
        </Stack.Navigator>
    )
}

// export default function HomeScreen( props ) {
//     const { email, gtUsername } = props.route.params ;
//     gtUname = gtUsername;
//     // getProf({email: email});

export default function HomeScreen(props) {
    const { email, gtUsername, alumni } = props.route.params ;
    gtUname = gtUsername;
    // alert(email);
    // alert(JSON.stringify(props));
    if (alumni) {
        return (
            <Tab.Navigator>
                {/* <Tab.Screen name = "Home" component = { Home } /> */}
                <Tab.Screen name = "Student Profiles" component = { ProfileView } />
                <Tab.Screen name = "Saved Profiles" component = { StudentsSaved } />
                <Tab.Screen name = "My Projects" component = { MyProjects } />
                <Tab.Screen name = "My Profile" component = { ProfileEdit } initialParams = 
                 {{email: email, gtUsername: gtUsername}}/>
            </Tab.Navigator>
        )
    } else {
        return (
            <Tab.Navigator>
                {/* <Tab.Screen name = "Home" component = { Home } /> */}
                <Tab.Screen name = "Projects" component = { ProjectView } />
                <Tab.Screen name = "Saved Projects" component = { ProjectsSaved } />
                <Tab.Screen name = "My Profile" component = { ProfileEdit } initialParams = 
                {{email: email, gtUsername: gtUsername}}/>
            </Tab.Navigator>
        )
    }
};