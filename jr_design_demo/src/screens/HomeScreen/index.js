import  React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { getUser } from '../../store.js'
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
    //alert(JSON.stringify(props));
    const { navigation } = props;
    const userDetails  = getUser(props.route.params);
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
    return (
        <View style = { styles.container }>
            <Text style = {styles.title}>Profile Details</Text>
            <View style = { styles.info }>
                <Text style = {styles.label}>Name</Text>
                <Text>{ userDetails.name || "" }</Text>
                <Text style = {styles.label}>Email</Text>
                <Text>{ userDetails.email || "" }</Text>
                <Text style = {styles.label}>Degree</Text>
                <Text>{ userDetails.degree || "" }</Text>
                <Text style = {styles.label}>Major</Text>
                <Text>{ userDetails.major || "" }</Text>
                <Text style = {styles.label}>Skills</Text>
                <Text>{ userDetails.skills || "" }</Text>
                <Text style = {styles.label}>Interests</Text>
                <Text>{ userDetails.interests || "" }</Text>
            </View>
            <TouchableOpacity style = { styles.button } onPress = { logout }>
                <Text style = { styles.buttonText }>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
};

export default function HomeScreen( props ) {
    const { email } = props.route.params ;
    // alert(email);
    // alert(JSON.stringify(props));
    return (
        <Tab.Navigator>
            <Tab.Screen name = "Home" component = { Home } />
            <Tab.Screen name = "Profile" component = { Profile } initialParams = {{email: email}}/>
        </Tab.Navigator>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        color: '#F5F5F5',
        opacity: 100,
        alignItems: 'stretch',
        padding: 15,
        marginTop: 30,
        justifyContent: 'center',
    },
    info: {
        backgroundColor: '#F5F5F5',
        color: '#F5F5F5',
        opacity: 100,
        alignItems: 'stretch',
        padding: 15,
        //marginTop: 30
    },
    login: {
        backgroundColor: '#F5F5F5',
        opacity: 100,
        alignItems: 'stretch',
        padding: 15,
        justifyContent: 'center',
        alignContent: 'center'
    },
    name: {
        fontFamily: 'serif',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 25,
        color: '#B3A369',
        fontWeight: '700'
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        fontSize: 25,
        margin: 15,
        color: '#B3A369',
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#B3A369',
        height: 40,
        justifyContent: "center",
        margin: 20,
        marginVertical: 10,
        bottom: 0
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#B3A369',
        paddingVertical: 10
    },
    inputs: {
        marginBottom: 15,
        borderRadius: 15,
        backgroundColor: '#B3A36975',
        padding: 10,
        paddingLeft: 20,
        height: 40
    },
    selector: {
        margin: 10,
        flexDirection: 'column',
        position: 'relative',
        bottom: -250,
        alignItems: 'stretch',
    },
});
