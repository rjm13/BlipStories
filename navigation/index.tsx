import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, {useState, useEffect, useRef, useContext} from 'react';
import { ColorSchemeName, Appearance } from 'react-native';
import { AppContext } from '../AppContext';

//set storyID to null or move to home stack
import SimpleAudioPlayer from '../screens/SimpleAudioPlayer';


//show over top
import UserScreen from '../screens/UserScreen';
import StoryScreen from '../screens/StoryScreen';
import TagSearchScreen from '../screens/TagSearchScreen';

import RedirectScreen from '../screens/auth/RedirectScreen';

import SignUpScreen from '../screens/auth/SignUp';
import SignInScreen from '../screens/auth/SignIn';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';
import ForgotPasswordConScreen from '../screens/auth/ForgotPasswordCon';
import ConfirmEmailScreen from '../screens/auth/ConfirmEmail';
import SplashCarousel from '../screens/auth/SplashCarousel';
import CreateMessage from '../screens/CreateMessage';


import ModalNavigator from '../navigation/ModalNavigator';
import AudioPlayerWidgetStatic from '../components/AudioPlayerWidgetStatic';
import { useRoute } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';


import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';


//import {Auth} from '@aws-amplify/auth';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

export default function Navigation(
  { colorScheme }: { colorScheme: ColorSchemeName }
  ) {

  const { userID } = useContext(AppContext);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      ref={navigationRef}
      >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //   const fetchUser = async () => {
    //     //get authenticated user from Auth
    //     const userInfo = await Auth.currentAuthenticatedUser(
    //       { bypassCache: true }
    //     );
    //     //console.log(userInfo.attributes.sub);
  
    //     if (!userInfo) {
    //       return;
    //     }
    //     if (userInfo) {
    //       setIsLoggedIn(true);
    //     }
    //   }
    //   fetchUser();
  
    // }, [])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, 
    //cardStyle: {opacity: 1, backgroundColor: 'transparent'} , cardOverlayEnabled: false,
    }} initialRouteName="Redirect">
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="UserScreen" component={UserScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="ForgotPasswordCon" component={ForgotPasswordConScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="SimpleAudioPlayer" component={SimpleAudioPlayer} options={{ title: 'Oops!' }} />
      <Stack.Screen name="StoryScreen" component={StoryScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Redirect" component={RedirectScreen} />
      <Stack.Screen name="TagSearchScreen" component={TagSearchScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SplashCarousel" component={SplashCarousel} />
      <Stack.Screen name="CreateMessage" component={CreateMessage} options={{ headerShown: false }} />


      {/* <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ title: 'Oops!' }} /> */}

    </Stack.Navigator>
  );
}



const Drawer = createDrawerNavigator<RootStackParamList>();

function DrawerNavigator() {


  return (
    <Drawer.Navigator 
      screenOptions={{ }}
      drawerType='front'
      //initialRouteName='Redirect'
      overlayColor="transparent"
      drawerStyle={{ width: '80%', height: '50%'}}
      sceneContainerStyle={{backgroundColor: 'transparent'}}
    >
      <Drawer.Screen name="Drawer" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}
