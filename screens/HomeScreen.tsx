import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {LinearGradient} from 'expo-linear-gradient';
import * as Linking from 'expo-linking'

import { AppContext } from '../AppContext';

import Trending from '../components/HorizList/Trending';
import ShortSweet from '../components/HorizList/ShortSweet';
import ForYouCarousel from '../components/HorizList/ForYouCarousel';
import ForYouGenre from '../components/HorizList/ForYouGenre';
import NewList from '../components/HorizList/NewList';

import { Auth, graphqlOperation, API } from 'aws-amplify';
import {getUser} from '../src/graphql/queries';

const AudioStoryHome = ({navigation} : any) => {

    useEffect(() => {

        const handler = async (event : any) => {
            if(!event.uri) return;

            const initialURL = await Linking.getInitialURL();
        }

        async function getInitialURL(params : any) {
    
          if(!params) return;
    
          const initialURL = await Linking.getInitialURL();
          
          if (initialURL)  {
            let response = Linking.parse(initialURL)
            setDeepLink(response)
            console.log(response)
          }
          if (params) {
            let response = Linking.parse(params)
                //console.log(response)
              setDeepLink(response)
          }
        }
    
      // listen for new url events coming from Expo
      Linking.addEventListener('url', event => {
          getInitialURL(event.url);
      });
    
        // //Linking.addEventListener('url', handleDeepLink);
        // if (!deepLink) {getInitialURL}
    
        return (() => {
          Linking.removeEventListener('url', event => {
            getInitialURL(event.url);
            
        });
        })
      }, [])

    const { deepLink } = useContext(AppContext);
    const { setDeepLink } = useContext(AppContext);

    useEffect(() => {
        if (!deepLink) return;
        let GoToLink = () => {
            navigation.navigate('StoryScreen', {storyID: deepLink.queryParams.id})
            
        }
        if (deepLink) GoToLink();
    } , [deepLink])

    // function urlRedirect(url) {
    //     if(!url) return;
    //     // parse and redirect to new url
    //     let { path, queryParams } = Linking.parse(url);
    //     console.log(`Linked to app with path: ${path} and data: ${JSON.stringify(queryParams)}`);
    //     navigation.replace(path, queryParams);
    // }
    
    // // listen for new url events coming from Expo
    // Linking.addEventListener('url', event => {
    //     urlRedirect(event.url);
    // });

// useEffect(() => {
//     Linking.getInitialURL().then(urlRedirect)
// }, [])

    const [user, setUser] = useState()

    //const [TopThree, setTopThree] = useState(['74be93da-74d5-4393-8382-b6ec2299dfa5', '7537f8b5-16f5-4a30-bc57-7e488f170d96', '3e93e3d2-1489-4371-a508-2fe4772473f4'])
    const [TopThree, setTopThree] = useState([])


    useEffect(() => {


        const fetchGenres = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            const User = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))
            
            if (User.data.getUser.topthree.length === 3) {
                setTopThree(User.data.getUser.topthree)
            }
        }
        fetchGenres();

    }, [])

    return (
        <ScrollView style={{backgroundColor: '#3b4b80a5' }}> 
            <LinearGradient
                colors={['#3b4b80', 'transparent', 'transparent', 'transparent', 'transparent']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 60, marginBottom: 10, marginHorizontal: 20}}>
                    <View style={{ flexDirection: 'row'}}>
                            <Text style={styles.pageheader}>
                                For you
                            </Text>
                           
                            
                        
                    </View>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen')}>
                        <View style={{ backgroundColor: 'transparent', padding: 30, margin: -30, justifyContent: 'center'}}>
                            <FontAwesome
                                name='user'
                                size={20}
                                color='#fff'  
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View>
                    <ForYouCarousel />
                </View>
            
                <View>
                    <Trending/>
                </View>

                <View>
                    <ShortSweet/>
                </View>

                <View>
                    <NewList />
                </View> 

                {TopThree.length === 3 ? (
                    <View>
                        <ForYouGenre genreid={TopThree[0]}/>
                        <ForYouGenre genreid={TopThree[1]}/>
                        <ForYouGenre genreid={TopThree[2]}/>
                    </View>
                ) : null}
                
                <View style={{height: 100}} />

            </LinearGradient>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
       
    },
    header: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginTop: 20,
    },
    pageheader: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      marginHorizontal: 0,
  },
});

export default AudioStoryHome;
