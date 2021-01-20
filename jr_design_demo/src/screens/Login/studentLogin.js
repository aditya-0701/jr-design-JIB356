import  React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function StudentLogin( props ) {
    const [emailValue, onChangeEmail] = React.useState('')
    const [passwordValue, onChangePassword] = React.useState('')
    const test = (val) => {
        alert(`${emailValue} ${passwordValue}`);
    }
    return (
        <View style = {styles.container} >
            <Text style = {styles.title} >
                Student Login
            </Text>
            <View style = {styles.login} >
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
                <TouchableOpacity style = {styles.button} onPress = { () => { test(emailValue) } } >
                    <Text style = {styles.buttonText} >Log In</Text>
                </TouchableOpacity>
            </View>
            <View style = { { justifyContent: 'center', margin: 15, flexDirection: 'row' } }>
                <Text>Not a member? </Text>
                <TouchableOpacity>
                    <Text style = { { color: '#B3A369', fontWeight: 'bold' } }>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    }
})