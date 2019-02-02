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

import { Thumbnail, Header, Left, Right, Body, Container, Content, Button, Form, Item, Input, Label, Icon, Title, List, ListItem} from 'native-base';



export class UserList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    generateRightElement(user) {
        let rightElement;
        if (this.props.rightStyle === 'info' || this.props.rightStyle === 'open') {
            rightElement = <Icon name='ios-information-circle-outline' />
        } else if (this.props.rightStyle === 'fixed') {
            rightElement = <Text>${this.props.fixedAmount} </Text>
        } else if (this.props.rightStyle === 'custom') {
            if(this.props.uneditable) {
                rightElement = <Item style={styles.inputItemStyle} ><Text> 
                {user.username in this.props.userRequests && this.props.userRequests[user.username][0].toString()}
                </Text></Item>
            } else {
                rightElement = <Item style={styles.inputItemStyle} ><Input placeholder='$' 
                value={user.username in this.props.userRequests && this.props.userRequests[user.username][0].toString()}
                keyboardType='numeric' 
                style={styles.inputStyle}
                onChangeText = {(text) => this.props.handleInputTextChange(text,user)}/></Item>
            }
        }
        return rightElement;
    }
    
    render() {
        return (
            <List>
              {this.props.users.map((user,index) =>
              <ListItem avatar
              key={user.username}
              >
                <Left>
                  <TouchableOpacity
                    onPress={() => this.props.handleUserLeftPress(user)}
                  >
                    <Thumbnail 
                      source={user.isSelected ? {uri: 'https://icon2.kisspng.com/20180603/gly/kisspng-check-mark-symbol-clip-art-black-check-mark-5b13a571839e25.8951899015280141935391.jpg'} : {uri: user.avatar}} 
                    />
                  </TouchableOpacity>
                </Left>
                <Body>
                  <TouchableOpacity
                    onPress={() => this.props.handleUserPress(user)}
                  >
                    <Text>{user.name}</Text>
                    <Text note>{user.username}</Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <TouchableOpacity
                    onPress={() => this.props.handleUserRightPress(user)}
                  >
                    {this.generateRightElement(user)}
                  </TouchableOpacity>
                </Right>
              </ListItem>
            )}
            </List>
        )
    }
}

const styles = StyleSheet.create({
  inputItemStyle: {
      height: 30,
      width: 100,
      paddingBottom: 0,
      marginBottom: 0,
  },
  inputStyle: {
      height: 30,
      width: 100,
  },
});

