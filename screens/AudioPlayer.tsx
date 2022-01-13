import React, {useState, useEffect, useRef, useContext} from 'react';
import {
    Text, 
    View, 
    StyleSheet, 
    Dimensions, 
    ImageBackground, 
    ScrollView, 
    TouchableOpacity, 
    Animated,
    TouchableWithoutFeedback,
    FlatList,
    RefreshControl
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Modal, Portal, Provider } from 'react-native-paper';

import Comments from '../components/Comments';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as Animatable from 'react-native-animatable';

import {graphqlOperation, API, Auth, Storage} from 'aws-amplify';
import { getStory, listPinnedStories, listRatings } from '../src/graphql/queries';
import { createPinnedStory, deletePinnedStory, createRating } from '../src/graphql/mutations';

import { AppContext } from '../AppContext';


const AudioPlayer  = ({navigation} : any) => {

    //recieve story ID as props

    const route = useRoute();
    const {storyID} = route.params;

    //use storyID to retrieve Story from AWS
    const [Story, setStory] = useState();
    const [AudioUri, setAudioUri] = useState('');

    //send context to audio player
    const { setStoryID } = useContext(AppContext);

    const onPlay = () => {
        setStoryID(storyID);
    }

    useEffect(() => {

        const fetchStory = async () => {
        
        try {
            const storyData = await API.graphql(graphqlOperation(
            getStory, {id: storyID}))
            if (storyData) {
                setStory(storyData.data.getStory);
                //const response = await Storage.get(storyData.data.getStory.audioUri, {download: false, expiration: 604800});
                //setAudioUri(response);
                console.log(AudioUri);
            }
        } catch (e) {
            console.log(e);
        }}

        fetchStory();

    }, [storyID])

    const Colors = {
        borderColor: 
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


//like state
    const [isLiked, setIsLiked] = useState(false);
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }  
    };


//scrolling annimation
    const animation = useRef(new Animated.Value(0)).current;

    const animatedColor = animation.interpolate({
        inputRange: [0, 500],
        outputRange: ['transparent', '#363636'],
        extrapolate: 'clamp',
        });

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 500],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        });

