import  React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity, Linking } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { getStudent, getAlumni } from '../../store.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import styles from '../../globalStyles';
import { ScrollView } from 'react-native-gesture-handler';

//import MainLogin from './mainLogin.js';
// import AlumniLogin from './alumniLogin.js';
// import StudentLogin from './studentLogin.js';

const Tab = new createBottomTabNavigator();

const Home = ( props ) => {
  const { navigation } = props;
  const createNewProject = () => {
    navigation.navigate("NewProject");
  }
  const viewProjects = () => {
    navigation.navigate("ViewProject");
  }
  const viewProfiles = () => {
    navigation.navigate("ViewProfile");
  }

    return (
        <View style = { [styles.container, {alignItems: 'center'}] }>
            <Text style = {styles.title} >Welcome!</Text>
            <TouchableOpacity style={styles.button} onPress={ createNewProject }>
              <Text style={styles.buttonText}>Create Project</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={ viewProjects }>
              <Text style={styles.buttonText}>View Projects</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={ viewProfiles }>
              <Text style={styles.buttonText}>View Profiles</Text>
            </TouchableOpacity>
        </View>
    )
};

const Profile = ( props ) => {
    const { navigation } = props;
    const [firstName, onChangeFirstName] = React.useState('');
    const [lastName, onChangeLastName] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [skills, onChangeSkills] = React.useState('');
    const [major, onChangeMajor] = React.useState('');
    const [interests, onChangeInterests] = React.useState('');
    const [degree, onChangeDegree] = React.useState('');
    const [experiences, onChangeExperience] = React.useState('');

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

    useEffect(() => {
        console.log(props)
        var em = (props != 'undefined' && props != null) ? props.route.params.email : null;
        if (em == null) return;
        getStudent({email: em})
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
        })
        .catch((err) => {
            console.log(err);
        })
    })

    return (
        <View style = { styles.container }>
            <ScrollView>
            <Text style = {styles.title}>Profile Details</Text>
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
            </View>
            </ScrollView>
            <TouchableOpacity style = { styles.button } onPress = { logout }>
                <Text style = { styles.buttonText }>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}


export default function HomeScreen( props ) {
    const { email } = props.route.params ;
    // getProf({email: email});

    return (
        <Tab.Navigator>
            <Tab.Screen name = "Home" component = { Home } />
            <Tab.Screen name = "Profile" component = { Profile } initialParams = {{email: email}}/>
        </Tab.Navigator>
    )
};
