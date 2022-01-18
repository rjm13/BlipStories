import React, {useState, useEffect, useContext} from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, ImageBackground, RefreshControl, TouchableOpacity } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Carousel from 'react-native-snap-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LinearGradient} from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';
import * as RootNavigation from '../../navigation/RootNavigation';

import { listPinnedStories, listStories } from '../../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';

import { AppContext } from '../../AppContext';

import data from '../../data/dummyaudio';
import { createPinnedStory, deletePinnedStory } from '../../src/graphql/mutations';




const ForYouCarousel = () => {

    const Item = ({title, genre, summary, imageUri, audioUri, author, narrator, time, id} : any) => {

    //set context globally for storyID
    //const {story} = props;

        //add a story to the pinned playlist function
        const PinStory = async () => {

            let userInfo = await Auth.currentAuthenticatedUser();
        
            let createPin = await API.graphql(graphqlOperation(
                createPinnedStory, {input: {userID: userInfo.attributes.sub, storyID: id}}
            ))
            console.log(createPin)
        }

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
                            eq: id
                        }
                    }
                }
            ))
            console.log(getPin)
            
            let connectionID = getPin.data.listPinnedStories.items[0].id
            console.log(connectionID)

            let deleteConnection = await API.graphql(graphqlOperation(
                deletePinnedStory, {input: {"id": connectionID}}
            ))
            console.log(deleteConnection)

            setDidUpdate(!didUpdate)
        }

        //set the gloabal context for the storyID
        const { setStoryID } = useContext(AppContext);

        const onPlay = () => {
            setStoryID(id);
        }

        //convert time to formatted string
        function millisToMinutesAndSeconds () {
            let minutes = Math.floor(time / 60000);
            let seconds = Math.floor((time % 60000) / 1000);
            return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
        } 

        const Colors = {
            color: 
                genre === 'adventure' ? '#27d995' :
                genre === 'comedy' ? '#ff9ce6' :
                genre === 'crime' ? '#cac715' : 
                genre === 'fan fiction' ? '#c92ad1' :
                genre === 'fantasy' ? '#15ca54' :
                genre === 'horror' ? '#1579ca' :
                genre === 'life' ? '#15b8ca' :
                genre === 'love' ? '#f05161' :
                genre === 'mystery' ? '#ff6f00' :
                genre === 'science fiction' ? '#c97f8b' :
                genre === 'after dark' ? '#7081ff' : 
                '#ffffffa5',
            borderColor: 
                genre === 'adventure' ? '#27d995' :
                genre === 'comedy' ? '#ff9ce6' :
                genre === 'crime' ? '#cac715' : 
                genre === 'fan fiction' ? '#c92ad1' :
                genre === 'fantasy' ? '#15ca54' :
                genre === 'horror' ? '#1579ca' :
                genre === 'life' ? '#15b8ca' :
                genre === 'love' ? '#f05161' :
                genre === 'mystery' ? '#ff6f00' :
                genre === 'science fiction' ? '#c97f8b' :
                genre === 'after dark' ? '#7081ff' : 
                '#ffffffa5',
        }
        const BackgroundColors = {
        backgroundColor: 
                genre === 'adventure' ? '#27d995' :
                genre === 'comedy' ? '#ff9ce6' :
                genre === 'crime' ? '#cac715' : 
                genre === 'fan fiction' ? '#c92ad1' :
                genre === 'fantasy' ? '#15ca54' :
                genre === 'horror' ? '#1579ca' :
                genre === 'life' ? '#15b8ca' :
                genre === 'love' ? '#f05161' :
                genre === 'mystery' ? '#ff6f00' :
                genre === 'science fiction' ? '#c97f8b' :
                genre === 'after dark' ? '#7081ff' : 
                '#ffffffa5',
        }


        const navigation = useNavigation();

        const [isVisible, setIsVisible] = useState(false);
        
        const onShow = () => {
            if ( isVisible === false ) {
                setIsVisible(true);
            }
            if ( isVisible === true ) {
                setIsVisible(false);
            }  
        };

    //liking the item
        const [isLiked, setIsLiked] = useState(false);
        
        const onLikePress = () => {
            if ( isLiked === false ) {
                setIsLiked(true);
            }
            if ( isLiked === true ) {
                setIsLiked(false);
            }  
        };

    //queueing the item
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
                                    eq: id
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
        }, [])

        return (
            <View style={styles.container}>
                {/* <LinearGradient
                    colors={['#18c9c9a5','#2f2179', '#000']}
                    style={{ }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                > */}
                <View style={{ position: 'absolute', alignSelf: 'center', top: 80, backgroundColor: 'transparent'}}>
                    <FontAwesome5 
                        name={
                            genre === 'crime' ? 'shoe-prints' : 
                            genre === 'fantasy' ? 'hat-wizard' :
                            genre === 'suspense' ? 'user-secret' :
                            genre === 'comedy' ? 'poo' :
                            genre === 'science fiction' ? 'user-astronaut' :
                            genre === 'life & adventure' ? 'leaf' :
                            genre === 'fan fiction' ? 'quidditch' :
                            genre === 'after dark' ? 'moon' : 
                            'dumpster-fire'}
                        color='#ffffff'
                        size={50}
                    />
                </View>
                {/* </LinearGradient> */}
                <TouchableWithoutFeedback onPress={() => navigation.navigate('AudioPlayer', {storyID: id})}>
                <ImageBackground
                    source={{uri: imageUri}}
                    style={[Colors, BackgroundColors, { width: '100%', height: 280, justifyContent: 'flex-end', borderRadius: 15}]}
                    imageStyle={{
                        borderRadius: 15,
                        
                    }}
                >
                    <View style={{ 
                        backgroundColor: '#000000a5',
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        borderTopRightRadius: isVisible === true ? 15 : 0,
                        borderTopLeftRadius: isVisible === true ? 15 : 0,
                        //height: isVisible === true ? '100%' : '35%',
                        //height: '35%',
                        width: '100%',
                        padding: 10, 
                    }}
                    >
                        <TouchableWithoutFeedback onPress={onShow}>
                            <View>
                                <View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View>
                                            <Text style={styles.title}>
                                                {title}
                                            </Text> 
                                            <Text style={[styles.category, Colors]}>
                                                {genre}
                                            </Text>
                                        </View>
                                        
                                    </View>
                                    
                                    
                                    <View>
                                        <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                                            <FontAwesome5 
                                                name='book-open'
                                                size={12}
                                                color='#ffffffa5'
                                            />
                                            <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: '7755e914-9ae4-4dd0-a421-b517980b6808'})}>
                                                <Text style={styles.userId}>
                                                    {author}
                                                </Text>  
                                            </TouchableOpacity>
                                            <FontAwesome5 
                                                name='book-reader'
                                                size={12}
                                                color='#ffffffa5'
                                            />
                                            <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: '7755e914-9ae4-4dd0-a421-b517980b6808'})}>
                                                <Text style={styles.userId}>
                                                    {narrator}
                                                </Text> 
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>


                        <View>
                            { isVisible ? (
                                <View style={styles.popupblock}>
                                    <View style={{ marginTop: 20, marginBottom: 10 }}> 
                                        <Text style={styles.paragraph}>
                                            {summary}
                                        </Text>
                                    </View>
                        <View> 
                                <View style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, marginHorizontal: 0, flexDirection: 'row',  }}>
                                        <TouchableOpacity onPress={onPlay}>
                                            <View style={{ 
                                                flexDirection: 'row', 
                                                alignItems: 'center', 
                                                borderRadius: 30,
                                                paddingVertical: 2,
                                                paddingHorizontal: 8,
                                                backgroundColor: '#ffffff4D',
                                                borderColor: '#ffffffCC',
                                                
                                                //borderWidth: 0.5,
                                                //height: 26 
                                                }}>
                                                    <FontAwesome5 
                                                        name='play'
                                                        color='#ffffff'
                                                        size={10}
                                                        style={{marginRight: 8}}
                                                    />
                                                    <Text style={{
                                                        fontSize: 14,
                                                        fontWeight: 'normal',
                                                        color: '#ffffffCC',
                                                    
                                                    }}>
                                                        {millisToMinutesAndSeconds()}
                                                    </Text> 
                                            </View>
                                        </TouchableOpacity>
                                        
                                        <AntDesign
                                            name={isQ ? 'pushpin' : 'pushpino'}
                                            size={22}
                                            color={isQ ? 'cyan' : 'white'}
                                            onPress={onQPress}
                                        />
                                    
                                </View>

                            
                                    </View>
                            </View>

                            ) : false } 
                        </View>

                    </View>

                </ImageBackground>
                </TouchableWithoutFeedback>
            </View>
        );
    }
    const [didUpdate, setDidUpdate] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

    const [Storys, setStorys] = useState([]);

    useEffect( () => {
        const fetchStorys = async () => {
            try {
                const response = await API.graphql(
                    graphqlOperation(
                        listStories
                    )
                )
                setStorys(response.data.listStories.items);
            } catch (e) {
                console.log(e);
            }
        }
        fetchStorys();
    },[didUpdate])

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate);
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

    const renderItem = ({ item }: any) => (
        <Item 
          title={item.title}
          imageUri={item.imageUri}
          genre={item.genre}
          audioUri={item.audioUri}
          summary={item.summary}
          author={item.author}
          narrator={item.narrator}
          time={item.time}
          id={item.id}
          //liked={item.liked}
          //rating={item.rating}
        />
      );

    return (
        <SafeAreaView style={{}}>

            <Carousel
              data={Storys}
              renderItem={renderItem}
              extraData={true}
              refreshControl={
                <RefreshControl
                 refreshing={isFetching}
                 onRefresh={onRefresh}
                />
              }
              sliderWidth={Dimensions.get('window').width}
              itemWidth={300}
              layout={'default'} 
              enableSnap={true}
              enableMomentum={true}
              decelerationRate='fast'
              //layoutCardOffset={0}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
      },
    rowcontainer: {
        
    },
    header: {
        flexDirection: 'row', 
        paddingHorizontal: 0, 
        paddingTop: 20, 
        justifyContent: 'space-between',
        borderTopWidth: 0.3,
        borderColor: 'gray',

    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
      flexWrap: 'wrap',
      width: 275, 
    },
    listheader: {
        fontSize: 18,
        //fontWeight: 'bold',
        color: '#fff',
      },
      button: {
        fontSize: 12,
        //fontWeight: 'bold',
        color: '#fff',
      },
      buttonbox:
      {
        //margin: 20,
        borderWidth: 0.5,
        borderColor: '#fff',
        paddingVertical: 4,
        paddingHorizontal: 20,
        borderRadius: 20,
      },
      userId: {
        fontSize: 12,
        color: '#ffffffE6',
        marginRight: 15,
        marginLeft: 5,
    },
    category: {
        fontSize: 14,
        color: 'cyan',
        textTransform: 'capitalize'
        //fontStyle: 'italic',
        //marginVertical: 3,

    },
    popupblock: {
        marginTop: 0,
        justifyContent: 'space-between',
        //height: 180,
    },
    paragraph: {
        color: '#ffffffE6',
        fontSize: 13
    },
    playbutton: {
        borderWidth: 0.3,
        paddingHorizontal: 15,
        paddingVertical: 0,
        borderRadius: 15,
        borderColor: '#fff',
        color: '#fff',
    },
    time: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ffffffCC',
        marginLeft: 3,
    },
  });

export default ForYouCarousel;
