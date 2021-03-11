// import * as React from 'react';
import React from 'react';
import { ImageBackground, View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView, Dimensions, Animated, PanResponder, requireNativeComponent } from 'react-native';
// import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shouldUseActivityState from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { fromLeft } from 'react-navigation-transitions';
import { render } from 'react-dom';


// class NiceButton extends React.Component {
//   constructor(props) { super(props); }
//   render() {
//     return (
//       <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
//         <Text style={styles.buttonText}>{this.props.title}</Text>
//       </TouchableOpacity>
//     );
//   }
// }

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const CARD_HEIGHT = SCREEN_HEIGHT * 0.86

/**
 * this function tells the page what to display, it needs to be moved when it's integrated with the back-end stuff but idk where to put it
 * @param {Boolean} bool all this does rn is it swaps between two sets of arrays, back-end needs to figure out how to feed it information but this is a placeholder 
 * @returns the details for the projects
 */
 function getProjectDetails(bool) {
  if (bool) {
      return([
          {
            id: "1",
            name: "Example Project",
            description: "dfskj  sdjfl kldsf klj sd klsd jklfjkls df! dfskj lkjfsd kjf d!"
              + " dsfklj kldjs flkj sdfjks dflkjs fd! kljdsf kljdfs jklf sdjk!"
              + " Is this example long enough?",
            skills: "Programming",
            hoursPerWeek: "10",
            externalLink: "https://www.google.com",
            uri: require('../../../assets/1.jpg')
          },
          {
            id: "2",
            name: "Example Project 2",
            description: "dka;ldksngadgsn;sadgks",
            skills: "html, css",
            hoursPerWeek: "5",
            externalLink: "bing.com",
            uri: require('../../../assets/2.jpg')
          },
          {
            id: "3",
            name: "Project 3",
            description: ";lskdgn;klsgnl;ksagn;laskdg",
            hoursPerWeek: "8",
            externalLink: "yahoo.com",
            uri: require('../../../assets/3.jpg')
          },
          {
            id: "4",
            name: "Project 4",
            description: "kdsn;gkdsng;lskdgn;lsadg",
            hoursPerWeek: "3",
            externalLink: "images.google.com",
            uri: require('../../../assets/4.jpg')
          },
          {
            id: "5",
            name: "Project 5",
            description: "lkdgnsd;lkzgnsad;lgnasdg",
            hoursPerWeek: "7",
            externalLink: "maps.google.com",
            uri: require('../../../assets/5.jpg')
          },
          {
              id: "6",
              name: "Example Project 6",
              description: "dfskj  sdjfl kldsf klj sd klsd jklfjkls df! dfskj lkjfsd kjf d!"
                + " dsfklj kldjs flkj sdfjks dflkjs fd! kljdsf kljdfs jklf sdjk!"
                + " Is this example long enough?",
              skills: "Programming",
              hoursPerWeek: "10",
              externalLink: "https://www.google.com",
              uri: require('../../../assets/6.jpg')
            },
            {
              id: "7",
              name: "Example Project 7",
              description: "dka;ldksngadgsn;sadgks",
              skills: "html, css",
              hoursPerWeek: "5",
              externalLink: "bing.com",
              uri: require('../../../assets/7.jpg')
            },
            {
              id: "8",
              name: "Project 8",
              description: ";lskdgn;klsgnl;ksagn;laskdg",
              hoursPerWeek: "8",
              externalLink: "yahoo.com",
              uri: require('../../../assets/8.jpg')
            },
            {
              id: "9",
              name: "Project 9",
              description: "kdsn;gkdsng;lskdgn;lsadg",
              hoursPerWeek: "3",
              externalLink: "images.google.com",
              uri: require('../../../assets/9.jpg')
            },
            {
              id: "10",
              name: "Project X",
              description: "lkdgnsd;lkzgnsad;lgnasdg",
              hoursPerWeek: "7",
              externalLink: "maps.google.com",
              uri: require('../../../assets/10.jpg')
            }
        ]);
  } else {
      return([
        {
            id: "6",
            name: "Example Project 6",
            description: "dfskj  sdjfl kldsf klj sd klsd jklfjkls df! dfskj lkjfsd kjf d!"
              + " dsfklj kldjs flkj sdfjks dflkjs fd! kljdsf kljdfs jklf sdjk!"
              + " Is this example long enough?",
            skills: "Programming",
            hoursPerWeek: "10",
            externalLink: "https://www.google.com",
            uri: require('../../../assets/6.jpg')
          },
          {
            id: "7",
            name: "Example Project 7",
            description: "dka;ldksngadgsn;sadgks",
            skills: "html, css",
            hoursPerWeek: "5",
            externalLink: "bing.com",
            uri: require('../../../assets/7.jpg')
          },
          {
            id: "8",
            name: "Project 8",
            description: ";lskdgn;klsgnl;ksagn;laskdg",
            hoursPerWeek: "8",
            externalLink: "yahoo.com",
            uri: require('../../../assets/8.jpg')
          },
          {
            id: "9",
            name: "Project 9",
            description: "kdsn;gkdsng;lskdgn;lsadg",
            hoursPerWeek: "3",
            externalLink: "images.google.com",
            uri: require('../../../assets/9.jpg')
          },
          {
            id: "10",
            name: "Project X",
            description: "lkdgnsd;lkzgnsad;lgnasdg",
            hoursPerWeek: "7",
            externalLink: "maps.google.com",
            uri: require('../../../assets/10.jpg')
          },
          {
            id: "11",
            name: "Project Eleven",
            description: "I am a project!",
            hoursPerWeek: "30",
            externalLink: "twitter.com",
            uri: require('../../../assets/11.jpg')
          },
          {
            id: "12",
            name: "12th Project",
            description: "Project number 12 kjdfs kldsfjkl sdfjklfds jkldsf jklsdf",
            hoursPerWeek: "7",
            externalLink: "gatech.edu",
            uri: require('../../../assets/12.jpg')
          },
          {
            id: "13",
            name: "Project Number 13",
            description: "It was a bright cold day in April, and the clocks were striking thirteen.",
            hoursPerWeek: "6",
            externalLink: "goodreads.com",
            uri: require('../../../assets/13.jpg')
          },
          {
            id: "14",
            name: "Fourteenth Project",
            description: "There are 14 days in two weeks!",
            hoursPerWeek: "12",
            externalLink: "canvas.gatech.edu",
            uri: require('../../../assets/14.jpg')
          },
          {
            id: "15",
            name: "Final Project",
            description: "'Cause when you're fifteen, Somebody tells you they love you, You're gonna believe them, And when you're fifteen",
            hoursPerWeek: "3",
            externalLink: "https://genius.com/Taylor-swift-fifteen-lyrics",
            uri: require('../../../assets/15.jpg')
          }
        ]);
  }
}

