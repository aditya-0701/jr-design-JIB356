import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity } from 'react-native';

const users = [
    {
        email: "aditya.sudarshan@gatech.edu",
        pass: "password",
        name: 'Aditya Sudarshan',
        major: 'Computer Science',
        skills: 'Porgamming',
        degree: 'B.S',
        interests: 'Sports, Gaming, Programming'
    },
    {
        email: "sam.sanders@gatech.edu",
        pass: "password",
        name: 'Sam Sanders',
        interests: 'Sports, Music',
        major: 'Computer Science',
        skills: 'Porgamming',
        degree: 'B.S',
    },
    {
        email: "a",
        pass: "a",
        name: 'a',
        interests: 'Sports, Music',
        major: 'Computer Science',
        skills: 'Porgamming',
        degree: 'B.S',
    }
]

export function userExists(props) {
    let exists = false;
    const { email, pass } = props;
    users.forEach((user) => {
        if (email.toLowerCase() === user.email && pass === user.pass) {
            console.log(email);
            exists = true;
        }
    })
    return exists;
}

export function addUser(props) {
    const {
        email,
        pass,
        name,
        major,
        skills,
        degree,
        interests } = props;
    if (!userExists({ email, pass })) {
        users.push({
            email: email,
            pass: pass,
            name: name,
            major: major,
            skills: skills,
            degree: degree,
            interests: interests,
        });
        return true;
    }
    return false;
};

export function getUser(props) {
    let rtrUser = null;
    const { email } = props;
    users.forEach((user) => {
        if (email.toLowerCase() === user.email) {
            //console.log(email);
            rtrUser = user;
        }
    })
    return rtrUser;
}
