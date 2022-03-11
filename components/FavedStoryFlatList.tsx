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
    Image,
    ActivityIndicator
} from 'react-native';

import {useNavigation} from '@react-navigation/native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { AppContext } from '../AppContext';

import dummyaudio from '../data/dummyaudio';
import { listRatings } from '../src/customGraphql/customQueries';
import { ratingsByDate } from '../src/graphql/queries';
import { deletePinnedStory } from '../src/graphql/mutations';
import {graphqlOperation, API, Auth} from 'aws-amplify';
import StoryTile from './StoryTile';

import { ItemParamList } from '../types';


const AudioStoryList = () => {

    //state for the array of pinned stories for that user
    const [favedStories, setFavedStories] = useState([])

    //update trigger for fetching the pinned stories
    const [didUpdate, setDidUpdate] = useState(false);

    //on render, get the user and then list the following connections for that user
    useEffect(() => {

        const fetchStories = async () => {

            setIsLoading(true);

            const Faved = []

            const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            try {

                const favedData = await API.graphql(graphqlOperation(
                    ratingsByDate, {
                        type: 'Rating',
                        sortDirection: 'DESC',
                        filter: {
                            userID: {
                                eq: userInfo.attributes.sub
                            },
                            rating: {
                                gt: 7
                            },
                        }
                }))

                if (favedData.data.ratingsByDate.items.length > 0) {
                    for (let i = 0; i < favedData.data.ratingsByDate.items.length; i++) {
                        if (favedData.data.ratingsByDate.items[i].story.hidden === false) {
                            Faved.push(favedData.data.ratingsByDate.items[i].story) 
                        } else {return;}
                    } 
                }
                
                setFavedStories(Faved);
                setIsLoading(false);
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
          id={item.id}
          ratingAvg={item.ratingAvg}
          ratingAmt={item.ratingAmt}
        />
      );}

      const [isLoading, setIsLoading] = useState(false)

    return (
            <View style={styles.container}>

                <FlatList 
                    data={favedStories}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={favedStories}
                    maxToRenderPerBatch={20}
                    refreshControl={
                        <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}    
                    ListFooterComponent={ () => {
                        return (
                            <View style={{ height:  70, alignItems: 'center'}}/>
                    );}}
                    ListEmptyComponent={ () => {
                        return (
                            <View style={{alignItems: 'center'}}>
                                {isLoading === true ? (
                                <View style={{margin: 30}}>
                                    <ActivityIndicator size='small' color='cyan' />
                                </View>
                                ) : (
                                <View>
                                    <Text style={{ color: 'white', margin: 20,}}>
                                        There is nothing here! Tap the pin icon to add a story to your playlist.
                                    </Text>

                                    <Text style={{ textAlign: 'center', color: 'gray', margin: 20,}}>
                                        (pull to refresh)
                                    </Text>
                                </View>
                                )}
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
        color: 'gray',
        //fontStyle: 'italic',
        marginVertical: 3,
        textTransform: 'capitalize'

    },

});

export default AudioStoryList;
