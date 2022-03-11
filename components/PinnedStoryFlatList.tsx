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

//import { listPinnedStories } from '../src/customGraphql/customQueries';
import { listRatings, listStories, pinnedStoryByDate } from '../src/graphql/queries';
import { deletePinnedStory } from '../src/graphql/mutations';
import {graphqlOperation, API, Auth} from 'aws-amplify';

import UnPinStory from './functions/UnPinStory';
import StoryTile from './StoryTile';

import { ItemParamList } from '../types';







const AudioStoryList = ({genre, search, all} : any) => {

    //state for the array of pinned stories for that user
    const [pinnedStories, setPinnedStories] = useState([])

    //update trigger for fetching the pinned stories
    const [didUpdate, setDidUpdate] = useState(false);

    //on render, get the user and then list the following connections for that user
    useEffect(() => {

        const fetchStories = async () => {

            setIsLoading(true);

            const Pinned = []

            const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            try {

                const pinnedData = await API.graphql(graphqlOperation(

                    pinnedStoryByDate, {
                        type: 'PinnedStory',
                        sortDirection: 'DESC',
                        filter: {
                            userID: {
                                eq: userInfo.attributes.sub
                            },
                        }
                    }
                ))

                console.log(pinnedData)

                for (let i = 0; i < pinnedData.data.PinnedStoryByDate.items.length; i++) {
                    if (pinnedData.data.PinnedStoryByDate.items[i].story.hidden === false) {
                        Pinned.push(pinnedData.data.PinnedStoryByDate.items[i].story)
                    } else {return;}
                     
                setPinnedStories(Pinned);
                
                setIsLoading(false);
              } 
            } catch (e) {
            console.log(e);
          }
        }
        fetchStories(); 
      }, [didUpdate])

    //refresh state of the flatlist
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        />
      );}

    return (
            <View style={styles.container}>
               
                <FlatList 
                    data={pinnedStories}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={pinnedStories}
                    refreshControl={
                        <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}    
                    ListFooterComponent={ () => {
                        return (
                            <View style={{ height:  100, alignItems: 'center'}} />
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
        color: 'gray',
        //fontStyle: 'italic',
        marginVertical: 3,
        textTransform: 'capitalize'

    },

});

export default AudioStoryList;
