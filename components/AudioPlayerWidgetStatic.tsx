import React, {useState, useEffect, useRef, useContext} from 'react';
import {
    Text, 
    View, 
    StyleSheet, 
    Dimensions, 
    ImageBackground, 
    Animated, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    PanResponder, 
    Image, 
    ScrollView 
} from 'react-native';

import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as Animatable from 'react-native-animatable';
import {graphqlOperation, API, Storage, Auth} from 'aws-amplify';
import { getStory, listPinnedStories, listRatings } from '../src/graphql/queries';
import { createPinnedStory, deletePinnedStory } from '../src/graphql/mutations';

import { AppContext } from '../AppContext';
import * as RootNavigation from '../navigation/RootNavigation';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


//custom hook for setting the time on the slider
    function useInterval(callback, delay) {
        const savedCallback = useRef();
        
        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);
        
        // Set up the interval.
        useEffect(() => {
            let id = setInterval(() => {
            savedCallback.current();
            }, delay);
            return () => clearInterval(id);
        }, [delay]);
    }


const AudioPlayer  = () => {

//get the global page state for the audio player
    const { isRootScreen } = useContext(AppContext);

//get context for storyID
    const { storyID } = useContext(AppContext);
    const { setStoryID } = useContext(AppContext);

//minimize the player with animations
    const [isExpanded, setIsExpanded] = useState(true);

    const animation = useRef(new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 90 })).current;

    const onChangeHandler = () => {
        if (isExpanded) {
            setIsExpanded(false);
            Animated.spring(animation.y, {
                toValue: -SCREEN_HEIGHT + 120,
                tension: 1,
                //duration: 200,
                useNativeDriver: false,
            }).start();
        } else if (!isExpanded) {
            setIsExpanded(true);
            Animated.spring(animation.y, {
                toValue: SCREEN_HEIGHT - 90,
                tension: 1,
                //duration: 200,
                useNativeDriver: false,
            }).start();
        } 
    }

    const animatedHeight = {
        transform: animation.getTranslateTransform(),
    };
  
    const animatedImageHeight = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_WIDTH/1.2, 0],
        extrapolate: 'clamp',
        });
        
    const animatedImageWidth = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_WIDTH, 0],
        extrapolate: 'clamp',
        });

    const animatedSongTitleOpacity = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
    });

    const animatedImageMarginLeft = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_WIDTH / 2 - 100, 10],
        extrapolate: 'clamp',
    });

    const animatedHeaderHeightMinimized = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_HEIGHT, 0],
        extrapolate: 'clamp',
    });

    const animatedButtonLeft = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [0, -80],
        extrapolate: 'clamp',
    });

    const animatedButtonRight = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [0, -300],
        extrapolate: 'clamp',
    });

    const animatedHeaderHeightSmall = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [0, 60],
        extrapolate: 'clamp',
    });

    const animatedBoxHeight = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_HEIGHT - 240, 60],
        extrapolate: 'clamp',
      });

    const animatedBottom = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - (isRootScreen === true ? 60 : 90)],
        outputRange: [-610, 690],
        extrapolate: 'clamp',
      });

    const animatedSongDetailsOpacity = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
        outputRange: [1, 0.5, 0.5],
        extrapolate: 'clamp',
    });

    const animatedBackgroundColor = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: ['rgba(0,0,0,0.5)', 'white'],
        extrapolate: 'clamp',
    });

//use storyID to retrieve Story from AWS
    const [Story, setStory] = useState(null);
    const [AudioUri, setAudioUri] = useState('');

