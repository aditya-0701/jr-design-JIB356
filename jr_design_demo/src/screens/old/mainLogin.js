import  React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../globalStyles';

export default function MainLogin( props ) {
    const alumniLogin = function() {
        props.navigation.navigate('AlumniLogin');
    }

    const studentLogin = function() {
        props.navigation.navigate('StudentLogin');
    }

    return (
        <View style = {styles.container} >
            <View >
                <Text style = {styles.title} >
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
}