var bool = true;
var projectDetails = getProjectDetails(bool);

export class Card extends React.Component {

  constructor() {
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })
  }

  UNSAFE_componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.useNativeDriver = true,
          this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
            , useNativeDriver: true
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
            , useNativeDriver: true
          }).start()
        }
      }
    })
  }


  renderUsers = () => {
    if (this.state.currentIndex == projectDetails.length) {
      if (bool) {
        bool = false;
      } else {
        bool = true;
      }
      projectDetails = getProjectDetails(bool);
      this.state.currentIndex = 0;
    }

    return projectDetails.map((item, i) => {

      if (i < this.state.currentIndex) {
        return null
      } else if (i == this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: CARD_HEIGHT, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>


            <ImageBackground
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderWidth: 3, borderColor: 'rgba(179, 163, 105, 1)', borderRadius: 20, overflow: 'hidden' }}
              imageStyle={{ borderRadius: 17 }}
              source={item.uri} >
              <Text style={styles.textAbstract}>
                <Text style={styles.textTitle}>{item.name}</Text>
                <Text style={styles.textHours}>{'\n'}{item.hoursPerWeek} hours per week</Text>
                <Text style={styles.textSpace}>{'\n'}</Text>
                <Text style={styles.textMain}>{'\n'}{item.description}{'\n'}{item.externalLink}</Text>
              </Text>
            </ImageBackground>
          </Animated.View>
        )
      } else {
        return (
          <Animated.View
            key={item.id} style={[{ opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }], height: CARD_HEIGHT, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

            <ImageBackground
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderWidth: 3, borderColor: 'rgba(179, 163, 105, 1)', borderRadius: 20, overflow: 'hidden' }}
              imageStyle={{ borderRadius: 17 }}
              source={item.uri}>
              <Text style={styles.textAbstract}>
                <Text style={styles.textTitle}>{item.name}</Text>
                <Text style={styles.textHours}>{'\n'}{item.hoursPerWeek} hours per week</Text>
                <Text style={styles.textSpace}>{'\n'}</Text>
                <Text style={styles.textMain}>{'\n'}{item.description}{'\n'}{item.externalLink}</Text>
              </Text>
            </ImageBackground>
          </Animated.View>
        )
      }
    }).reverse()
  }

  renderUserDetails = () => {

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}>
        </View>
        <View style={{ flex: 1 }}>
          {this.renderUsers()}
        </View>
        <View style={{ top: 300, left: 0, right: 0, bottom: 0 }}>
          <Text style={{ textAlign: 'center' }}>You have reached the end</Text>
        </View>
        <View style={{ height: 60 }}>

        </View>
      </View>
    );
  }
}

