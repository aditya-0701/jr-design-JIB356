import * as React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DatePicker from 'react-native-datepicker'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from '../../globalStyles';
import { addProject } from '../../store'
// import SectionedMultiSelect from 'react-native-sectioned-multi-select'
// import Icon from 'react-native-vector-icons/MaterialIcons'

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

var username = 0;
var alumniUName = '';

const projectDetails = {
  projectTitle: "",
  projectDescription: "",
  degree: "",
  major: "",
  skills: "",
  interests: "",
  weekHours: "",
  links: ""
};

const degreeLibrary = [{
  name: "Degree",
  id: 0,
  children: [
    {
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

export const BasicDetails = ({ navigation }) => {
  
  const [name, onChangeName] = React.useState('');
  const [description, onChangeDescription] = React.useState('');
  const [degree, onChangeDegree] = React.useState([]);
  const [major, onChangeMajor] = React.useState([]);
  const [skills, onChangeSkills] = React.useState([]);
  const [interests, onChangeInterests] = React.useState([]);
  // const [skills, onChangeSkills] = React.useState([]);
  const [hoursPerWeek, onChangeHours] = React.useState('');
  const [externalLink, onChangeExternalLink] = React.useState('');
  const [startDate, onChangeStartDate] = React.useState(new Date());
  const [endDate, onChangeEndDate] = React.useState(new Date());
  
  const saveVals = () => {
    projectDetails.name = name;
    projectDetails.description = description;
    projectDetails.skills = skills;
    navigation.navigate("Page2");
  }

  const createProj = () => {
    projectDetails.projectTitle = name;
    projectDetails.projectDescription = description;
    projectDetails.skills = skills;
    projectDetails.degree= degree
    projectDetails.major= major
    projectDetails.interests= interests
    projectDetails.weekHours= hoursPerWeek
    projectDetails.links = [{address: `${externalLink}`, label: name}]
    projectDetails.startDate= startDate
    projectDetails.endDate= endDate
    projectDetails.projectAlumni = username;
    projectDetails.alumni = null;
    console.log("projectDetails")    
    console.log(JSON.stringify(projectDetails))

    addProject(projectDetails)
    .then((resp) => {
      console.log(resp.body);
      // setGTUsername(userDetails.gtUsername);
      navigation.navigate('ViewSaved', {myProjects: 1, username: username});
    })
    .catch((err) => {
      console.log(err);
      alert("An error occurred in project creation. Please check your inputs and try again.")
    })
  }


  return (
    <View style={styles.container} >
    <ScrollView style={{marginBottom: 75}}>
    <KeyboardAvoidingView>
    <Text style={styles.title}>Basic Project Details</Text>
    <Text style={styles.label}>Project Name</Text>
    <TextInput
    placeholder="Name"
    style={styles.inputs}
    value={name}
    onChangeText={(text) => onChangeName(text)}
    />
    <Text style={styles.label}>Description</Text>
    <TextInput      
      onChangeText={(text) => onChangeDescription(text)}
      value={description}
      multiline={true}
      placeholder="Describe your project..." 
      style={[styles.inputs, {height: 100, textAlignVertical: 'top'}]}
    />
    
    <Text style={styles.label}>Degrees</Text>
    <SectionedMultiSelect
    items={degreeLibrary}
    uniqueKey="id"
    subKey="children"
    selectText="Select degrees relevant to the project..."
    IconRenderer={Icon}
    showDropDowns={false}
    readOnlyHeadings={true}
    hideSearch={true}
    showChips={true}
    onSelectedItemsChange={onChangeDegree}
    selectedItems={degree}
    styles={[styles, localStyle]} />
    <Text style={styles.label}>Major</Text>
    <SectionedMultiSelect
    items={majorLibrary}
    uniqueKey="id"
    subKey="children"
    selectText="Select major relevant to the project..."
    IconRenderer={Icon}
    showDropDowns={false}
    readOnlyHeadings={true}
    hideSearch={true}
    showChips={true}
    onSelectedItemsChange={onChangeMajor}
    selectedItems={major}
    styles={[styles, localStyle]}
    />
    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#B3A369', paddingVertical: 10 }}>What Skills Would Be Useful for Your Project?</Text>
    <SectionedMultiSelect
    items={skillLibrary}
    uniqueKey="id"
    subKey="children"
    selectText="Select skills relevant to the project..."
    IconRenderer={Icon}
    showDropDowns={false}
    readOnlyHeadings={true}
    hideSearch={true}
    showChips={true}
    onSelectedItemsChange={onChangeSkills}
    selectedItems={skills}
    styles={[styles, localStyle]}
    />
    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#B3A369', paddingVertical: 10 }}>What Interests are relevant to your project?</Text>
    <SectionedMultiSelect
    items={interestLibrary}
    uniqueKey="id"
    subKey="children"
    selectText="Select interests relevant to the project..."
    IconRenderer={Icon}
    showDropDowns={false}
    readOnlyHeadings={true}
    hideSearch={true}
    showChips={true}
    onSelectedItemsChange={onChangeInterests}
    selectedItems={interests}
    styles={[styles, localStyle]}
    />
    <Text style={styles.title}>Timeframe and External Link</Text>
    <View style={ {textAlign: 'stretch', flexDirection: "row",alignItems: 'stretch',justifyContent: 'center'}}>
          <Text style={[styles.label, {marginHorizontal: 20, width: '45%'}]}>Start Date</Text>
          <Text style={[styles.label, {marginHorizontal: 20, width: '45%'}]}>End Date</Text>
        </View>
    <View style={{ flexDirection: "row" }}>
    <DatePicker
    date={startDate}
    mode="date"
    placeholder="select project start date"
    format="MM-DD-YYYY"
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    onDateChange={(date) => { onChangeStartDate(date) }}
    showIcon ={false}
    style={{ width: '45%'}}
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
      }}}
    />
    <DatePicker
    date={endDate}
    mode="date"
    placeholder="select project start date"
    format="MM-DD-YYYY"
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    onDateChange={(date) => { onChangeEndDate(date) }}
    showIcon ={false}
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
      }}}
    />
    </View>
    <Text style={styles.label}>How many Hours per week are expected?</Text>
    <TextInput
    placeholder="Hours per Week"
    style={styles.inputs}
    value={hoursPerWeek}
    onChangeText={(text) => onChangeHours(text)}
    keyboardType="decimal-pad"
    maxLength={4}
    />
    <Text style={styles.label}>Info Link</Text>
    <TextInput placeholder="Link to external site (Optional)"
    style={styles.inputs}
    value={externalLink}
    autoCapitalize = {"none"}
    onChangeText={(text) => { onChangeExternalLink(text); console.log("external link", text) }}
    />
    </KeyboardAvoidingView>
    </ScrollView>
    <View style={localStyle.navButtonContainer}>
      <NiceButton title="Exit" onPress={() => navigation.goBack()} />
      <NiceButton title="Finish" onPress={createProj} />
    </View>
    </View>
    );
  };
      
const Stack = createStackNavigator();

export default function NewProject(props) {
  username = props.route.params.username;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Page1">
    <Stack.Screen name="Page1" component={BasicDetails} />
    {/* <Stack.Screen name="Page2" component={PictureLink} /> */}
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
  listContainer: {
    backgroundColor: '#F5F5F5',
    color: '#F5F5F5',
    //opacity: 100,
    padding: 15,
    marginTop: 30,
    flex: 1
  },
  backdrop: {
    backgroundColor: '#F5F5F5',
    color: '#F5F5F5',
    //opacity: 100,
    padding: 15,
    marginTop: 30,
    flex: 1
  }
});
      