//convert time to string
    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(Story?.time / 60000);
        let seconds = Math.floor((Story?.time % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

//tags flatlist data
    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        //setDidUpdate(!didUpdate);
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

      const Tags = [
        {
          id: 1,
          tag: '#HarryPotter'
        },
        {
          id: 2,
          tag: "#ShakespeareSpinOf"
        },
        {
          id: 3,
          tag: "#1920s"
        },
        {
          id: 4,
          tag: "#Martians"
        },
        {
          id: 5,
          tag: "#Explorers"
        }
      ]
    
      const Tag = ({id, tag}: any) => {
        return (
          <View style={{marginTop: 14}}>
            <TouchableOpacity onPress={() => navigation.navigate('BrowseAuthor')}>
                <View style={[styles.tagbox]}>
                    <Text style={styles.tagtext}>
                        {tag}
                    </Text>
                </View>
            </TouchableOpacity>
          </View>
        )
      }
    
      const renderTag = ({ item } : any) => (
    
        <Tag 
            id={item.id}
            tag={item.tag}
        />
      );

    //detailed description item
    const DetailItem = ({id, item, index} : any) => { 
        return (                             
            <View style={{ }}>
                <Text style={{color: '#fff', flexWrap: 'wrap', marginBottom: 10}}>
                    {item}
                </Text>
            </View>
        )
    }

    const renderDetailedDescription = ({ item } : any) => (
    
        <DetailItem 
            id={item.id}
            item={item}
        />
      );

    //following functions

    //const [didUpdate, setDidUpdate] = useState(false);

    //add a story to the pinned playlist function
    const PinStory = async () => {

        let userInfo = await Auth.currentAuthenticatedUser();
    
        let createPin = await API.graphql(graphqlOperation(
            createPinnedStory, {input: {userID: userInfo.attributes.sub, storyID: storyID}}
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
                        eq: storyID
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

        //setDidUpdate(!didUpdate)
    }
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
    }, [])

    //Ratings Modal
    const [visible, setVisible] = useState(false);
    const showRatingModal = () => setVisible(true);
    const hideRatingModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

    //rating function
    const [isRated, setIsRated] = useState(false);

    const [ratingNum, setRatingNum] = useState(0);

    const SubmitRating = async () => {
        
        let userInfo = await Auth.currentAuthenticatedUser();
            
        let Rate = await API.graphql(graphqlOperation(
            createRating, {input: {
                userID: userInfo.attributes.sub, 
                storyID: storyID,
                rating: ratingNum
            }}
        ))
        console.log(Rate)

        hideRatingModal();
    }

    const [AverageUserRating, setAverageUserRating] = useState(0);

    useEffect(() => {

        let Average = []

        const fetchRating = async () => {

            let userInfo = await Auth.currentAuthenticatedUser();

            let Rating = await API.graphql(graphqlOperation(
                listRatings, {filter: {
                    userID: {
                        eq: userInfo.attributes.sub
                    },
                    storyID: {
                        eq: storyID
                    }
                }}
            ))
            if (Rating.data.listRatings.items.length === 1) {
                setRatingNum(Rating.data.listRatings.items[0].rating);
                setIsRated(true);
            } else {
                setRatingNum(0);
                setIsRated(false);
            }

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

    return (
        <Provider>
            <View style={styles.container}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideRatingModal} contentContainerStyle={containerStyle}>
                        <View style={{alignItems: 'center'}}>
                            <View style={{}}>
                                <Text style={{margin: 20, fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                                    Leave a Rating
                                </Text>
                                <Text style={{margin: 20, textAlign: 'center', fontSize: 20, color: '#fff'}}>
                                    {ratingNum}/10
                                </Text>
                            </View>
                            <View style={{marginBottom: 20, flexDirection: 'row'}}>
                                <FontAwesome onPress={() => setRatingNum(1)} style={{marginHorizontal: 4 }} name={ratingNum < 1 ? 'star-o' : 'star'} size={22} color={ratingNum < 1 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(2)} style={{marginHorizontal: 4 }} name={ratingNum < 2 ? 'star-o' : 'star'} size={22} color={ratingNum < 2 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(3)} style={{marginHorizontal: 4 }} name={ratingNum < 3 ? 'star-o' : 'star'} size={22} color={ratingNum < 3 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(4)} style={{marginHorizontal: 4 }} name={ratingNum < 4 ? 'star-o' : 'star'} size={22} color={ratingNum < 4 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(5)} style={{marginHorizontal: 4 }} name={ratingNum < 5 ? 'star-o' : 'star'} size={22} color={ratingNum < 5 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(6)} style={{marginHorizontal: 4 }} name={ratingNum < 6 ? 'star-o' : 'star'} size={22} color={ratingNum < 6 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(7)} style={{marginHorizontal: 4 }} name={ratingNum < 7 ? 'star-o' : 'star'} size={22} color={ratingNum < 7 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(8)} style={{marginHorizontal: 4 }} name={ratingNum < 8 ? 'star-o' : 'star'} size={22} color={ratingNum < 8 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(9)} style={{marginHorizontal: 4 }} name={ratingNum < 9 ? 'star-o' : 'star'} size={22} color={ratingNum < 9 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(10)} style={{marginHorizontal: 4 }} name={ratingNum < 10 ? 'star-o' : 'star'} size={22} color={ratingNum < 10 ? 'white' : 'gold'}/>                                
                            </View>
                            <TouchableOpacity onPress={SubmitRating}>
                                <View style={{marginTop: 40, paddingVertical: 6, paddingHorizontal: 30, backgroundColor: '#00ffff', margin: 10, borderRadius: 30}}>
                                        <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold', }}>
                                            Submit
                                        </Text>
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                    </Modal>
                </Portal>
                <ImageBackground 
                    source={{uri: Story?.imageUri}}
                    style={{ width: Dimensions.get('window').width, height: 320,  position: 'absolute'  }}
                >
                </ImageBackground>

                <Animated.View style={{ alignItems: 'center', backgroundColor: animatedColor, flexDirection: 'row', paddingTop: 40, paddingBottom: 20, width: Dimensions.get('window').width, justifyContent: 'space-between'}}>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                            <View style={ [styles.button, {backgroundColor: '#363636a5', flexDirection: 'row'}]}>
                                <AntDesign 
                                    name='close'
                                    size={22}
                                    color='#fff'
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <Animated.Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', opacity: animatedOpacity}}>
                            {Story?.title}
                        </Animated.Text>
                    </View>

                    <TouchableOpacity onPress={onPlay}>
                        <Animated.View style={{marginHorizontal: 20, height: 30, width: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00ffff', borderRadius: 15, opacity: animatedOpacity}}>
                            <FontAwesome5 
                                name='play'
                                size={16}
                                color='#363636'
                                style={{marginLeft: 2}}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                    
                </Animated.View>

                <Animatable.View animation='bounceInUp' style={{}}>
                    <ScrollView 
                        style={{}}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: animation } } }],
                            { useNativeDriver: false })}
                        scrollEventThrottle={1}
                    >
                        <View style={{ height: 220, backgroundColor: 'transparent'}}>
                        </View>
                        <LinearGradient 
                            colors={['#202020', '#282828', '#000', '#000']}
                            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20,paddingVertical: 5, paddingHorizontal: 0}}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <View style={{  }}>
                                <View style={{ margin: 20, alignItems: 'center'}}>
                                    <Text style={styles.name}>
                                        {Story?.title}
                                    </Text>

                                    <View style={{ width: '100%', flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: '7755e914-9ae4-4dd0-a421-b517980b6808'})}>
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
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: '7755e914-9ae4-4dd0-a421-b517980b6808'})}>
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
                                        </TouchableOpacity>
                                    </View>

                                <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={ styles.icon}>
                                            <AntDesign 
                                                name={isQ ? 'pushpin' : 'pushpino'}
                                                size={22}
                                                color={isQ ? 'cyan' : 'white'}
                                                onPress={onQPress}
                                                style={{ }}
                                            />
                                        </View>
                                        <View style={ styles.icon}>
                                            <FontAwesome 
                                                name='commenting-o'
                                                size={22}
                                                color='white'
                                                //onPress={}
                                                style={{ }}
                                            />
                                        </View>
                                        <View style={ styles.icon}>
                                            <FontAwesome 
                                                name='share'
                                                size={22}
                                                color='white'
                                                //onPress={}
                                                style={{ }}
                                            />
                                        </View>
                                    </View>

                                    <TouchableWithoutFeedback onPress={showRatingModal}>
                                        <View style={{justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
                                            <FontAwesome 
                                                name={ratingNum > 0 ? 'star' : 'star-o'}
                                                size={22}
                                                color={ratingNum > 0 ? 'gold' : 'white'}
                                                onPress={onLikePress}
                                                style={{marginHorizontal: 6 }}
                                            />
                                            <Text style={{textAlign: 'center', color: '#e0e0e0', fontSize: 19}}>
                                                {AverageUserRating}%
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    
                                </View>

                                <View style={{marginTop: 16, height: 80}}>
                                    {/* <Text style={[Colors, { fontSize: 16, textTransform: 'capitalize' }]}>
                                        {Story?.genre}
                                    </Text> */}

                                    <FlatList
                                        data={Tags}
                                        extraData={Tags}
                                        renderItem={renderTag}
                                        horizontal={true}
                                        style={{width:  Dimensions.get('window').width, backgroundColor: 'transparent', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}}
                                        keyExtractor={(item) => item.id}
                                        initialNumToRender={6}
                                        //scrollEnabled={false}
                                        showsHorizontalScrollIndicator={false}
                                        maxToRenderPerBatch={6}
                                        showsVerticalScrollIndicator={false}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={isFetching}
                                                onRefresh={onRefresh}
                                            />
                                        }
                                        ListHeaderComponent={() => {
                                            return (
                                                <View style={{marginHorizontal: 20, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                                    <Text style={{textAlign: 'center', color: '#fff'}}>
                                                        {Story?.genre}
                                                    </Text>
                                                </View>
                                            )
                                        }}
                                        ListEmptyComponent={() => {
                                            return (
                                                <View style={{margin: 40, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Text style={{color: '#fff'}}>
                                                        
                                                    </Text>
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                

                                <View>
                                    <TouchableOpacity onPress={onPlay}>
                                        <View style={{paddingVertical: 6, paddingHorizontal: 30, backgroundColor: '#00ffff', margin: 10, borderRadius: 30}}>
                                                <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold', }}>
                                                    Play
                                                </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <Text style={{color: '#ffffff', fontSize: 18}}>
                                        {millisToMinutesAndSeconds()}
                                    </Text>
                                </View>

                                <View style={{marginVertical: 20, marginHorizontal: 4, flex: 1 }}>
                                    <FlatList 
                                        data={Story?.detailedDescription}
                                        extraData={Story?.detailedDescription}
                                        renderItem={renderDetailedDescription}
                                        keyExtractor={(item, index) => item + index}
                                        style={{}}
                                        scrollEnabled={false}
                                    />
                                </View> 

                                <View style={{width: '100%', marginTop: 20}}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,}}>
                                        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                                            Discussion
                                        </Text>
                                    </View>
                                    <View>
                                        <Comments storyId={Story?.id} />
                                    </View>
                                </View>

                            </View>
                        </View>
                    </LinearGradient> 
                </ScrollView>
            </Animatable.View>
            <StatusBar style='light' backgroundColor='#0000004D' />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create ({
    container: {
        //justifyContent: 'space-between',
        //alignContent: 'space-between',
        //height: Dimensions.get('window').height
    },
    name: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    username: {
        color: '#ffffffCC',
        fontSize: 16,
        marginVertical: 5,
        textTransform: 'capitalize'
    },
    footer: {
        marginVertical: 0,
    },
    highlight: { 
        marginHorizontal: -10,
        color: '#ffffffCC',
        fontSize: 14,
        marginBottom: 20,
        //paddingHorizontal: 12,
        //borderRadius: 15,
        //backgroundColor: '#rgba(69,69,69,0.2)',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 50,
        width: 36,
        height: 36,
        marginHorizontal: 10,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginRight: 20,
    },
    tagbox: {
        marginRight: 10   
      },
      tagtext: {
        color: 'cyan',
        fontSize: 14,
        backgroundColor: '#1A4851a5',
        borderColor: '#00ffffa5',
        borderWidth: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
   
});

export default AudioPlayer;
