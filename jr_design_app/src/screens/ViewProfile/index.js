// import * as React from 'react';
import React from 'react';
import { SafeAreaView, ScrollView, Linking, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, ImageBackground, View, Text, StyleSheet, Dimensions, Animated, PanResponder, Touchable, Button } from 'react-native';
// import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shouldUseActivityState, { screensEnabled } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { fromLeft } from 'react-navigation-transitions';
import { render } from 'react-dom';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addAlumniSavedStudents, getAllStudents, getStudent,deleteAlumniSavedStudents } from '../../store';

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
var username = '';

var userDetails = [{
  id: "-1",
  projectTitle: "No Profiles Found",
  projectDescription: "No student profiles found with the given search parameters",
  // bio: "lkdgnsd;lkzgnsad;lgnasdg",
  // hoursPerWeek: "7",
  // externalLink: "maps.google.com",,
  gtUsername: '',
  uri: require('../../../assets/5.jpg')
}]

var viewSwitch = false;
var x = 0;
var index = 0;

export class Card extends React.Component {

  constructor() {
    super()
    var refresh = true;

    try {
      console.log(this.props);
      refresh = this.props.route.params.refresh;
    } catch(e) {
      console.log(e);
      refresh = true;
    }
    if (refresh) {
      getAllStudents()
      .then((resp) => {
        let body = resp.body;
        console.log("Inside card");
        console.log(body);
        userDetails = body;
        this.forceUpdate();
        // callback();
      })
      .catch((err) => {
        console.log(err);
      }) 
    }

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
          // var idx = 
         
          // })
          // })
          console.log(username);
          addAlumniSavedStudents({
            'username': username,
            'gtUsername': userDetails[this.state.currentIndex].gtUsername
          })
          .then((resp) => {
            console.log(resp.body)
          })
          .catch((err) => { console.log(err) })
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
            , useNativeDriver: true
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
          })})
              
        }
        else if (gestureState.dx < -120) {
          deleteAlumniSavedStudents({
            'username': username,
            'gtUsername': userDetails[this.state.currentIndex].gtUsername
          })
            .then((resp) => {
              console.log(resp.body)
            })
            .catch((err) => { console.log(err) })
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
          // })
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
    const { navigate } = this.props.navigation;

    return userDetails.map((item, i) => {

      if (i < this.state.currentIndex) {
        return null
      } else if (i == this.state.currentIndex) {
        x = userDetails.indexOf(item);

        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.gtUsername} style={[this.rotateAndTranslate, { height: CARD_HEIGHT - 150, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

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
              <Text numberOfLines={1} style={styles.textTitle}>{item.firstName} {item.middleName} {item.lastName}</Text>
              <Text numberOfLines={3} style={[styles.textMain]}>{item.bio}</Text>
                {/* <Text style={styles.textMain}>{'\n'}{item.degree}</Text> */}
                {/* <Text style={styles.textMain}>{'\n'}{item.major}{'\n'}</Text> */}
                {/* <TouchableOpacity style={{ alignCenter: 'center' }} onPress={() => this.props.navigation.navigate("Page2")}>
                  <Text style={{ left: 135, top: 40, color: 'white', fontSize: 15, fontWeight: 'bold' }}>View User Details</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={{ marginVertical: 20, position: 'absolute', top: CARD_HEIGHT * 0.3 - 120 }} onPress={() => { x = this.state.currentIndex; this.props.navigation.navigate("Page2") }}>
                  <Text style={[styles.buttonText]}>View User Details</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Animated.View>
        )
      } else {
        return (

          <Animated.View
            key={item.gtUsername} style={[{ opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }], height: CARD_HEIGHT - 150, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: '#046307', color: '#046307', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: '#a40000', color: '#a40000', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
            </Animated.View>


            <ImageBackground
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderWidth: 3, borderColor: 'rgba(179, 163, 105, 1)', borderRadius: 20, overflow: 'hidden' }}
              imageStyle={{ borderRadius: 17 }}
              source={require('../../../assets/1.jpg')} >
              <View style={styles.textAbstract}>
              <Text numberOfLines={1} style={styles.textTitle}>{item.firstName} {item.middleName} {item.lastName}</Text>
              <Text numberOfLines={3} style={[styles.textMain]}>{item.bio}</Text>
                {/* <Text style={styles.textMain}>{'\n'}{item.degree}</Text> */}
                {/* <Text style={styles.textMain}>{'\n'}{item.major}{'\n'}</Text> */}
                {/* <TouchableOpacity style={{ alignCenter: 'center' }} onPress={() => this.props.navigation.navigate("Page2")}>
                  <Text style={{ left: 135, top: 40, color: 'white', fontSize: 15, fontWeight: 'bold' }}>View User Details</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={{ marginVertical: 20, position: 'absolute', top: CARD_HEIGHT * 0.3 - 120 }} onPress={() => { x = this.state.currentIndex; this.props.navigation.navigate("Page2") }}>
                  <Text style={[styles.buttonText]}>View User Details</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Animated.View>
        )
      }
    }).reverse()
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
          <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-evenly', top: SCREEN_HEIGHT * .745 }}>
            <TouchableOpacity style={styles.leftButton} onPress={() => {
              this.setState({
                currentIndex: (this.state.currentIndex - 1) >= 0 ?
                  (this.state.currentIndex - 1) : userDetails.length - 1
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
                currentIndex: (this.state.currentIndex + 1) < userDetails.length ?
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


class SavedUsers extends React.Component {
  render() {
    return (
      <View style={styles.favoritedPage}>
        <Text style={{ color: 'rgba(179, 163, 105, 1)', bottom: SCREEN_HEIGHT * .34, fontSize: 27, fontWeight: '600' }}>Favorited Users</Text>
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

  constructor() {
    super()

    this.state = {
      profile: {
        "gtUsername": "",
        "firstName": "",
        "middleName": "",
        "lastName": "",
        "weekHours": "",
        "skills": [],
        "interests": [],
        "major": [],
        "degree": [],
        "experiences": [],
        "links": []
      }
    }
  }

  componentDidMount() {
    var proj = userDetails[x];
    console.log("TEST");
    console.log(proj);
    // var projId = proj.id;
    getStudent({ gtUsername: proj.gtUsername })
      .then((resp) => {
        let body = resp.body;
        console.log(body);
        this.setState({ profile: body })
      })
      .catch((err) => console.log(err))

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.detailsPage}>
          <Text
          style={{ top: 20, textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: 'rgba(179, 163, 105, 1)' }}>
            { this.state.profile.firstName || "" } {this.state.profile.lastName || ""}
          </Text>
          <Text style={{ top: 27, textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'rgba(179, 163, 105, 1)' }}> User Details </Text>
          <Text style={[style.label, {marginTop: 15}]}>Email</Text>
          <Text 
              onPress = {() => Linking.openURL('mailto:'+ this.state.profile.email)}
              style = {{paddingLeft: 15, color: '#0000EE', fontWeight: 'bold'}}
          >
              { this.state.profile.email || "" }
          </Text>
          <Text style = {style.label}>Degree</Text>
          <Text style = {{ paddingLeft: 15}}>{ this.state.profile.degree.map( ({ degree }) => degree).join(', ') || "" }</Text>
          <Text style = {style.label}>Major</Text>
          <Text style = {{ paddingLeft: 15}}>{ this.state.profile.major.map( ({ major }) => major).join(', ') || "" }</Text>
          <Text style = {style.label}>Skills</Text>
          <Text style = {{ paddingLeft: 15}}>{ this.state.profile.skills.map( ({ skill }) => skill).join(', ') || "" }</Text>
          <Text style = {style.label}>Interests</Text>
          <Text style = {{ paddingLeft: 15}}>{ this.state.profile.interests.map( ({ interest }) => interest).join(', ') || "" }</Text>
          <Text style = {style.label}>Experiences</Text>
          {this.state.profile.experiences.map((element, index) => {
              return (<View key = {index}>
                  <Text style={[style.label, { fontSize: 18, fontStyle: 'italic' }]}>Company</Text>
                  <Text style={{  paddingLeft: 15, color: 'black' }}>{element.companyName || "not found"}</Text>
                  <Text style={[style.label, { fontSize: 18, fontStyle: 'italic' }]}>Position</Text>
                  <Text style={{  paddingLeft: 15, color: 'black' }}>{element.position || "not found"}</Text>
                  <View style={{ textAlign: 'stretch', flexDirection: "row",alignItems: 'stretch',justifyContent: 'center' }}>
                      <Text style={[style.label,
                      { marginHorizontal: 20, width: '45%' }, 
                      { fontSize: 18, fontStyle: 'italic' }]}>Start Date</Text>
                      <Text style={[style.label,
                      { marginHorizontal: 20, width: '45%' },
                      { fontSize: 18, fontStyle: 'italic' }]}>End Date</Text>
                  </View>
                  <View style={{ textAlign: 'center', flexDirection: "row", alignItems: 'stretch', justifyContent: 'center' }}>
                      {<Text style={{ paddingLeft: 15, marginHorizontal: 20, width: '45%' }}>{element.start_date.split('T')[0]}</Text>}
                      {<Text style={{ paddingLeft: 15, marginHorizontal: 20, width: '45%' }}>{element.end_date.split('T')[0]}</Text> }
                  </View>
                  <Text style={[style.label, { fontSize: 18, fontStyle: 'italic' }]}>Description</Text>
                  <Text style={{ paddingLeft: 15, color: 'black' }}>{element.expDescription}</Text>
              </View>
          )})}
          <Text style = {style.label}>External Links</Text>
          {this.state.profile.links.map((element, index) => {
              return (<View key = {index}>
                  <Text style={[style.label, {fontSize: 18, fontStyle: 'italic'}]}>Link Label</Text>
                  <Text style={{paddingLeft: 15, color: 'black'}}>{element.label || "not found"}</Text>
                  <Text style={[style.label, {fontSize: 18, fontStyle: 'italic'}]}>Link Address</Text>
                  <Text style={{paddingLeft: 15, color: '#0000EE', fontWeight: 'bold'}}
                    onPress={() => Linking.openURL('http://' + element.address)}>
                      {element.address || "not found"}</Text>
              </View>
              )
          })}
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

const degreeLibrary = [{
  name: "Degree",
  id: 0,
  children: [{
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

export const ProfileFilterPage = ({ navigation }) => {
  const [search, onChangeSearch] = React.useState('');

  const [degree, onChangeDegree] = React.useState(userDetails.degree);
  const [major, onChangeMajor] = React.useState(userDetails.major);
  const [interests, onChangeInterests] = React.useState(userDetails.interests);
  const [skills, onChangeSkills] = React.useState(userDetails.skills);

  const [hours, onChangeHours] = React.useState('');
  const [startDate, onChangeStart] = React.useState(null);
  const [endDate, onChangeEnd] = React.useState(null);

  const submit = () => {
    let query = {
      'search': search,
      'skills': JSON.stringify(skills),
      'interests': JSON.stringify(interests),
      'weekHours': hours,
      'degree': degree,
      'major': major
    }

    console.log(query);

    getAllStudents(query)
      .then((resp) => {
        let body = resp.body;
        console.log(body);
        if (body.length != 0) {
          userDetails = body;
          // new Card();
          navigation.navigate("Page1", {refresh: false});
        } else {
          alert("No Projects Found with the given parameters");
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  return (
    <View style={{
      backgroundColor: '#F5F5F5',
      color: '#F5F5F5',
      opacity: 100,
      alignItems: 'stretch',
      padding: 15,
      marginTop: 30,
      justifyContent: 'center',
      flex: 1
    }} >
      <Text style={[style.label, { fontSize: 20 }]}>Search and Filters</Text>
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={{ padding: 5 }}></View>
          <TextInput
            placeholder="Search"
            style={style.inputs}
            value={search}
            onChangeText={(text) => onChangeSearch(text)}
          />
          <Text style={style.label}>Majors</Text>
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
            onSelectedItemsChange={onChangeMajor}
            selectedItems={major}
            styles={[styles, localStyle]}
          />
          <Text style={style.label}>Degrees</Text>
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
            onSelectedItemsChange={onChangeDegree}
            selectedItems={degree}
            styles={[styles, localStyle]}
          />
          <Text style={style.label}>Skills</Text>
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
          <Text style={style.label}>Areas of Interest</Text>
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
          <Text style={style.label}>Minimum Hours/Week Requested</Text>
          <TextInput
            placeholder="Hours/Week"
            style={style.inputs}
            value={hours}
            onChangeText={(text) => onChangeHours(text)}
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

export default function ViewProfile(props) {
  username = props.route.params.username;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="Page1">
      <Stack.Screen name="Page1" component={Card} />
      <Stack.Screen name="Page2" component={DetailsScreen} />
      <Stack.Screen name="Page3" component={SavedUsers} />
      <Stack.Screen name="Page4" component={ProfileFilterPage} />
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
    top: -50,
    // right: 50
  },
  leftButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: 'rgba(179, 163, 105, .7)',
    top: -50,
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
    top: -65,
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
    // padding: 15,
    height: SCREEN_HEIGHT * .825,
    width: SCREEN_WIDTH * .95,
    position: 'absolute',
    top: CARD_HEIGHT * .1,
    left: SCREEN_WIDTH * .027,
    borderColor: 'rgba(179, 163, 105, 1)',
    borderWidth: 3,
    borderRadius: 15
  }
})
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
    // padding: 15,
    marginTop: 30,
    justifyContent: 'center',
    flex: 1
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B3A369',
    paddingVertical: 10,
    paddingHorizontal: 15
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