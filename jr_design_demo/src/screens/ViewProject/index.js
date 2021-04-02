// import * as React from 'react';
import React from 'react';
import { ScrollView, Switch, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, ImageBackground, View, Text, StyleSheet, Dimensions, Animated, PanResponder, Touchable, Button } from 'react-native';
// import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shouldUseActivityState, { screensEnabled } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { fromLeft } from 'react-navigation-transitions';
import { render } from 'react-dom';
import { withSafeAreaInsets } from 'react-native-safe-area-context';


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

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const CARD_HEIGHT = SCREEN_HEIGHT * 0.86


const projectDetails = [
  {
    id: "1",
    name: "Example Project",
    shortDescription: "hdsalkgdsgsdgadsfadfasdadggsd",
    bio: "dfskj?",
    skills: "Programming",
    hoursPerWeek: "10",
    externalLink: "https://www.google.com",
    uri: require('../../../assets/1.jpg')
  },
  {
    id: "2",
    name: "Example Project 2",
    shortDescription: "hdsalkgdsgsdg",
    bio: "dka;ldksngadgsn;sadgks",
    skills: "html, css",
    hoursPerWeek: "5",
    externalLink: "bing.com",
    uri: require('../../../assets/2.jpg')
  },
  {
    id: "3",
    name: "Project 3",
    shortDescription: "hdsalkgdsgsdg",
    bio: ";lskdgn;klsgnl;ksagn;laskdg",
    hoursPerWeek: "8",
    externalLink: "yahoo.com",
    uri: require('../../../assets/3.jpg')
  },
  {
    id: "4",
    name: "Project 4",
    shortDescription: "hdsalkgdsgsdg",
    bio: "kdsn;gkdsng;lskdgn;lsadg",
    hoursPerWeek: "3",
    externalLink: "images.google.com",
    uri: require('../../../assets/4.jpg')
  },
  {
    id: "5",
    name: "Project 5",
    shortDescription: "hdsalkgdsgsdg",
    bio: "lkdgnsd;lkzgnsad;lgnasdg",
    hoursPerWeek: "7",
    externalLink: "maps.google.com",
    uri: require('../../../assets/5.jpg')
  }
]


