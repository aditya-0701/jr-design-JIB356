import * as React from 'react';
import { View, ScrollView, Switch, Text, Dimensions, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

export const ProjectFilterPage = ({ navigation }) => {
  const [search, onChangeSearch] = React.useState('');

  const [skill1, onChangeSkill1] = React.useState(false);
  const [skill2, onChangeSkill2] = React.useState(false);
  const [skill3, onChangeSkill3] = React.useState(false);
  const [skill4, onChangeSkill4] = React.useState(false);
  const [skill5, onChangeSkill5] = React.useState(false);
  const [skill6, onChangeSkill6] = React.useState(false);

  const toggleSkill1 = () => onChangeSkill1(previousState => !previousState);
  const toggleSkill2 = () => onChangeSkill2(previousState => !previousState);
  const toggleSkill3 = () => onChangeSkill3(previousState => !previousState);
  const toggleSkill4 = () => onChangeSkill4(previousState => !previousState);
  const toggleSkill5 = () => onChangeSkill5(previousState => !previousState);
  const toggleSkill6 = () => onChangeSkill6(previousState => !previousState);

  const [minHours, onChangeMinHours] = React.useState('');
  const [maxHours, onChangeMaxHours] = React.useState('');
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

  const toggleInterest1 = () => onChangeInterest1(previousState => !previousState);
  const toggleInterest2 = () => onChangeInterest2(previousState => !previousState);
  const toggleInterest3 = () => onChangeInterest3(previousState => !previousState);
  const toggleInterest4 = () => onChangeInterest4(previousState => !previousState);
  const toggleInterest5 = () => onChangeInterest5(previousState => !previousState);
  const toggleInterest6 = () => onChangeInterest6(previousState => !previousState);

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
          <Text style={style.label}>Skills Required</Text>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleSkill1}
              value={skill1}
            />
            <View style={{padding: 5}}></View>
            <Text style={style.label2}>Skill 1</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleSkill2}
              value={skill2}
            />
            <View style={{padding: 5}}></View>
            <Text style={style.label2}>Skill 2</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleSkill3}
              value={skill3}
            />
            <View style={{padding: 5}}></View>
            <Text style={style.label2}>Skill 3</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleSkill4}
              value={skill4}
            />
            <View style={{padding: 5}}></View>
            <Text style={style.label2}>Skill 4</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleSkill5}
              value={skill5}
            />
            <View style={{padding: 5}}></View>
            <Text style={style.label2}>Skill 5</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleSkill6}
              value={skill6}
            />
            <View style={{padding: 5}}></View>
            <Text style={style.label2}>Skill 6</Text>
          </View>
          <Text style={style.label}>Hours/Week Required</Text>
          <TextInput
            placeholder="Min Hours/Week"
            style={style.inputs}
            value = { minHours }
            onChangeText = { (text) => onChangeMinHours(text)}
          />
          <TextInput
            placeholder="Max Hours/Week"
            style={style.inputs}
            value = { maxHours }
            onChangeText = { (text) => onChangeMaxHours(text)}
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
          <Text style={style.label}>Project Interests</Text>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleInterest1}
              value={interest1}
            />
            <View style={{padding: 5}}></View>
            <Text style={style.label2}>Interest 1</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleInterest2}
              value={interest2}
            />
            <View style={{padding: 5}}></View>
            <Text style={style.label2}>Interest 2</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleInterest3}
              value={interest3}
            />
            <View style={{padding: 5}}></View>
            <Text style={style.label2}>Interest 3</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleInterest4}
              value={interest4}
            />
            <View style={{padding: 5}}></View>
            <Text style={style.label2}>Interest 4</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleInterest5}
              value={interest5}
            />
            <View style={{padding: 5}}></View>
            <Text style={style.label2}>Interest 5</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleInterest6}
              value={interest6}
            />
            <View style={{padding: 5}}></View>
            <Text style={style.label2}>Interest 6</Text>
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

export default function SearchProject( props ) {
  return (
    <Stack.Navigator screenOptions = {{headerShown: false}} initialRouteName="Page1">
      <Stack.Screen name="Page1" component={ProjectFilterPage} />
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