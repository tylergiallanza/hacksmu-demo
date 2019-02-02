import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import { Card, CardItem, Thumbnail, Header, Left, Right, Body, Container, Content, Button, Form, Item, Input, Label, Icon, Title, List, ListItem} from 'native-base';



export class CardPostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasLoadedAvatars:false};
    }
    componentWillMount() {
        const firebase = this.props.firebase;
        const usersToGet = this.props.posts.map((post, index) => {return post.creator});
        const userPostPromises = usersToGet.map(async (username) => {
          const snapshot = await firebase.database().ref('users/'+username+'/avatar').once('value');
          const p = snapshot.val();
          return p;
        });
        Promise.all(userPostPromises).then((userAvatars) => {
            this.setState({
                avatars:userAvatars,
                hasLoadedAvatars:true,
            });
        })
    }
    
    getThumbnailSource(post) {
        if(post.creator===this.props.user.username) {
            return this.props.user.avatar;
        } else {
        }
    }
    
    render() {
        let rightElement;
        return (
            <View style={{flex:1}}>
              {this.props.posts.map((post,index) =>
              <Card
              key={post.id}
              style={{marginHorizontal: 5}}
              >
              <CardItem header>
                <Left style={{flexDirection:'row'}}>
                  <TouchableOpacity
                    onPress={() => this.props.handlePress(post)}
                    style={{flexDirection:'row'}}
                  >
                    {this.state.hasLoadedAvatars && <Thumbnail 
                      source={{uri: this.state.avatars[index]}}
                    />}
                    <View style={{marginTop:0, marginLeft: 5}}>
                        <Text note style={styles.createdBy}>{post.creator}</Text>
                        <View style={{flexDirection:'row'}}>
                        </View>
                    </View>
                  </TouchableOpacity>
                </Left>
                </CardItem>
                <CardItem>
                  <Body style={{justifyContent:'center',alignItems:'center'}}>
                    <Thumbnail square 
                      source={{uri: post.avatar}} 
                      style={{width:400,height:400,justifyContent:'center',alignItems:'center'}}
                    />
                    <Text>{post.description}</Text>
                  </Body>
                </CardItem>
              </Card>
            )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  createdBy: {
      fontSize: 12,
      marginLeft: 0,
  },
  postTitle: {
      fontSize: 16,
  },
});


