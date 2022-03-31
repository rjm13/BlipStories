import React, {useState, useEffect, useContext, useRef} from 'react';
import { View, Modal, StyleSheet, Text, FlatList, Dimensions, RefreshControl, TouchableWithoutFeedback, TouchableOpacity, Image, Animated, PanResponder } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {LinearGradient} from 'expo-linear-gradient';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';


import {useRoute} from '@react-navigation/native'

import { AppContext } from '../AppContext';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider
  } from 'react-native-popup-menu';

// import dummyaudio from '../data/dummyaudio';
//import { listStorys } from '../src/graphql/queries';
import { deleteStory } from '../src/graphql/mutations';
import {graphqlOperation, API, Auth, Storage} from 'aws-amplify';
import { listRatings } from '../src/customGraphql/customQueries';
import { getUser, getFollowingConn, listFollowingConns, listStories, listPinnedStories, listImageAssets, listAudioAssets } from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';
import { createFollowingConn, deleteFollowingConn } from '../src/graphql/mutations';
import PinStory from './functions/PinStory';
import unPinStory from './functions/UnPinStory';

import { ItemParamList } from '../types';

import StoryTile from '../components/StoryTile';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { forceTouchGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler';



const AudioListByAuthor = ({user, status} : any) => {



    const navigation = useNavigation();

    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        //fetchStorys();
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

    const [publisher, setPublisher] = useState(false);
    const [narrator, setNarrator] = useState(false);
    const [artist, setArtist] = useState(false);

    const [Storys, setStorys] = useState([]);
    const [Narrations, setNarrations] = useState([]);
    const [Arts, setArts] = useState([]);

    const [artSamples, setArtSamples] = useState([]);
    const [audioSamples, setAudioSamples] = useState([]);

    const [sampleState, setSampleState] = useState(false);

    useEffect(() => {
        if (status === 'publisher'){setPublisher(true);}
        if (status === 'narrator'){setNarrator(true);}
        if (status === 'artist'){setArtist(true);}
    }, [])


    useEffect( () => {

        const fetchArtSamples = async () => {
            try {
                const response = await API.graphql(
                    graphqlOperation(
                        listImageAssets, {
                            filter: {
                                userID: {
                                    eq: user
                                },
                                isSample: {
                                    eq: true
                                }
                            }
                        } 
                    )
                )
                setArtSamples(response.data.listImageAssets.items);
            } catch (e) {
                console.log(e);}
        }

        const fetchAudioSamples = async () => {
            try {
                const response = await API.graphql(
                    graphqlOperation(
                        listAudioAssets, {
                            filter: {
                                userID: {
                                    eq: user
                                },
                                isSample: {
                                    eq: true
                                }
                            }
                        } 
                    )
                )
                setAudioSamples(response.data.listAudioAssets.items);
            } catch (e) {
                console.log(e);}
    }

        const fetchStorys = async () => {
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            listStories, {
                                filter: {
                                    userID: {
                                        eq: user
                                    },
                                    hidden: {
                                        eq: false
                                    },
                                    approved: {
                                        eq: true
                                    }
                                }
                            } 
                        )
                    )
                    setStorys(response.data.listStories.items);
                } catch (e) {
                    console.log(e);}
        }

        const fetchNarrations = async () => {
            try {
                const response = await API.graphql(
                    graphqlOperation(
                        listStories, {
                            filter: {
                                narratorID: {
                                    eq: user
                                },
                                hidden: {
                                    eq: false
                                },
                                approved: {
                                    eq: true
                                }
                            }
                        } 
                    )
                )
                setNarrations(response.data.listStories.items);
            } catch (e) {
                console.log(e);}
        }

        const fetchArt = async () => {
            try {
                const response = await API.graphql(
                    graphqlOperation(
                        listStories, {
                            filter: {
                                artistID: {
                                    eq: user
                                },
                                hidden: {
                                    eq: false
                                },
                                approved: {
                                    eq: true
                                }
                            }
                        } 
                    )
                )
                setArts(response.data.listStories.items);
            } catch (e) {
                console.log(e);}
        }

        if (publisher) {fetchStorys();}
        if (narrator) {fetchNarrations();}
        if (artist) {fetchArt();}
        if (sampleState === false) {fetchArtSamples();}
        if (sampleState === true) {fetchAudioSamples();}

        
    },[publisher, narrator, artist, sampleState])

    const ArtItem = ({id, title, imageUri} : any) => {

        const [imageLink, setImageLink] = useState('')

        useEffect(() => {
            const fetchUrl = async () => {
                let response = await Storage.get(imageUri)
                setImageLink(response)
            }
            fetchUrl();
        }, [])

        return (
            <TouchableWithoutFeedback>
                <View style={{marginVertical: 10, alignItems: 'center'}}>
                    <Image 
                        source={{uri: imageLink}} 
                        style={{
                            borderRadius: 10, 
                            width: (Dimensions.get('window').width)-40,
                            height: ((Dimensions.get('window').width)-40)*0.75
                        }}
                    />
                    <Text style={{marginLeft: 40, marginTop: 10, color: '#fff', fontWeight: 'bold', alignSelf: 'flex-start'}}>
                        {title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            
        );
    }

    const renderArtItem = ({item} : any) => {
        return (
            <ArtItem 
                id={item.id}
                title={item.title}
                imageUri={item.imageUri}

            />
        );
    }

    const AudioSampleItem = ({title, id, time, audioUri} : any) => {

        //convert the time to show in the modal
        function millisToMinutesAndSeconds () {
            let minutes = Math.floor(time / 60000);
            let seconds = Math.floor((time % 60000) / 1000);
            return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
        }  

        return (
            <View style={{borderRadius: 15, marginVertical: 10, marginHorizontal:20, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#363636', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        {title}
                    </Text>
                    <Text style={{marginTop: 4, color: 'gray'}}>
                        {millisToMinutesAndSeconds()}
                    </Text>
                </View>
                <TouchableOpacity>
                    <View style={{justifyContent: 'center'}}>
                        <FontAwesome 
                            name='play'
                            color='#fff'
                            size={20}  
                            style={{padding: 10}}
                            onPress={() => navigation.navigate('SimpleAudioPlayer', {item: null, cloudItem: id})}
                        />
                    </View>
                </TouchableOpacity>
                
            </View>
        );
    }

    const renderAudioSampleItem = ({item} : any) => {
        return (
            <AudioSampleItem 
                title={item.title}
                id={item.id}
                time={item.time}
                audioUri={item.audioUri}
            />
        );
    }

    const renderItem = ({ item } : any) => {

        let icon = ''
        let genreName = ''
        let primary = ''

        if (item.genre) {
            icon = item.genre.icon
            genreName = item.genre.genre
            primary = item.genre.PrimaryColor
        }

        return (

        <StoryTile 
            title={item.title}
            imageUri={item.imageUri}
            genreName={genreName}
            icon={icon}
            primary={primary}
            audioUri={item.audioUri}
            summary={item.summary}
            author={item.author}
            narrator={item.narrator}
            time={item.time}
            ratingAvg={item.ratingAvg}
            id={item.id}
            ratingAmt={item.ratingAmt}

        />
      );}

      //const animation = useRef(new Animated.ValueXY({ x: 0, y: 300-20 })).current;

    

      const animation = useRef(new Animated.Value(0)).current;

      const [isScrollEnabled, setIsScrollEnabled] = useState(true);

      const [scrollOffset, setScrollOffset] = useState(0);


    // const animatedHeight = {
    //     transform: animation.getTranslateTransform(),
    // };

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 50],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        });

    const animatedOpacitySlow = animation.interpolate({
        inputRange: [0, 220],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        });

    const animatedAppearOpacity = animation.interpolate({
        inputRange: [0, 450],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        });

    const animatedHeaderHeight = animation.interpolate({
        inputRange: [0, 350],
        outputRange: [450, 80],
        extrapolate: 'clamp',
        });

    const animatedColor = animation.interpolate({
        inputRange: [250, 800],
        outputRange: ['#000000', '#363636'],
        extrapolate: 'clamp',
        });

    // const BackgroundColors = {
    //     backgroundColor: 
    //         genre === 'crime' ? '#cac715' : 
    //         genre === 'fantasy' ? '#15ca54' :
    //         genre === 'suspense' ? '#1579ca' :
    //         genre === 'comedy' ? '#ff9ce6' :
    //         genre === 'science fiction' ? '#c97f8b' :
    //         genre === 'life & adventure' ? '#15b8ca' :
    //         genre === 'fan fiction' ? '#a05ebf' :
    //         genre === 'after dark' ? '#5b6ade' : 
    //         'cyan'
    // }

    const [User, setUser] = useState(null);

    const route = useRoute();
    const {userID} = route.params

    // useEffect(() => {
        
    //     const fetchUser = async () => {
    //         try {
    //             const userData = await API.graphql(graphqlOperation(
    //               getUser, {id: userID}))
    //               if (userData) {
    //                 setUser(userData.data.getUser);
    //               }
    //               console.log(userData.data.getUser);
    //         } catch (e) {
    //             console.log(e);
    //           }  
    //     }
    //     fetchUser();   
    //   }, [])

      

      const [currentUser, setCurrentUser] = useState(null)

      const [Following, setFollowing] = useState(false);

      const [imageU, setImageU] = useState()

      useEffect(() => {

        const fetchUser = async () => {

            const userInfo = await Auth.currentAuthenticatedUser(); 

            try {
                const authorData = await API.graphql(graphqlOperation(
                    getUser, {id: userID}))
                    if (authorData) {
                    setUser(authorData.data.getUser);
                    let response = await Storage.get(authorData.data.getUser.imageUri)
                    setImageU(response);
                    }
                    //console.log(authorData.data.getUser);
            // } catch (e) {
            //     console.log(e);
            //     }  

            // try {                
                const userData = await API.graphql(graphqlOperation(
                  getUser, {id: userInfo.attributes.sub}))
                  if (userData) {
                    setCurrentUser(userData.data.getUser);
                  } 
            // } catch (e) {
            //     console.log(e);
            //   }  
            //   try {                
                const followData = await API.graphql(graphqlOperation(
                    listFollowingConns, {
                        filter: {
                            authorID: {
                                eq: authorData.data.getUser.id
                            },
                            followerID: {
                                eq: userData.data.getUser.id
                            }
                        }
                    }))
                  if (followData.data.listFollowingConns.items.length === 1) {
                    setFollowing(true);
                  } 
            } catch (e) {
                console.log(e);
              }  
        }
        fetchUser();   
        
      }, [])

    //   useEffect(() => {
    //     if (currentUser?.following) {
    //       if (currentUser?.following.includes(User.id)) {
    //             setFollowing(true);
    //           }
    //     } else {null}   
    //   }, [])


    const [SelectedId, setSelectedId] = useState(1);


    // useEffect(() => {
    //     if (currentUser?.following?.includes(User?.id)) {
    //         setFollowing(true);
    //         console.log('this user is being followed')
    //     }
    // }, [])

    const FollowUser = async () => {

        // console.log(currentUser)

        // const updatedUser = {
        //     id: currentUser.id,
        //     //following: currentUser?.following?.includes(User?.id) ? currentUser?.following?.filter(item => item !== User?.id) :
        //     following: currentUser?.following !== null || [] ? [...currentUser?.following, User?.id] : [User?.id]
        // }

        // let followingInfo = await API.graphql(graphqlOperation(updateUser, { input: updatedUser }))
        // console.log(followingInfo)

        // console.log('this is the')
        // console.log(User)

        // const updatedUser = {
        //     id: currentUser.id,
        //     followers: [User]
        // }

        let createConnection = await API.graphql(graphqlOperation(
            createFollowingConn, {input: {followerID: currentUser.id, authorID: User.id}}
        ))
        //let followersInfo = await API.graphql(graphqlOperation(updateUser, {input: updatedUser}))
        //console.log(followersInfo)
        //console.log(createConnection)
    }

    const unFollowUser = async () => {

        // console.log(currentUser)

        // const updatedUser = {
        //     id: currentUser.id,
        //     following:  currentUser?.following?.filter(item => item !== User?.id) 
        //     //currentUser?.following !== null || [] ? [...currentUser?.following, User?.id] : [User?.id]
        // }

        // if (currentUser?.following?.includes(User?.id)) {
        //     let followingInfo = await API.graphql(graphqlOperation(updateUser, { input: updatedUser }))
        //     console.log(followingInfo)
        // }

        
        
        let getConnection = await API.graphql(graphqlOperation(
            listFollowingConns, {
                filter: {
                    authorID: {
                        eq: User.id
                    },
                    followerID: {
                        eq: currentUser.id
                    }
                }
            }
        ))
        
        let connectionID = getConnection.data.listFollowingConns.items[0].id
        //console.log(connectionID)


        let deleteConnection = await API.graphql(graphqlOperation(
            deleteFollowingConn, {input: {"id": connectionID}}
        ))
        //console.log(deleteConnection)
        //console.log(currentUser);
        

    }

    

    function FollowButton () {
        if (Following === true) {
            unFollowUser();
            setFollowing(false);
        }
        if (Following === false) {
            FollowUser();
            setFollowing(true)
            
        }
    }

    

    return (

        <View style={[styles.container]}>

{/* display published stories */}
            {publisher ? (
                <Animated.FlatList 
                    data={Storys}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    //extraData={Following}
                    //stickyHeaderIndices={[0]}
                    //onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: animation } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                    refreshControl={
                        <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}    
                    ListFooterComponent={ () => {
                        return (
                        <View style={{ height:  100}}/>
                        );}
                    }
                    ListHeaderComponent={ () => {

                        return (
                                <View>
                                    <View style={{ height: 500}}/>

                                    {narrator || artist ? (
                                        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
                                            <TouchableWithoutFeedback onPress={() => setSampleState(false)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                        color: !sampleState ? '#fff' : '#ffffffa5', 
                                                        fontWeight: !sampleState ? 'bold' : 'normal', 
                                                        fontSize: !sampleState ? 18 : 16, 
                                                    }}>
                                                        Stories
                                                </Text>
                                            </TouchableWithoutFeedback>
                                            
                                            <TouchableWithoutFeedback onPress={() => setSampleState(true)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                    color: sampleState ? '#fff' : '#ffffffa5',
                                                    fontWeight: sampleState ? 'bold' : 'normal', 
                                                    fontSize: sampleState ? 18 : 16, 
                                                }}>
                                                    Samples
                                                </Text> 
                                            </TouchableWithoutFeedback>  
                                        </View>   
                                    ) : null}
                                    
                                    
                                </View>
                                            
                                        );
                                    }}
                />
            ) : null}

