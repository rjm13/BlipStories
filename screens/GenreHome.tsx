import React, {useState, useEffect, useContext, useRef} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    TouchableWithoutFeedback, 
} from 'react-native';

import {useRoute} from '@react-navigation/native'

import {LinearGradient} from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { AppContext } from '../AppContext';

import { listStories, getGenre } from '../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';
import GenreCarousel from '../components/HorizList/GenreCarousel';

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


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[GenreInfo.PrimaryColor, GenreInfo.PrimaryColor, 'transparent']}
                style={{height: '100%'}}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome5 
                            name='chevron-left'
                            size={22}
                            color='#fff'
                            style={{padding: 30}}
                            onPress={() => navigation.goBack()}
                        /> 
                        <Text style={{marginLeft: 20, fontWeight: 'bold', fontSize: 22, color: '#fff', textTransform: 'capitalize'}}>
                            {GenreInfo.genre}
                        </Text>
                    </View>
                    <View>
                        <TouchableWithoutFeedback>
                           <Text style={{marginRight: 20, color: '#fff'}}>
                                Browse All
                            </Text> 
                        </TouchableWithoutFeedback>
                        
                    </View>
                </View>

                <View style={{ marginTop: 20}}>
                    <GenreCarousel genreid={genreRoute}/>
                </View>
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