import * as React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Icon from 'react-native-vector-icons/MaterialIcons'
// import { addStudent, updateStudent } from '../../store'
import { addAlumni, updateAlumni } from '../../store'
import { getStudent, getAlumni } from '../../store.js'
import styles from '../../globalStyles';

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

var name = "";

var userDetails = {
    email: "",
    firstName: "",
    lastName: "",
    middleName: "",
    pwd: "",
    phone: ""
};
var userName = userDetails.firstName + userDetails.lastName;
var username = 0;




export const BasicDetails = ({ navigation, route }) => {
    var { gtUser } = route.params;
    // console.log(userDetails.skills);
    const [emailValue, onChangeEmail] = React.useState(userDetails.email);
    const [passwordValue, onChangePassword] = React.useState(userDetails.pwd);
    const [firstName, onChangeFirstName] = React.useState(userDetails.firstName);
    const [lastName, onChangeLastName] = React.useState(userDetails.lastName);
    const [phone, onChangePhone] = React.useState(userDetails.mobile);

    // if (!userName || userName == "" || userName.length == 0) {
    //     getAlumni({ userName: name })
    //         .then((resp) => {
    //             console.log(resp.body);
    //             userDetails = resp.body;
    //             onChangeEmail(resp.body.email);
    //             onChangePassword(resp.body.pwd);
    //             onChangeFirstName(resp.body.firstName);
    //             onChangeLastName(resp.body.lastName);
    //             onChangePhone(resp.body.phone);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    React.useEffect(() => {
        console.log(username);
        getAlumni({ name: username })
            .then((resp) => {
                console.log(resp.body);
                userDetails = resp.body[0];
                onChangeEmail(resp.body[0].email);
                //onChangePassword(resp.body[0].pwd);
                onChangeFirstName(resp.body[0].firstName);
                onChangeLastName(resp.body[0].lastName);
                onChangePhone(resp.body[0].mobile);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [username])

    const saveVals = () => {
        userDetails.email = emailValue;
        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        userDetails.mobile = phone;
        userDetails.username = username;
   //     userDetails.pwd = passwordValue;
        if (emailValue != '' && phone != ''
            && firstName != '' && lastName != ''
            /*&& passwordValue != ''*/) {
            console.log("The done button was pressed and all fields were filled out");
            console.log(userDetails)
            updateAlumni(userDetails)
            .then((resp) => {
              console.log(resp);
              navigation.navigate("Alumni", {
                username: userDetails.username 
              });
            })
            .catch((err) => {
              console.log(err);
              alert("An error occurred in user creation. Please check your inputs and try again.")
            })
            console.log(JSON.parse(JSON.stringify(userDetails)))
        } else {
            alert("All fields must be filled out in order to proceed")
        }
        console.log(JSON.stringify(userDetails));
     //   navigation.navigate("Page3");
    }

    return (
        <View style={styles.container} >
            <ScrollView /* contentContainerStyle={ styles.container } */>
                <KeyboardAvoidingView>
                    <Text style={styles.title}>Profile Setup</Text>

                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        placeholder="First Name"
                        style={styles.inputs}
                        value={firstName}
                        onChangeText={(text) => onChangeFirstName(text)}
                    />
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        placeholder="Last Name"
                        style={styles.inputs}
                        value={lastName}
                        onChangeText={(text) => onChangeLastName(text)}
                    />



                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        autoCapitalize="none"
                        autoCompleteType='email'
                        keyboardType='email-address'
                        onChangeText={(text) => onChangeEmail(text)}
                        value={emailValue}
                        placeholder='Email'
                        style={styles.inputs}
                    />

                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        placeholder="Phone Number"
                        style={styles.inputs}
                        value={phone}
                        onChangeText={(text) => onChangePhone(text)}
                    />
                </KeyboardAvoidingView>
                <View><Text>{"\n"}</Text></View>
            </ScrollView>
            <View style={localStyle.navButtonContainer}>
                <NiceButton title="Exit" onPress={() => navigation.goBack()} />
                <NiceButton title="Done" onPress={saveVals} />
            </View>
        </View>
    );
};

const Stack = createStackNavigator();

export default function EditAlumni(props) {
    var { name } = props.route.params;
    userName = name;
    username = props.route.params.username;
    console.log(props.route.params);

    getAlumni({ name: props.route.params.username })
    .then((resp) => {
        console.log(resp.body);
        userDetails = resp.body[0];
    })
    .catch((err) => {
        console.log
    })

    // if (!userName || userName == "" || userName.length == 0) {
    //     console.log("Alumni profile not found");
    //     getStudent({ name: name })
    //         .then((resp) => {
    //             console.log(resp.body);
    //             userDetails = resp.body;
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Page1">
            <Stack.Screen name="Page1" component={BasicDetails} initialParams={{ name: userName }} />
            {/* <Stack.Screen name="Page2" component={PictureResume} />
            <Stack.Screen name="Page3" component={PrevExperience} />
            <Stack.Screen name="Page4" component={ExtSites} /> */}
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