{/* display narrated samples */}
            {narrator && sampleState ? (
                <Animated.FlatList 
                    data={audioSamples}
                    renderItem={renderAudioSampleItem}
                    keyExtractor={item => item.id}
                    //extraData={Following}
                    //stickyHeaderIndices={[0]}
                    //onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: animation } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                    refreshControl={
                        <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}    
                    ListFooterComponent={ () => {
                        return (
                        <View style={{ height:  100}}/>
                        );}
                    }
                    ListHeaderComponent={ () => {

                        return (
                                <View>
                                    <View style={{ height: 500}}/>

                                    {narrator || artist ? (
                                        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
                                            <TouchableWithoutFeedback onPress={() => setSampleState(false)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                        color: !sampleState ? '#fff' : '#ffffffa5', 
                                                        fontWeight: !sampleState ? 'bold' : 'normal', 
                                                        fontSize: !sampleState ? 18 : 16, 
                                                    }}>
                                                        Stories
                                                </Text>
                                            </TouchableWithoutFeedback>
                                            
                                            <TouchableWithoutFeedback onPress={() => setSampleState(true)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                    color: sampleState ? '#fff' : '#ffffffa5',
                                                    fontWeight: sampleState ? 'bold' : 'normal', 
                                                    fontSize: sampleState ? 18 : 16, 
                                                }}>
                                                    Samples
                                                </Text> 
                                            </TouchableWithoutFeedback>  
                                        </View>   
                                    ) : null}
                                    
                                    
                                </View>
                                            
                                        );
                                    }}
                />
            ) : null}

