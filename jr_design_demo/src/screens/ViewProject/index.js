import * as React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render } from 'react-dom';

class NiceButton extends React.Component {
  constructor(props) { super(props); }
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const projectDetails = [
  {
    name: "Example Project",
    description: "dfskj  sdjfl kldsf klj sd klsd jklfjkls df! dfskj lkjfsd kjf d!"
      + " dsfklj kldjs flkj sdfjks dflkjs fd! kljdsf kljdfs jklf sdjk!"
      + " Is this example long enough?",
    skills: "Programming",
    hoursPerWeek: "10",
    externalLink: "https://www.google.com"
  },
  {
    name: "Example Project 2",
    description: "dka;ldksngadgsn;sadgks",
    skills: "html, css",
    hoursPerWeek: "5",
    externalLink: "bing.com"

  }
]

var i = 0;

function increaseI() {
  if (i > projectDetails.length - 2) {
    i = 0;
  } else {
    i++;
  }
}

function decreaseI() {
  if (i < 1) {
    i = projectDetails.length - 1;
  } else {
    i--;
  }
}

function projectView() {
  return (
    <View id="page1" style={[style.container, { flex: 1 }]}>

      <Image source={require("../../../assets/defaultskin.png")} style={{
        width: "100%",
        alignSelf: "center",
        resizeMode: "center",
        flex: 0.75
      }} />
      <Text style={styles.title}>{projectDetails[i].name}</Text>
      <Text style={styles.label}>{projectDetails[i].description}</Text>
      <View style={[style.navButtonContainer, { flex: 1 }]}>
        <NiceButton title="Previous" onPress={() => { decreaseI(); navigation.navigate("Page1") }} />
        <NiceButton title="See Project" onPress={() => navigation.navigate("Page2")} />
        <NiceButton title="Next" onPress={() => { increaseI(); projectView() }} />
      </View>
    </View>
  );
}

export var ProjectSelector = ({ navigation }) => {
  const title = React.useState("Project Selector");
  return (
    <View id="page1" style={[style.container, { flex: 1 }]}>

      <Image source={require("../../../assets/defaultskin.png")} style={{
        width: "100%",
        alignSelf: "center",
        resizeMode: "center",
        flex: 0.75
      }} />
      <Text style={styles.title}>{projectDetails[i].name}</Text>
      <Text style={styles.label}>{projectDetails[i].description}</Text>
      <View style={[style.navButtonContainer, { flex: 1 }]}>
        <NiceButton title="Previous" onPress={() => { decreaseI(); navigation.push("Page1") }} />
        <NiceButton title="See Project" onPress={() => navigation.push("Page2")} />
        <NiceButton title="Next" onPress={() => { increaseI(); navigation.push("Page1") }} />
      </View>
    </View>
  );
};



export const ProjectExtended = ({ navigation }) => {
  const title = React.useState("Project Selector");
  return (
    <View id="page2" style={[style.container, { flex: 1 }]}>

      <Image source={require("../../../assets/defaultskin.png")} style={{
        width: "100%",
        alignSelf: "center",
        resizeMode: "center",
        flex: 0.75
      }} />
      <Text style={styles.title}>{projectDetails[i].name}</Text>
      <Text style={styles.label}>{projectDetails[i].description}</Text>
      <Text style={styles.label}>Skills: {projectDetails[i].skills}</Text>
      <Text style={styles.label}>Hours Per Week: {projectDetails[i].hoursPerWeek}</Text>
      <Text style={styles.label}>Link: {projectDetails[i].externalLink}</Text>
    </View>
  );
};

const Stack = createStackNavigator();


export default function ViewProject(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Page1">
      <Stack.Screen name="Page1" component={ProjectSelector} />
      <Stack.Screen name="Page2" component={ProjectExtended} />
      {/* <Stack.Screen name="Page3" component={PageFix} /> */}
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
    width: '25%',
    justifyContent: "center",
    margin: 20,
    marginVertical: 10,
    //paddingHorizontal: 10,
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 12,
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