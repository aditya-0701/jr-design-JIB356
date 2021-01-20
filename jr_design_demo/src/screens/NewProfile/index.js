import * as React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { addUser } from '../../store'

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
  email: "",
  pass: "",
  name: "",
  degree: "",
  major: "",
  interests: "",
  skills: "",
};



export const BasicDetails = ({ navigation }) => {
  
  const [emailValue, onChangeEmail] = React.useState('');
  const [passwordValue, onChangePassword] = React.useState('');
  const [name, onChangeName] = React.useState('');
  const [degree, onChangeDegree] = React.useState('');
  const [major, onChangeMajor] = React.useState('');
  const [interests, onChangeInterests] = React.useState('');
  const [skills, onChangeSkills] = React.useState('');

  const saveVals = () => {
    userDetails.email= emailValue;
    userDetails.pass = passwordValue;
    userDetails.name= name;
    userDetails.degree= degree;
    userDetails.major= major;
    userDetails.interests= interests,
    userDetails.skills= skills;
    navigation.navigate("Page2");
  }

  return (
    <View style={styles.container} >
      <ScrollView /* contentContainerStyle={ styles.container } */>
        <KeyboardAvoidingView>
          <Text style={styles.title}>Initial Profile Setup</Text>
          <Text style={styles.label}>Name</Text>
          <TextInput 
            placeholder="Name"
            style={styles.inputs}
            value = { name } 
            onChangeText = { (text) => onChangeName(text)}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput 
                      autoCapitalize = "none"
                      autoCompleteType = 'email'
                      keyboardType = 'email-address'
                      onChangeText = { (text) => onChangeEmail(text)}
                      value = { emailValue } 
                      placeholder = 'EMAIL'
                      style = {styles.inputs}
                  />

          <Text style={styles.label}>Password</Text>
          <TextInput 
                      autoCapitalize = "none"
                      autoCompleteType = 'password'
                      secureTextEntry = { true }
                      onChangeText = { (text) => onChangePassword(text)}
                      value = { passwordValue } 
                      placeholder = 'PASSWORD'
                      style = {styles.inputs}
                  />

          <Text style={styles.label}>Degree</Text>
          <TextInput 
            placeholder="Dropdown placeholder"
            style={styles.inputs}
            value = { degree } 
            onChangeText = { (text) => onChangeDegree(text)}
          />

          <Text style={styles.label}>Major</Text>
          <TextInput 
            placeholder="Dropdown placeholder"
            style={styles.inputs}
            value = { major } 
            onChangeText = { (text) => onChangeMajor(text)}
          />

          <Text style={styles.label}>Areas of Interest</Text>
          <TextInput 
            placeholder="Dropdown placeholder"
            style={styles.inputs}
            value = { interests } 
            onChangeText = { (text) => onChangeInterests(text)}
          />

          <Text style={styles.label}>Skills</Text>
          <TextInput 
            placeholder="Dropdown placeholder"
            style={styles.inputs}
            value = { skills } 
            onChangeText = { (text) => onChangeSkills(text)}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={ style.navButtonContainer }>
        <NiceButton title="Exit" onPress={() => navigation.goBack()}/>
        <NiceButton title="Picture and Resume" onPress={ saveVals }/>
      </View>
    </View>
  );
};

export const PictureResume = ({ navigation }) => {
  const title = React.useState("Profile Picture and Resume");

  return (
    <View id="page2" style={[style.container, {flex: 1}]}>
      
      <Text style={styles.title}>Profile Picture and Resume</Text>
      <Text style={styles.label}>Profile Picture</Text>
      <Image source={require("../../../assets/defaultskin.png")} style={{
          width: "80%",
          alignSelf: "center",
          resizeMode: "center",
          flex:0.75
        }}/>
      <TextInput placeholder="File picker placeholder" style={styles.inputs}/>
      <Text style={styles.label}>Resume</Text>
      <TextInput placeholder="File picker placeholder" style={styles.inputs}/>
      
      <View style={[style.navButtonContainer, {flex: 1}]}>
        <NiceButton title="Basic Info" onPress={() => navigation.navigate("Page1")}/>
        <NiceButton title="Work Experience" onPress={() => navigation.navigate("Page3")}/>
      </View>
    </View>
  );
};

