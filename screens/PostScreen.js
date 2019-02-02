
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

import { Fab, Icon, Container, Content, Button, Form, Item, Input, Label, DatePicker, Header, Tab, Tabs } from 'native-base';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import { CardPostList } from '../components/CardPostList';

export default class PostScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor(props) {
      super(props);
      this.state = { fabActive:'true',hasLoadedPosts:false,posts:[],user:null};
  }
  
  componentWillMount() {
    const { navigation } = this.props.screenProps;
    const user = navigation.getParam('user','');
    const firebase = navigation.getParam('firebase',null);
    
    firebase.database().ref('woofs').on('value', snapshot => {
        let posts;
        posts = Object.values(snapshot.val());
        const userPosts = posts.filter((post) => {
            if(post.creator===user.username) {
                return post;
            }
        });
        this.setState({
            user:user,
            posts:userPosts,
            hasLoadedPosts:true,
        });
    });
  }
  handlePostSelect(post) {
  }
  
  handlePostPress(post) {
  }
  
  handlePostRightPress(post) {
  }

  render() {
    const { navigation } = this.props.screenProps;
    const firebase = navigation.getParam('firebase',null);
    const user = navigation.getParam('user',null);
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1}}>
          <View>
          {this.state.hasLoadedPosts && <CardPostList posts={this.state.posts}
            firebase = {firebase}
            handleLeftPress={this.handlePostSelect.bind(this)}
            handlePress={this.handlePostPress.bind(this)}
            handleRightPress={this.handlePostRightPress.bind(this)}/>
            }
          </View>
        </ScrollView>
            <Fab
            active={this.state.fabActive}
            style={{backgroundColor:'#dd2c00'}}
            direction='up'
            position='bottomRight'
            onPress={() => this.props.navigation.navigate('CreatePost',{'existingPost':false,'usersToAdd':[],'users':[],'firebase':firebase,'user':this.state.user})}
            >
            <Icon name="ios-add" />
            </Fab>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
