import  React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { userExists, addUser, getUser } from '../../store.js'
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        opacity: 100,
        alignItems: 'stretch',
        padding: 15,
        marginTop: 30,
        justifyContent: 'center',
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
        fontFamily: Platform.OS === 'ios' ? 'Palatino-Bold' : 'serif',
        justifyContent: 'center' ,
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
        marginVertical: 10
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
    error: {
        textAlign: 'center',
        color: 'maroon',
        fontWeight: '600',
        marginHorizontal: 20
    }
});
