// import * as React from 'react';
import React from 'react';
import { ImageBackground, View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView, Dimensions, Animated, PanResponder } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import likedProjects from './ViewProject/index.js'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export class savedProjects extends React.Component {
    constructor() {
        super()
        return (
            <View style={{ flex: 1 }}>
                <Text>Hello World</Text>


                {/* <ImageBackground
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderWidth: 3, borderColor: 'rgba(179, 163, 105, 1)', borderRadius: 20, overflow: 'hidden' }}
              imageStyle={{ borderRadius: 17 }}
              source={item.uri} >
              <Text style={styles.text}> {item.name} {'\n'} {item.description} {'\n'} {item.hoursPerWeek} {'\n'} {item.externalLink}</Text>
            </ImageBackground> */}
            </View>
        )
    }
}

const Stack = createStackNavigator();


export default function SavedProjects(props) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="Page1">
            <Stack.Screen name="Page1" component={savedProjects} />
            {/* <Stack.Screen name="Page2" component={ProjectExtended} /> */}
            {/* <Stack.Screen name="Page3" component={PageFix} /> already prev commented out */}
        </Stack.Navigator>
    );
};