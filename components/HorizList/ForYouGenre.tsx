import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    FlatList, 
    RefreshControl, 
    TouchableOpacity, 
} from 'react-native';

import {useNavigation} from '@react-navigation/native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HorzStoryTile from '../HorzStoryTile';
import { AppContext } from '../../AppContext';

import { getGenre, storiesByUpdated } from '../../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';


const ForYouGenre = ({genreid} : any) => {

    const { nsfwOn } = useContext(AppContext);

    const navigation = useNavigation();

    const [Genre, setGenre] = useState()

    useEffect(() => {
        const fetchGenre = async () => {
            const genreInfo = await API.graphql(graphqlOperation(
                getGenre, {id: genreid}
            ))
            setGenre(genreInfo.data.getGenre)
        }
        console.log(genreid)
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

        const date = new Date();

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        
        //const c = new Date(year + 1, month, day) // PLUS 1 YEAR
        const newdate = new Date(year, month - 6, day).toISOString() // PLUS 1 MONTH
        //const f = new Date(year, month, day  + 1) // PLUS 1 DAY

        let genreArr = []

        let genreIds = []
            
//gets the most recently rated stories in a genre with a rating over 6, sorts by the most recently created
        const fetchStorys = async () => {
                
            if (genreid) {
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            storiesByUpdated, {
                                type: 'Story',
                                sortDirection: 'DESC',
                                filter: {
                                    ratingAvg: {
                                        gt: 6
                                    },
                                    genreID: {
                                        eq: genreid
                                    },
                                    approved: {
                                        eq: 'approved'
                                    },
                                    hidden: {
                                        eq: false
                                    },
                                    nsfw: {
                                        ne: nsfwOn === true ? true : null
                                    }
                                    // tags: {
                                    //     contains: tag
                                    // }
                                }
                            } 
                        )
                    )
                    if (response.data.storiesByUpdated.items.length < 11) {
                        for (let i = 0; i < response.data.storiesByUpdated.items.length; i++) {
                            genreArr.push(response.data.storiesByUpdated.items[i])
                        }
                    } else {
                        for (let i = 0; i < 11; i++) {
                            genreArr.push(response.data.storiesByUpdated.items[i])
                        }
                    }
                    //console.log(response.data.storiesByUpdated.items)
                    setTagStories(genreArr);
       
                } catch (e) {
                    console.log(e);}
            }
        }

        fetchStorys();

    },[didUpdate, genreid])


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
          genreName={null}
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

export default ForYouGenre;
