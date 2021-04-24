import * as React from 'react';
import { View, ScrollView, Text, Dimensions, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../../globalStyles';
import { getAlumniSavedStudents, deleteAlumniSavedStudents, getStudent } from "../../store";


const loadingSaved = { type: "profile", entries: [] };
let needToLoad = true;
var gtUname = '';
var username = '';
var projId = 0;

var profiles = [{
  id: "1",
  email: "asudarshan30@gatech.edu",
  gtUsername: "asudarshan30",
  firstName: "Aditya",
  lastName: "Sudarshan",
  middleName: "",
  bio: "I am a 3rd year CS major",
  degree: "B.S.",
  major: "Computer Science",
  skills: "Programming",
  start_date: "May 10, 2021",
  end_date: "August 1, 2021",
  experiences: [{
    'companyName': 'Microsoft',
    'position': 'Software Engineer',
    'expDescription': 'sdklgna;klgnd',
    'start_date': new Date(),
    'end_date': new Date()
  }],
  uri: require('../../../assets/defaultskin.png')
},
{
  id: "2",
  email: "aharris322@gatech.edu",
  gtUsername: "aharris322",
  firstName: "Andrew",
  lastName: "Harris",
  middleName: "",
  bio: "I am a 2nd yr cs major",
  degree: "B.S.",
  major: "Computer Science",
  skills: "Programming",
  start_date: "May 5, 2021",
  end_date: "August 10, 2021",
  experiences: [{
    'companyName': 'Google',
    'position': 'Software Engineer',
    'expDescription': 'sdklgna;klgnd',
    'start_date': new Date(),
    'end_date': new Date()
  }],
  uri: require('../../../assets/defaultskin.png')
}]


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

class SavedItem extends React.Component {
  constructor(props) { super(props); }



  render() {
    return (
      <TouchableOpacity style={localStyle.savedItem} onPress={this.detailScreen}>
        <Text style={localStyle.savedTextTitle}>{this.props.item.name}{"\n"}</Text>
        <Text style={[localStyle.savedText]}>{this.props.item.detail1}</Text>
      </TouchableOpacity>
    );
  }
}

//get the relevant info from the database return
function getProfileDetails(storedData) {
  let result = { type: "project", entries: [] };
  for (let i = 0; i < storedData.length; i++) {
    result.entries.push({ name: storedData[i].firstName + " " + storedData[i].lastName, detail1: storedData[i].email, id: storedData[i].gtUsername });
  }

  return result;
}

export const SaveContainer = ({ navigation, route }) => {
  //const saved = getSaved("profile");
  const [projectDetails, setProjectDetails] = React.useState(loadingSaved);
  const detailScreen = (ind) => {
    //   console.log( projectDetails[ind])
    console.log(ind);
    projId = ind;
    navigation.navigate("DetailsScreen")
  }
  
  React.useEffect(() => {
    getAlumniSavedStudents( {'username': username})
    .then(
      (data) => {
        console.log(data.body);
        setProjectDetails(getProfileDetails(data.body));
      }
    ).catch(
      (err) => { console.log(err); }
    );
  }, [])
  
  let i = 0;

  const refresh = () => {
    getAlumniSavedStudents( {'username': username})
    .then(
      (data) => {
        console.log(data.body);
        setProjectDetails(getProfileDetails(data.body));
      }
    ).catch(
      (err) => { console.log(err); }
    );
  }

  return (
    <View style={styles.container} >
      <ScrollView /* contentContainerStyle={ styles.container } */>
        {(projectDetails.entries.length <= 0) ?
          <Text style={{color: 'black'}}> No Projects Found</Text> : 
          projectDetails.entries.map((item, index) => (
            <View key={index}>
              <TouchableOpacity style={localStyle.savedItem} onPress={() => { console.log(item); detailScreen(item.id); }}>
                <Text style={localStyle.savedTextTitle}>{item.name}</Text>
                <Text numberOfLines={2} style={[localStyle.savedText, { marginTop: 10 }]}>{item.detail1}</Text>
              </TouchableOpacity>
            </View>
          ))
      }
      </ScrollView>
      <View style={localStyle.navButtonContainer}>
        <NiceButton title="Refresh" onPress={() => {
          refresh();
        }} />
        <NiceButton title="Exit" onPress={() => {
          needToLoad = true;
          navigation.goBack();
        }} />
      </View>
    </View>
  );
};


class DetailsScreen extends React.Component {

  constructor() {
    super()

    this.state = {
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        skills: [],
        major: [],
        interests: [],
        degree: [],
        links: [],
        experiences: [{
          "companyName": "",
          "position": "",
          "expDescription": "",
          "start_date": "",
          "end_date": ""
        }]
      }
    }
  }

  componentDidMount() {
    //   var proj = projectDetails[x];
    //   console.log("TEST");
    //   console.log(proj.id);
    //   var projId = proj.id;
    getStudent({ gtUsername: projId })
      .then((resp) => {
        let body = resp.body;
        console.log(body);
        this.setState({ profile: body })
      })
      .catch((err) => console.log(err))

  }

  deleteSaved() {
    deleteAlumniSavedStudents({
      'username': username,
      'gtUsername': this.state.profile.gtUsername
    })
      .then((resp) => {
        console.log(resp.body)
        this.props.navigation.goBack();
      })
      .catch((err) => { console.log(err) })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.info}>
            <Text style={styles.label}>Name</Text>
            <Text>{ this.state.profile.firstName || "" } {this.state.profile.lastName || ""}</Text>
            <Text style={styles.label}>Email</Text>
            <Text 
                onPress = {() => Linking.openURL('mailto:'+ this.state.profile.email)}
                style = {{color: '#0000EE', fontWeight: 'bold'}}
            >
                { this.state.profile.email || "" }
            </Text>
            <Text style = {styles.label}>Degree</Text>
            <Text>{ this.state.profile.degree.map(({ degree }) => degree).join(', ') || "" }</Text>
            <Text style = {styles.label}>Major</Text>
            <Text>{ this.state.profile.major.map(({ major }) => major).join(', ') || "" }</Text>
            <Text style = {styles.label}>Skills</Text>
            <Text>{ this.state.profile.skills.map(({ skill }) => skill).join(', ') || "" }</Text>
            <Text style = {styles.label}>Interests</Text>
            <Text>{ this.state.profile.interests.map(({ interest }) => interest).join(', ') || "" }</Text>
            <Text style = {styles.label}>Experiences</Text>
            {this.state.profile.experiences.map((element, index) => {
                return (<View key = {index}>
                    <Text style={[styles.label, { fontSize: 18, fontStyle: 'italic' }]}>Company</Text>
                    <Text style={{ color: 'black' }}>{element.companyName || "not found"}</Text>
                    <Text style={[styles.label, { fontSize: 18, fontStyle: 'italic' }]}>Position</Text>
                    <Text style={{ color: 'black' }}>{element.position || "not found"}</Text>
                    <View style={{ textAlign: 'stretch', flexDirection: "row",alignItems: 'stretch',justifyContent: 'center' }}>
                        <Text style={[styles.label,
                        { marginHorizontal: 20, width: '45%' }, 
                        { fontSize: 18, fontStyle: 'italic' }]}>Start Date</Text>
                        <Text style={[styles.label,
                        { marginHorizontal: 20, width: '45%' },
                        { fontSize: 18, fontStyle: 'italic' }]}>End Date</Text>
                    </View>
                    <View style={{ textAlign: 'center', flexDirection: "row", alignItems: 'stretch', justifyContent: 'center' }}>
                        {<Text style={{ marginHorizontal: 20, width: '45%' }}>{element.start_date.split('T')[0]}</Text>}
                        {<Text style={{ marginHorizontal: 20, width: '45%' }}>{element.end_date.split('T')[0]}</Text> }
                    </View>
                    <Text style={[styles.label, { fontSize: 18, fontStyle: 'italic' }]}>Description</Text>
                    <Text style={{ color: 'black' }}>{element.expDescription}</Text>
                </View>
            )})}
            <Text style = {styles.label}>External Links</Text>
            {this.state.profile.links.map((element, index) => {
                return (<View key = {index}>
                    <Text style={[styles.label, {fontSize: 18, fontStyle: 'italic'}]}>Link Label</Text>
                    <Text style={{color: 'black'}}>{element.label || "not found"}</Text>
                    <Text style={[styles.label, {fontSize: 18, fontStyle: 'italic'}]}>Link Address</Text>
                    <Text style={{color: 'blue', fontWeight: 'bold'}} onPress = {() => Linking.openURL(element.address)}>
                      {element.address || "not found"}</Text>
                </View>
                )
            })}
            </View>
        </ScrollView>
        <TouchableOpacity
          style={{ backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 10, margin: 20, height: 40, width: '95%', alignSelf: 'center' }}
          onPress={() => this.deleteSaved()}>
          <Text style={{ top: 9, textAlign: 'center', color: 'white', 'fontWeight': 'bold', fontSize: 17 }}> Remove from Saved </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ bottom: 10, backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 10, margin: 20, height: 40, width: '95%', alignSelf: 'center' }}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={{ top: 9, textAlign: 'center', color: 'white', 'fontWeight': 'bold', fontSize: 17 }}> Back </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const Stack = createStackNavigator();

export default function ViewSaved(props) {
  // gtUname = props.route.params.gtUsername;
  username = props.route.params.username;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="View">
      <Stack.Screen name="View" component={SaveContainer} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

const localStyle = StyleSheet.create({//File-specific
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
  savedItem: {
    backgroundColor: "#F5F5F5",
    //backgroundColor: "red",
    height: 80,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    padding: 5,
    margin: 1
  },
  savedTextTitle: {
    color: "#B3A369",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    margin: 2,
    marginBottom: -15
  },
  savedText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    margin: 2
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