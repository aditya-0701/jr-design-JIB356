import * as React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { addAlumni, addStudent, updateExperiences } from '../../store'
import styles from '../../globalStyles';
import DatePicker from 'react-native-datepicker';

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

const userDetails = {
    email: "",
    firstName: "",
    lastName: "",
    middleName: "",
    pwd: "",
    phone: "",
    username: ""
};


export const BasicDetails = ({ navigation }) => {

    const [emailValue, onChangeEmail] = React.useState(userDetails.email);
    const [passwordValue, onChangePassword] = React.useState(userDetails.pwd);
    const [firstName, onChangeFirstName] = React.useState(userDetails.firstName);
    const [lastName, onChangeLastName] = React.useState(userDetails.lastName);
    const [phone, onChangePhone] = React.useState(userDetails.phone);
    const [username, onChangeUsername] = React.useState(userDetails.username);

    const saveVals = () => {
        userDetails.email = emailValue;
        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        userDetails.pwd = passwordValue;
        userDetails.phone = phoneValue;
        if (emailValue != '' && passwordValue != ''
            && firstName != '' && lastName != ''
            && phone != '' && username != '') {
            navigation.navigate("Page3");
        } else {
            alert("All fields must be filled out in order to proceed")
        }
        console.log(JSON.stringify(userDetails));
        navigation.navigate("Page3");
    }

    const login = () => {
        saveVals();
        console.log(JSON.stringify(userDetails));
        addAlumni(userDetails)
        .then((resp) => {
          console.log(resp);
          setGTUsername(userDetails.gtUsername);
          navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'HomeScreen',
                    params: {gtUsername: userDetails.gtUsername }
                }
            ],
          });
        })
        .catch((err) => {
          console.log(err);
          alert("An error occurred in user creation. Please check your inputs and try again.")
        })
    }

    return (
        <View style={styles.container} >
            <ScrollView /* contentContainerStyle={ styles.container } */>
                <KeyboardAvoidingView>
                    <Text style={styles.title}>Initial Profile Setup</Text>
                    
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        placeholder="Username"
                        style={styles.inputs}
                        value={firstName}
                        onChangeText={(text) => onChangeUsername(text)}
                    />

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

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        autoCapitalize="none"
                        autoCompleteType='password'
                        secureTextEntry={true}
                        onChangeText={(text) => onChangePassword(text)}
                        value={passwordValue}
                        placeholder='Password'
                        style={styles.inputs}
                    />

                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        placeholder="Phone Number"
                        style={styles.inputs}
                        value={phone}
                        onChangeText={(text) => onChangePhone(text)}
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber"
                    />
                </KeyboardAvoidingView>
                <View><Text>{"\n"}</Text></View>
            </ScrollView>
            <View style={localStyle.navButtonContainer}>
                <NiceButton title="Exit" onPress={() => navigation.goBack()} />
                <NiceButton title="Finish" onPress={ login }/>
            </View>
        </View>
    );
};

const Stack = createStackNavigator();

export default function NewAlumni(props) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Page1">
            <Stack.Screen name="Page1" component={BasicDetails} />
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