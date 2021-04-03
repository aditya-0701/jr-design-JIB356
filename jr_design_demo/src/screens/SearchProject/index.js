import * as React from 'react';
import { View, ScrollView, Switch, Text, Dimensions, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../../globalStyles';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

class NiceButton extends React.Component {
  constructor(props) {super(props);}
  render() {
    return (
      <TouchableOpacity style={style.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const SCREEN_WIDTH = Dimensions.get('window').width

const projectDetails = {
  name: "",
  description: "",
  skills: "",
  hoursPerWeek: "",
  externalLink: ""
};
const skillLibrary = [{
  name: "Skills",
  id: 0,
  children: [
    {
      id: 1,
      name: "Java"
    },
    {
      id: 2,
      name: "Python"
    },
    {
      id: 3,
      name: "Git"
    },
    {
      id: 4,
      name: "Angular"
    },
    {
      id: 5,
      name: "C"
    },
    {
      id: 6,
      name: "MySQL"
    },
    {
      id: 7,
      name: "NoSQL"
    },
    {
      id: 8,
      name: "PHP"
    },
    {
      id: 9,
      name: "HTML"
    },
    {
      id: 10,
      name: "CSS"
    },
    {
      id: 11,
      name: "Swift"
    },
    {
      id: 12,
      name: "Objective-C"
    },
    {
      id: 13,
      name: "Ruby"
    },
    {
      id: 14,
      name: "CAD Design"
    }
  ]
}];
const interestLibrary = [{
  name: 'Interests',
  id: 0,
  children: [
    {
      id: 1,
      name: "Machine Learning"
    },
    {
      id: 2,
      name: "Artificial Intelligence"
    },
    {
      id: 3,
      name: "Blockchain"
    },
    {
      id: 4,
      name: "Computer Vision"
    },
    {
      id: 5,
      name: "Web Development"
    },
    {
      id: 6,
      name: "Mobile Development"
    },
    {
      id: 7,
      name: "Design"
    },
    {
      id: 8,
      name: "Hardware"
    },
    {
      id: 9,
      name: "Low Level Programming"
    },
    {
      id: 10,
      name: "Software"
    },
    {
      id: 11,
      name: "Functional Programming"
    },
    {
      id: 12,
      name: "Parallel Computing"
    },
    {
      id: 13,
      name: "Object Oriented Programming"
    }
  ]
}];

export const ProjectFilterPage = ({ navigation }) => {
  const [search, onChangeSearch] = React.useState('');

  const [hours, onChangeHours] = React.useState('');
  const [minStart, onChangeMinStart] = React.useState('');
  const [maxStart, onChangeMaxStart] = React.useState('');
  const [minEnd, onChangeMinEnd] = React.useState('');
  const [maxEnd, onChangeMaxEnd] = React.useState('');

  const [interests, onChangeInterests] = React.useState(projectDetails.interests);
  const [skills, onChangeSkills] = React.useState(projectDetails.skills);

  return(
    <View style={style.container} >
      <ScrollView>
        <KeyboardAvoidingView>
         <View style={{padding:5}}></View>
          <TextInput
            placeholder="Search"
            style={style.inputs}
            value = { search }
            onChangeText = { (text) => onChangeSearch(text)}
          />
          <Text style={style.label}>Hours/Week Required</Text>
          <TextInput
            placeholder="Hours/Week"
            style={style.inputs}
            value = { hours }
            onChangeText = { (text) => onChangeHours(text)}
          />
          <Text style={style.label}>Start Date (DD/MM/YY)</Text>
          <TextInput
            placeholder="Min Start Date"
            style={style.inputs}
            value = { minStart }
            onChangeText = { (text) => onChangeMinStart(text)}
          />
          <TextInput
            placeholder="Max Start Date"
            style={style.inputs}
            value = { maxStart }
            onChangeText = { (text) => onChangeMaxStart(text)}
          />
          <Text style={style.label}>End Date (DD/MM/YY)</Text>
          <TextInput
            placeholder="Min End Date"
            style={style.inputs}
            value = { minEnd }
            onChangeText = { (text) => onChangeMinEnd(text)}
          />
          <TextInput
            placeholder="Max End Date"
            style={style.inputs}
            value = { maxEnd }
            onChangeText = { (text) => onChangeMaxEnd(text)}
          />
          <Text style={style.label}>Skills Required</Text>
          <SectionedMultiSelect
            items={skillLibrary}
            uniqueKey="id"
            subKey="children"
            selectText="Select your skills..."
            IconRenderer={Icon}
            showDropDowns={false}
            readOnlyHeadings={true}
            hideSearch={true}
            showChips={false}
            onSelectedItemsChange={onChangeSkills}
            selectedItems={skills}
            styles={[styles, localStyle]}
          />
          <Text style={style.label}>Project Interests</Text>
          <SectionedMultiSelect
            items={interestLibrary}
            uniqueKey="id"
            subKey="children"
            selectText="Select some interests..."
            IconRenderer={Icon}
            showDropDowns={false}
            readOnlyHeadings={true}
            hideSearch={true}
            showChips={false}
            onSelectedItemsChange={onChangeInterests}
            selectedItems={interests}
            styles={[styles, localStyle]}
          />
          <View style={{padding:40}}></View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={ style.buttonContainer }>
        <NiceButton title="Back" onPress={() => navigation.goBack()}/>
        <NiceButton title="Submit" onPress={() => console.log("The submit button has been pressed!")}/>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function SearchProject( props ) {
  return (
    <Stack.Navigator screenOptions = {{headerShown: false}} initialRouteName="Page1">
      <Stack.Screen name="Page1" component={ProjectFilterPage} />
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
    marginTop: 5,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "black"
  },
  container: {
      backgroundColor: '#F5F5F5',
      color: '#F5F5F5',
      //opacity: 100,
      padding: 15,
      marginTop: 30,
      flex: 1
  },
  selectToggle: {
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: '#B3A36975',
    padding: 10,
    paddingLeft: 20,
    height: 40
  },
});

const style = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: 'center',
    //width: "100%",
    backgroundColor: '#F5F5F5',
    flexDirection: "row",
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 5,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
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
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B3A369',
    paddingVertical: 10
  },
  label2: {
    fontSize: 15,
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
  button: {
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor: '#B3A369',
      height: 40,
      width: SCREEN_WIDTH / 2.5,
      justifyContent: "center",
      margin: 20,
      marginVertical: 10,
      paddingHorizontal: 10,
      textAlign: 'center'
  },
});
