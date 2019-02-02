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
import { UserList } from '../components/UserList';
import { PitchMeter } from '../components/PitchMeter';

import { Fab, Thumbnail, Header, Button, Left, Right, Body, Container, Content, Card, CardItem, Item, Input, Label, Icon, Title, List, ListItem} from 'native-base';

import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class ViewPitchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor(props) {
      super(props);
      this.state={users:[],fabActive:'true',hasLoadedUsers:false};
  }
  
  componentWillMount() {
    if(!this.state.hadLoadedUsers) {
        const { navigation } = this.props;
        const firebase = navigation.getParam('firebase', null);
        const usersToInclude = navigation.getParam('pitch', null).users;
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
  
  handleFabClick(pitch,user,firebase) {
    this.props.navigation.navigate('CreatePitch',{'existingPitch':true,'users':pitch.users,
        'name':pitch.name,'pitchType':pitch.pitchType,'goal':pitch.goal,
        'description':pitch.description,'fixedAmount':pitch.fixedAmount,
        'date':pitch.date,'pitchid':pitch.pitchid,'userRequests':pitch.userRequests,
        'firebase':firebase,'user':user});
  }
  
  handleUserLeftPress() {
  }
  
  handleUserMiddlePress() {
  }
  
  handleUserRightPress() {
  }
  
  handleCustomPitchTextChange() {
  }

  render() {
    const { navigation } = this.props;
    const pitch = navigation.getParam('pitch', null);
    const user = navigation.getParam('user', null);
    const editable = navigation.getParam('editable', false);
    const firebase = navigation.getParam('firebase', null);
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Header style={{backgroundColor:'#dd2c00'}}>
              <Left>
                <Button transparent
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Icon name='ios-arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title>Pitch Info</Title>
              </Body>
            </Header>
          <View style={styles.mainContainer}>
            <Card>
              <CardItem style={styles.cardHeaderStyle}>
                <Left style={{flex: 1}}>
                  <Thumbnail 
                      source={{uri: pitch.avatar}} 
                  />
                </Left>
                <Body style={styles.cardHeaderBodyStyle}>
                <Text style={{fontSize:25}}>{pitch.name}</Text>
                <Text note style={{fontSize:15}}>Created by {pitch.pitchCreator}</Text>
                </Body>
                <Right style={{flex: 1}}/>
              </CardItem>
              <CardItem cardBody style={styles.cardBodyStyle}>
                <Text style={{fontSize:17}}>{pitch.description}</Text>
              </CardItem>
            </Card>
            <View style={{flexDirection:'column'}}>
              <View style={{ backgroundColor: '#fafafa'}}>
                {this.state.hasLoadedUsers && <PitchMeter
                  goal={pitch.goal}
                  funded={pitch.funded}
                  users={this.state.users} 
                  userRequests={pitch.userRequests}
                />}
              </View>
              <View style={{ backgroundColor: '#ffffff'}} >
                {this.state.hasLoadedUsers && <UserList users={this.state.users}
                rightStyle={pitch.pitchType}
                userRequests={pitch.userRequests}
                fixedAmount={pitch.fixedAmount}
                uneditable={true}
                handleUserLeftPress={this.handleUserLeftPress.bind(this)}
                handleUserPress={this.handleUserMiddlePress.bind(this)}
                handleUserRightPress={this.handleUserRightPress.bind(this)}
                handleInputTextChange={this.handleCustomPitchTextChange.bind(this)}
                />}
              </View>
            </View>
          </View>
            {editable && user.username === pitch.pitchCreator && <Fab
            active={this.state.fabActive}
            style={{backgroundColor:'#dd2c00'}}
            direction='up'
            position='bottomRight'
            onPress={() => this.handleFabClick(pitch,user,firebase)}
            >
              <Icon name="ios-create" />
            </Fab>}
        </ScrollView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardHeaderStyle: {
      //backgroundColor: 'purple',
  },
  cardHeaderBodyStyle: {
      flex: 3,
      marginLeft: 0,
      //backgroundColor: 'green',
  },
  cardBodyStyle: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      //backgroundColor: 'yellow',
  },
  contentContainer: {
    paddingTop: 25,
    flex: 1,
  },
  mainContainer: {
      flex:1,
  },
  headerContainer: {
      alignItems: 'center',
  },
  headerText: {
      fontSize: 30,
  },
});