// /**
//  * this function tells the page what to display, it needs to be moved when it's integrated with the back-end stuff but idk where to put it
//  * @param {Boolean} bool all this does rn is it swaps between two sets of arrays, back-end needs to figure out how to feed it information but this is a placeholder 
//  * @returns the details for the projects
//  */
// function getProjectDetails(bool) {
//   if (bool) {
//     return ([
//       {
//         id: "1",
//         name: "Example Project",
//         description: "dfskj  sdjfl kldsf klj sd klsd jklfjkls df! dfskj lkjfsd kjf d!"
//           + " dsfklj kldjs flkj sdfjks dflkjs fd! kljdsf kljdfs jklf sdjk!"
//           + " Is this example long enough?",
//         skills: "Programming",
//         hoursPerWeek: "10",
//         externalLink: "https://www.google.com",
//         uri: require('../../../assets/1.jpg')
//       },
//       {
//         id: "2",
//         name: "Example Project 2",
//         description: "dka;ldksngadgsn;sadgks",
//         skills: "html, css",
//         hoursPerWeek: "5",
//         externalLink: "bing.com",
//         uri: require('../../../assets/2.jpg')
//       },
//       {
//         id: "3",
//         name: "Project 3",
//         description: ";lskdgn;klsgnl;ksagn;laskdg",
//         hoursPerWeek: "8",
//         externalLink: "yahoo.com",
//         uri: require('../../../assets/3.jpg')
//       },
//       {
//         id: "4",
//         name: "Project 4",
//         description: "kdsn;gkdsng;lskdgn;lsadg",
//         hoursPerWeek: "3",
//         externalLink: "images.google.com",
//         uri: require('../../../assets/4.jpg')
//       },
//       {
//         id: "5",
//         name: "Project 5",
//         description: "lkdgnsd;lkzgnsad;lgnasdg",
//         hoursPerWeek: "7",
//         externalLink: "maps.google.com",
//         uri: require('../../../assets/5.jpg')
//       },
//       {
//         id: "6",
//         name: "Example Project 6",
//         description: "dfskj  sdjfl kldsf klj sd klsd jklfjkls df! dfskj lkjfsd kjf d!"
//           + " dsfklj kldjs flkj sdfjks dflkjs fd! kljdsf kljdfs jklf sdjk!"
//           + " Is this example long enough?",
//         skills: "Programming",
//         hoursPerWeek: "10",
//         externalLink: "https://www.google.com",
//         uri: require('../../../assets/6.jpg')
//       },
//       {
//         id: "7",
//         name: "Example Project 7",
//         description: "dka;ldksngadgsn;sadgks",
//         skills: "html, css",
//         hoursPerWeek: "5",
//         externalLink: "bing.com",
//         uri: require('../../../assets/7.jpg')
//       },
//       {
//         id: "8",
//         name: "Project 8",
//         description: ";lskdgn;klsgnl;ksagn;laskdg",
//         hoursPerWeek: "8",
//         externalLink: "yahoo.com",
//         uri: require('../../../assets/8.jpg')
//       },
//       {
//         id: "9",
//         name: "Project 9",
//         description: "kdsn;gkdsng;lskdgn;lsadg",
//         hoursPerWeek: "3",
//         externalLink: "images.google.com",
//         uri: require('../../../assets/9.jpg')
//       },
//       {
//         id: "10",
//         name: "Project X",
//         description: "lkdgnsd;lkzgnsad;lgnasdg",
//         hoursPerWeek: "7",
//         externalLink: "maps.google.com",
//         uri: require('../../../assets/10.jpg')
//       }
//     ]);
//   } else {
//     return ([
//       {
//         id: "6",
//         name: "Example Project 6",
//         description: "dfskj  sdjfl kldsf klj sd klsd jklfjkls df! dfskj lkjfsd kjf d!"
//           + " dsfklj kldjs flkj sdfjks dflkjs fd! kljdsf kljdfs jklf sdjk!"
//           + " Is this example long enough?",
//         skills: "Programming",
//         hoursPerWeek: "10",
//         externalLink: "https://www.google.com",
//         uri: require('../../../assets/6.jpg')
//       },
//       {
//         id: "7",
//         name: "Example Project 7",
//         description: "dka;ldksngadgsn;sadgks",
//         skills: "html, css",
//         hoursPerWeek: "5",
//         externalLink: "bing.com",
//         uri: require('../../../assets/7.jpg')
//       },
//       {
//         id: "8",
//         name: "Project 8",
//         description: ";lskdgn;klsgnl;ksagn;laskdg",
//         hoursPerWeek: "8",
//         externalLink: "yahoo.com",
//         uri: require('../../../assets/8.jpg')
//       },
//       {
//         id: "9",
//         name: "Project 9",
//         description: "kdsn;gkdsng;lskdgn;lsadg",
//         hoursPerWeek: "3",
//         externalLink: "images.google.com",
//         uri: require('../../../assets/9.jpg')
//       },
//       {
//         id: "10",
//         name: "Project X",
//         description: "lkdgnsd;lkzgnsad;lgnasdg",
//         hoursPerWeek: "7",
//         externalLink: "maps.google.com",
//         uri: require('../../../assets/10.jpg')
//       },
//       {
//         id: "11",
//         name: "Project Eleven",
//         description: "I am a project!",
//         hoursPerWeek: "30",
//         externalLink: "twitter.com",
//         uri: require('../../../assets/11.jpg')
//       },
//       {
//         id: "12",
//         name: "12th Project",
//         description: "Project number 12 kjdfs kldsfjkl sdfjklfds jkldsf jklsdf",
//         hoursPerWeek: "7",
//         externalLink: "gatech.edu",
//         uri: require('../../../assets/12.jpg')
//       },
//       {
//         id: "13",
//         name: "Project Number 13",
//         description: "It was a bright cold day in April, and the clocks were striking thirteen.",
//         hoursPerWeek: "6",
//         externalLink: "goodreads.com",
//         uri: require('../../../assets/13.jpg')
//       },
//       {
//         id: "14",
//         name: "Fourteenth Project",
//         description: "There are 14 days in two weeks!",
//         hoursPerWeek: "12",
//         externalLink: "canvas.gatech.edu",
//         uri: require('../../../assets/14.jpg')
//       },
//       {
//         id: "15",
//         name: "Final Project",
//         description: "'Cause when you're fifteen, Somebody tells you they love you, You're gonna believe them, And when you're fifteen",
//         hoursPerWeek: "3",
//         externalLink: "https://genius.com/Taylor-swift-fifteen-lyrics",
//         uri: require('../../../assets/15.jpg')
//       }
//     ]);
//   }
// }

