// import * as React from 'react';
import React from 'react';
import { SafeAreaView, ScrollView, Switch, TextInput, KeyboardAvoidingView, Linking, TouchableOpacity, ImageBackground, View, Text, StyleSheet, Dimensions, Animated, PanResponder, Touchable, Button } from 'react-native';
// import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shouldUseActivityState, { screensEnabled } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { getAllProjects, getProject, getGTUsername, addProjectInterests, deleteProjectInterest } from '../../store';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import { styles as global } from '../../globalStyles'


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

var gtUname = '';

var projectDetails = [
  // {
  //   id: "1",
  //   name: "Example Project",
  //   projectDescription: "hdsalkgdsgsdgadsfadfasdadggsd",
  //   bio: "dfskj?",
  //   skills: "Programming",
  //   hoursPerWeek: "10",
  //   externalLink: "https://www.google.com",
  //   uri: require('../../../assets/1.jpg')
  // },
  // {
  //   id: "2",
  //   projectTitle: "Example Project 2",
  //   projectDescription: "hdsalkgdsgsdg",
  //   bio: "dka;ldksngadgsn;sadgks",
  //   skills: "html, css",
  //   hoursPerWeek: "5",
  //   externalLink: "bing.com",
  //   uri: require('../../../assets/2.jpg')
  // },
  // {
  //   id: "3",
  //   projectTitle: "Project 3",
  //   projectDescription: "hdsalkgdsgsdg",
  //   bio: ";lskdgn;klsgnl;ksagn;laskdg",
  //   hoursPerWeek: "8",
  //   externalLink: "yahoo.com",
  //   uri: require('../../../assets/3.jpg')
  // },
  // {
  //   id: "4",
  //   projectTitle: "Project 4",
  //   projectDescription: "hdsalkgdsgsdg",
  //   bio: "kdsn;gkdsng;lskdgn;lsadg",
  //   hoursPerWeek: "3",
  //   externalLink: "images.google.com",
  //   uri: require('../../../assets/4.jpg')
  // },
  // {
  //   id: "5",
  //   projectTitle: "Project 5",
  //   projectDescription: "hdsalkgdsgsdg",
  //   bio: "lkdgnsd;lkzgnsad;lgnasdg",
  //   hoursPerWeek: "7",
  //   externalLink: "maps.google.com",
  //   uri: require('../../../assets/5.jpg')
  // }
  {
    id: "-1",
    projectTitle: "No Projects Found",
    projectDescription: "No projects found with the given search parameters",
    // bio: "lkdgnsd;lkzgnsad;lgnasdg",
    // hoursPerWeek: "7",
    // externalLink: "maps.google.com",
    uri: require('../../../assets/5.jpg')
  }
]

var viewSwitch = false;
var x = 0;
var y = 0;
var index = 0;

const getProjs = (callback) => {
  getAllProjects()
    .then((resp) => {
      let body = resp.body;
      // console.log(body);
      projectDetails = body;
      // this.forceUpdate();
      callback();
    })
    .catch((err) => {
      console.log(err);
    })
}

export class Card extends React.Component {

