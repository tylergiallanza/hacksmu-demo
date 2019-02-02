import React from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import * as firebase from 'firebase';



const firebaseConfig = {
    apiKey: 'AIzaSyCk49BrPh-EK5Gf5dcQDmn4nyU2O2aKXAI',
    authDomain: "hacksmu-3a873.firebaseapp.com",
    databaseURL: "https://hacksmu-3a873.firebaseio.com",
    projectId: "hacksmu-3a873",
    storageBucket: "hacksmu-3a873.appspot.com",
};
firebase.initializeApp(firebaseConfig);
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if(userToken) {
      firebase.database().ref('users/'+userToken).on('value', snapshot => {
        let user;
        user = snapshot.val();
        this.props.navigation.navigate('Woofer',{firebase:firebase,user:user});
      });
    } else {
        this.props.navigation.navigate('Auth',{firebase:firebase});
    }

  };

  render() {
    return (
      <View style={{flex:1}}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
