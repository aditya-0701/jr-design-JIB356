import  React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../../globalStyles';

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