  constructor() {
    super()


    getAllProjects()
      .then((resp) => {
        let body = resp.body;
        // console.log(body);
        projectDetails = body;
        this.forceUpdate();
        // callback();
      })
      .catch((err) => {
        console.log(err);
      })
    // ;
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
            // let gtUname = getGTUsername();
            console.log(gtUname)
            addProjectInterests({
              'gtUsername': gtUname,
              'projectIDs': [projectDetails[x - 1].id]
            })
              .then((resp) => {
                console.log(resp.body)
              })
              .catch((err) => { console.log(err) })
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true
          }).start(() => {
            // console.log("left");
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
            // let gtUname = getGTUsername();
            console.log(gtUname)
            deleteProjectInterest({
              'gtUsername': gtUname,
              'projectId': projectDetails[x - 1].id
            })
              .then((resp) => {
                console.log(resp.body)
              })
              .catch((err) => { console.log(err) })
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

  // componentDidUpdate() {
  //   getAllProjects()
  //   .then((resp) => {
  //     let body = resp.body;
  //     // console.log(body);
  //     projectDetails = body;
  //     // this.forceUpdate();
  //     // callback();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }


  renderUsers = () => {
    const { navigate } = this.props.navigation;

    return projectDetails.map((item, i) => {

      if (i < this.state.currentIndex) {
        return null
      } else if (i == this.state.currentIndex) {
        x = projectDetails.indexOf(item);

        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: CARD_HEIGHT - 150, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: '#046307', color: '#046307', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: '#a40000', color: '#a40000', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
            </Animated.View>


            <ImageBackground
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderWidth: 3, borderColor: 'rgba(179, 163, 105, 1)', borderRadius: 20, overflow: 'hidden' }}
              imageStyle={{ borderRadius: 17 }}
              source={require('../../../assets/1.jpg')} >
              <View style={styles.textAbstract}>
                <Text numberOfLines={1} style={styles.textTitle}>{item.projectTitle}</Text>
                <Text numberOfLines={3} style={[styles.textMain]}>{item.projectDescription}</Text>
                <TouchableOpacity style={{ marginVertical: 20, position: 'absolute', top: CARD_HEIGHT * 0.3 - 120 }} onPress={() => this.props.navigation.navigate("Page2")}>
                  <Text style={[styles.buttonText]}>View Project Details</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Animated.View>
        )
      } else {
        return (

          <Animated.View
            key={item.id} style={[{ opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }], height: CARD_HEIGHT - 150, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: '#046307', color: '#046307', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: '#a40000', color: '#a40000', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
            </Animated.View>


            <ImageBackground
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderWidth: 3, borderColor: 'rgba(179, 163, 105, 1)', borderRadius: 20, overflow: 'hidden' }}
              imageStyle={{ borderRadius: 17 }}
              source={require('../../../assets/1.jpg')}>
              <View style={styles.textAbstract}>
                <Text numberOfLines={1} style={styles.textTitle}>{item.projectTitle}</Text>
                <Text numberOfLines={3} style={[styles.textMain]}>{item.projectDescription}</Text>
                <TouchableOpacity style={{ marginVertical: 20, position: 'absolute', top: CARD_HEIGHT * 0.3 - 120 }} onPress={() => { x = this.state.currentIndex; this.props.navigation.navigate("Page2") }}>
                  <Text style={[styles.buttonText]}>View Project Details</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Animated.View>
        )
      }
    }).reverse()
  }


  static reRender() {
    // this.forceUpdate();
  }



  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 100 }}>
          <TouchableOpacity
            style={{ alignContent: 'center', top: SCREEN_HEIGHT * .07, left: SCREEN_WIDTH * .73, height: 40, width: 100, backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 10 }}
            onPress={() => { this.props.navigation.navigate("Page4") }} >
            <Text style={{ top: 10, textAlign: 'center', color: 'white', fontWeight: 'bold', alignContent: 'center' }}>Search/Filter</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {this.renderUsers()}
          <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-evenly', top: SCREEN_HEIGHT * .73 }}>
            <TouchableOpacity style={styles.leftButton} onPress={() => {
              this.setState({
                currentIndex: (this.state.currentIndex - 1) >= 0 ?
                  (this.state.currentIndex - 1) : projectDetails.length - 1
              }, () => {
                this.position.setValue({ x: 0, y: 0 })
              })
            }}>
              <Text style={styles.leftRightNav}> &#171; </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.heartButton} onPress={() => {
              this.props.navigation.navigate("Page3")
            }}>
              <Text style={styles.heart}> &#9829;</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton} onPress={() => {
              this.setState({
                currentIndex: (this.state.currentIndex + 1) < projectDetails.length ?
                  (this.state.currentIndex + 1) : 0
              }, () => {
                this.position.setValue({ x: 0, y: 0 })
              })
            }}>
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


