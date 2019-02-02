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
//import firebase from 'react-native-firebase';
import { WebBrowser, ImagePicker } from 'expo';

import { MonoText } from '../components/StyledText';

import { Thumbnail, Header, Container, Content, Button, Form, Item, Input, Label, Picker, Icon, Left, Right, Body, Title, Textarea } from 'native-base';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import { UserList } from '../components/UserList';

export default class CreatePostScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor(props) {
      super(props);
      const { navigation } = this.props;
      let usersToAdd = navigation.getParam('usersToAdd', null);
      const hasLoadedUsers = usersToAdd != null;
      if(usersToAdd == null) {
          usersToAdd = [];
          
      }
      
      const firebase = navigation.getParam('firebase', null);
      const existingPost = navigation.getParam('existingPost', false);
      const name = navigation.getParam('name','');
      const description = navigation.getParam('description','Description');
      const fixedAmount = navigation.getParam('fixedAmount',10);
      let avatar = navigation.getParam('avatar',"https://facebook.github.io/react-native/docs/assets/favicon.png");
      let userRequests;
      if(existingPost) {
        userRequests = navigation.getParam('userRequests',{});
      } else {
        userRequests = usersToAdd.map((currentUser) => {
            let newUserReq = {}
            newUserReq[currentUser.username] = [fixedAmount, 0];
            return newUserReq;
        });
      }
      const postid = navigation.getParam('postid','000-' + new Date().getTime().toString().substring(4) + '-' + Math.floor(Math.random()*10000).toString());
      this.state = {firebase:firebase,postid:postid,
          users:usersToAdd,userRequests:userRequests,pitchType:pitchType,name:name,
          description:description,
          fixedAmount:fixedAmount,hasSelectedUsers:false,hasLoadedUsers:hasLoadedUsers,avatar:avatar,
    };
          
  }
  
  componentWillMount() {
    if(!this.state.hadLoadedUsers) {
        const { navigation } = this.props;
        const firebase = navigation.getParam('firebase', null);
        const usersToInclude = navigation.getParam('users', null);
        firebase.database().ref('users').on('value', snapshot => {
            let users;
            users = Object.values(snapshot.val());
            users = users.filter((currentUser) => {
                if(usersToInclude.includes(currentUser.username)) {
                    return currentUser;
                }
            });
            this.setState({
                users:users,
                hasLoadedUsers:true,
            });
        });
    }
  }
  
  handleLeftButtonPress() {
    this.props.navigation.goBack();
  }
  
  handleRightButtonPress(hasSelected) {
      if(hasSelected) {
        let newUsers = [];
        this.state.users.forEach(function(currentUser) {
            if(!currentUser.isSelected) {
                newUsers.push(currentUser);
            }
        });
        this.setState((state) => {
            return {users: newUsers,hasSelectedUsers:false}
        });
      }
  }

  handleUserRemove(user) {
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
        return {users: newStateUsers};
    });
    this.setState((state) => {
        return {hasSelectedUsers: newHasSelectedUsers};
    });
  }
  
  handleUserMiddlePress() {
  }
  
  handleUserRightPress() {
  }
  
  
  componentWillReceiveProps(nextProps) {
      const { navigation } = nextProps;
      const usersToAdd = navigation.getParam('usersToAdd', null);
      this.addNewUsers(usersToAdd);
  }
  addNewUsers(usersToAdd) {
      let newStateUsers = this.state.users.concat(usersToAdd);
      this.setState((state) => {
          return {users: newStateUsers}
      });
  }
  
  handlePitch() {
      const { navigation } = this.props;
      const user = navigation.getParam('user', null);
      const existingPost = navigation.getParam('existingPost', false);
      if(!existingPost) {
        this.state.firebase.database().ref('users/'+user.username+'/createdPitches').push(
            this.state.postid
        );
      }
      
      this.state.firebase.database().ref('woofs/'+this.state.postid).set({
          creator:user.username,
          description:this.state.description,
          id:this.state.postid,
          avatar:this.state.avatar,
    });
    /*
    this.state.firebase.database().ref('users/'+user.username+'/createdPitches').once('value', value => {
        let existingPitches = value.val();
        existingPitches = Object.values(existingPitches);
        if(!(existingPitches.includes(this.state.pitchid))) {
            this.state.firebase.database().ref('users/'+user.username+'/createdPitches').push(
                this.state.pitchid
            );
        }
    });
    this.state.users.map((currentUser) => {
      this.state.firebase.database().ref('users/'+currentUser.username+'/involvedPitches').once('value', value => {
        let existingPitches = value.val();
        existingPitches = Object.values(existingPitches);
        if(!(existingPitches.includes(this.state.pitchid))) {
            this.state.firebase.database().ref('users/'+currentUser.username+'/involvedPitches').push(
                this.state.pitchid
            );
        }
      });
    });
    */
    
    this.props.navigation.navigate('ViewPosts');
  }
  
  handleAvatarClick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
    });
    if(!result.cancelled) {
      this.setState({avatar: 'data:image/jpeg;base64,'+result.base64});
    }
  }
  
  handlePitchDescriptionChange(description) {
      this.setState({description: description});
  }
  
  handleCustomPitchTextChange(text, user) {
      let newUserRequests = this.state.userRequests;
      newUserRequests[user.username] = [parseInt(text), 0];
      this.setState({userRequests: newUserRequests});
  }
  
  render() {
    const usernames = this.state.users.map(user => user.username);
    const { navigation } = this.props;
    const user = navigation.getParam('user', null);
    if(this.state.hasLoadedUsers) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Header style={{'backgroundColor':'#dd2c00'}}>
              <Left>
                <Button transparent
                  onPress={() => this.handleLeftButtonPress()}
                >
                  <Icon style={{'color':'white'}} name={'ios-arrow-back'} />
                </Button>
              </Left>
              <Body>
                <Title style={{'color':'white'}}>Create a Pitch</Title>
              </Body>
              <Right>
                <Button transparent
                  onPress={() => this.handleRightButtonPress(this.state.hasSelectedUsers)}
                >
                  <Icon style={{'color':'white'}} name={this.state.hasSelectedUsers ? 'ios-trash' : ''} />
                </Button>
              </Right>
            </Header>
          <View style={styles.mainContainer}>
            <Form>
              <Item style={{borderColor:'transparent',borderWidth:0,marginTop:95,marginBottom:10,alignItems: 'center',textAlign: 'center',justifyContent: 'center'}}>
                <Button transparent
                  onPress={() => this.handleAvatarClick()}
                >
                  <Thumbnail square
                    style={{width:200,height:200}}
                    source={{uri: this.state.avatar}}
                  />
                </Button>
              </Item>
              <Item style={{marginTop:75,marginBottom:0}}>
                <Textarea style={{paddingLeft:0,flex:1}} rowSpan={3} value={this.state.description} onChangeText={(text) => this.handlePitchDescriptionChange(text)}/>
              </Item>
              <Item last style={styles.centerItem}>
                <Button rounded info large style={styles.woofButton}
                onPress={() => this.handlePitch()}>
                  <Text style={{fontSize:20,color:'white'}}>WOOF!!</Text>
                </Button>
              </Item>
            </Form>
          </View>
        </ScrollView>

      </View>
    );
    } else {
        return(<View />)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  mainContainer: {
    //alignItems: 'center',
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
  woofButton: {
      width:150,
      alignSelf:'center',
      textAlign:'center',
      alignItems:'center',
      justifyContent:'center',
      marginVertical: 10,
      backgroundColor: '#dd2c00',
  },
});
