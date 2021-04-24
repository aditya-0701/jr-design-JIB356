import * as React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { addStudent, updateStudent } from '../../store'
import { getStudent, getAlumni } from '../../store.js'
import styles from '../../globalStyles';
import DatePicker from 'react-native-datepicker';

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

var gtUname = "";

var userDetails = {
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



export const BasicDetails = ({ navigation, route }) => {
  var { gtUser } = route.params;
  // console.log(userDetails.skills);
  const [gtUsername, onChangeGTUsername] = React.useState(userDetails.gtUsername);
  const [emailValue, onChangeEmail] = React.useState(userDetails.email);
  const [passwordValue, onChangePassword] = React.useState(userDetails.pwd);
  const [firstName, onChangeFirstName] = React.useState(userDetails.firstName);
  const [lastName, onChangeLastName] = React.useState(userDetails.lastName);
  const [degree, onChangeDegree] = React.useState(userDetails.degree.map(({ id }) => id));
  const [major, onChangeMajor] = React.useState(userDetails.major.map(({ id }) => id));
  const [interests, onChangeInterests] = 
    React.useState(userDetails.interests.map(({ id }) => id));
  const [skills, onChangeSkills] = 
    React.useState(userDetails.skills.map(({ id }) => id));
  const [bio, onChangeBio] = React.useState(userDetails.bio);

  if (!userDetails.gtUsername || userDetails.gtUsername == "" || userDetails.gtUsername.length == 0) {
    getStudent({'gtUsername': gtUname})
    .then((resp) => {
        console.log(resp.body);
        userDetails = resp.body;
        onChangeGTUsername(resp.body.gtUsername);
        onChangeEmail(resp.body.email);
        onChangePassword(resp.body.pwd);
        onChangeFirstName(resp.body.firstName);
        onChangeLastName(resp.body.lastName);
        onChangeDegree([resp.body.degree[0].id]);
        onChangeMajor([resp.body.major[0].id]);
        onChangeInterests(resp.body.interests.map(({ id }) => id));
        onChangeSkills(resp.body.skills.map(({ id }) => id));
        onChangeBio(resp.body.bio)
        console.log(resp.body.skills.map(({ id }) => id))
    })
    .catch((err) => {
        console.log(err);
    })
  }

  const saveVals = () => {
    console.log(skills);
    userDetails.email= emailValue;
    userDetails.firstName= firstName;
    userDetails.lastName= lastName;
    userDetails.degree= degree;
    userDetails.major= major;
    userDetails.interests= interests,
    userDetails.skills= skills;
    userDetails.pwd= passwordValue;
    userDetails.gtUsername= gtUsername;
    if (emailValue != '' && passwordValue  != ''  
        && firstName  != '' && lastName  != '' 
        && degree.length != 0 && major.length != 0
        && interests.length != 0 && skills.length != 0) {
        navigation.navigate("Page3");
    } else {
      alert("All fields must be filled out in order to proceed")
    }
    console.log(JSON.stringify(userDetails));
    navigation.navigate("Page3");
  }

  return (
    <View style={styles.container} >
      <ScrollView /* contentContainerStyle={ styles.container } */>
        <KeyboardAvoidingView>
          <Text style={styles.title}>Initial Profile Setup</Text>

          <Text style={styles.label}>GT Username</Text>
          <Text style={styles.inputs}>{ gtUsername }</Text>

          <Text style={styles.label}>First Name</Text>
          <TextInput 
            placeholder="First Name"
            style={styles.inputs}
            value = { firstName } 
            onChangeText = { (text) => onChangeFirstName(text)}
          />
          <Text style={styles.label}>Last Name</Text>
          <TextInput 
            placeholder="Last Name"
            style={styles.inputs}
            value = { lastName } 
            onChangeText = { (text) => onChangeLastName(text)}
          />

          

          <Text style={styles.label}>Email</Text>
          <TextInput
              autoCapitalize = "none"
              autoCompleteType = 'email'
              keyboardType = 'email-address'
              onChangeText = { (text) => onChangeEmail(text)}
              value = { emailValue }
              placeholder = 'Email'
              style = {styles.inputs}
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
              multiline={true}
              placeholder="Describe yourself..." 
              value={bio}
              style={[styles.inputs, {height: 100, textAlignVertical: 'top'}]}
              onChangeText = {(text) => {onChangeBio(text)}}
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
            showChips={true}
            single={true}
            onSelectedItemsChange={onChangeDegree}
            selectedItems={degree}
            styles={[styles, localStyle]}
          />

          <Text style={styles.label}>Major</Text>
          <SectionedMultiSelect
            items={majorLibrary}
            uniqueKey="id"
            subKey="children"
            selectText="Select your major..."
            IconRenderer={Icon}
            showDropDowns={false}
            readOnlyHeadings={true}
            hideSearch={true}
            showChips={true}
            single={true}
            onSelectedItemsChange={onChangeMajor}
            selectedItems={major}
            styles={[styles, localStyle]}
          />

          <Text style={styles.label}>Interests</Text>
            <SectionedMultiSelect
            items={interestLibrary}
            uniqueKey="id"
            subKey="children"
            selectText="Select some interests..."
            IconRenderer={Icon}
            showDropDowns={false}
            readOnlyHeadings={true}
            hideSearch={true}
            showChips={true}
            onSelectedItemsChange={onChangeInterests}
            selectedItems={interests}
            styles={[styles, localStyle]}
          />

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
            showChips={true}
            onSelectedItemsChange={onChangeSkills}
            selectedItems={skills}
            styles={[styles, localStyle]}
          />
        </KeyboardAvoidingView>
        <View><Text>{"\n"}</Text></View>
      </ScrollView>
      <View style={ localStyle.navButtonContainer }>
        <NiceButton title="Exit" onPress={() => navigation.goBack()}/>
        <NiceButton title="Work Experience" onPress={ saveVals }/>
      </View>
    </View>
  );
};

export const PictureResume = ({ navigation }) => {
  const title = React.useState("Profile Picture and Resume");
  const saveVals = () => {
    userDetails.email= emailValue;
    userDetails.pass = passwordValue;
    userDetails.firstName= firstName;
    userDetails.lastName= lastName;
    userDetails.degree= degree;
    userDetails.major= major;
    userDetails.interests= interests,
    userDetails.skills= skills;
    userDetails.pwd= passwordValue;
    navigation.navigate("Page3");
  }
  return (
    <View id="page2" style={[localStyle.container, {flex: 1}]}>

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

      <View style={[localStyle.navButtonContainer, {flex: 1}]}>
        <NiceButton title="Basic Info" onPress={() => navigation.navigate("Page1")}/>
        <NiceButton title="Work Experience" onPress={ savevals }/>
      </View>
    </View>
  );
};

export const PrevExperience = ({ navigation }) => {
  // const title = React.useState("Previous Experience");
  // Create react state arrays. Each array will hold a value corresponding experience[i]
  // Or create one state array that will hold all details of each experience[i]
  const saveVals = () => {
    userDetails['experiences'] = experiences;
    console.log(experiences);
  }
  var [experiences, onChangeExperiences] = React.useState(userDetails.experiences);
  const updateExperience = ( index, key, value ) => {
    const oldExperiences = JSON.parse(JSON.stringify(experiences));
    oldExperiences[index][key] = value
    onChangeExperiences(oldExperiences);
  }

  const addExperience = () => {
    const oldExperiences = JSON.parse(JSON.stringify(experiences));
    oldExperiences.push({
      'companyName': '',
      'position': '',
      'expDescription': '',
      'start_date': new Date(),
      'end_date': new Date()
    });
    onChangeExperiences(oldExperiences);
  }

  const removeExperience = ( index ) => {
    const oldExperiences = JSON.parse(JSON.stringify(experiences));
    oldExperiences.splice(index, 1);
    onChangeExperiences(oldExperiences);
  }

  return (
    <View id="page3" style = {localStyle.container} >
      <Text style={styles.title}>Previous Experience</Text>
      <FlatList
        style = {{marginBottom: 50}}
        data = {experiences}
        keyExtractor={(item, index) => index.toString()}
        renderItem = {({item, index}) => 
        <View key = {index}>
          <Text style={styles.label}>Company</Text>
          <TextInput 
            placeholder="Company/Organization name" 
            style={styles.inputs}
            value = {item.companyName}
            onChangeText = {(text) => {updateExperience(index, 'companyName', text)}}/>
          <Text style={styles.label}>Position</Text>
          <TextInput 
            placeholder="Position held" 
            style={styles.inputs}
            value = {item.position}
            onChangeText = {(text) => {updateExperience(index, 'position', text)}}/>
          <View style={ {textAlign: 'stretch', flexDirection: "row",alignItems: 'stretch',justifyContent: 'center'}}>
            <Text style={[styles.label, {marginHorizontal: 20, width: '45%'}]}>Start Date</Text>
            <Text style={[styles.label, {marginHorizontal: 20, width: '45%'}]}>End Date</Text>
          </View>
          <View style={ {textAlign: 'center', flexDirection: "row",alignItems: 'stretch',justifyContent: 'center' }}>
            {/* <TextInput placeholder="Start Date" style={[styles.inputs, {marginHorizontal: 20, width: '45%'}]}/> */}
            {/* <TextInput placeholder="End Date" style={[styles.inputs, {marginHorizontal: 20, width: '45%'}]}/> */}
            <DatePicker
              date={item.start_date}
              onDateChange={(date) => {updateExperience(index, 'start_date', date)}}
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
            />
            <DatePicker
              date={item.end_date}
              onDateChange={(date) => {updateExperience(index, 'end_date', date)}}
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
            />
          </View>
          <Text style={styles.label}>Description</Text>
          <TextInput 
            multiline={true}
            placeholder="Describe your experience..." 
            style={[styles.inputs, {height: 100, textAlignVertical: 'top'}]}
            value = {item.expDescription}
            onChangeText = {(text) => {updateExperience(index, 'expDescription', text)}}
          />
          <TouchableOpacity onPress = {() => removeExperience(index)} style = { [styles.button, {alignSelf: 'center', width: '50%'} ] }>
            <Text style = { styles.buttonText }>Remove Experience</Text>
          </TouchableOpacity>
        </View>}
        ListFooterComponent={<TouchableOpacity 
          style = { [styles.button, {alignSelf: 'center', width: '100%'} ] }
          onPress = { addExperience }>
          <Text style = { styles.buttonText }>Add Experience</Text>
        </TouchableOpacity>}
      />
      
      <View style={localStyle.navButtonContainer} >
        <NiceButton title="Basic Info" onPress={() => {saveVals(); navigation.navigate("Page1")}}/>
        <NiceButton title="External Services" onPress={() => {saveVals(); navigation.navigate("Page4")}}/>
      </View>
    </View>
  );
};

export const ExtSites = ({ navigation }) => {
  var [links, onChangeLink] = React.useState(userDetails.links);
  const saveVals = () => {
    userDetails['links'] = links;
    console.log(links);
    // navigation.navigate("Page4")
  }

  const updateLink = ( index, key, value ) => {
    const oldLinks = JSON.parse(JSON.stringify(links));
    oldLinks[index][key] = value
    onChangeLink(oldLinks);
  }

  const addLink = () => {
    const oldLinks = JSON.parse(JSON.stringify(links));
    console.log("old" + oldLinks)
    oldLinks.push({
      'label': '',
      'address': '',
    });
    console.log("new" + oldLinks)
    onChangeLink(oldLinks);
  }

  const removeLink = ( index ) => {
    const oldLinks = JSON.parse(JSON.stringify(links));
    oldLinks.splice(index, 1);
    console.log(oldLinks)
    onChangeLink(oldLinks);
  }

  /**[{
    'label': '',
    'id': '',
    'address': '',
}]); */
  const login = () => {
    saveVals();
    console.log(JSON.stringify(userDetails));
    updateStudent(userDetails)
    .then((resp) => {
      console.log(resp.body);
      navigation.navigate("Profile", {
        gtUsername: userDetails.gtUsername 
      });
    })
    .catch((err) => {
      console.log(err);
      alert("An error occurred in user creation. Please check your inputs and try again.")
    })
    console.log(JSON.parse(JSON.stringify(userDetails)))
  }

  return (
    <View style={localStyle.container}>
      <Text style={[styles.title, {marginTop: "6%"}]}>Links to External Services</Text>
{/* 
        <Text style={styles.label}>LinkedIn</Text>
        <TextInput placeholder="LinkedIn Link" style={styles.inputs}/>
        <Text style={styles.label}>Github</Text>
        <TextInput placeholder="Github Link" style={styles.inputs}/>
        <Text style={styles.label}>Add other Links</Text> */}
        <FlatList
          style = {{marginBottom: 50}}
          data = {links}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {({item, index}) => (
          <View key = {index}>
              <Text style={styles.label}>Link Label</Text>
              <TextInput
                value={item.label}
                onChangeText={(text) => {updateLink(index, 'label', text)}}
                style={styles.inputs}
              />
              <Text style={styles.label}>Link Address</Text>
              <TextInput
                value={item.address}
                onChangeText={(text) => {updateLink(index, 'address', text)}}
                style={styles.inputs}
              />
            <TouchableOpacity onPress = {() => removeLink(index)} 
                style = { [styles.button, {alignSelf: 'center', width: '90%'} ] }>
                <Text style = { styles.buttonText }>Remove Link</Text>
              </TouchableOpacity>
          </View>
          )}
        ListFooterComponent = {
          <TouchableOpacity onPress = {() => {addLink()}} style = { [styles.button, {alignSelf: 'center', width: '100%'} ] }>
            <Text style = { styles.buttonText }>Add Link</Text>
          </TouchableOpacity>
        }
        />
        <View style={ localStyle.navButtonContainer }>
          <NiceButton title="Previous Experience" onPress={() => {saveVals(); navigation.navigate("Page3")}}/>
          <NiceButton title="Finish" onPress={ login }/>
        </View>
    </View>
  );
};

const Stack = createStackNavigator();

export default function EditProfile( props ) {
  var { gtUsername } = props.route.params;
  gtUname = gtUsername;

  if (!userDetails.gtUsername || userDetails.gtUsername == "" || userDetails.gtUsername.length == 0) {
    console.log("GT Username not found");
    getStudent({gtUsername: gtUsername})
    .then((resp) => {
        console.log(resp.body);
        userDetails = resp.body;
    })
    .catch((err) => {
        console.log(err);
    })
  }
  
  return (
    <Stack.Navigator screenOptions = {{headerShown: false}} initialRouteName="Page1">
      <Stack.Screen name="Page1" component={BasicDetails} initialParams = {{gtUsername: gtUsername}}/>
      <Stack.Screen name="Page2" component={PictureResume} />
      <Stack.Screen name="Page3" component={PrevExperience} />
      <Stack.Screen name="Page4" component={ExtSites} />
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
  // listContainer: {
  //   backgroundColor: '#F5F5F5',
  //   color: '#F5F5F5',
  //   //opacity: 100,
  //   padding: 15,
  //   marginTop: 30,
  //   flex: 1
  // },
  // backdrop: {
  // backgroundColor: '#F5F5F5',
  // color: '#F5F5F5',
  // //opacity: 100,
  // padding: 15,
  // marginTop: 30,
  // flex: 1
  // }
});

//export default ProfileSetup;