class SavedProjects extends React.Component {
  render() {
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

// render() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.detailsPage}>
//         <Text style={{ top: 20, textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: 'rgba(179, 163, 105, 1)' }}>User Details</Text>
//         <Text style={{ top: 27, textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'rgba(179, 163, 105, 1)' }}> {userDetails[x].firstName} {userDetails[x].middleName} {userDetails[x].lastName}</Text>
//         <Text style={{ top: 50, textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>Email: {'\n'}{userDetails[x].email}{'\n'}</Text>
//         <Text style={{ top: 50, textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>GT Username: {'\n'}{userDetails[x].gtUsername}{'\n'}</Text>
//         <Text style={{ top: 50, textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>Bio: {'\n'}{userDetails[x].bio}{'\n'}</Text>
//         <Text style={{ top: 50, textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>Major: {'\n'}{userDetails[x].major}{'\n'}</Text>
//         <Text style={{ top: 50, textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>Degree: {'\n'}{userDetails[x].degree}{'\n'}</Text>
//         <Text style={{ top: 50, textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>Skills: {'\n'}{userDetails[x].skills}{'\n'}</Text>
//         <Text style={{ top: 50, textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>Start Date: {'\n'}{userDetails[x].start_date}{'\n'}</Text>
//         <Text style={{ top: 50, textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>End Date: {'\n'}{userDetails[x].end_date}{'\n'}</Text>
//         <TouchableOpacity
//           style={{ left: SCREEN_WIDTH * .38, top: SCREEN_HEIGHT * .1, backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 5, height: 30, width: 80 }}
//           onPress={() => this.props.navigation.goBack()}>
//           <Text style={{ top: 5, textAlign: 'center', color: 'white', 'fontWeight': 'bold', fontSize: 15 }}> Back </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


class DetailsScreen extends React.Component {

  constructor() {
    super()

    this.state = {
      project: {
        "id": 21,
        "projectTitle": "",
        "projectDescription": "",
        "startDate": "",
        "endDate": "",
        "weekHours": 7,
        "skills": [],
        "interests": [],
        "major": [],
        "degree": [],
        "experiences": [],
        "links": [],
        "alumni": [{
          "email": "test@test.com",
          "name": "",
        }]
      }
    }
  }

  componentDidMount() {
    var proj = projectDetails[x];
    console.log("TEST");
    console.log(proj.id);
    var projId = proj.id;
    getProject({ projId: projId })
      .then((resp) => {
        let body = resp.body;
        console.log(body);
        this.setState({ project: body })
      })
      .catch((err) => console.log(err))

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.detailsPage}>
          <Text style={{ top: 20, textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: 'rgba(179, 163, 105, 1)' }}>{this.state.project.projectTitle}</Text>
          <Text style={{ top: 27, textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'rgba(179, 163, 105, 1)' }}> Project Details </Text>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#B3A369',
            paddingLeft: 15,
          }}>{'\n\n'}Description:</Text>
          <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.projectDescription}</Text>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#B3A369',
            paddingLeft: 15,
          }}>Skills:</Text>
          <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.skills.map(({ skill }) => skill).join(', ')}</Text>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#B3A369',
            paddingLeft: 15,
          }}>Interests:</Text>
          <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.interests.map(({ interest }) => interest).join(', ')}</Text>

          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#B3A369',
            paddingLeft: 15,
          }}>Majors:</Text>
          <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.major.map(({ major }) => major).join(', ')}</Text>

          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#B3A369',
            paddingLeft: 15,
          }}>Degrees:</Text>
          <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.degree.map(({ degree }) => degree).join(', ')}</Text>

          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#B3A369',
            paddingLeft: 15,
          }}>Hours per Week:</Text>
          <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.weekHours}</Text>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#B3A369',
            paddingLeft: 15,
          }}>Info Link:</Text>
          <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.links.join(', ')}</Text>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#B3A369',
            paddingLeft: 15,
          }}>Project Alumni:</Text>
          <Text style={{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' }}>{this.state.project.alumni[0].name}</Text>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#B3A369',
            paddingLeft: 15,
          }}>Project Alumni Email:</Text>
          <Text
            onPress={() => Linking.openURL('mailto:' + this.state.project.alumni[0].email)}
            style={[{ textAlign: 'left', paddingLeft: 15, fontSize: 18, fontWeight: '500' },
            { color: '#0000EE', fontWeight: 'bold' }]}>
            {this.state.project.alumni[0].email}
          </Text>
          <Text style={{ height: 50 }}></Text>
        </ScrollView>
        <TouchableOpacity
          style={{ left: SCREEN_WIDTH * .005, top: SCREEN_HEIGHT * .4, backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 5, height: 30, width: 80 }}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={{ top: 5, textAlign: 'center', color: 'white', 'fontWeight': 'bold', fontSize: 15 }}> Back </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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


