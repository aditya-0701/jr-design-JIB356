import  React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity } from 'react-native';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        opacity: 100,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    selector: {
        margin: 10,
        flexDirection: 'column',
        position: 'relative',
        bottom: -250,
        alignItems: 'stretch',
    },
    imgCont: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    title: {
        fontFamily: 'serif',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 25,
        color: '#B3A369',
        fontWeight: '700'
    },
    inp: {
        height: 40,
        //backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    textColor: {
      backgroundColor: 'rgba(255,255,255,0.8)',
      height: 40,
      marginBottom: 20
    },
    name: {
        textAlign: 'center',
        fontWeight: "700",
        fontSize: 20,
        color: '#FFFF'
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
        fontSize: 15,
        color: 'white',
        margin: 5
    }
})