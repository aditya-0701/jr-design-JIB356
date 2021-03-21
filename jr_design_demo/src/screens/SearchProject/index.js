import * as React from 'react';
import { View, ScrollView, Switch, Text, Dimensions, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
    <View style={styles.container} >
      <ScrollView>
        <KeyboardAvoidingView>
         <View style={{padding:5}}></View>
          <TextInput
            placeholder="Search"
            style={styles.inputs}
            value = { search }
            onChangeText = { (text) => onChangeSearch(text)}
          />
          <Text style={styles.label}>Skills Required</Text>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleSkill1}
              value={skill1}
            />
            <View style={{padding: 5}}></View>
            <Text style={styles.label2}>Skill 1</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleSkill2}
              value={skill2}
            />
            <View style={{padding: 5}}></View>
            <Text style={styles.label2}>Skill 2</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleSkill3}
              value={skill3}
            />
            <View style={{padding: 5}}></View>
            <Text style={styles.label2}>Skill 3</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleSkill4}
              value={skill4}
            />
            <View style={{padding: 5}}></View>
            <Text style={styles.label2}>Skill 4</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleSkill5}
              value={skill5}
            />
            <View style={{padding: 5}}></View>
            <Text style={styles.label2}>Skill 5</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleSkill6}
              value={skill6}
            />
            <View style={{padding: 5}}></View>
            <Text style={styles.label2}>Skill 6</Text>
          </View>
          <Text style={styles.label}>Hours/Week Required</Text>
          <TextInput
            placeholder="Min Hours/Week"
            style={styles.inputs}
            value = { minHours }
            onChangeText = { (text) => onChangeMinHours(text)}
          />
          <TextInput
            placeholder="Max Hours/Week"
            style={styles.inputs}
            value = { maxHours }
            onChangeText = { (text) => onChangeMaxHours(text)}
          />
          <Text style={styles.label}>Start Date (DD/MM/YY)</Text>
          <TextInput
            placeholder="Min Start Date"
            style={styles.inputs}
            value = { minStart }
            onChangeText = { (text) => onChangeMinStart(text)}
          />
          <TextInput
            placeholder="Max Start Date"
            style={styles.inputs}
            value = { maxStart }
            onChangeText = { (text) => onChangeMaxStart(text)}
          />
          <Text style={styles.label}>End Date (DD/MM/YY)</Text>
          <TextInput
            placeholder="Min End Date"
            style={styles.inputs}
            value = { minEnd }
            onChangeText = { (text) => onChangeMinEnd(text)}
          />
          <TextInput
            placeholder="Max End Date"
            style={styles.inputs}
            value = { maxEnd }
            onChangeText = { (text) => onChangeMaxEnd(text)}
          />
          <Text style={styles.label}>Project Interests</Text>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleInterest1}
              value={interest1}
            />
            <View style={{padding: 5}}></View>
            <Text style={styles.label2}>Interest 1</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleInterest2}
              value={interest2}
            />
            <View style={{padding: 5}}></View>
            <Text style={styles.label2}>Interest 2</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleInterest3}
              value={interest3}
            />
            <View style={{padding: 5}}></View>
            <Text style={styles.label2}>Interest 3</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleInterest4}
              value={interest4}
            />
            <View style={{padding: 5}}></View>
            <Text style={styles.label2}>Interest 4</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleInterest5}
              value={interest5}
            />
            <View style={{padding: 5}}></View>
            <Text style={styles.label2}>Interest 5</Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Switch
              onValueChange={toggleInterest6}
              value={interest6}
            />
            <View style={{padding: 5}}></View>
            <Text style={styles.label2}>Interest 6</Text>
          </View>
          <View style={{padding:20}}></View>
        </KeyboardAvoidingView>
      </ScrollView>
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

const styles = StyleSheet.create({
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
});