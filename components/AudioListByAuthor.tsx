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
import { getUser, getFollowingConn, listFollowingConns, listStories, listPinnedStories } from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';
import { createFollowingConn, deleteFollowingConn } from '../src/graphql/mutations';
import PinStory from './functions/PinStory';
import unPinStory from './functions/UnPinStory';

import { ItemParamList } from '../types';

import StoryTile from '../components/StoryTile';



const AudioListByAuthor = ({user} : any) => {

    //     const Item = ({title, genreName, icon, ratingAvg, Primary, summary, imageUri, nsfw, audioUri, author, narrator, time, id} : any) => {
            
    
    //         const navigation = useNavigation();
    
    //     //expanding list component
    //         const [isVisible, setIsVisible] = useState(false);
    //     //liking the item
    //         const [isLiked, setIsLiked] = useState(false);
            
    //         const onLikePress = () => {
    //             if ( isLiked === false ) {
    //                 setIsLiked(true);
    //             }
    //             if ( isLiked === true ) {
    //                 setIsLiked(false);
    //             }  
    //         };
    
    // //queueing the item
    // const [isQ, setQd] = useState(false);
        
    // const onQPress = () => {
    //     if ( isQ === false ) {
    //         setQd(true);
    //         PinStory({storyID: id})
    //         //PinStory()
    //     }
    //     if ( isQ === true ) {
    //         setQd(false);
    //         unPinStory({storyID: id});
    //     }  
    // };
    
    
    
    
    //         //play the audio story
    //         const { setStoryID } = useContext(AppContext);
    
    //         const onPlay = () => {
    //             setStoryID(id);
    //         }
    
    //         //calculate the average user rating fora  story
    //     const [AverageUserRating, setAverageUserRating] = useState(0);
    
    //     //rating function
    //     const [isRated, setIsRated] = useState(false);
    
    //     useEffect(() => {
    
    //         let Average = []
    
    //         const fetchRating = async () => {
    
    //             let userInfo = await Auth.currentAuthenticatedUser();
    
    //             let Rating = await API.graphql(graphqlOperation(
    //                 listRatings, {filter: {
    //                     userID: {
    //                         eq: userInfo.attributes.sub
    //                     },
    //                     storyID: {
    //                         eq: id
    //                     }
    //                 }}
    //             ))
    //             if (Rating.data.listRatings.items.length === 1) {
    //                 //setRatingNum(Rating.data.listRatings.items[0].rating);
    //                 setIsRated(true);
    //                 //setRatingID(Rating.data.listRatings.items[0].id);
    //             } else {
    //                 //setRatingNum(0);
    //                 setIsRated(false);
    //             }
    
    //             let RatingAvg = await API.graphql(graphqlOperation(
    //                 listRatings, {filter: {
    //                     storyID: {
    //                         eq: id
    //                     }
    //                 }}
    //             ))
    
    //             if (RatingAvg.data.listRatings.items.length > 0) {
    //                 for (let i = 0; i < RatingAvg.data.listRatings.items.length; i++) {
    //                     Average.push(RatingAvg.data.listRatings.items[i].rating) 
    //                 }
    //                 setAverageUserRating(
    //                     Math.floor(((Average.reduce((a, b) => {return a + b}))/(RatingAvg?.data.listRatings.items.length))*10)
    //                 )
    //             }
    //         }
    //         fetchRating();
    //     }, [])

    //     //convert time to formatted string
    //     function millisToMinutesAndSeconds () {
    //         let minutes = Math.floor(time / 60000);
    //         let seconds = Math.floor((time % 60000) / 1000);
    //         return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    //     } 
    
    //         return (
    //             <View>
    //                 <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
    //                     <View style={styles.tile}>
    //                         <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
    //                             <View style={{ width: '78%'}}>
    //                                 <TouchableOpacity onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
    //                                     <Text style={styles.name}>
    //                                         {title}
    //                                     </Text>
    //                                 </TouchableOpacity>
                                     
    //                                 <View style={{flexDirection: 'row'}}>
    //                                     <Text style={[styles.category]}>
    //                                         {genreName}
    //                                     </Text>
    //                                 </View>
    //                                 <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
    //                                     <FontAwesome5 
    //                                         name='book-open'
    //                                         size={12}
    //                                         color='#ffffffa5'
    //                                     />
    //                                     <Text style={styles.userId}>
    //                                         {author}
    //                                     </Text>  
    //                                     <FontAwesome5 
    //                                         name='book-reader'
    //                                         size={12}
    //                                         color='#ffffffa5'
    //                                     />
    //                                     <Text style={styles.userId}>
    //                                         {narrator}
    //                                     </Text> 
    //                                 </View>
    //                             </View>
    //                             <TouchableOpacity onPress={onPlay}>
    //                                 <View style={{ 
    //                                     flexDirection: 'row', 
    //                                     alignItems: 'center', 
    //                                     borderRadius: 30,
    //                                     paddingVertical: 2,
    //                                     paddingHorizontal: 8,
    //                                     backgroundColor: '#ffffff33',
    //                                     borderColor: '#ffffffCC',
    //                                 }}>
    //                                     <FontAwesome5 
    //                                         name='play'
    //                                         color='#ffffff'
    //                                         size={10}
    //                                     />
    //                                     <Text style={styles.time}>
    //                                         {millisToMinutesAndSeconds()}
    //                                     </Text> 
    //                                 </View>
    //                             </TouchableOpacity>
    //                         </View> 
                    
    //                 { isVisible ? (
    //                     <View style={styles.popupblock}>
    //                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
    //                             <View style={{alignItems: 'center', width: '100%',flexDirection: 'row', justifyContent: 'space-between'}}>
    //                                 <View style={{ marginVertical: 10, alignSelf: 'flex-start', flexDirection: 'row',  }}>
        
    //                                     <View style={{alignItems: 'center', marginRight: 25,}}>
    //                                         <AntDesign
    //                                             name={isQ ? 'pushpin' : 'pushpino'}
    //                                             size={20}
    //                                             color={isQ ? 'cyan' : 'white'}
    //                                             onPress={onQPress}
    //                                         />
    //                                     </View>
    
    //                                     <View style={{alignItems: 'center'}}>
    //                                         <FontAwesome
    //                                             name='share'
    //                                             size={20}
    //                                             color='white'
    //                                             onPress={onLikePress}
    //                                         />
    //                                     </View>
    //                                 </View>
    
    //                                 <View>
    //                                     <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
    //                                         <FontAwesome
    //                                             name={isRated ? 'star' : 'star-o'}
    //                                             size={17}
    //                                             color={isRated ? 'gold' : 'white'}
    //                                             style={{paddingHorizontal: 10}}
    //                                         />
    //                                         <Text style={{textAlign: 'center', fontSize: 17, color: '#e0e0e0'}}>
    //                                             {ratingAvg}
    //                                         </Text>
    //                                     </View>
    //                                 </View>
                            
    //                             </View>  
    //                         </View>
    
    //                         <TouchableWithoutFeedback onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
    //                             <Image 
    //                                 source={{uri: imageUri}}
    //                                 style={{
    //                                     height: 200,
    //                                     borderRadius: 15,
    //                                     marginVertical: 15,
    //                                     marginHorizontal: -10
    //                                 }}
    //                             />
    //                         </TouchableWithoutFeedback>
    //                         <Text style={styles.paragraph}>
    //                             {summary}
    //                         </Text>
    //                     </View>
    //                 ) : false }  
    //                     </View>
    //                 </TouchableWithoutFeedback>
    //             </View>
    //         );
    //     }

    const navigation = useNavigation();

    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        //fetchStorys();
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

    const [Storys, setStorys] = useState([]);

    useEffect( () => {

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
        fetchStorys();
    },[])

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
        inputRange: [0, 200],
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
        inputRange: [0, 800],
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
                //style={{marginTop: 300}}
                refreshControl={
                    <RefreshControl
                     refreshing={isFetching}
                     onRefresh={onRefresh}
                    />
                  }
                showsVerticalScrollIndicator={false}    
                ListFooterComponent={ () => {
                    return (
                    <View style={{ height:  70, alignItems: 'center'}}>
                        <Text style={{ color: 'white', margin: 20,}}>
                            
                        </Text>
                    </View>
                    );}
                }
                ListHeaderComponent={ () => {

                    return (

                        <View style={{ height: 500}}>
                        </View>                
                        );
                    }}
            />

                        <Animated.View style={[ {backgroundColor: animatedColor, height: animatedHeaderHeight, width: Dimensions.get('window').width, position: 'absolute', flex: 1}]}
                        >
                       
                                <View style={{ flexDirection: 'row', marginVertical: 40, justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center'}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                        <AntDesign 
                                            name='close'
                                            size={25}
                                            color='#fff'
                                            style={{
                                                marginVertical: 20,
                                                marginRight: 10,
                                            }}
                                            onPress={() => navigation.goBack() }
                                        />
                                        <Animated.Text style={[styles.name, { opacity: animatedAppearOpacity}]}>
                                            {User?.pseudonym}
                                        </Animated.Text>
                                    </View>
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
                                </View>

                                <Animated.View style={{opacity: animatedOpacitySlow}}>

                                    <View style={{ alignItems: 'center'}}>
                                        <Image 
                                            source={{ uri: imageU}}
                                            style={{
                                                width: 120,
                                                height: 120,
                                                backgroundColor: '#363636',
                                                borderRadius: 60,
                                                marginTop: 20,
                                                
                                            }}
                                        />
                                    </View>

                                    <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                                        <Text style={{fontSize: 22, color: '#fff', fontWeight: 'bold'}}>
                                            {User?.pseudonym}
                                        </Text>
                                    </View>

                                    <View style={{ alignContent: 'center', flexDirection: 'row', marginBottom: 10, alignSelf: 'center'}}>                                             
                                        <FontAwesome5 
                                            name='book-open'
                                            size={12}
                                            color='#ffffffa5'
                                            style={{ marginRight: 5, alignSelf: 'center'}}
                                        />
                                        <Text style={styles.userId}>
                                            {User?.authored.items ? User?.authored.items.length : 0}
                                        </Text> 
                                    </View> 
                                </Animated.View>

                                <Animated.View style={{opacity: animatedOpacity}}>
                                <View style={{ alignItems: 'center', marginHorizontal: 20, marginVertical: 10}}>
                                    <Text style={{ color: '#ffffffa5', fontSize: 14, textAlign: 'center'}}>
                                        {User?.bio}
                                    </Text>
                                </View>

                                <View style={{ 
                                    flexDirection: 'row', 
                                    justifyContent: 'space-evenly', 
                                    width: '100%', 
                                    alignItems: 'flex-end',
                                    //marginHorizontal: 20,
                                    height: 50,
                                    marginBottom: 20
                                }}>
                        
                                    {/* <TouchableWithoutFeedback onPress={() => setSelectedId(1)}>
                                        <Text style={{ 
                                            color: SelectedId ===  1 ? '#fff' : '#ffffffa5',
                                            marginHorizontal: 15, 
                                            fontSize: SelectedId ===  1 ? 22 : 17,
                                            fontWeight: SelectedId === 1 ? 'bold' : 'normal',
                                            borderBottomColor: '#fff',
                                            //borderBottomWidth: SelectedId ===  1 ? 1 : 0,
                                        }}>
                                            Authored
                                        </Text>
                                    </TouchableWithoutFeedback> */}

                                    {/* <TouchableWithoutFeedback onPress={() => setSelectedId(2)}>
                                        <Text style={{ 
                                            color: SelectedId ===  2 ? '#fff' : '#ffffffa5',
                                            marginHorizontal: 15, 
                                            fontSize: SelectedId ===  2 ? 22 : 17,
                                            fontWeight: SelectedId === 2 ? 'bold' : 'normal'
                                        }}>
                                            Narrations
                                        </Text>
                                    </TouchableWithoutFeedback> */}
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