export const PrevExperience = ({ navigation }) => {
  const title = React.useState("Previous Experience");

  return (
    <View id="page3" style = {style.container} >
      <Text style={styles.title}>Previous Experience</Text>
      <Text style={styles.label}>Company</Text>
      <TextInput placeholder="Company/Organization name" style={styles.inputs}/>
      <Text style={styles.label}>Position</Text>
      <TextInput placeholder="Position held" style={styles.inputs}/>
      <View style={ {textAlign: 'stretch', flexDirection: "row",alignItems: 'stretch',justifyContent: 'center'}}>
        <Text style={[styles.label, {marginHorizontal: 20, width: '45%'}]}>Start Date</Text>
        <Text style={[styles.label, {marginHorizontal: 20, width: '45%'}]}>End Date</Text>
      </View>
      <View style={ {textAlign: 'center', flexDirection: "row",alignItems: 'stretch',justifyContent: 'center' }}>
        <TextInput placeholder="Start Date" style={[styles.inputs, {marginHorizontal: 20, width: '45%'}]}/>
        <TextInput placeholder="End Date" style={[styles.inputs, {marginHorizontal: 20, width: '45%'}]}/>
      </View>
      <Text style={styles.label}>Description</Text>
      <TextInput multiline={true} placeholder="Describe your experience..." style={[styles.inputs, {height: 100, textAlignVertical: 'top'}]}/>
      <TouchableOpacity style = { [styles.button, {alignSelf: 'center', width: '100%'} ] }>
        <Text style = { styles.buttonText }>Add Experience</Text>
      </TouchableOpacity>
      <View style={style.navButtonContainer} >
        <NiceButton title="Picture and Resume" onPress={() => navigation.navigate("Page2")}/>
        <NiceButton title="External Services" onPress={() => navigation.navigate("Page4")}/>
      </View>
    </View>
  );
};

export const ExtSites = ({ navigation }) => {
  const title = React.useState("Links to External Services");
  const login = () => {  
      addUser(userDetails);
      navigation.reset({
          index: 0,
          routes: [
              { 
                  name: 'HomeScreen',
                  params: {email: userDetails.email }
              }
          ],
      });
  }

  return (
    <View style={style.container}>
      <Text style={[styles.title, {marginTop: "6%"}]}>Links to External Services</Text>

        <Text style={styles.label}>LinkedIn</Text>
        <TextInput placeholder="LinkedIn Link" style={styles.inputs}/>
        <Text style={styles.label}>Github</Text>
        <TextInput placeholder="Github Link" style={styles.inputs}/>
        <Text style={styles.label}>Add other Links</Text>
        <Text style={styles.label}>Link Name</Text>
        <TextInput placeholder="Additional External Link" style={styles.inputs}/>
        <TouchableOpacity style = { [styles.button, {alignSelf: 'center', width: '100%'} ] }>
        <Text style = { styles.buttonText }>Add Link</Text>
      </TouchableOpacity>
        <View style={ style.navButtonContainer }>
          <NiceButton title="Previous Experience" onPress={() => navigation.navigate("Page3")}/>
          <NiceButton title="Finish" onPress={ login }/>
        </View>
    </View>
  );
};

const Stack = createStackNavigator();

export default function NewProfile( props ) {
  return (  
    <Stack.Navigator screenOptions = {{headerShown: false}} initialRouteName="Page1">
      <Stack.Screen name="Page1" component={BasicDetails} />
      <Stack.Screen name="Page2" component={PictureResume} />
      <Stack.Screen name="Page3" component={PrevExperience} />
      <Stack.Screen name="Page4" component={ExtSites} />
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

//export default ProfileSetup;
