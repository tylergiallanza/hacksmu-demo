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

import { Thumbnail, Header, Left, Right, Body, Container, Content, Button, Form, Item, Input, Label, Icon, Title, List, ListItem} from 'native-base';



export class PitchList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let rightElement;
        return (
            <List style={{flex:1}}>
              {this.props.pitches.map((pitch,index) =>
              <ListItem avatar
              key={pitch.pitchid}
              >
                <Left>
                  <TouchableOpacity
                    onPress={() => this.props.handlePitchLeftPress(pitch)}
                  >
                    <Thumbnail 
                      source={pitch.isSelected ? {uri: 'https://icon2.kisspng.com/20180603/gly/kisspng-check-mark-symbol-clip-art-black-check-mark-5b13a571839e25.8951899015280141935391.jpg'} : {uri: pitch.avatar}} 
                    />
                  </TouchableOpacity>
                </Left>
                <Body>
                  <TouchableOpacity
                    onPress={() => this.props.handlePitchPress(pitch)}
                  >
                    <Text style={styles.pitchTitle}>{pitch.name}</Text>
                    <Text note style={styles.createdBy}>Created by {pitch.pitchCreator}</Text>
                    <View style={{flexDirection:'row'}}>
                      <Text>${pitch.goal}</Text>
                      <Icon name='ios-person' fontSize={8}/>
                      <Text>{pitch.users.length+1}</Text>
                    </View>
                    <Text>{pitch.description}</Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <TouchableOpacity
                    onPress={() => this.props.handlePitchRightPress(pitch)}
                  >
                    {rightElement}
                  </TouchableOpacity>
                </Right>
              </ListItem>
            )}
            </List>
        )
    }
}

const styles = StyleSheet.create({
  createdBy: {
      fontSize: 12,
      marginLeft: 0,
  },
  pitchTitle: {
      fontSize: 16,
  },
});


