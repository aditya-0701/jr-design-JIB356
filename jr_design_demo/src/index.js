import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import NewProfile from './screens/NewProfile'
import NewProject from './screens/NewProject'
import HomeScreen from './screens/HomeScreen'
import ViewProfile from './screens/ViewProfile'
import ViewProject from './screens/ViewProject'
import SavedProjects from './screens/SavedProjects'
import SearchProject from './screens/SearchProject'
import SearchProfile from './screens/SearchProfile';

const Stack = createStackNavigator();

export default function App(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="NewProfile" component={NewProfile} />
                <Stack.Screen name="NewProject" component={NewProject} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="ViewProject" component={ViewProject} />
                <Stack.Screen name="ViewProfile" component={ViewProfile} />
                <Stack.Screen name="SavedProjects" component={SavedProjects} />
                <Stack.Screen name="SearchProject" component={SearchProject} />
                <Stack.Screen name="SearchProfile" component={SearchProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};