export const ProjectFilterPage = ({ navigation }) => {
  const [search, onChangeSearch] = React.useState('');

  const [hours, onChangeHours] = React.useState('');
  const [startDate, onChangeStart] = React.useState(null);
  const [endDate, onChangeEnd] = React.useState(null);
  // const [minEnd, onChangeMinEnd] = React.useState('');
  // const [maxEnd, onChangeMaxEnd] = React.useState('');

  const [interests, onChangeInterests] = React.useState([]);
  const [skills, onChangeSkills] = React.useState([]);

  const submit = () => {
    let query = {
      'search': search,
      // 'skills': JSON.stringify(skills),
      // 'interests': JSON.stringify(interests),
      // 'weekHours': hours,
      'startDate': startDate,
      'endDate': endDate
    }

    console.log(query);

    getAllProjects(query)
      .then((resp) => {
        let body = resp.body;
        console.log(body);
        if (body.length != 0) {
          projectDetails = body;
          new Card();
          navigation.navigate("Page1");
        } else {
          alert("No Projects Found with the given parameters");
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <View style={style.container} >
      <Text style={[style.label, { fontSize: 20 }]}>Search and Filters</Text>
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={{ padding: 5 }}></View>
          <Text style={style.label}>Keyword Search</Text>
          <TextInput
            placeholder="Search"
            style={style.inputs}
            value={search}
            onChangeText={(text) => onChangeSearch(text)}
          />
          <Text style={style.label}>Hours/Week Required</Text>
          <TextInput
            placeholder="Hours/Week"
            style={style.inputs}
            value={hours}
            onChangeText={(text) => onChangeHours(text)}
          />
          <Text style={style.label}>Start Date</Text>
          <DatePicker
            placeholder="Select a date..."
            date={startDate}
            onDateChange={(date) => { onChangeStart(date) }}
            mode='date'
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                marginBottom: 15,
                borderRadius: 15,
                backgroundColor: '#B3A36975',
                padding: 10,
                paddingLeft: 20,
                height: 40
              },
              placeholderText: {
                color: 'black'
              }
              // ... You can check the source to find the other keys.
            }}
          />
          <Text style={style.label}>End Date</Text>
          <DatePicker
            placeholder="Select a date..."
            date={endDate}
            onDateChange={(date) => { onChangeEnd(date) }}
            mode='date'
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                marginBottom: 15,
                borderRadius: 15,
                backgroundColor: '#B3A36975',
                padding: 10,
                paddingLeft: 20,
                height: 40
              },
              placeholderText: {
                color: 'black'
              }
              // ... You can check the source to find the other keys.
            }}
          />
          <Text style={style.label}>Skills Required</Text>
          <SectionedMultiSelect
            items={skillLibrary}
            uniqueKey="id"
            subKey="children"
            selectText="Select your skills..."
            IconRenderer={Icon}
            showDropDowns={false}
            readOnlyHeadings={true}
            hideSearch={true}
            showChips={false}
            onSelectedItemsChange={onChangeSkills}
            selectedItems={skills}
            styles={[global, localStyle]}
          />
          <Text style={style.label}>Project Interests</Text>
          <SectionedMultiSelect
            items={interestLibrary}
            uniqueKey="id"
            subKey="children"
            selectText="Select some interests..."
            IconRenderer={Icon}
            showDropDowns={false}
            readOnlyHeadings={true}
            hideSearch={true}
            showChips={false}
            onSelectedItemsChange={onChangeInterests}
            selectedItems={interests}
            styles={[global, localStyle]}
          />
          <View style={{ padding: 40 }}></View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={style.buttonContainer}>
        <TouchableOpacity style={{ right: 40, backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 15, height: 40, width: 150 }} onPress={() => navigation.goBack()}>
          <Text style={{ color: 'white', textAlign: 'center', top: 10, fontSize: 15, fontWeight: 'bold' }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ left: 40, backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 15, height: 40, width: 150 }} onPress={() => submit()}>
          <Text style={{ color: 'white', textAlign: 'center', top: 10, fontSize: 15, fontWeight: 'bold' }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const Stack = createStackNavigator();

export default function ViewProject(props) {
  gtUname = props.route.params.gtUsername;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="Page1">
      <Stack.Screen name="Page1" component={Card} />
      <Stack.Screen name="Page2" component={DetailsScreen} />
      <Stack.Screen name="Page3" component={SavedProjects} />
      <Stack.Screen name="Page4" component={ProjectFilterPage} />
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
    flex: 1,
    color: 'white',
    // padding: 20,
    alignItems: 'center',
    height: CARD_HEIGHT * 0.3,
    top: CARD_HEIGHT * 0.55,
    backgroundColor: 'rgba(179, 163, 105, .7)',
    fontSize: 15,
    fontWeight: '300'
  },
  textTitle: {
    paddingTop: 15,
    fontSize: 25,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
    width: '85%'
  },
  textHours: {
    fontSize: 17,
    fontWeight: '300'
  },
  textMain: {
    fontSize: 17,
    fontWeight: '300',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    width: '85%'
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
    paddingLeft: SCREEN_WIDTH * .28,
    top: CARD_HEIGHT
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
    top: -20,
    // right: 50
  },
  leftButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: 'rgba(179, 163, 105, .7)',
    top: -20,
    right: 15
  },
  leftRightNav: {
    bottom: 12,
    right: 7,
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
    fontSize: 70
  },
  heart: {
    top: -35,
    right: 15,
    color: 'rgba(179, 163, 105, .7)',
    fontSize: 80
  },
  favoritedImages: {
    width: 40,
    height: 40
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
  },
  detailsPage: {
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
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
const style = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: -40,
    alignSelf: 'center',
    //width: "100%",
    backgroundColor: '#F5F5F5',
    flexDirection: "row",
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 50,
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
});