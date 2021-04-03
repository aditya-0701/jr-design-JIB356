import * as React from 'react';
import { View, ScrollView, Switch, Text, Dimensions, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../../globalStyles';
import DatePicker from 'react-native-datepicker';
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

const userDetails = {
  email: "",
  gtUsername: "",
  firstName: "",
  lastName: "",
  middleName: "",
  pwd: "",
  degree: [],
  major: [],
  interests: [],
  skills: [],
  start_date: [],
  end_date:[],
  experiences: [{
    'companyName': '',
    'position': '',
    'expDescription': '',
    'start_date': new Date(),
    'end_date': new Date()
  }],
  links: []
};

const degreeLibrary = [{
name: "Degree",
id: 0,
children: [{
    name: "Bachelors",
    id: 1
  },
  {
    name: "Masters",
    id: 2
  }
]
}];
const majorLibrary = [{
  name: "Major",
  id: 0,
  children: [{
    id: 1,
    name: "Computer Science"
  },
  {
    id: 2,
    name: "Computational Media"
  },
  {
    id: 3,
    name: "Computer Science (Minor)"
  },
  {
    id: 4,
    name: "OMCS"
  },
  {
    id: 5,
    name: "Analytics"
  },
  {
    id: 6,
    name: "Human-Computer Interaction"
  },
  {
    id: 7,
    name: "Information Security"
  },
  {
    id: 8,
    name: "Cybersecurity"
  },
  {
    id: 9,
    name: "Computational Science & Engineering"
  },
  {
    id: 10,
    name: "Bioengineering"
  }]
}];
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

export const ProfileFilterPage = ({ navigation }) => {
  const [search, onChangeSearch] = React.useState('');

  const [degree, onChangeDegree] = React.useState(userDetails.degree);
  const [major, onChangeMajor] = React.useState(userDetails.major);
  const [interests, onChangeInterests] = React.useState(userDetails.interests);
  const [skills, onChangeSkills] = React.useState(userDetails.skills);

  const [hours, onChangeHours] = React.useState('');
  const [minStart, onChangeMinStart] = React.useState('');
  const [maxStart, onChangeMaxStart] = React.useState('');
  const [minEnd, onChangeMinEnd] = React.useState('');
  const [maxEnd, onChangeMaxEnd] = React.useState('');

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
          <Text style={style.label}>Major</Text>
          <SectionedMultiSelect
            items={majorLibrary}
            uniqueKey="id"
            subKey="children"
            selectText="Select your major..."
            IconRenderer={Icon}
            showDropDowns={false}
            readOnlyHeadings={true}
            hideSearch={true}
            showChips={false}
            onSelectedItemsChange={onChangeMajor}
            selectedItems={major}
            styles={[styles, localStyle]}
          />
          <Text style={style.label}>Hours/Week Requested</Text>
          <TextInput
            placeholder="Hours/Week"
            style={style.inputs}
            value = { hours }
            onChangeText = { (text) => onChangeHours(text)}
          />
          <Text style={styles.label}>Degree</Text>
          <SectionedMultiSelect
          items={degreeLibrary}
          uniqueKey="id"
          subKey="children"
          selectText="Select your degree..."
          IconRenderer={Icon}
          showDropDowns={false}
          readOnlyHeadings={true}
          hideSearch={true}
          showChips={false}
          onSelectedItemsChange={onChangeDegree}
          selectedItems={degree}
          styles={[styles, localStyle]}
        />
          <Text style={style.label}>Start Date MM/DD/YYYY</Text>
          {/*<DatePicker
              date={"2020-01-01"}
              onDateChange={(date) => {userDetails.start_date.setState(date)}}
              mode='date'
              showIcon ={false}
              style={{marginHorizontal: 20, width: '45%'}}
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  marginBottom: 15,
                  borderRadius: 15,
                  backgroundColor: '#B3A36975',
                  padding: 10,
                  paddingLeft: 20,
                  height: 40
                }
                // ... You can check the source to find the other keys.
              }}
            />*/}
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
          <Text style={style.label}>End Date MM/DD/YYYY</Text>
        {/*<DatePicker
              date={"2020-01-01"}
              onDateChange={(date) => {userDetails.end_date.setState(date)}}
              mode='date'
              showIcon={false}
              style={{marginHorizontal: 20, width: '45%'}}
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  marginBottom: 15,
                  borderRadius: 15,
                  backgroundColor: '#B3A36975',
                  padding: 10,
                  paddingLeft: 20,
                  height: 40
                }
              }}
            />*/}
          <TextInputg
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
          <Text style={styles.label}>Skills</Text>
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

export default function SearchProfile( props ) {
  return (
    <Stack.Navigator screenOptions = {{headerShown: false}} initialRouteName="Page1">
      <Stack.Screen name="Page1" component={ProfileFilterPage} />
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