{/* display narrated stories */}
            {narrator && !sampleState ? (
                <Animated.FlatList 
                    data={Narrations}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    //extraData={Following}
                    //stickyHeaderIndices={[0]}
                    //onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: animation } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                    refreshControl={
                        <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}    
                    ListFooterComponent={ () => {
                        return (
                        <View style={{ height:  100}}/>
                        );}
                    }
                    ListHeaderComponent={ () => {

                        return (
                                <View>
                                    <View style={{ height: 500}}/>

                                    {narrator || artist ? (
                                        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
                                            <TouchableWithoutFeedback onPress={() => setSampleState(false)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                        color: !sampleState ? '#fff' : '#ffffffa5', 
                                                        fontWeight: !sampleState ? 'bold' : 'normal', 
                                                        fontSize: !sampleState ? 18 : 16, 
                                                    }}>
                                                        Stories
                                                </Text>
                                            </TouchableWithoutFeedback>
                                            
                                            <TouchableWithoutFeedback onPress={() => setSampleState(true)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                    color: sampleState ? '#fff' : '#ffffffa5',
                                                    fontWeight: sampleState ? 'bold' : 'normal', 
                                                    fontSize: sampleState ? 18 : 16, 
                                                }}>
                                                    Samples
                                                </Text> 
                                            </TouchableWithoutFeedback>  
                                        </View>   
                                    ) : null}
                                    
                                    
                                </View>
                                            
                                        );
                                    }}
                />
            ) : null}