// var bool = true;
// var projectDetails = getProjectDetails(bool);
var viewSwitch = false;
var x = 0;
var index = 0;

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

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

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
    // if (this.state.currentIndex == projectDetails.length) {
    //   if (bool) {
    //     bool = false;
    //   } else {
    //     bool = true;
    //   }
    //   projectDetails = getProjectDetails(bool);
    //   this.state.currentIndex = 0;
    // }
    const { navigate } = this.props.navigation;

    return projectDetails.map((item, i) => {

      if (i < this.state.currentIndex) {
        return null
      } else if (i == this.state.currentIndex) {
        x = projectDetails.indexOf(item);

        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: CARD_HEIGHT - 100, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: '#046307', color: '#046307', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: '#a40000', color: '#a40000', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
            </Animated.View>


            <ImageBackground
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderWidth: 3, borderColor: 'rgba(179, 163, 105, 1)', borderRadius: 20, overflow: 'hidden' }}
              imageStyle={{ borderRadius: 17 }}
              source={item.uri} >
              <Text style={styles.textAbstract}>
                <Text style={styles.textTitle}>{item.name}{'\n'}</Text>
                <Text style={styles.textMain}>{'\n'}{item.shortDescription}{'\n'}</Text>
                <NiceButton
                  title="View Project Details"
                  onPress={() => this.props.navigation.navigate("Page2")}
                />
              </Text>
            </ImageBackground>
          </Animated.View>
        )
      } else {
        return (

          <Animated.View
            key={item.id} style={[{ opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }], height: CARD_HEIGHT - 100, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: '#046307', color: '#046307', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: '#a40000', color: '#a40000', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
            </Animated.View>


            <ImageBackground
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderWidth: 3, borderColor: 'rgba(179, 163, 105, 1)', borderRadius: 20, overflow: 'hidden' }}
              imageStyle={{ borderRadius: 17 }}
              source={item.uri}>
              <Text style={styles.textAbstract}>
                <Text style={styles.textTitle}>{item.name}{'\n'}</Text>
                <Text style={styles.textMain}>{'\n'}{item.shortDescription}{'\n'}</Text>
                <NiceButton
                  title="View Project Details"
                  onPress={() => {
                    this.props.navigation.navigate("Page2")
                  }}
                />
              </Text>
            </ImageBackground>
          </Animated.View>
        )
      }
    }).reverse()
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}>
        </View>
        <View style={{ flex: 1 }}>
          {this.renderUsers()}
          <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-evenly', top: SCREEN_HEIGHT * .73 }}>
            <TouchableOpacity style={styles.leftButton} >
              <Text style={styles.leftRightNav}> &#171; </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.heartButton} onPress={() => {
              this.props.navigation.navigate("Page3")
            }}>
              <Text style={styles.heart}> &#9829;</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton}>
              <Text style={styles.leftRightNav}> &#187; </Text>
            </TouchableOpacity>
          </View>
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

// class NavigatePages extends React.Component {
//   render() {
//     return (

//     );
//   }

// }


