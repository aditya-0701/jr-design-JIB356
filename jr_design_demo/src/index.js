import  React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import NewProfile from './screens/NewProfile'
import HomeScreen from './screens/HomeScreen'

const Stack = createStackNavigator();

export default function App ( props ) {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions = {{headerShown: false}} >
                <Stack.Screen name = "Login" component = { Login } />
                <Stack.Screen name="NewProfile" component={ NewProfile } />
                <Stack.Screen name="HomeScreen" component={ HomeScreen } />
            </Stack.Navigator>
        </NavigationContainer>
    )
};