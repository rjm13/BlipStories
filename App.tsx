import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
//import AppLoading from 'expo-app-loading';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
//import Navigation from '/Users/rjm/ShortStories/navigation';
import Navigation from './navigation'
import { navigationRef } from './navigation/RootNavigation';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import Amplify from '@aws-amplify/core';
import config from './src/aws-exports';
Amplify.configure(config);
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';
import Linking from 'expo-linking';

import { AppContext } from './AppContext';

import AudioPlayerWidget from './components/AudioPlayerWidget';
import AudioPlayerWidgetStatic from './components/AudioPlayerWidgetStatic';
import AudioPlayerAnimate from './components/AudioPlayerAnimate';
//import { IdentityStore } from 'aws-sdk';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [storyID, setStoryID] = useState<string|null>(null);

  const [userID, setUserID] = useState<string|null>(null);

  const [isRootScreen, setIsRootScreen] = useState<boolean|null>(null);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const URLlistener = useRef();

  const [deepLink, setDeepLink] = useState(null)

  const handleDeepLink = (event : any) => {
    let data = Linking.parse(event.url);
    setDeepLink(data);
  }

  useEffect(() => {

    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      
      if (initialURL)  {
        let response = Linking.parse(initialURL)
        setDeepLink(response)
      }
    }

    //Linking.addEventListener('url', handleDeepLink);
    if (!deepLink) {getInitialURL}

    return (() => {
      //Linking.removeEventListener('url', handleDeepLink);
    })
  }, [])


  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }


  useEffect(() => {
    const fetchUser = async () => {
      //get authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser(
        { bypassCache: true }
      )
      .catch(err=>err)
      console.log(userInfo.attributes.sub);

      if (!userInfo) {
        setUserID(null)
        return;
      }

      if (userInfo) {
      //get the user from Backend with the user SUB from Auth
        const userData = await API.graphql(
          graphqlOperation(
            getUser, 
            { id: userInfo.attributes.sub,
            }
          )
        )


        if (userData.data.getUser) {
          console.log(userData.data.getUser);
          setUserID(userData.data.getUser)
          return;
        } else {
          setUserID(null);
        }

        // const newUser = {
        //   id: userInfo.attributes.sub,
        //   name: userInfo.attributes.name,
        //   imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
        //   email: userInfo.attributes.email,
        //   status: '',
        // }

      //if there is no user in DB with the id, then create one
        // await API.graphql(
        //   graphqlOperation(
        //     createUser,
        //     { input: newUser }
        //   )
        // )
      }
    }
    fetchUser();

  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
     
      <SafeAreaProvider>
        <AppContext.Provider value={{
          storyID,
          setStoryID: (id: string) => setStoryID(id),
          // userID,
          // setUserID: (id: string) => setUserID(id),
          userID,
          setUserID: (user: {}) => setUserID(user),
          isRootScreen,
          setIsRootScreen: (val: boolean) => setIsRootScreen(val)

        }}>
          <Navigation 
            //colorScheme={colorScheme}
            colorScheme='dark'/>
          <StatusBar style='light' backgroundColor='#0000004D'/>
          <AudioPlayerWidgetStatic />
          </AppContext.Provider>
      </SafeAreaProvider>

    );
  }
}