//fetch the story attributes and audioUri from the s3 bucket
    useEffect(() => {

        const fetchStory = async () => {
        
            try {
                const storyData = await API.graphql(graphqlOperation(getStory, {id: storyID}))

                if (storyData) {
                    setStory(storyData.data.getStory);
                    const response = await Storage.get(storyData.data.getStory.audioUri, {download: false, expiration: 604800});
                    setAudioUri(response);
                    setPosition(0);
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchStory();

    }, [storyID])

//background colors for the genre indicator
    const Colors = {
        color: 
            Story?.genre === 'adventure' ? '#27d995' :
            Story?.genre === 'comedy' ? '#ff9ce6' :
            Story?.genre === 'crime' ? '#cac715' : 
            Story?.genre === 'fan fiction' ? '#c92ad1' :
            Story?.genre === 'fantasy' ? '#15ca54' :
            Story?.genre === 'horror' ? '#1579ca' :
            Story?.genre === 'life' ? '#15b8ca' :
            Story?.genre === 'love' ? '#f05161' :
            Story?.genre === 'mystery' ? '#ff6f00' :
            Story?.genre === 'science fiction' ? '#c97f8b' :
            Story?.genre === 'after dark' ? '#7081ff' : 
            '#ffffffa5',
        }

//audio player
    const [sound, setSound] = useState();

    const [isPlaying, setIsPlaying] = useState(false);

    const [position, setPosition] = useState(0); //position in milliseconds

    const [slideLength, setSlideLength] = useState(0); //slide length

    const onClose = () => {
        setStoryID(null);
        setStory(null);
    }

//add a story to the pinned playlist function
    const PinStory = async () => {

        let userInfo = await Auth.currentAuthenticatedUser();
    
        let createPin = await API.graphql(graphqlOperation(
            createPinnedStory, {input: {userID: userInfo.attributes.sub, storyID: storyID}}
        ))
        console.log(createPin)
    }

//on render, determine if the story in alraedy pinned or not
    useEffect(() => {
        const fetchPin = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            try {
                let getPin = await API.graphql(graphqlOperation(
                    listPinnedStories, {
                        filter: {
                            userID: {
                                eq: userInfo.attributes.sub
                            },
                            storyID: {
                                eq: storyID
                            }
                        }
                    }
                ))

                if (getPin.data.listPinnedStories.items.length === 1) {
                    setQd(true);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPin();
    }, [storyID])

//unpin a story
    const unPinStory = async () => {

        let userInfo = await Auth.currentAuthenticatedUser();

        let getPin = await API.graphql(graphqlOperation(
            listPinnedStories, {
                filter: {
                    userID: {
                        eq: userInfo.attributes.sub
                    },
                    storyID: {
                        eq: storyID
                    }
                }
            }
        ))
        console.log(getPin)
        
        let connectionID = getPin.data.listPinnedStories.items[0].id
        console.log(connectionID)

        let deleteConnection = await API.graphql(graphqlOperation(
            deletePinnedStory, {id: connectionID}
        ))
        console.log(deleteConnection)
    }


//queueing the item state when pressed
    const [isQ, setQd] = useState(false);
        
    const onQPress = () => {
        if ( isQ === false ) {
            setQd(true);
            PinStory()
        }
        if ( isQ === true ) {
            setQd(false);
            unPinStory();
        }  
    };

//calculate the average user rating for a story
const [AverageUserRating, setAverageUserRating] = useState(0);

useEffect(() => {

    let Average = []

    const fetchRating = async () => {

        let RatingAvg = await API.graphql(graphqlOperation(
            listRatings, {filter: {
                storyID: {
                    eq: storyID
                }
            }}
        ))

        if (RatingAvg.data.listRatings.items.length > 0) {
            for (let i = 0; i < RatingAvg.data.listRatings.items.length; i++) {
                Average.push(RatingAvg.data.listRatings.items[i].rating) 
            }
            setAverageUserRating(
                Math.floor(((Average.reduce((a, b) => {return a + b}))/(RatingAvg?.data.listRatings.items.length))*10)
            )
        }
    }
    fetchRating();
}, [storyID])




//slider functions
    function SetPosition(value) {
        setPosition(value)
    }

    async function StoryPosition (value) { 
        await sound.setPositionAsync(value);
        setPosition(value);
    }

    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(position / 60000);
        let seconds = ((position % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

    function convertToTime () {
        let minutes = Math.floor(slideLength / 60000);
        let seconds = Math.floor((slideLength % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }  

//audio play and pause control
    async function PlayPause() {

        console.log('Loading Sound');
        console.log(Story);
        const { sound } = await Audio.Sound.createAsync(
            //{uri: AudioUri},
            require('../assets/zelda.mp3'),
            {shouldPlay: true}
        );
        
        setSound(sound);


        let time = await sound.getStatusAsync();
        setSlideLength(time.durationMillis);

        if (isPlaying === false) {
            console.log('Playing Sound');
            await sound.playAsync(); 
            setIsPlaying(true);
            await sound.setPositionAsync(position);
        } 
        if (isPlaying === true) {
            await sound.pauseAsync();
            setIsPlaying (false);     
        }    
    }

    // useEffect(() => {
    //     if (Story) {
    //     PlayPause(); }
    // }, [Story]);

    useInterval(() => {
        if (isPlaying === true && position < slideLength) {
        setPosition(position + 1000);
        }
      }, 1000);
    
    useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);

    if (!Story) {
        return null;
    }


    return (

        <View>
            <Animated.View
                style={{
                height: animatedImageHeight,
                width: animatedImageWidth,
                position: 'absolute',
                bottom: 460,
                }}>
                <ImageBackground
                    style={{
                        flex: 1,
                        width: null,
                        height: null,
                        backgroundColor: '#363636'
                    }}
                    source={{uri: Story?.imageUri}}
                >
                { isExpanded === false ? (
                    <Animated.View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-between', marginHorizontal: 20}}>
                        <View>
                           <TouchableOpacity onPress={onClose}>
                                <Animated.View style={ [styles.button, {left: -20}]}>
                                    <AntDesign 
                                        name='close'
                                        size={22}
                                        color='#fff'
                                    />
                                </Animated.View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onChangeHandler}>
                                <Animated.View style={ [styles.button, {left: -20}]}>
                                    <FontAwesome5 
                                        name='chevron-down'
                                        size={22}
                                        color='#fff'
                                    />
                                </Animated.View>
                            </TouchableOpacity> 
                        </View>
                        
                        
                        <View>
                            
                            <Animated.View style={ [styles.button, {right: -20}]}>
                                <AntDesign 
                                    name={isQ ? 'pushpin' : 'pushpino'}
                                    size={22}
                                    color={isQ ? 'cyan' : 'white'}
                                    onPress={onQPress}
                                    style={{ }}
                                />
                            </Animated.View>
                            
                            <Animated.View style={ [styles.button, {right: -20}]}>
                                <FontAwesome 
                                    name='share'
                                    size={22}
                                    color='white'
                                    //onPress={}
                                    style={{ }}
                                />
                            </Animated.View>
                        </View>  
                    </Animated.View>
                ) : null } 
                </ImageBackground>
            </Animated.View>

            <Animated.View
                style={[
                    animatedHeight, {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: animatedBottom,
                        //zIndex: 10,
                        height: animatedBoxHeight,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                    },
                ]}>
                    <LinearGradient 
                        colors={[isExpanded ? '#171c2b' : '#3b4b80', isExpanded ? '#171c2b' : '#000', isExpanded ? '#171c2bD9' : '#000']}
                        style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15, flex: 1}}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                    >
                        <Animated.View style={{ height: animatedHeaderHeightSmall, flexDirection: 'row', alignItems: 'center', }}>
                            { isExpanded === true ? (
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                    <TouchableWithoutFeedback 
                                        onPress={onChangeHandler}
                                    >
                                        <Animated.Text
                                            style={{
                                                opacity: animatedSongTitleOpacity,
                                                fontSize: 18,
                                                paddingLeft: 20,
                                                color: '#fff',
                                        }}>
                                            {Story?.title}
                                        </Animated.Text>
                                    </TouchableWithoutFeedback>
                                        <Animated.View style={{opacity: animatedSongTitleOpacity,}}>
                                            <FontAwesome5 
                                                name={isPlaying === true ? 'pause' : 'play'}
                                                color='#ffffffCC'
                                                size={20}
                                                style={{ paddingHorizontal: 40,}}
                                                onPress={PlayPause}
                                            />
                                        </Animated.View>
                                    </View> 
                            ) : null } 
                        </Animated.View>
                        
    {/* Expanded View elements */}
                <Animated.View
                    style={{
                        height: animatedHeaderHeightMinimized,
                        opacity: animatedSongDetailsOpacity,
                    }}>
                    { isExpanded === false ? (
                        <View style={{ justifyContent: 'space-between', height: '60%'}}>
                            <View>
                                <TouchableWithoutFeedback 
                                    onPress={
                                        () => {RootNavigation.navigate('AudioPlayer', { storyID: storyID });
                                        onChangeHandler();}
                                    }>
                                    <View style={{ alignItems: 'center',  marginHorizontal: 40, marginVertical: 20, }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                                            {Story?.title}
                                        </Text>

                                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10,justifyContent: 'space-between'}}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <FontAwesome5 
                                                    name='book-open'
                                                    color='#ffffffCC'
                                                    size={15}
                                                    style={{ marginRight: 10}}
                                                />
                                                <Text style={styles.username}>
                                                    {Story?.author}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <FontAwesome5 
                                                    name='book-reader'
                                                    color='#ffffffCC'
                                                    size={15}
                                                    style={{ marginRight: 10}}
                                                />
                                                <Text style={styles.username}>
                                                    {Story?.narrator}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>  
                                </TouchableWithoutFeedback>

                                <View style={{ alignItems: 'center', marginHorizontal: 20}}>
                                    <View style={{marginTop: 10,}}>
                                        <View style={[{flexDirection: 'row', justifyContent: 'space-between', width: 300}]}>
                                            <Text style={[Colors, { fontSize: 16, textTransform: 'capitalize' }]}>
                                                {Story?.genre}
                                            </Text>
                                            <Text style={{fontSize: 18, color: 'gold', fontWeight: 'bold' }}>
                                                {AverageUserRating}%
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 100, marginTop: 30 }}>
                                        <Text style={styles.highlight}>
                                            {Story?.summary}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            
                            <View>
                                <View style={{alignSelf: 'center' }}>
                                    <FontAwesome5 
                                        name={isPlaying === true ? 'pause' : 'play'}
                                        color='#ffffffCC'
                                        size={50}
                                        onPress={PlayPause}
                                    />
                                </View>

                                <View style={{ marginTop: 20, width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',}}>
                                    <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                                        {millisToMinutesAndSeconds()}
                                    </Text>
                                    <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                                        {convertToTime()}
                                    </Text>
                                </View>

                                <View style={{ alignItems: 'center'}}>
                                    <Slider
                                        style={{width: 320, height: 10}}
                                        minimumTrackTintColor="cyan"
                                        maximumTrackTintColor="#ffffffa5"
                                        thumbTintColor='#fff'
                                        //tapToSeek={true}
                                        value={position}
                                        step={1000}

                                        minimumValue={0}
                                        maximumValue={slideLength} //function set to the length of the audio file
                                        onValueChange={SetPosition} //function: when slider changes, slider value = SetPosition
                                        onSlidingComplete={StoryPosition}
                                    />
                                </View>
                            </View>
                        </View>
                    ) : null } 
                </Animated.View>
            </LinearGradient>
        </Animated.View>
    </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#363636a5',
        borderRadius: 50,
        width: 36,
        height: 36,
        margin: 10,
    },
    username: {
        color: '#ffffffCC',
        fontSize: 16,
        marginVertical: 5,
        textTransform: 'capitalize'
    },
    highlight: { 
        color: '#ffffffCC',
        fontSize: 14,
        borderRadius: 15,
        padding: 10,
        backgroundColor: '#363636CC',
    },
   
});

export default AudioPlayer;