class SavedProjects extends React.Component {
  render() {
    // for (var i = 0; i < likedProjects.length - 1; i++) {
    //   index = i;
    //   this.displayProjects(index);
    // }
    // return (

    // )
    // displayProjects() {
    //   <View style={styles.favoritedPage}>
    //     <Text style={{ color: 'rgba(179, 163, 105, 1)', bottom: SCREEN_HEIGHT * .34, fontSize: 27, fontWeight: '600' }}>Favorited Projects</Text>
    //     <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-evenly', }}>
    //       <ImageBackground style={styles.favoritedImages} source={projectDetails[index].uri}>
    //         <Text style={styles.favoritedTitle}> hello </Text>
    //       </ImageBackground>
    //     </View>
    //     <TouchableOpacity
    //       style={{ top: SCREEN_HEIGHT * .3, backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 5, height: 30, width: 80 }}
    //       onPress={() => this.props.navigation.goBack()}>
    //       <Text style={{ top: 5, textAlign: 'center', color: 'white', 'fontWeight': 'bold', fontSize: 15 }}> Back </Text>
    //     </TouchableOpacity>
    //   </View>
    // }

    return (
      <View style={styles.favoritedPage}>
        <Text style={{ color: 'rgba(179, 163, 105, 1)', bottom: SCREEN_HEIGHT * .34, fontSize: 27, fontWeight: '600' }}>Favorited Projects</Text>
        <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-evenly', }}>
          <ImageBackground style={styles.favoritedImages} >
            <Text style={styles.favoritedTitle}> hello </Text>
          </ImageBackground>
        </View>
        <TouchableOpacity
          style={{ top: SCREEN_HEIGHT * .3, backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 5, height: 30, width: 80 }}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={{ top: 5, textAlign: 'center', color: 'white', 'fontWeight': 'bold', fontSize: 15 }}> Back </Text>
        </TouchableOpacity>
      </View>
    );
  }


}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ bottom: 230, textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: 'rgba(179, 163, 105, 1)' }}>Project Details</Text>
        <Text style={{ bottom: 210, textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'rgba(179, 163, 105, 1)' }}>  {projectDetails[x].name}</Text>
        <Text style={{ bottom: 150, textAlign: 'left', paddingLeft: 25, fontSize: 18, fontWeight: '500' }}>Biography: {'\n'}{projectDetails[x].bio}{'\n'}</Text>
        <Text style={{ bottom: 150, textAlign: 'left', paddingLeft: 25, fontSize: 18, fontWeight: '500' }}>Skills: {'\n'}{projectDetails[x].skills}{'\n'}</Text>
        <Text style={{ bottom: 150, textAlign: 'left', paddingLeft: 25, fontSize: 18, fontWeight: '500' }}>Hours per Week: {'\n'}{projectDetails[x].hoursPerWeek}{'\n'}</Text>
        <Text style={{ bottom: 150, textAlign: 'left', paddingLeft: 25, fontSize: 18, fontWeight: '500' }}>Link: {'\n'}{projectDetails[x].externalLink}{'\n'}</Text>
        <TouchableOpacity
          style={{ left: 30, top: SCREEN_HEIGHT * .05, backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 5, height: 30, width: 80 }}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={{ top: 5, textAlign: 'center', color: 'white', 'fontWeight': 'bold', fontSize: 15 }}> Back </Text>
        </TouchableOpacity>
      </View>
    );
  }
}



const Stack = createStackNavigator();

export default function ViewProject(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="Page1">
      <Stack.Screen name="Page1" component={Card} />
      <Stack.Screen name="Page2" component={DetailsScreen} />
      <Stack.Screen name="Page3" component={SavedProjects} />
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
    top: CARD_HEIGHT * 0.55,
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
    fontSize: 17,
    fontWeight: '300',
    textAlign: 'center',
    justifyContent: 'center'
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
  },
  button: {
    alignContent: 'center',
    fontWeight: 'bold',
    paddingTop: CARD_HEIGHT * .1,
    paddingLeft: SCREEN_WIDTH * .28
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  rightButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: 'rgba(179, 163, 105, .7)',
    top: 20,
    // right: 50
  },
  leftButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: 'rgba(179, 163, 105, .7)',
    top: 20,
    right: 15
  },
  leftRightNav: {
    bottom: 10,
    right: 5,
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
    fontSize: 70
  },
  heart: {
    top: 5,
    right: 15,
    color: 'rgba(179, 163, 105, .7)',
    fontSize: 80
  },
  favoritedImages: {
    width: 40,
    height: 40
  },
  favoritedTitle: {

  },
  favoritedPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT * .87,
    width: SCREEN_WIDTH * .95,
    position: 'absolute',
    top: CARD_HEIGHT * .1,
    left: SCREEN_WIDTH * .027,
    borderColor: 'rgba(179, 163, 105, 1)',
    borderWidth: 3,
    borderRadius: 15
  }
})