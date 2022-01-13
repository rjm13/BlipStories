import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    FlatList, 
    Dimensions, 
    RefreshControl, 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    Image 
} from 'react-native';

import {useNavigation} from '@react-navigation/native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { AppContext } from '../AppContext';

import dummyaudio from '../data/dummyaudio';
import { listRatings, listPinnedStories } from '../src/graphql/queries';
import { deletePinnedStory } from '../src/graphql/mutations';
import {graphqlOperation, API, Auth} from 'aws-amplify';

import { ItemParamList } from '../types';







const AudioStoryList = ({genre, search, all} : any) => {

    const Item = ({title, genre, description, imageUri, nsfw, audioUri, author, narrator, time, id} : any) => {
        
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
        const navigation = useNavigation();

    //expanding list component
        const [isVisible, setIsVisible] = useState(false);
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

        const [isQ, setQd] = useState(true);
        
        const onQPress = () => {
            if ( isQ === false ) {
                setQd(true);
            }
            if ( isQ === true ) {
                setQd(false);
                unPinStory();
            }  
        };




        //play the audio story
        const { setStoryID } = useContext(AppContext);

        const onPlay = () => {
            setStoryID(id);
        }

        return (
            <View>
                <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
                    <View style={styles.tile}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{ width: '78%'}}>
                                <Text style={styles.name}>
                                    {title}
                                </Text> 
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[styles.category, Colors]}>
                                        {genre}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                                    <FontAwesome5 
                                        name='book-open'
                                        size={12}
                                        color='#ffffffa5'
                                    />
                                    <Text style={styles.userId}>
                                        {author}
                                    </Text>  
                                    <FontAwesome5 
                                        name='book-reader'
                                        size={12}
                                        color='#ffffffa5'
                                    />
                                    <Text style={styles.userId}>
                                        {narrator}
                                    </Text> 
                                </View>
                            </View>
                            <TouchableOpacity onPress={onPlay}>
                                <View style={{ 
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    borderRadius: 30,
                                    paddingVertical: 2,
                                    paddingHorizontal: 8,
                                    backgroundColor: '#ffffff33',
                                    borderColor: '#ffffffCC',
                                }}>
                                    <FontAwesome5 
                                        name='play'
                                        color='#ffffff'
                                        size={10}
                                    />
                                    <Text style={styles.time}>
                                        12:53
                                    </Text> 
                                </View>
                            </TouchableOpacity>
                        </View> 
                
                { isVisible ? (
                    <View style={styles.popupblock}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <View style={{alignItems: 'center', width: '100%',flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{ marginVertical: 10, alignSelf: 'flex-start', flexDirection: 'row',  }}>
    
                                    <View style={{alignItems: 'center', marginRight: 25,}}>
                                        <AntDesign
                                            name={isQ ? 'pushpin' : 'pushpino'}
                                            size={22}
                                            color={isQ ? 'cyan' : 'white'}
                                            onPress={onQPress}
                                        />
                                    </View>

                                    <View style={{alignItems: 'center', marginRight: 25,}}>
                                        <FontAwesome
                                            name='commenting-o'
                                            size={22}
                                            color='white'
                                            onPress={onLikePress}
                                        />
                                    </View>

                                    <View style={{alignItems: 'center'}}>
                                        <FontAwesome
                                            name='share'
                                            size={22}
                                            color='white'
                                            onPress={onLikePress}
                                        />
                                    </View>
                                </View>

                                <View>
                                    <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
                                        <FontAwesome
                                            name={isLiked ? 'star' : 'star-o'}
                                            size={22}
                                            color={isLiked ? 'gold' : 'white'}
                                            style={{paddingHorizontal: 10}}
                                            onPress={onLikePress}
                                        />
                                        <Text style={{textAlign: 'center', fontSize: 20, color: '#e0e0e0'}}>
                                            69%
                                        </Text>
                                    </View>
                                </View>
                        
                            </View>  
                        </View>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('AudioPlayer', {storyID: id})}>
                            <Image 
                                source={{uri: imageUri}}
                                style={{
                                    height: 200,
                                    borderRadius: 15,
                                    marginVertical: 15,
                                    marginHorizontal: -10
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <Text style={styles.paragraph}>
                            {description}
                        </Text>
                    </View>
                ) : false }  
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
    //state for the array of pinned stories for that user
    const [favedStories, setFavedStories] = useState([])

    //update trigger for fetching the pinned stories
    const [didUpdate, setDidUpdate] = useState(false);

    //on render, get the user and then list the following connections for that user
    useEffect(() => {

        const fetchStories = async () => {

            const Faved = []

            const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            try {

                const favedData = await API.graphql(graphqlOperation(
                    listRatings, {
                        filter: {
                            userID: {
                                eq: userInfo.attributes.sub
                            },
                            rating: {
                                gt: 7
                            }
                        }
                }))

                for (let i = 0; i < favedData.data.listRatings.items.length; i++) {
                    Faved.push(favedData.data.listRatings.items[i].story) 
              } 
              setFavedStories(Faved);
              console.log(Faved)
            } catch (e) {
            console.log(e);
          }
        }
           fetchStories(); 
      }, [didUpdate])


    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

    const renderItem = ({ item } : any) => (

        <Item 
          title={item.title}
          imageUri={item.imageUri}
          genre={item.genre}
          audioUri={item.audioUri}
          description={item.description}
          author={item.author}
          narrator={item.narrator}
          time={item.time}
          id={item.id}
          nsfw={item.nsfw}
          //liked={item.liked}
          //rating={item.rating}
        />
      );

    return (
            <View style={styles.container}>

                <FlatList 
                    data={favedStories}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    extraData={favedStories}
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
                    );}}
                    ListEmptyComponent={ () => {
                        return (
                            <View style={{ height:  70, alignItems: 'center'}}>
                                <Text style={{ color: 'white', margin: 20,}}>
                                    There is nothing here! Tap the pin icon to add a story to your playlist.
                                </Text>
                            </View>
                    );}}
                />

            </View>

    );
}

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
        flexWrap: 'wrap',
        width: 225,
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
        color: 'cyan',
        //fontStyle: 'italic',
        marginVertical: 3,
        textTransform: 'capitalize'

    },

});

export default AudioStoryList;
