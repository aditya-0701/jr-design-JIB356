import * as React from 'react';
import { View, ScrollView, Text, Dimensions, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../../globalStyles';
import {getStudentProjectInterests, getProject, deleteProjectInterest} from "../../store";


const loadingSaved = {type: "profile", entries: []};
let needToLoad = true;
var gtUname = '';
var projId = 0;


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

class SavedItem extends React.Component {
  constructor(props) {super(props);}

  

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
  let result = {type: "project", entries: []};
  for (let i = 0; i < storedData.length; i++) {
    result.entries.push({name: storedData[i].projectTitle, detail1: storedData[i].projectDescription, id: storedData[i].id});
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
      getStudentProjectInterests({gtUsername: gtUname}).then(
        (data) => {
          console.log(data.body);
          setProjectDetails(getProfileDetails(data.body));
        }
      ).catch(
        (err) => {console.log(err);}
      );
  }, [gtUname]);
  let i = 0;

  const refresh = () => {
    getStudentProjectInterests({gtUsername: gtUname}).then(
        (data) => {
          console.log(data.body);
          setProjectDetails(getProfileDetails(data.body));
          console.log(projectDetails)
        }
      ).catch(
        (err) => {console.log(err);}
      );
  }

  return (
    <View style={styles.container} >
    <ScrollView /* contentContainerStyle={ styles.container } */>
      {projectDetails.entries.map((item, index)=>(
        <View key={index}>
            <TouchableOpacity style={localStyle.savedItem} onPress={() => {console.log(item);detailScreen(item.id);}}>
            <Text style={localStyle.savedTextTitle}>{item.name}</Text>
            <Text numberOfLines = {2} style={[localStyle.savedText, {marginTop: 10}]}>{item.detail1}</Text>
      </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
      <View style={ localStyle.navButtonContainer }>
      <NiceButton title="Refresh" onPress={() => {
          refresh();
        }}/>
        <NiceButton title="Exit" onPress={() => {
          needToLoad = true;
          navigation.goBack();
        }}/>
      </View>
    </View>
  );
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

    render() {
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
            style={{backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 5, margin: 20, height: 30, width: '95%', alignSelf: 'center' }}
            onPress={() => this.deleteSaved()}>
            <Text style={{  textAlign: 'center', color: 'white', 'fontWeight': 'bold', fontSize: 15 }}> Remove from Saved </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 5, margin: 20, height: 30, width: '95%', alignSelf: 'center' }}
            onPress={() => this.props.navigation.goBack()}>
            <Text style={{ textAlign: 'center', color: 'white', 'fontWeight': 'bold', fontSize: 15 }}> Back </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

const Stack = createStackNavigator();

export default function ViewSaved( props ) {
    gtUname = props.route.params.gtUsername;

  return (
    <Stack.Navigator screenOptions = {{headerShown: false}} initialRouteName="View">
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