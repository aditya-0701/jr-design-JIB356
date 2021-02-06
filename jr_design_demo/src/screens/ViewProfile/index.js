import * as React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class NiceButton extends React.Component {
  constructor(props) {super(props);}
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const userDetails = {
    email: "aditya.sudarshan@gatech.edu",
    pass: "password",
    name: 'Aditya Sudarshan',
    major: 'Computer Science',
    skills: 'Porgamming',
    degree: 'B.S',
    interests: 'Sports, Gaming, Programming'
};

export const ProjectSelector = ({ navigation }) => {
  const title = React.useState("Project Selector");

  return (
    <View id="page1" style={[style.container, {flex: 1}]}>

      <Image source={require("../../../assets/defaultskin.png")} style={{
          width: "100%",
          alignSelf: "center",
          resizeMode: "center",
          flex:0.75
        }}/>
      <Text style={styles.title}>{userDetails.name}</Text>
      <Text style={styles.label}>{userDetails.major}</Text>
      <View style={[style.navButtonContainer, {flex: 1}]}>
        <NiceButton title="Previous" onPress={() => 0}/>
        <NiceButton title="See Profile" onPress={() => navigation.navigate("Page2")}/>
        <NiceButton title="Next" onPress={() => 0}/>
      </View>
    </View>
  );
};

export const ProjectExtended = ({ navigation }) => {
  const title = React.useState("Project Selector");

  return (
    <View id="page2" style={[style.container, {flex: 1}]}>

      <Image source={require("../../../assets/defaultskin.png")} style={{
          width: "100%",
          alignSelf: "center",
          resizeMode: "center",
          flex:0.75
        }}/>
      <Text style={styles.title}>{userDetails.name}</Text>
      <Text style={styles.label}>{userDetails.major}</Text>
      <Text style={styles.label}>Skills: {userDetails.skills}</Text>
      <Text style={styles.label}>Degree: {userDetails.degree}</Text>
      <Text style={styles.label}>Interests: {userDetails.interests}</Text>
    </View>
  );
};

const Stack = createStackNavigator();

export default function ViewProfile( props ) {
  return (  
    <Stack.Navigator screenOptions = {{headerShown: false}} initialRouteName="Page1">
      <Stack.Screen name="Page1" component={ProfileSelector} />
      <Stack.Screen name="Page2" component={ProfileExtended} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        color: '#F5F5F5',
        opacity: 100,
        alignItems: 'stretch',
        padding: 15,
        marginTop: 30,
        justifyContent: 'center',
        flex: 1
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
        fontFamily: 'serif',
        justifyContent: 'center',
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
        marginVertical: 15,
        color: '#B3A369',
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#B3A369',
        height: 40,
        width: '45%',
        justifyContent: "center",
        margin: 20,
        marginVertical: 10,
        //paddingHorizontal: 10,
        textAlign: 'center'
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
});

const style = StyleSheet.create({//File-specific
  navButtonContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: 'center',
    //width: "100%",
    backgroundColor: '#F5F5F5',
    flexDirection: "row",
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 5,
    marginTop: 5
  },
  container: {
      backgroundColor: '#F5F5F5',
      color: '#F5F5F5',
      //opacity: 100,
      padding: 15,
      marginTop: 30,
      flex: 1
  }
});