{/* display artist samples */}
            {artist && sampleState ? (
                <Animated.FlatList 
                    data={artSamples}
                    renderItem={renderArtItem}
                    keyExtractor={item => item.id}
                    //extraData={Following}
                    //stickyHeaderIndices={[0]}
                    //onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: animation } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                    refreshControl={
                        <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}    
                    ListFooterComponent={ () => {
                        return (
                        <View style={{ height:  100}}/>
                        );}
                    }
                    ListHeaderComponent={ () => {

                        return (
                                <View>
                                    <View style={{ height: 500}}/>

                                    {narrator || artist ? (
                                        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
                                            <TouchableWithoutFeedback onPress={() => setSampleState(false)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                        color: !sampleState ? '#fff' : '#ffffffa5', 
                                                        fontWeight: !sampleState ? 'bold' : 'normal', 
                                                        fontSize: !sampleState ? 18 : 16, 
                                                    }}>
                                                        Stories
                                                </Text>
                                            </TouchableWithoutFeedback>
                                            
                                            <TouchableWithoutFeedback onPress={() => setSampleState(true)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                    color: sampleState ? '#fff' : '#ffffffa5',
                                                    fontWeight: sampleState ? 'bold' : 'normal', 
                                                    fontSize: sampleState ? 18 : 16, 
                                                }}>
                                                    Samples
                                                </Text> 
                                            </TouchableWithoutFeedback>  
                                        </View>   
                                    ) : null}
                                    
                                    
                                </View>
                                            
                                        );
                                    }}
                />
            ) : null}