const Stack = createStackNavigator();
export default function ViewProject(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="Page1">
      <Stack.Screen name="Page1" component={Card} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAbstract: {
    color: 'white',
    padding: 20,
    textAlign: 'center',
    height: CARD_HEIGHT * 0.3,
    top: CARD_HEIGHT * 0.7,
    backgroundColor: 'rgba(179, 163, 105, .7)',
    fontSize: 15,
    fontWeight: '300'
  },
  textTitle: {
    fontSize: 25,
    fontWeight: '400'
  },
  textHours: {
    fontSize: 17,
    fontWeight: '300'
  },
  textMain: {
    fontSize: 15,
    fontWeight: '300'
  },
  textSpace: {
    fontSize: 2,
    fontWeight: '300'
  },
  headingText: {
    color: 'white',
    padding: 10,
    textAlign: 'center',
    height: 170,
    top: SCREEN_HEIGHT / 2 + 100,
    backgroundColor: 'rgba(179, 163, 105, .7)',
    fontSize: 20,
    fontWeight: '500'
  }
})

/* const styles = StyleSheet.create({
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
  login: {
    backgroundColor: '#F5F5F5',
    opacity: 100,
    alignItems: 'stretch',
    padding: 15,
    justifyContent: 'center',
    alignContent: 'center'
  },
  name: {
    fontFamily: 'serif',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: '#B3A369',
    fontWeight: '700'
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    fontSize: 25,
    marginVertical: 15,
    color: '#B3A369',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#B3A369',
    height: 40,
    width: '25%',
    justifyContent: "center",
    margin: 20,
    marginVertical: 10,
    //paddingHorizontal: 10,
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  label: {
    fontSize: 20,
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
  selector: {
    margin: 10,
    flexDirection: 'column',
    position: 'relative',
    bottom: -250,
    alignItems: 'stretch',
  },
});

const style = StyleSheet.create({//File-specific
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
  container: {
    backgroundColor: '#F5F5F5',
    color: '#F5F5F5',
    //opacity: 100,
    padding: 15,
    marginTop: 30,
    flex: 1
  }
}); */