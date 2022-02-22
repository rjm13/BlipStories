import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Dimensions, 
    TouchableWithoutFeedback
} from 'react-native';

//import { useRoute } from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser, listFollowingConns, listImageAssets } from '../src/graphql/queries';

const Publisher = ({navigation} : any) => {

    //the number of follows the author (current user) has
    const [numFollowers, setNumFollowers] = useState();

    const [user, setUser] = useState({})

    //const route = useRoute();
    //const {User} = route.params

    const [SavedAudio, setSavedAudio] = useState([''])

    //load the keys from async storage
    useEffect(() => {
        const LoadKeys = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            let saved = await AsyncStorage.getAllKeys();
    
            if (saved != null) {
                let result = saved.filter((item) => item.includes("recording" + userInfo.attributes.sub));
                setSavedAudio(result);
            } 
        }
        LoadKeys();
    }, [])

//get the current user and list their followings and followers
    useEffect(() => {
        const fetchUser = async () => {

          const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

          try {
            const userData = await API.graphql(graphqlOperation(
              getUser, {id: userInfo.attributes.sub}
            ))

            if (userData) {
                setUser(userData.data.getUser);
                if(userData.data.getUser.isPublisher === true) {setIsPublisher(true);}
                if(userData.data.getUser.isNarrator === true) {setIsNarrator(true);}
                if(userData.data.getUser.isArtist === true) {setIsArtist(true);}
            
            }

            const getFollowers = await API.graphql(graphqlOperation(
                listFollowingConns, {
                    filter: {
                        authorID: {
                            eq: userData.data.getUser.id
                        }
                    }
                }
            ))

            setNumFollowers(getFollowers.data.listFollowingConns.items.length)

          } catch (e) {
            console.log(e);
          }
        }
        fetchUser();
      }, [])

      const [isNarrator, setIsNarrator] = useState(false);

      const [isArtist, setIsArtist] = useState(false);

      const [isPublisher, setIsPublisher] = useState(false);


      const BecomePublisher = () => {
          if (user?.isPublisher === true) {
            setIsPublisher(true);
          } else {
            setIsPublisher(false);
            navigation.navigate('Publishing', {user: user});
          }
      }

      const BecomeNarrator = () => {
        if (user?.isNarrator === true) {
          setIsNarrator(true);
        } else {
          setIsNarrator(false);
          navigation.navigate('NarratorMain', {user: user});
        }
    }

    const BecomeArtist = () => {
        if (isArtist === true) {
          setIsArtist(true);
        } else {
          setIsArtist(false);
          navigation.navigate('ArtistMain', {user: user});
        }
    }

        //get the image data

        const [ImageData, setImageData] = useState();

        useEffect(() => {
            const fetchData = async () => {
    
                const userInfo = await Auth.currentAuthenticatedUser();
    
                let result = await API.graphql(graphqlOperation(
                    listImageAssets, { 
                        filter: {
                            userID: {
                                eq: userInfo.attributes.sub
                            }
                        }
                    }
                ))
                setImageData(result.data.listImageAssets.items.length)
            }
            fetchData();
        }, [])


    return (
        <View style={styles.container}>
            
            <LinearGradient
                colors={['black', '#363636a5', 'black']}
                style={{height: Dimensions.get('window').height,justifyContent: 'space-between'}}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{marginHorizontal: 20, marginTop: 50}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen')}>
                                    <View style={{padding: 30, margin: -30}}>
                                        <FontAwesome5 
                                            name='chevron-left'
                                            color="#fff"
                                            size={20}
                                            style={{alignSelf: 'center'}}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                
                                <Text style={styles.header}>
                                    Publisher Home
                                </Text>
                            </View>
                        </View>  
                    </View>

                <ScrollView>
                    
                <View style={styles.container}>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                        <TouchableWithoutFeedback onPress={BecomeNarrator}>
                            <FontAwesome5 
                                name='book-reader'
                                color={isNarrator === true ? '#fff' : 'gray'}
                                size={isNarrator === true ? 30 : 22}
                                style={{paddingVertical: 40, paddingHorizontal: 20, }}
                            />
                        </TouchableWithoutFeedback>
                        
                        <TouchableWithoutFeedback onPress={BecomePublisher}>
                            <FontAwesome5 
                                name='book-open'
                                color={isPublisher === true ? '#fff' : 'gray'}
                                size={isPublisher === true ? 30 : 22}
                                style={{paddingVertical: 40, paddingHorizontal: 20, }}
                            />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={BecomeArtist}>
                            <FontAwesome5 
                                name='palette'
                                color={isArtist === true ? '#fff' : 'gray'}
                                size={isArtist === true ? 30 : 22}
                                style={{paddingVertical: 40, paddingHorizontal: 20, }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    

                    {isPublisher === true ? (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <View>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    Pseudonym
                                </Text>
                                <Text style={{ color: 'gray', fontSize: 12}}>
                                    Author
                                </Text>
                            </View>
                            <Text style={styles.textcounter}>
                                {user?.pseudonym}
                            </Text>
                        </View>
                    ) : null}
                    

                    {isNarrator === true ? (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <View>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    Pseudonym
                                </Text>
                                <Text style={{ color: 'gray', fontSize: 12}}>
                                    Narrator
                                </Text>
                            </View>
                            <Text style={styles.textcounter}>
                                {user?.narratorPseudo}
                            </Text>
                        </View>
                    ) : null}
                    
                    {isArtist === true ? (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <View>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    Pseudonym
                                </Text>
                                <Text style={{ color: 'gray', fontSize: 12}}>
                                    Artist
                                </Text>
                            </View>
                            
                            <Text style={styles.textcounter}>
                                {user?.artistPseudo}
                            </Text>
                        </View>
                    ) : null}
                    

                    {isPublisher === true ? (
                        <View>
                            <TouchableWithoutFeedback onPress={ () => navigation.navigate('Following')}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                    <Text style={{ color: '#fff', fontSize: 16}}>
                                        Followers
                                    </Text>
                                    <Text style={styles.textcounter}>
                                        {numFollowers}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        
                        
                        <TouchableWithoutFeedback onPress={ () => navigation.navigate('MyStories')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    My Stories
                                </Text>
                                <Text style={styles.textcounter}>
                                    {user?.authored?.items.length}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    ) : null}

                    {isNarrator === true ? (
                        <View>
                            <TouchableWithoutFeedback onPress={ () => navigation.navigate('MyStories')}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                    <Text style={{ color: '#fff', fontSize: 16}}>
                                        My Narrations
                                    </Text>
                                    <Text style={styles.textcounter}>
                                        {user?.authored?.items.length}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={ () => navigation.navigate('Recordings', {user: user})}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                    <Text style={{ color: '#fff', fontSize: 16}}>
                                        My Recordings
                                    </Text>
                                    <Text style={styles.textcounter}>
                                        {SavedAudio.length}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    ) : null}

                    {isArtist === true ? (
                        <TouchableWithoutFeedback onPress={ () => navigation.navigate('MyArt')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    My Artwork
                                </Text>
                                <Text style={styles.textcounter}>
                                    {ImageData}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : null}

{/* line break */}
                    <View style={{marginVertical: 20, alignSelf: 'center', width: '80%', height: 1, borderColor: '#fff', borderWidth: 0.5}}>
                    </View>

                    {isPublisher === true ? (
                        <View>
                            <TouchableWithoutFeedback onPress={() => {navigation.navigate('UploadAudio')}}>
                                <View style={[styles.button, {backgroundColor: 'cyan'}]}>
                                    <Text style={styles.buttontext}>
                                        Publish a Story
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback>
                                <View style={[styles.button, {backgroundColor: 'pink'}]}>
                                    <Text style={styles.buttontext}>
                                        Find a Narrator
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback>
                                <View style={[styles.button, {backgroundColor: '#27d995'}]}>
                                    <Text style={styles.buttontext}>
                                        Find a Cover Artist
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    ) : null}
                    
                    
  
                </View>

                <View style={{marginVertical: 40}}>
                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('Terms')}>
                        <View style={{ justifyContent: 'center', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 14}}>
                                Terms and Conditions
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
            </LinearGradient>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        width: Dimensions.get('window').width,
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 40,
    },
    textcounter: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: 'bold'
    }, button: {
        marginVertical: 10, 
        alignSelf: 'center', 
        width: '80%', 
        height: 60, 
        borderRadius: 10,
        justifyContent: 'center',
    },
    buttontext: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default Publisher;