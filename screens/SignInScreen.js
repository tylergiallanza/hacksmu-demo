import React from 'react';
import {View, Button, AsyncStorage } from 'react-native';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign In',
  };

  render() {
    return (
      <View style={{flex:1}}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    const {navigation} = this.props;
    const firebase = navigation.getParam('firebase',null);
    const userToken = '@bobbill';
    await AsyncStorage.setItem('userToken', userToken);
    firebase.database().ref('users/'+userToken).on('value', snapshot => {
      let user;
      user = snapshot.val();
      this.props.navigation.navigate('Pitch',{firebase:firebase,user:user});
    });
  };
}
