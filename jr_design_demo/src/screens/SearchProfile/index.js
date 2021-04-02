import * as React from 'react';
import { View, ScrollView, Switch, Text, Dimensions, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../../globalStyles';

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

export const ProfileFilterPage = ({ navigation }) => {
    const [search, onChangeSearch] = React.useState('');

    const [degree, onChangeDegree] = React.useState('');

    const [major, onChangeMajor] = React.useState('');
  
    const [skill1, onChangeSkill1] = React.useState(false);
    const [skill2, onChangeSkill2] = React.useState(false);
    const [skill3, onChangeSkill3] = React.useState(false);
    const [skill4, onChangeSkill4] = React.useState(false);
    const [skill5, onChangeSkill5] = React.useState(false);
    const [skill6, onChangeSkill6] = React.useState(false);
    const [skill7, onChangeSkill7] = React.useState(false);
    const [skill8, onChangeSkill8] = React.useState(false);
    const [skill9, onChangeSkill9] = React.useState(false);
    const [skill10, onChangeSkill10] = React.useState(false);
    const [skill11, onChangeSkill11] = React.useState(false);
    const [skill12, onChangeSkill12] = React.useState(false);
    const [skill13, onChangeSkill13] = React.useState(false);
    const [skill14, onChangeSkill14] = React.useState(false);
  
    const toggleSkill1 = () => onChangeSkill1(previousState => !previousState);
    const toggleSkill2 = () => onChangeSkill2(previousState => !previousState);
    const toggleSkill3 = () => onChangeSkill3(previousState => !previousState);
    const toggleSkill4 = () => onChangeSkill4(previousState => !previousState);
    const toggleSkill5 = () => onChangeSkill5(previousState => !previousState);
    const toggleSkill6 = () => onChangeSkill6(previousState => !previousState);
    const toggleSkill7 = () => onChangeSkill7(previousState => !previousState);
    const toggleSkill8 = () => onChangeSkill8(previousState => !previousState);
    const toggleSkill9 = () => onChangeSkill9(previousState => !previousState);
    const toggleSkill10 = () => onChangeSkill10(previousState => !previousState);
    const toggleSkill11 = () => onChangeSkill11(previousState => !previousState);
    const toggleSkill12 = () => onChangeSkill12(previousState => !previousState);
    const toggleSkill13 = () => onChangeSkill13(previousState => !previousState);
    const toggleSkill14 = () => onChangeSkill14(previousState => !previousState);
  
    const [hours, onChangeHours] = React.useState('');
    const [minStart, onChangeMinStart] = React.useState('');
    const [maxStart, onChangeMaxStart] = React.useState('');
    const [minEnd, onChangeMinEnd] = React.useState('');
    const [maxEnd, onChangeMaxEnd] = React.useState('');
  
    const [interest1, onChangeInterest1] = React.useState(false);
    const [interest2, onChangeInterest2] = React.useState(false);
    const [interest3, onChangeInterest3] = React.useState(false);
    const [interest4, onChangeInterest4] = React.useState(false);
    const [interest5, onChangeInterest5] = React.useState(false);
    const [interest6, onChangeInterest6] = React.useState(false);
    const [interest7, onChangeInterest7] = React.useState(false);
    const [interest8, onChangeInterest8] = React.useState(false);
    const [interest9, onChangeInterest9] = React.useState(false);
    const [interest10, onChangeInterest10] = React.useState(false);
    const [interest11, onChangeInterest11] = React.useState(false);
    const [interest12, onChangeInterest12] = React.useState(false);
    const [interest13, onChangeInterest13] = React.useState(false);
  
    const toggleInterest1 = () => onChangeInterest1(previousState => !previousState);
    const toggleInterest2 = () => onChangeInterest2(previousState => !previousState);
    const toggleInterest3 = () => onChangeInterest3(previousState => !previousState);
    const toggleInterest4 = () => onChangeInterest4(previousState => !previousState);
    const toggleInterest5 = () => onChangeInterest5(previousState => !previousState);
    const toggleInterest6 = () => onChangeInterest6(previousState => !previousState);
    const toggleInterest7 = () => onChangeInterest7(previousState => !previousState);
    const toggleInterest8 = () => onChangeInterest8(previousState => !previousState);
    const toggleInterest9 = () => onChangeInterest9(previousState => !previousState);
    const toggleInterest10 = () => onChangeInterest10(previousState => !previousState);
    const toggleInterest11 = () => onChangeInterest11(previousState => !previousState);
    const toggleInterest12 = () => onChangeInterest12(previousState => !previousState);
    const toggleInterest13 = () => onChangeInterest13(previousState => !previousState);
  
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
            <DropDownPicker
              items={[
                  {label: "Select Major", value: 'default'},
                  {label: "Computer Science", value: 'cs'},
                  {label: "Computational Media", value: 'cm'},
                  {label: "Computer Science (Minor)", value: 'minor'},
                  {label: "OMCS", value: 'omcs'},
                  {label: "Analytics", value: 'analytics'},
                  {label: "Human-Computer Interaction", value: 'hci'},
                  {label: "Information Security", value: 'is'},
                  {label: "Cybersecurity", value: 'cybersecurity'},
                  {label: "Computational Science & Engineering", value: 'cse'},
                  {label: "Bioengineering", value: 'bio'}
              ]}
              defaultValue={'default'}
              onChangeItem={onChangeMajor}
            />
            <Text style={style.label}>Hours/Week Requested</Text>
            <TextInput
              placeholder="Hours/Week"
              style={style.inputs}
              value = { hours }
              onChangeText = { (text) => onChangeHours(text)}
            />
            <Text style={style.label}>Degree</Text>
            <DropDownPicker
              items={[
                  {label: "Select Degree", value: 'default'},
                  {label: "Bachelor's", value: 'Bachelors'},
                  {label: "Master's", value: 'Masters'}
              ]}
              defaultValue={'default'}
              onChangeItem={onChangeDegree}
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
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill1}
                value={skill1}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Java</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill2}
                value={skill2}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Python</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill3}
                value={skill3}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Git</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill4}
                value={skill4}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Angular</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill5}
                value={skill5}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>C</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill6}
                value={skill6}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>MySQL</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill7}
                value={skill7}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>NoSQL</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill8}
                value={skill8}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>PHP</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill9}
                value={skill9}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>HTML</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill10}
                value={skill10}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>CSS</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill11}
                value={skill11}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Swift</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill12}
                value={skill12}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Objective-C</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill13}
                value={skill13}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Ruby</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleSkill14}
                value={skill14}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>CAD Design</Text>
            </View>
            <Text style={style.label}>Project Interests</Text>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleInterest1}
                value={interest1}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Machine Learning</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleInterest2}
                value={interest2}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Artificial Intelligence</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleInterest3}
                value={interest3}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Blockchain</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleInterest4}
                value={interest4}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Computer Vision</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleInterest5}
                value={interest5}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Web Development</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleInterest6}
                value={interest6}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Mobile Development</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleInterest7}
                value={interest7}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Design</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleInterest8}
                value={interest8}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Hardware</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleInterest9}
                value={interest9}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Low Level Programming</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleInterest10}
                value={interest10}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Software</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleInterest11}
                value={interest11}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Functional Programming</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleInterest12}
                value={interest12}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Parallel Computing</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Switch
                onValueChange={toggleInterest13}
                value={interest13}
              />
              <View style={{padding: 5}}></View>
              <Text style={style.label2}>Object-Oriented Programming</Text>
            </View>
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