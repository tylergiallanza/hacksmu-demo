import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import {UserList } from '../components/UserList';

import { Thumbnail, Header, Left, Right, Body, Container, Content, Button, Form, Item, Input, Label, Icon, Title, List, ListItem} from 'native-base';

import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class AddUserScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor(props) {
    super(props);
    this.state = { hasLoadedUsers: false, hasSelectedUsers: false, users: [] };
        //this.state = {
            //users: [{'name':'Tyler Giallanza','username':'@tylergiallanza','bio':'Tyler Giallanza is a computer science major at Southern Methodist University.','phone':'7202247737','avatar':'https://facebook.github.io/react-native/docs/assets/favicon.png','isSelected':false,'createdPitches':[],'involvedPitches':[]},
            //{'name':'Jonathan Arnold','username':'@arnoldj','bio':'Jonathan is the founder and creater of Pitch.','phone':'2145555555','avatar':'https://facebook.github.io/react-native/docs/assets/favicon.png','isSelected':false,'createdPitches':[],'involvedPitches':[]}],
            //users: users,
            //hasSelectedUsers:false,
        //};
  }
  
  componentWillMount() {
    const { navigation } = this.props;
    const firebase = navigation.getParam('firebase', null);
    let user = navigation.getParam('user', null);
    let usersToExclude = navigation.getParam('users', []);
    usersToExclude.push(user.username);
    console.log(usersToExclude);
    firebase.database().ref('users').on('value', snapshot => {
        let users;
        users = Object.values(snapshot.val());
        users = users.filter((currentUser) => {
            if(!(usersToExclude.includes(currentUser.username))) {
                return currentUser;
            }
        });
        this.setState({
            users:users,
            hasLoadedUsers:true,
        });
    });
  }
  

  handleUserSelectPress(user) {
      let newStateUsers = this.state.users.map(function(currentUser) {
          if(user.username === currentUser.username) {
              currentUser.isSelected = !currentUser.isSelected;
          }
          return currentUser;
      });
      let newHasSelectedUsers = false;
      this.state.users.forEach(function(currentUser) {
          if(currentUser.isSelected) {
              newHasSelectedUsers = true;
          }
      });
      this.setState((state) => {
          return {users: newStateUsers}
      });
      this.setState((state) => {
          return {hasSelectedUsers: newHasSelectedUsers}
      });
      
  }
  
  handleUserMiddlePress(user) {
      this.props.navigation.navigate('CreatePitch',{'usersToAdd':[user]});
  }
  
  handleUserInfoPress(user) {
      this.props.navigation.navigate('UserInfo',{'user':user});
  }
  
  handleLeftButtonPress(hasSelected) {
      if(hasSelected) {
          let newStateUsers = this.state.users.map(function(currentUser) {
              currentUser.isSelected = false;
              return currentUser;
          });
          this.setState((state) => {
              return {users: newStateUsers}
          });
          this.setState((state) => {
              return {hasSelectedUsers: false}
          });
      } else {
          this.props.navigation.goBack();
      }
  }
  
  handleRightButtonPress(hasSelected) {
      if(hasSelected) {
          let users = [];
          this.state.users.forEach(function(currentUser) {
              if(currentUser.isSelected) {
                  currentUser.isSelected = false;
                  users.push(currentUser);
              }
          });
          this.props.navigation.navigate('CreatePitch',{'usersToAdd':users});
      } 
  }
  
  render() {
      /*if(this.state.hasLoadedUsers){
      return(<View style={styles.container}><ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}><View style={styles.mainContainer}><Text>Hello {this.state.hasLoadedUsers.toString()}</Text></View></ScrollView></View>)
      } else {
      return(<View style={styles.container}><ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}><View style={styles.mainContainer}><Text>Goodbye {this.state.hasLoadedUsers.toString()}</Text></View></ScrollView></View>)
      }*/
    if(this.state.hasLoadedUsers) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Header style={{backgroundColor:'#dd2c00'}}>
              <Left>
                <Button transparent
                  onPress={() => this.handleLeftButtonPress(this.state.hasSelectedUsers)}
                >
                  <Icon name={this.state.hasSelectedUsers ? 'ios-close' : 'ios-arrow-back'} />
                </Button>
              </Left>
              <Body>
                <Title>Add Users</Title>
              </Body>
              <Right>
                <Button transparent
                  onPress={() => this.handleRightButtonPress(this.state.hasSelectedUsers)}
                >
                  <Icon name={this.state.hasSelectedUsers ? 'ios-arrow-forward' : ''} />
                </Button>
              </Right>
            </Header>
          <View style={styles.mainContainer}>
            <Item>
              <Input 
                placeholder = 'Name, username, or phone'
              />
            </Item>
            <UserList users={this.state.users} 
            rightStyle='info'
            handleUserLeftPress={this.handleUserSelectPress.bind(this)}
            handleUserPress={this.handleUserMiddlePress.bind(this)}
            handleUserRightPress={this.handleUserInfoPress.bind(this)}/>
          </View>
        </ScrollView>

      </View>
    );
    } else {
        return (<View style={styles.container} />)
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 25,
  },
  headerContainer: {
      alignItems: 'center',
  },
  headerText: {
      fontSize: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  mainContainer: {
    marginHorizontal: 15,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  centerItem: {
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
  },
});
