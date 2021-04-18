import * as React from 'react';
import { View, ScrollView, Text, Dimensions, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../../globalStyles';
import { getStudentProjectInterests, getProject, deleteProjectInterest } from "../../store";


const loadingSaved = { type: "profile", entries: [] };
let needToLoad = true;
var gtUname = '';
var projId = 0;
var sProfiles = 0;
var myP = 0;


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
    result.entries.push({ name: storedData[i].projectTitle, detail1: storedData[i].projectDescription, id: storedData[i].id });
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
    getStudentProjectInterests({ gtUsername: gtUname }).then(
      (data) => {
        console.log(data.body);
        setProjectDetails(getProfileDetails(data.body));
      }
    ).catch(
      (err) => { console.log(err); }
    );
  }, [gtUname]);
  let i = 0;

  const refresh = () => {
    getStudentProjectInterests({ gtUsername: gtUname }).then(
      (data) => {
        console.log(data.body);
        setProjectDetails(getProfileDetails(data.body));
        console.log(projectDetails)
      }
    ).catch(
      (err) => { console.log(err); }
    );
  }

  if (myP == 1) {
    return (
      <View style={styles.container} >
        <ScrollView /* contentContainerStyle={ styles.container } */>
          {projectDetails.entries.map((item, index) => (
            <View key={index}>
              <TouchableOpacity style={localStyle.savedItem} onPress={() => { console.log(item); detailScreen(item.id); }}>
                <Text style={localStyle.savedTextTitle}>{item.name}</Text>
                <Text numberOfLines={2} style={[localStyle.savedText, { marginTop: 10 }]}>{item.detail1}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={localStyle.navButtonContainer}>
          <NiceButton title="Refresh" onPress={() => {
            refresh();
          }} />
          {/* <NiceButton title="Exit" onPress={() => {
            needToLoad = true;
            navigation.goBack();
          }} /> */}
          <NiceButton title="New Project" onPress={() => {
            navigation.navigate("NewProject");
          }} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container} >
        <ScrollView /* contentContainerStyle={ styles.container } */>
          {projectDetails.entries.map((item, index) => (
            <View key={index}>
              <TouchableOpacity style={localStyle.savedItem} onPress={() => { console.log(item); detailScreen(item.id); }}>
                <Text style={localStyle.savedTextTitle}>{item.name}</Text>
                <Text numberOfLines={2} style={[localStyle.savedText, { marginTop: 10 }]}>{item.detail1}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={localStyle.navButtonContainer}>
          <NiceButton title="Refresh" onPress={() => {
            refresh();
          }} />
          {/* <NiceButton title="Exit" onPress={() => {
            needToLoad = true;
            navigation.goBack();
          }} /> */}
        </View>
      </View>
    );
  }
};


class DetailsScreen extends React.Component {

  constructor() {
    super()

    this.state = {
      project: {
        "id": 21,
        "projectTitle": "",
        "projectDescription": "",
        "startDate": "",
        "endDate": "",
        "weekHours": 7,
        "skills": [],
        "interests": [],
        "major": [],
        "degree": [],
        "experiences": [],
        "links": [],
        "alumni": [{
          "email": "test@test.com",
          "name": "",
        }]
      },
      profile: {
        "id": 210,
        "email": "",
        "gtUsername": "",
        "firstName": "",
        "lastName": "",
        "middleName": "",
        "start_date": "",
        "end_date": "",
        "bio": "",
        "degree": [],
        "major": [],
        "skills": [],
        "experiences": [{
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
    getProject({ projId: projId })
      .then((resp) => {
        let body = resp.body;
        console.log(body);
        this.setState({ project: body })
      })
      .catch((err) => console.log(err))

  }

  deleteSaved() {
    deleteProjectInterest({
      'gtUsername': gtUname,
      'projectId': this.state.project.id
    })
      .then((resp) => {
        console.log(resp.body)
      })
      .catch((err) => { console.log(err) })
  }

  editProject() {
    console.log("Implement me!")
    // this should take you to NewProject but it'll need to be implemented with back-end stuff to keep the project's current info as the default value.
    // the front-end portion of the screen is done.
  }

  render() {
    if (sProfiles == 1) {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.detailsPage}>
            <Text style={{ top: 20, textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: 'rgba(179, 163, 105, 1)' }}>{this.state.profile.firstName} {this.state.profile.lastName}</Text>
            <Text style={{ top: 27, textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'rgba(179, 163, 105, 1)' }}> Profile Details </Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>{'\n\n'}Biography:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.profile.bio}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Skills:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.profile.skills.join(', ')}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Majors:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.profile.major.join(', ')}</Text>
  
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Degrees:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.profile.degree.join(', ')}</Text>
  
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Start Date:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.profile.start_date}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>End Date:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.profile.end_date}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>GT Email:</Text>
            <Text
              onPress={() => Linking.openURL('mailto:' + this.state.profile.email)}
              style={[{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' },
              { color: '#0000EE', fontWeight: 'bold' }]}>{this.state.profile.email}</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.profile.email}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>GT Username:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.profile.gtUsername}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Experiences:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.profile.experiences[0].companyName}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}></Text>
            <Text style={{ height: 50 }}></Text>
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
    } else if (myP == 1) {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.detailsPage}>
            <Text style={{ top: 20, textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: 'rgba(179, 163, 105, 1)' }}>{this.state.project.projectTitle}</Text>
            <Text style={{ top: 27, textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'rgba(179, 163, 105, 1)' }}> Project Details </Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>{'\n\n'}Description:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.projectDescription}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Skills:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.skills.join(', ')}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Interests:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.interests.join(', ')}</Text>

            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Majors:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.major.join(', ')}</Text>

            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Degrees:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.degree.join(', ')}</Text>

            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Hours per Week:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.weekHours}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Info Link:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.links.join(', ')}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Project Alumni:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.alumni[0].name}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Project Alumni Email:</Text>
            <Text
              onPress={() => Linking.openURL('mailto:' + this.state.project.alumni[0].email)}
              style={[{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' },
              { color: '#0000EE', fontWeight: 'bold' }]}>
              {this.state.project.alumni[0].email}
            </Text>
            <Text style={{ height: 50 }}></Text>
          </ScrollView>
          <TouchableOpacity
            style={{ backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 10, margin: 20, height: 40, width: '95%', alignSelf: 'center' }}
            onPress={() => this.editProject()}>
            <Text style={{ top: 9, textAlign: 'center', color: 'white', 'fontWeight': 'bold', fontSize: 17 }}> Edit Project </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ bottom: 10, backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 10, margin: 20, height: 40, width: '95%', alignSelf: 'center' }}
            onPress={() => this.props.navigation.goBack()}>
            <Text style={{ top: 9, textAlign: 'center', color: 'white', 'fontWeight': 'bold', fontSize: 17 }}> Back </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.detailsPage}>
            <Text style={{ top: 20, textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: 'rgba(179, 163, 105, 1)' }}>{this.state.project.projectTitle}</Text>
            <Text style={{ top: 27, textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'rgba(179, 163, 105, 1)' }}> Project Details </Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>{'\n\n'}Description:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.projectDescription}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Skills:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.skills.join(', ')}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Interests:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.interests.join(', ')}</Text>

            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Majors:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.major.join(', ')}</Text>

            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Degrees:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.degree.join(', ')}</Text>

            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Hours per Week:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.weekHours}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Info Link:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.links.join(', ')}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Project Alumni:</Text>
            <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.alumni[0].name}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#B3A369',
              paddingLeft: 15,
            }}>Project Alumni Email:</Text>
            <Text
              onPress={() => Linking.openURL('mailto:' + this.state.project.alumni[0].email)}
              style={[{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' },
              { color: '#0000EE', fontWeight: 'bold' }]}>
              {this.state.project.alumni[0].email}
            </Text>
            <Text style={{ height: 50 }}></Text>
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
}

const Stack = createStackNavigator();

export default function ViewSaved(props) {
  gtUname = props.route.params.gtUsername;
  myP = props.route.params.myProjects;
  sProfiles = props.route.params.savedProfiles;

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