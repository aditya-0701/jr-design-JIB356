import  React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { getUser } from '../../store.js'
import styles from '../../globalStyles';
//import MainLogin from './mainLogin.js';
// import AlumniLogin from './alumniLogin.js';
// import StudentLogin from './studentLogin.js';

const Tab = new createBottomTabNavigator();

const Home = ( props ) => {
  const { navigation } = props;
  const createNewProject = () => {
    navigation.navigate("NewProject");
  }

    return (
        <View style = { [styles.container, {alignItems: 'center'}] }>
            <Text style = {styles.title} >Welcome!</Text>
            <TouchableOpacity style={styles.button} onPress={ createNewProject }>
              <Text style={styles.buttonText}>Create Project</Text>
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
