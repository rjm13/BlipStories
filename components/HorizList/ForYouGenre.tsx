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

import {useNavigation} from '@react-navigation/native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { AppContext } from '../../AppContext';

import { listPinnedStories } from '../../src/customGraphql/customQueries';
import { listStories, getGenre } from '../../src/graphql/queries';
import { createPinnedStory, deletePinnedStory } from '../../src/graphql/mutations';
import {graphqlOperation, API, Auth} from 'aws-amplify';
import { ConsoleLogger } from '@aws-amplify/core';


const ForYouGenre = ({genreid} : any) => {

    const navigation = useNavigation();

    const [Genre, setGenre] = useState()

    useEffect(() => {
        const fetchGenre = async () => {
            const genreInfo = await API.graphql(graphqlOperation(
                getGenre, {id: genreid}
            ))
            setGenre(genreInfo.data.getGenre)
        }
        fetchGenre();

    }, [])

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
    const [tagStories, setTagStories] = useState([]);

    useEffect(() => {

        const fetchStorys = async () => {
                
            if (genreid) {
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            listStories, {
                                //limit: 7,
                                filter: {
                                    genreID: {
                                        eq: genreid
                                    },
                                    hidden: {
                                        eq: false
                                    },
                                    approved: {
                                        eq: true
                                    }
                                    // tags: {
                                    //     contains: tag
                                    // }
                                }
                            } 
                        )
                    )
                    setTagStories(response.data.listStories.items);
       
                } catch (e) {
                    console.log(e);}
            }
        }

        fetchStorys();

    },[didUpdate, genreid])

//item for the flatlist carousel
    const Item = ({primary, title, genreName, ratingAvg, icon, summary, imageUri, audioUri, author, narrator, time, id} : any) => {

        const navigation = useNavigation();

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

        const [isRated, setIsRated] = useState(false);

        const [isFinished, setIsFinished] = useState(false);

        return (
            <View style={styles.container}>
  
                <View style={{ position: 'absolute', left: 80, top: 40, backgroundColor: 'transparent'}}>
                    <FontAwesome5 
                        name={icon}
                        color='#ffffff'
                        size={50}
                    />
                </View>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
                    <ImageBackground
                        source={{uri: imageUri}}
                        style={{marginBottom: 12, backgroundColor: '#ffffffa5', width: 200, height: 180, justifyContent: 'flex-end', borderRadius: 15}}
                        imageStyle={{borderRadius: 15,}}
                    >
                        <View style={{backgroundColor: '#000000a5', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, paddingHorizontal: 10, paddingVertical: 10}}> 
                            
                            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 12, textTransform: 'capitalize'}}>
                                    {title}
                                    </Text>
                                </View>
                                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                    <FontAwesome 
                                        name={isRated === true ? 'star' : 'star-o'}
                                        size={14}
                                        color={isRated === true || isFinished === true ? 'gold' : 'white'}
                                        style={{marginHorizontal: 6 }}
                                    />
                                    <Text style={{color: '#fff', fontSize: 12}}>
                                        {ratingAvg}%
                                    </Text>
                                </View>
                                
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
          ratingAvg={item.ratingAvg}
          //liked={item.liked}
          //rating={item.rating}
        />
      );}

    return (

        <View>
            <View style={{marginBottom: 0, marginLeft: 20}}>
                <Text style={{textTransform: 'capitalize', fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                    {Genre?.genre}
                </Text>
            </View>
            <FlatList
                data={tagStories}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                     refreshing={isFetching}
                     onRefresh={onRefresh}
                    />
                }
                ListFooterComponent={
                        <TouchableOpacity onPress={() => navigation.navigate('GenreHome', {genreRoute: Genre?.id})}>
                        <View style={{ width: 100, height: 200, justifyContent: 'center', alignItems: 'center'}}>
                            <FontAwesome5 
                                name='chevron-circle-right'
                                color='#ffffffa5'
                                size={25}
                            />
                        </View>
                    </TouchableOpacity>
                }
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        marginLeft: 20,
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

export default ForYouGenre;
