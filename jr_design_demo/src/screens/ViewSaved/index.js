import * as React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../../globalStyles';
import * as Store from "../../store";


const loadingSaved = {type: "profile", entries: []};
let needToLoad = true;

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
      <TouchableOpacity style={localStyle.savedItem} onPress={this.props.onPress}>
        <Text style={localStyle.savedTextTitle}>{this.props.item.name}{"\n"}</Text>
        <View style={{flexDirection: "row", width: "100%"}}>
          <Text style={[localStyle.savedText, {flexGrow: 1}]}>{this.props.item.detail1}</Text>
          <Text style={localStyle.savedText}>{this.props.item.detail2}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

//get the relevant info from the database return
function getProfileDetails(storedData) {
  let result = {type: "profile", entries: []};
  for (let i = 0; i < storedData.length; i++) {
    result.entries.push({name: (storedData[i].firstName + " " + storedData[i].lastName), detail1: storedData[i].email, detail2: ""});
  }
  
  return result;
  /*var objectType = "profile";
  if (objectType == "profile") {
    return {
      type: "profile",
      entries: [
        {name: "Dave Perkins", detail1: "Computer Science", detail2: "Undergrad"},
        {name: "Stacey Smom", detail1: "Computer Science", detail2: "Undergrad"},
        {name: "Drew Peacock", detail1: "Computer Science", detail2: "Undergrad"},
        {name: "Pete Dacat", detail1: "Computer Science", detail2: "Undergrad"},
        {name: "Phillipe Null", detail1: "Computational Media", detail2: "Graduate"},
        {name: "Dan Ghost", detail1: "Computational Media", detail2: "Undergrad"},
        {name: "Josh Netter", detail1: "Computer Science", detail2: "Graduate"}
      ]
    };
  } else {
    return {
      type: "project",
      entries: [
        {name: "projectA", detail1: "detail1", detail2: "detail2"},
        {name: "projectC", detail1: "detail1", detail2: "detail2"},
        {name: "projectB", detail1: "detail1", detail2: "detail2"},
        {name: "projectD", detail1: "detail1", detail2: "detail2"},
        {name: "projectQ", detail1: "detail1", detail2: "detail2"},
      ]
    };
  }*/
}

export const SaveContainer = ({ navigation, route }) => {
  //const saved = getSaved("profile");
  const [projectDetails, setProjectDetails] = React.useState(loadingSaved);
  
  React.useEffect(() => {
    if (needToLoad) {
      needToLoad = false;
      Store.getAllStudents().then(
        (data) => {
          console.log(data);
          setProjectDetails(getProfileDetails(data.body));
        }
      ).catch(
        (err) => {console.log(err);}
      );
    }
  }, [needToLoad]);
  let i = 0;

  return (
    <View style={styles.container} >
    <ScrollView /* contentContainerStyle={ styles.container } */>
      {projectDetails.entries.map((item)=>(
        <SavedItem item={item} key={i++}/>
      ))}
    </ScrollView>
      <View style={ localStyle.navButtonContainer }>
        <NiceButton title="Exit" onPress={() => {
          needToLoad = true;
          navigation.goBack();
        }}/>
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

export default function ViewSaved( props ) {


  return (
    <Stack.Navigator screenOptions = {{headerShown: false}} initialRouteName="View">
      <Stack.Screen name="View" component={SaveContainer} />
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
