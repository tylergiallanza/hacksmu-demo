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

import { Thumbnail, Header, Button, Left, Right, Body, Container, Content, Card, CardItem, Item, Input, Label, Icon, Title, List, ListItem} from 'native-base';

import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class UserInfoScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  setDate(newDate) {
  }

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user', null);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Header style={{backgroundColor:'#dd2c00'}}>
              <Left>
                <Button transparent
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title>User Info</Title>
              </Body>
            </Header>
          <View style={styles.mainContainer}>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail 
                      source={{uri: user.avatar}} 
                  />
                </Left>
                <Body>
                <Text>{user.name}</Text>
                <Text note>{user.username}</Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <Text>{user.bio}</Text>
              </CardItem>
            </Card>
          </View>
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
});

