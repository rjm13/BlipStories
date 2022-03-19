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

import { format } from "date-fns";

import { AppContext } from '../../AppContext';
import HorzStoryTile from '../HorzStoryTile';

import { listPinnedStories } from '../../src/customGraphql/customQueries';
import { listStories, storiesByDate } from '../../src/graphql/queries';
import { createPinnedStory, deletePinnedStory } from '../../src/graphql/mutations';
import {graphqlOperation, API, Auth, Storage} from 'aws-amplify';


const ShortSweet = ({genreid} : any) => {

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
    const [stories, setStories] = useState([]);

    useEffect(() => {

        const fetchStorys = async () => {

            const date = new Date();

            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
        
            //const c = new Date(year + 1, month, day) // PLUS 1 YEAR
            const newdate = new Date(year, month - 1, day).toISOString() // PLUS 1 MONTH
            //const f = new Date(year, month, day  + 1) // PLUS 1 DAY
            
                
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            storiesByDate, {
                                type: 'Story',
                                createdAt: {
                                    gt: newdate
                                },
                                filter: {
                                    hidden: {
                                        eq: false
                                    },
                                    approved: {
                                        eq: true
                                    },
                                    time: {
                                        //under 30 minutes
                                        lt: 1800000
                                    },
                                    nsfw: {
                                        eq: false
                                    },
                                    imageUri: {
                                        attributeExists: true
                                    },
                                    ratingAvg: {
                                        gt: 6
                                    },
                                    // ratingAmt: {
                                    //     gt: 5,
                                    // }
                                }
                            }
                        )
                    )

                setStories(response.data.storiesByDate.items.splice(0, 9));

            } catch (e) {
                 console.log(e);}
        }

        fetchStorys();

    },[didUpdate])

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
        <HorzStoryTile 
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
        />
      );}

    return (

        <View>
            <View style={{marginBottom: 0, marginLeft: 20}}>
                <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                    Short and Sweet
                </Text>
            </View>
            <FlatList
                data={stories}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                horizontal={true}
                maxToRenderPerBatch={8}
                showsHorizontalScrollIndicator={false}
               
                ListFooterComponent={
                    <View style={{width: 60}}>
                    </View>
                }
            />
        </View>

    );
}

export default ShortSweet;
