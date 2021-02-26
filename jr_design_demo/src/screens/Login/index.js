import  React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { userExists, addUser, getUser } from '../../store.js'
import styles from '../../globalStyles';
//import MainLogin from './mainLogin.js';
// import AlumniLogin from './alumniLogin.js';
// import StudentLogin from './studentLogin.js';

const Stack = createStackNavigator();

export const MainLogin = ( props ) => {

    const { navigation } = props
    const alumniLogin = function() {
        navigation.navigate('AlumniLogin');
    }

    const studentLogin = function() {
        navigation.navigate('StudentLogin');
    }

    return (
        <View style = {styles.container} >
            <View >
                <Text style = {styles.name} >
                    CoC Student Alumni Project Matching Application
                </Text>
            </View>
            <View style = {styles.selector} >
                <TouchableOpacity style = {styles.button} onPress = { studentLogin } >
                    <Text style = {styles.buttonText} >Student Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress = { alumniLogin } >
                    <Text style = {styles.buttonText} >Alumni Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const LoginPage = ( props ) => {
    //alert("HEELO" + JSON.stringify(props));
    const { navigation } = props;
    const [emailValue, onChangeEmail] = React.useState('');
    const [passwordValue, onChangePassword] = React.useState('');
    const [errorValue, onChangeError] = React.useState('');

    const login = () => {
        if (userExists( { email: emailValue, pass: passwordValue } )) {
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'HomeScreen',
                        params: { email: emailValue },
                    }
                ],
            });
            // onChangeError('Logging In');
        } else {
            //alert(JSON.stringify(getUser( { email: emailValue, pass: passwordValue } )))
            onChangeError('Incorrect email or password');
        }
    }

    const setupProfile = () => {
        navigation.navigate('NewProfile');
    }
    return (
        <View>
            <KeyboardAvoidingView style = {styles.login} >
                <TextInput
                    autoCapitalize = "none"
                    autoCompleteType = 'email'
                    keyboardType = 'email-address'
                    onChangeText = { (text) => onChangeEmail(text)}
                    value = { emailValue }
                    placeholder = 'EMAIL'
                    style = {styles.inputs}
                />
                <TextInput
                    autoCapitalize = "none"
                    autoCompleteType = 'password'
                    secureTextEntry = { true }
                    onChangeText = { (text) => onChangePassword(text)}
                    value = { passwordValue }
                    placeholder = 'PASSWORD'
                    style = {styles.inputs}
                />
                <Text style = { styles.error } >{ errorValue }</Text>
                <TouchableOpacity style = {styles.button} onPress = { () => login() }>
                    <Text style = {styles.buttonText} >Log In</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style = { { justifyContent: 'center', margin: 15, flexDirection: 'row' } }>
                <Text>Not a member? </Text>
                <TouchableOpacity onPress = { () => { setupProfile() } } >
                    <Text style = { { color: '#B3A369', fontWeight: 'bold' } }>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const StudentLogin = ( props ) => {
    return (
        <ScrollView contentContainerStyle={ styles.container }>
            <Text style = {styles.title} >
                Student Login
            </Text>
            <LoginPage navigation = { props.navigation }/>
        </ScrollView>
    )
};

export const AlumniLogin = ( props ) => {
    return (
        <ScrollView contentContainerStyle={ styles.container }>
            <Text style = {styles.title} >
                Alumni Login
            </Text>
            <LoginPage navigation = { props.navigation }/>
        </ScrollView>
    )
};

export default function Login( props ) {
    return (
        <Stack.Navigator screenOptions = {{headerShown: false}} >
            <Stack.Screen name = "MainLogin" component = { MainLogin } />
            <Stack.Screen name = "AlumniLogin" component = { AlumniLogin } />
            <Stack.Screen name = "StudentLogin" component = { StudentLogin } />
        </Stack.Navigator>
    )
}