{/* display artist stories */}
            {artist && !sampleState ? (
                <Animated.FlatList 
                    data={Arts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    //extraData={Following}
                    //stickyHeaderIndices={[0]}
                    //onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: animation } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                    refreshControl={
                        <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}    
                    ListFooterComponent={ () => {
                        return (
                        <View style={{ height:  100}}/>
                        );}
                    }
                    ListHeaderComponent={ () => {

                        return (
                                <View>
                                    <View style={{ height: 500}}/>

                                    {narrator || artist ? (
                                        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
                                            <TouchableWithoutFeedback onPress={() => setSampleState(false)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                        color: !sampleState ? '#fff' : '#ffffffa5', 
                                                        fontWeight: !sampleState ? 'bold' : 'normal', 
                                                        fontSize: !sampleState ? 18 : 16, 
                                                    }}>
                                                        Stories
                                                </Text>
                                            </TouchableWithoutFeedback>
                                            
                                            <TouchableWithoutFeedback onPress={() => setSampleState(true)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                    color: sampleState ? '#fff' : '#ffffffa5',
                                                    fontWeight: sampleState ? 'bold' : 'normal', 
                                                    fontSize: sampleState ? 18 : 16, 
                                                }}>
                                                    Samples
                                                </Text> 
                                            </TouchableWithoutFeedback>  
                                        </View>   
                                    ) : null}
                                    
                                    
                                </View>
                                            
                                        );
                                    }}
                />
            ) : null}
            

        <Animated.View style={[ {backgroundColor: animatedColor, height: animatedHeaderHeight, width: Dimensions.get('window').width, position: 'absolute', flex: 1}]}>              
            <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-between',  width: Dimensions.get('window').width -40, marginHorizontal: 20, alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                    <AntDesign 
                        name='close'
                        size={25}
                        color='#fff'
                        style={{paddingTop: 0, paddingRight: 10}}
                        onPress={() => navigation.goBack() }
                    />
                    <Animated.Text numberOfLines={1} style={[styles.name, { opacity: animatedAppearOpacity, width: '78%'}]}>
                        {publisher === true ? User?.pseudonym : narrator === true ? User?.narratorPseudo : artist === true ? User?.artistPseudo : null}
                    </Animated.Text>
                </View>

                {narrator === true && currentUser?.isPublisher === true ? (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateMessage', {otherUserID: userID, type: 'narrator'})}>  
                            <Text style={{color: 'cyan', backgroundColor: 'transparent', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 5, borderWidth: 0.5, borderColor: 'cyan',}}>
                                Request Narration
                            </Text>
                    </TouchableOpacity>        
                </View>
                
                ) : artist === true && currentUser?.isPublisher === true ? (
                    <TouchableOpacity onPress={() => navigation.navigate('CreateMessage', {otherUserID: userID, type: 'artist'})}>
                        <View>
                            <Text style={{color: 'cyan', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 5, borderWidth: 0.5, borderColor: 'cyan',}}>
                                Request Cover Art
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : publisher === true ? (
                    <TouchableOpacity onPress={FollowButton}>
                        <View>
                            <Text style={{
                                color: Following === true ? '#000' : 'cyan',
                                backgroundColor: Following === true ? 'cyan' : 'transparent',
                                borderRadius: 20,
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderWidth: Following === true ? 0 : 0.5,
                                borderColor: 'cyan',
                            }}>
                                {Following === true ? 'Following' : 'Follow'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : null}
            </View>

            <Animated.View style={{opacity: animatedOpacitySlow}}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('CreateMessage', {otherUserID: user})}>
                    <View style={{ alignItems: 'center'}}>
                        <Image 
                            source={{ uri: imageU}}
                            style={{width: 120, height: 120, backgroundColor: '#363636',borderRadius: 60, marginTop: 20,}}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                    {publisher ? (
                        <Text style={{fontSize: 22, color: '#fff', fontWeight: 'bold'}}>
                            {User?.pseudonym}
                        </Text>
                    ) : null}
                    {narrator ? (
                        <Text style={{fontSize: 22, color: '#fff', fontWeight: 'bold'}}>
                            {User?.narratorPseudo}
                        </Text>
                    ) : null}
                    {artist ? (
                        <Text style={{fontSize: 22, color: '#fff', fontWeight: 'bold'}}>
                            {User?.artistPseudo}
                        </Text>
                    ) : null}
                </View>

                <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center',}}>
                    {User?.isPublisher === true ? (
                        <TouchableWithoutFeedback onPress={() => {setPublisher(true); setNarrator(false); setArtist(false)}}>
                            <View style={{ alignContent: 'center', flexDirection: 'row', marginBottom: 10, alignSelf: 'center'}}>                                             
                                <FontAwesome5 
                                    name='book-open'
                                    size={publisher ? 14 : 12}
                                    color={publisher ? '#fff' : '#ffffffa5'}
                                    style={{ marginHorizontal: 5, alignSelf: 'center'}}
                                />
                                <Text style={styles.userId}>
                                    {User?.authored.items ? User?.authored.items.length : 0}
                                </Text> 
                            </View> 
                        </TouchableWithoutFeedback>
                        
                    ) : null}
                                        
                    {User?.isNarrator === true ? (
                        <TouchableWithoutFeedback onPress={() => {setPublisher(false); setNarrator(true); setArtist(false)}}>
                            <View style={{ alignContent: 'center', flexDirection: 'row', marginBottom: 10, alignSelf: 'center'}}>                                             
                                <FontAwesome5 
                                    name='book-reader'
                                    size={narrator ? 14 : 12}
                                    color={narrator ? '#fff' : '#ffffffa5'}
                                    style={{ marginHorizontal: 3, alignSelf: 'center'}}
                                />
                                <Text style={styles.userId}>
                                    {User?.narrated.items ? User?.narrated.items.length : 0}
                                </Text> 
                            </View> 
                        </TouchableWithoutFeedback>
                    ) : null}

                    {User?.isArtist === true ? (
                        <TouchableWithoutFeedback onPress={() => {setPublisher(false); setNarrator(false); setArtist(true)}}>
                            <View style={{ alignContent: 'center', flexDirection: 'row', marginBottom: 10, alignSelf: 'center'}}>                                             
                                <FontAwesome5 
                                    name='palette'
                                    size={artist ? 14 : 12}
                                    color={artist ? '#fff' : '#ffffffa5'}
                                    style={{ marginHorizontal: 3, alignSelf: 'center'}}
                                />
                                <Text style={styles.userId}>
                                    {User?.art.items ? User?.art.items.length : 0}
                                </Text> 
                            </View> 
                        </TouchableWithoutFeedback>
                    ) : null}
                </View>
            </Animated.View>

            <Animated.View style={{opacity: animatedOpacity}}>
                <View style={{ alignItems: 'center', marginHorizontal: 20, marginVertical: 10}}>
                    {publisher ? (
                        <Text style={{ color: '#ffffffa5', fontSize: 14, textAlign: 'center'}}>
                            {User?.bio}
                        </Text>
                    ) : null}
                    {narrator ? (
                        <Text style={{ color: '#ffffffa5', fontSize: 14, textAlign: 'center'}}>
                            {User?.narratorText}
                        </Text>
                    ) : null}
                    {artist ? (
                        <Text style={{ color: '#ffffffa5', fontSize: 14, textAlign: 'center'}}>
                            {User?.artistText}
                        </Text>
                    ) : null}             
                </View>
            </Animated.View>
        </Animated.View>
    </View>
);}

const styles = StyleSheet.create({
    container: {
       width: Dimensions.get('window').width, 
    },
    tile: {
        backgroundColor: '#363636a5',
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 20,
        borderRadius: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    userId: {
        fontSize: 12,
        color: '#ffffffa5',
        marginRight: 15,
        marginLeft: 5,
    },
    icontext: {
        fontSize: 10,
        color: '#ffffffa5',
        marginTop: 5,
    },
    popupblock: {
        marginTop: 10,
    },
    paragraph: {
        color: '#ffffffB3'
    },
    playbutton: {
        borderWidth: 0.5,
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 15,
        borderColor: '#ffffffa5',
        color: '#ffffffa5',
    },
    time: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ffffffa5',
        marginHorizontal: 5,
    },
    category: {
        fontSize: 14,
        color: 'gray',
        //fontStyle: 'italic',
        marginVertical: 3,
        textTransform: 'capitalize'

    },

});

export default AudioListByAuthor;
