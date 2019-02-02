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

import {DrawerItems, SafeAreaView} from 'react-navigation';

import { Thumbnail, Header, Left, Right, Body, Container, Content, Button, Form, Item, Input, Label, Icon, Title, List, ListItem} from 'native-base';



export class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <ScrollView style={{backgroundColor:'purple'}}>
              <SafeAreaView style={{flex:1,backgroundColor:'red'}} forceInset={{top:'always',horizontal:'never'}}>
              
            </SafeAreaView>
          </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
});

