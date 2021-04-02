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

const userDetails = {
  email: "aditya.sudarshan@gatech.edu",
  pass: "password",
  name: 'Aditya Sudarshan',
  major: 'Computer Science',
  skills: 'Porgamming',
  degree: 'B.S',
  interests: 'Sports, Gaming, Programming'
};


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const CARD_HEIGHT = SCREEN_HEIGHT * 0.86


const userDetails = [
  {
    id: "1",
    name: "Aditya Sudarshan",
    shortDescription: "3rd yr, computer science",
    bio: "I am a 3rd year computer science major ...",
    skills: "Programming",
    hoursPerWeek: "10",
    externalLink: "github.com/aditya-sudarshan",
    uri: require('../../../assets/defaultskin.png')
  },
  {
    id: "2",
    name: "Andrew Harris",
    shortDescription: "2nd yr, computer science",
    bio: "I am a 2nd yr computer science major",
    skills: "html, css",
    hoursPerWeek: "5",
    externalLink: "github.com/andrew-harris",
    uri: require('../../../assets/defaultskin.png')
  },
  {
    id: "3",
    name: "Hannah Kim",
    shortDescription: "3rd yr cs",
    bio: "I am a 3rd yr cs major",
    hoursPerWeek: "8",
    externalLink: "github.com/hannah-kim",
    uri: require('../../../assets/defaultskin.png')
  },
  {
    id: "4",
    name: "Saket Shirsath",
    shortDescription: "3rd yr cs",
    bio: "I am a 3rd yr cs major",
    hoursPerWeek: "3",
    externalLink: "github.com/saket-shirsath",
    uri: require('../../../assets/defaultskin.png')
  },
  {
    id: "5",
    name: "Sam Sanders",
    shortDescription: "3rd yr cs",
    bio: "I am a 3rd yr cs major",
    hoursPerWeek: "7",
    externalLink: "github.com/sam-sanders",
    uri: require('../../../assets/5.jpg')
  }
]

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
    const { navigate } = this.props.navigation;

    return userDetails.map((item, i) => {

      if (i < this.state.currentIndex) {
        return null
      } else if (i == this.state.currentIndex) {
        x = userDetails.indexOf(item);

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
                  title="View User Details"
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
                  title="View User Details"
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
          <View style={{ flex: 1 }}>
            <NiceButton
              style={{ right: 20 }}
              title="Search/Filter"
              onPress={() => {
                this.props.navigation.navigate("Page4")
              }}
            />
          </View>
          {this.renderUsers()}
          <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-evenly', top: SCREEN_HEIGHT * .73 }}>
            <TouchableOpacity style={styles.leftButton} onPress={() => { NavigateLeft }}>
              <Text style={styles.leftRightNav}> &#171; </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.heartButton} onPress={() => {
              this.props.navigation.navigate("Page3")
            }}>
              <Text style={styles.heart}> &#9829;</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton} onPress={() => { NavigateRight }}>
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

class NavigateLeft extends React.Component {
  render() {
    x--;
    return (
      <Animated.View
        {...this.PanResponder.panHandlers}
        key={userDetails[x].id} style={[this.rotateAndTranslate, { height: CARD_HEIGHT - 100, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

        <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
          <Text style={{ borderWidth: 1, borderColor: '#046307', color: '#046307', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
        </Animated.View>

        <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
          <Text style={{ borderWidth: 1, borderColor: '#a40000', color: '#a40000', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
        </Animated.View>


        <ImageBackground
          style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderWidth: 3, borderColor: 'rgba(179, 163, 105, 1)', borderRadius: 20, overflow: 'hidden' }}
          imageStyle={{ borderRadius: 17 }}
          source={userDetails[x].uri} >
          <Text style={styles.textAbstract}>
            <Text style={styles.textTitle}>{userDetails[x].name}{'\n'}</Text>
            <Text style={styles.textMain}>{'\n'}{userDetails[x].shortDescription}{'\n'}</Text>
            <NiceButton
              title="View User Details"
              onPress={() => this.props.navigation.navigate("Page2")}
            />
          </Text>
        </ImageBackground>
      </Animated.View>
    )
  }
}

class NavigateRight extends React.Component {
  render() {
    x++;
    return (
      <Animated.View
        {...this.PanResponder.panHandlers}
        key={userDetails[x].id} style={[this.rotateAndTranslate, { height: CARD_HEIGHT - 100, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

        <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
          <Text style={{ borderWidth: 1, borderColor: '#046307', color: '#046307', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
        </Animated.View>

        <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
          <Text style={{ borderWidth: 1, borderColor: '#a40000', color: '#a40000', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
        </Animated.View>


        <ImageBackground
          style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderWidth: 3, borderColor: 'rgba(179, 163, 105, 1)', borderRadius: 20, overflow: 'hidden' }}
          imageStyle={{ borderRadius: 17 }}
          source={userDetails[x].uri} >
          <Text style={styles.textAbstract}>
            <Text style={styles.textTitle}>{userDetails[x].name}{'\n'}</Text>
            <Text style={styles.textMain}>{'\n'}{userDetails[x].shortDescription}{'\n'}</Text>
            <NiceButton
              title="View User Details"
              onPress={() => this.props.navigation.navigate("Page2")}
            />
          </Text>
        </ImageBackground>
      </Animated.View>
    )
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
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ bottom: 230, textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: 'rgba(179, 163, 105, 1)' }}>User Details</Text>
        <Text style={{ bottom: 210, textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'rgba(179, 163, 105, 1)' }}>  {userDetails[x].name}</Text>
        <Text style={{ bottom: 150, textAlign: 'left', paddingLeft: 25, fontSize: 18, fontWeight: '500' }}>Biography: {'\n'}{userDetails[x].bio}{'\n'}</Text>
        <Text style={{ bottom: 150, textAlign: 'left', paddingLeft: 25, fontSize: 18, fontWeight: '500' }}>Skills: {'\n'}{userDetails[x].skills}{'\n'}</Text>
        <Text style={{ bottom: 150, textAlign: 'left', paddingLeft: 25, fontSize: 18, fontWeight: '500' }}>Hours per Week: {'\n'}{userDetails[x].hoursPerWeek}{'\n'}</Text>
        <Text style={{ bottom: 150, textAlign: 'left', paddingLeft: 25, fontSize: 18, fontWeight: '500' }}>Link: {'\n'}{userDetails[x].externalLink}{'\n'}</Text>
        <TouchableOpacity
          style={{ left: 30, top: SCREEN_HEIGHT * .05, backgroundColor: 'rgba(179, 163, 105, 1)', borderRadius: 5, height: 30, width: 80 }}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={{ top: 5, textAlign: 'center', color: 'white', 'fontWeight': 'bold', fontSize: 15 }}> Back </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


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

  return (
    <View style={style.container} >
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={{ padding: 5 }}></View>
          <TextInput
            placeholder="Search"
            style={style.inputs}
            value={search}
            onChangeText={(text) => onChangeSearch(text)}
          />
          <Text style={style.label}>Major</Text>
          <DropDownPicker
            items={[
              { label: "Select Major", value: 'default' },
              { label: "Computer Science", value: 'cs' },
              { label: "Computational Media", value: 'cm' },
              { label: "Computer Science (Minor)", value: 'minor' },
              { label: "OMCS", value: 'omcs' },
              { label: "Analytics", value: 'analytics' },
              { label: "Human-Computer Interaction", value: 'hci' },
              { label: "Information Security", value: 'is' },
              { label: "Cybersecurity", value: 'cybersecurity' },
              { label: "Computational Science & Engineering", value: 'cse' },
              { label: "Bioengineering", value: 'bio' }
            ]}
            defaultValue={'default'}
            onChangeItem={onChangeMajor}
          />
          <Text style={style.label}>Hours/Week Requested</Text>
          <TextInput
            placeholder="Hours/Week"
            style={style.inputs}
            value={hours}
            onChangeText={(text) => onChangeHours(text)}
          />
          <Text style={style.label}>Degree</Text>
          <DropDownPicker
            items={[
              { label: "Select Degree", value: 'default' },
              { label: "Bachelor's", value: 'Bachelors' },
              { label: "Master's", value: 'Masters' }
            ]}
            defaultValue={'default'}
            onChangeItem={onChangeDegree}
          />
          <Text style={style.label}>Start Date (DD/MM/YY)</Text>
          <TextInput
            placeholder="Min Start Date"
            style={style.inputs}
            value={minStart}
            onChangeText={(text) => onChangeMinStart(text)}
          />
          <TextInput
            placeholder="Max Start Date"
            style={style.inputs}
            value={maxStart}
            onChangeText={(text) => onChangeMaxStart(text)}
          />
          <Text style={style.label}>End Date (DD/MM/YY)</Text>
          <TextInput
            placeholder="Min End Date"
            style={style.inputs}
            value={minEnd}
            onChangeText={(text) => onChangeMinEnd(text)}
          />
          <TextInput
            placeholder="Max End Date"
            style={style.inputs}
            value={maxEnd}
            onChangeText={(text) => onChangeMaxEnd(text)}
          />
          <Text style={style.label}>Skills Required</Text>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill1}
              value={skill1}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Java</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill2}
              value={skill2}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Python</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill3}
              value={skill3}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Git</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill4}
              value={skill4}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Angular</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill5}
              value={skill5}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>C</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill6}
              value={skill6}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>MySQL</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill7}
              value={skill7}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>NoSQL</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill8}
              value={skill8}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>PHP</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill9}
              value={skill9}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>HTML</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill10}
              value={skill10}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>CSS</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill11}
              value={skill11}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Swift</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill12}
              value={skill12}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Objective-C</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill13}
              value={skill13}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Ruby</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleSkill14}
              value={skill14}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>CAD Design</Text>
          </View>
          <Text style={style.label}>Project Interests</Text>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleInterest1}
              value={interest1}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Machine Learning</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleInterest2}
              value={interest2}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Artificial Intelligence</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleInterest3}
              value={interest3}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Blockchain</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleInterest4}
              value={interest4}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Computer Vision</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleInterest5}
              value={interest5}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Web Development</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleInterest6}
              value={interest6}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Mobile Development</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleInterest7}
              value={interest7}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Design</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleInterest8}
              value={interest8}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Hardware</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleInterest9}
              value={interest9}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Low Level Programming</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleInterest10}
              value={interest10}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Software</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleInterest11}
              value={interest11}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Functional Programming</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleInterest12}
              value={interest12}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Parallel Computing</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Switch
              onValueChange={toggleInterest13}
              value={interest13}
            />
            <View style={{ padding: 5 }}></View>
            <Text style={style.label2}>Object-Oriented Programming</Text>
          </View>
          <View style={{ padding: 40 }}></View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={style.buttonContainer}>
        <NiceButton title="Back" onPress={() => navigation.goBack()} />
        <NiceButton title="Submit" onPress={() => console.log("The submit button has been pressed!")} />
      </View>
    </View>
  );
}



const Stack = createStackNavigator();

export default function ViewProfile(props) {
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