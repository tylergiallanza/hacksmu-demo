import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { Button, Icon } from 'native-base';
import { createAppContainer, createSwitchNavigator, createDrawerNavigator, createStackNavigator, createMaterialTopTabNavigator, DrawerItems, SafeAreaView } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Sidebar from '../components/Sidebar';

import FeedScreen from '../screens/FeedScreen';
import PostScreen from '../screens/PostScreen';

import AddUserScreen from '../screens/AddUserScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ViewPitchScreen from '../screens/ViewPitchScreen';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';



//Drawer stack

//Two tabs: current and past pitches

//Current pitch stack: createpitchscreen, adduserscreen, userinfoscreen


const FeedStack = createStackNavigator({
  Feed: FeedScreen,
},
{
  initialRouteName: "Feed"
});

    

FeedStack.navigationOptions = {
  tabBarLabel: 'Your Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const PostStack = createStackNavigator({
  Post: PostScreen,
},
{
  initialRouteName: "Post"
});

PostStack.navigationOptions = {
  tabBarLabel: 'Your Woofs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const MainTabNavigator = createMaterialTopTabNavigator({
    FeedStack,
    PostStack,
  },
  {tabBarOptions: {
    style: {
        marginTop:0,
        paddingTop:0,
        backgroundColor:'#dd2c00',
    },
  }}
);

const PitchStack = createAppContainer(createStackNavigator({
  AddUser: AddUserScreen,
  UserInfo: UserInfoScreen,
  CreatePost: CreatePostScreen,
  ViewPitch: ViewPitchScreen,
  ViewPosts: {screen: MainTabNavigator, navigationOptions: ({navigation}) => ({
          title:'Woofer',
          headerStyle:{backgroundColor:'#dd2c00'},
          headerTintColor:'white',
          headerLeft: 
                <Button transparent
                  onPress={() => navigation.toggleDrawer()}
                >
                 <Icon style={{'color':'white'}} name='ios-menu' />
                </Button>
          
      }),
      
  },
},
{
    initialRouteName: "ViewPosts",
    headerMode:Platform.OS === 'ios' ? 'float' : 'screen',
}));

/*
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);
*/

class CustomDrawerContentComponent extends React.Component {
    constructor(props) {
        super(props);
        const user= props.navigation.state.routes[0].params.user;
        console.log(user.username);
    }
    
    render() {
        return (
        <ScrollView>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...this.props} />
            </SafeAreaView>
        </ScrollView>
        )
    }
}
        

const styles = {
  container: {
    flex: 1,
  },
};
const AppNavigator = createDrawerNavigator({
    Woofer: {screen: props => <PitchStack screenProps={props}/>},
  },
  {
      initialRouteName:'Woofer',
      contentComponent: CustomDrawerContentComponent,
  }
);

const AuthNavigator = createStackNavigator({
    SignIn: SignInScreen,
});

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppNavigator,
        Auth: AuthNavigator,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));
