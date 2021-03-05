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

const projectDetails = {
  name: "",
  description: "",
  skills: "",
  hoursPerWeek: "",
  externalLink: ""
};



export const BasicDetails = ({ navigation }) => {

  const [name, onChangeName] = React.useState('');
  const [description, onChangeDescription] = React.useState('');
  const [skills, onChangeSkills] = React.useState('');
  const [hoursPerWeek, onChangeHours] = React.useState('');
  const [externalLink, onChangeExternalLink] = React.useState('');

  const saveVals = () => {
    projectDetails.name = name;
    projectDetails.description = description;
    projectDetails.skills = skills;
    projectDetails.hoursPerWeek = hoursPerWeek;
    projectDetails.externalLink = externalLink;
    navigation.navigate("Page2");
  }
  return (
    <View style={styles.container} >
    <ScrollView /* contentContainerStyle={ styles.container } */>
      <KeyboardAvoidingView>
        <Text style={styles.title}>Basic Project Details</Text>
        <Text style={styles.label}>Project Name</Text>
        <TextInput
            placeholder="Name"
            style={styles.inputs}
            value = { name }
            onChangeText = { (text) => onChangeName(text)}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
            multiline = { true }
            onChangeText = { (text) => onChangeDescription(text)}
            value = { description }
            placeholder = 'Description of project'
            style = {styles.inputs}
        />
        <Text style={styles.label}>What Skills Would Be Useful for Your Project?</Text>
        <TextInput
            placeholder="Dropdown placeholder"
            style={styles.inputs}
            value = { skills }
            onChangeText = { (text) => onChangeSkills(text)}
        />
        <Text style={styles.label}>How many Hours per week are expected?</Text>
        <TextInput
            placeholder="--"
            style={styles.inputs}
            value={hoursPerWeek}
            onChangeText = { (text) => onChangeHours(text) }
            keyboardType = "decimal-pad"
            maxLength= {4}
        />
      </KeyboardAvoidingView>
    </ScrollView>
      <View style={ style.navButtonContainer }>
        <NiceButton title="Exit" onPress={() => navigation.goBack()}/>
        <NiceButton title="Picture and External Link" onPress={ saveVals }/>
      </View>
    </View>
  );

};

export const PictureLink = ({ navigation }) => {
  const title = React.useState("Project Picture and External Link");

  return (
    <View id="page2" style={[style.container, {flex: 1}]}>

      <Text style={styles.title}>Project Picture and External Link</Text>
      <Text style={styles.label}>Project Picture</Text>
      <Image source={require("../../../assets/defaultskin.png")} style={{
          width: "80%",
          alignSelf: "center",
          resizeMode: "center",
          flex:0.75
        }}/>
      <TextInput placeholder="File picker placeholder" style={styles.inputs}/>
      <Text style={styles.label}>External Link</Text>
      <TextInput placeholder="Link to external site (Optional)" style={styles.inputs}/>

      <View style={[style.navButtonContainer, {flex: 1}]}>
        <NiceButton title="Basic Info" onPress={() => navigation.navigate("Page1")}/>
        <NiceButton title="Finish" onPress={() => 0}/>
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

export default function NewProject( props ) {
  return (
    <Stack.Navigator screenOptions = {{headerShown: false}} initialRouteName="Page1">
      <Stack.Screen name="Page1" component={BasicDetails} />
      <Stack.Screen name="Page2" component={PictureLink} />
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
