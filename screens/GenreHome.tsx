import React, {useState, useEffect, useContext, useRef} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    TouchableWithoutFeedback, 
    ScrollView
} from 'react-native';

import {useRoute} from '@react-navigation/native'

import {LinearGradient} from 'expo-linear-gradient';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { listTags, getGenre } from '../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';

import GenreCarousel from '../components/HorizList/GenreCarousel';
import PopTagStories from '../components/HorizList/PopTagStories';
import NewGenreStories from '../components/HorizList/NewGenreStories';

const GenreHome = ({navigation} : any) => {

//route params from the StoriesScreen to specifiy the genre
    const route = useRoute();
    const {genreRoute} = route.params

//get the genre information
    const [GenreInfo, setGenreInfo] = useState({
        id: 1,
        genre: 'random',
        icon: 'dumpster-fire',
        PrimaryColor: 'gray',
        SecondaryColor: '#fff',
        imageUri: null,
    });



    useEffect(() => {

        const fetchGenre = async () => {
            
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            getGenre, {
                                id: genreRoute
                            } 
                        )
                    )
                    setGenreInfo(response.data.getGenre);
                } catch (e) {
                    console.log(e);}
            
        }
        fetchGenre();
    }, [])

//get 2 trending tags in the genre
    const [trendingTags, setTrendingTags] = useState(['BattleOfTheBulge', 'HarryPotter']);

    useEffect(() => {

        let TopTags = []

        const fetchTags = async () => {
            
            try {
                const response = await API.graphql(
                    graphqlOperation(
                        listTags, {limit: 2, filter: {
                            story: {
                                genre: genreRoute
                            }
                            }    
                        } 
                    )
                )
                for (let i = 0; i < response.data.listTags.items.length; i++) {
                    TopTags.push(response.data.listTags.data[i].tagName)
                }
                if (response) {
                    setTrendingTags(TopTags);
                }
                
            } catch (e) {
                console.log(e);}
        
    }
    fetchTags();
    },[genreRoute])


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[GenreInfo.PrimaryColor, '#212121', '#000', '#000',]}
                style={{height: '100%'}}
                start={{ x: 1, y: 1 }}
                end={{ x: 0.5, y: 0.5 }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 20}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome5 
                                name='chevron-left'
                                size={22}
                                color='#fff'
                                style={{padding: 30}}
                                onPress={() => navigation.goBack()}
                            /> 
                            <Text style={{fontWeight: 'bold', fontSize: 22, color: '#fff', textTransform: 'capitalize'}}>
                                {GenreInfo.genre}
                            </Text>
                        </View>
                        <View>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('BrowseGenre', {genreID: GenreInfo.id, genreName: GenreInfo.genre})}>
                                <Text style={{marginRight: 40, color: '#fff'}}>
                                    Browse All
                                </Text> 
                            </TouchableWithoutFeedback>
                            
                        </View>
                    </View>

                    <View style={{ marginTop: 0}}>
                        <GenreCarousel genreid={genreRoute}/>
                    </View>

                    <View style={{ marginTop: 20}}>
                        <PopTagStories genreid={genreRoute} tag={trendingTags[0]}/>
                    </View>

                    <View style={{ marginTop: 20}}>
                        <PopTagStories genreid={genreRoute} tag={trendingTags[0]}/>
                    </View>

                    <View style={{ marginTop: 20}}>
                        <NewGenreStories genreid={genreRoute}/>
                    </View>

                    <View style={{height: 40}}>

                    </View>

                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    gradient: {
        height: 300
    },
});

export default GenreHome;