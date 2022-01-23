import React, {useState, useEffect, useContext, useRef} from 'react';
import { 
    View, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    FlatList, 
    Dimensions, 
    RefreshControl, 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    ImageBackground, 
    Animated, 
    PanResponder 
} from 'react-native';

import {useRoute, useNavigation} from '@react-navigation/native'

import Carousel from 'react-native-snap-carousel';
import {LinearGradient} from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { AppContext } from '../../AppContext';

import { listPinnedStories } from '../../src/customGraphql/customQueries';
import { listStories } from '../../src/graphql/queries';
import { createPinnedStory, deletePinnedStory } from '../../src/graphql/mutations';
import {graphqlOperation, API, Auth} from 'aws-amplify';


const GenreCarousel = ({genreid} : any) => {

    //update list state
    const [didUpdate, setDidUpdate] = useState(false);

//refresh controls for the flatlists
    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate);
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

//fetch the stories for a specific genre for promoted carousel      
    const [carouselStories, setCarouselStories] = useState([]);

    useEffect(() => {

        const fetchStorys = async () => {
                
            if (genreid) {
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            listStories, {
                                limit: 5,
                                filter: {
                                    genreID: {
                                        eq: genreid
                                    }
                                }
                            } 
                        )
                    )
                    setCarouselStories(response.data.listStories.items);
                } catch (e) {
                    console.log(e);}
            }
        }

        fetchStorys();

    },[didUpdate])

//item for the flatlist carousel
    const Item = ({primary, title, genreName, icon, summary, imageUri, audioUri, author, narrator, time, id} : any) => {

        const navigation = useNavigation();

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
                        name={icon}
                        color='#ffffff'
                        size={50}
                    />
                </View>
                {/* </LinearGradient> */}
                <TouchableWithoutFeedback onPress={() => navigation.navigate('AudioPlayer', {storyID: id})}>
                <ImageBackground
                    source={{uri: imageUri}}
                    style={{backgroundColor: '#ffffffa5', width: '100%', height: 280, justifyContent: 'flex-end', borderRadius: 15}}
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
                                            <Text style={[styles.category]}>
                                                {genreName}
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

    const renderItem = ({ item }: any) => {

        let icon = ''
        let genreName = ''
        let primary = ''

        if (item.genre) {
            icon = item.genre.icon
            genreName = item.genre.genre
            primary = item.genre.PrimaryColor
        }
        
        return (
        <Item 
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
          id={item.id}
          //liked={item.liked}
          //rating={item.rating}
        />
      );}

    return (

        <SafeAreaView style={{}}>

            <Carousel
              data={carouselStories}
              renderItem={renderItem}
              //extraData={carouselStories}
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
        color: '#ffffffa5',
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

export default GenreCarousel;
