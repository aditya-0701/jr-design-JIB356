import * as React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../../globalStyles';


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
      <TouchableOpacity style={localStyles.savedItem} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

function getSaved() {
  return {
    type: "profile",
    entries: [
      {name: "Dave Perkins"},
      {name: "Stacey Smom"},
      {name: "Drew Peacock"},
      {name: "Pete Dacat"},
      {name: "Phillipe Null"},
      {name: "Danny Ghost"},
      {name: "Josh Netter"}
    ]
  };
}

export const SaveContainer = ({ navigation }) => {
  const saved = getSaved();
  let elements = (
    <KeyboardAvoidingView>
      {saved.entries.map((item)=>(
        <SavedItem name={"Name: " + item.name}/>
      ))}
    </KeyboardAvoidingView>
  );

  return (
    <View style={styles.container} >
    <ScrollView /* contentContainerStyle={ styles.container } */>
      {elements}
    </ScrollView>
      <View style={ localStyle.navButtonContainer }>
        <NiceButton title="Exit" onPress={() => navigation.goBack()}/>
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
      backgroundColor: "#F5F5F5"
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
