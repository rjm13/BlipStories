import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableWithoutFeedback, 
    TouchableOpacity,  
    Image,
    ActivityIndicator,
    RefreshControl,
    FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser, listStories } from '../src/graphql/queries';

import { useNavigation } from '@react-navigation/native';

import { AppContext } from '../AppContext';


const MyStories = ({navigation} : any) => {

    const Item = ({id, title, genre, author, narrator} : any) => {

    //const navigation = useNavigation();

    return (
        <View>
            <View style={styles.tile}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ width: '78%'}}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('AudioPlayer', {storyID: id})}>
                            <View>
                                <Text style={styles.name}>
                                    {title}
                                </Text> 
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[styles.category]}>
                                        {genre}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        
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

                    <View style={{alignSelf: 'center'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('EditAudioStory', {storyID: id})}>
                            <View style={{alignItems: 'center', borderRadius: 20, height: 40,
                                width: 40, justifyContent: 'center',backgroundColor: '#ffffff33'
                            }}>
                                <FontAwesome5 
                                    name='chevron-right'
                                    color='#ffffff'
                                    size={20}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View> 
            </View>
        </View>
        )
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

    
    //update trigger for fetching the stories
    const [didUpdate, setDidUpdate] = useState(false);

    const [Stories, setStories] = useState([])

    //on render, list the stories for that user
    useEffect(() => {

        const fetchStories = async () => {

            setIsLoading(true);

            const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            try {

                const userStories = await API.graphql(graphqlOperation(
                    listStories, {
                        // filter: {
                        //     userID: {
                        //         eq: userInfo.attributes.sub
                        //     }
                        // }
                }))

                setStories(userStories.data.listStories.items);
                
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

    const [isLoading, setIsLoading] = useState(false);

    return (
        <View>
            
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'black']}
                //style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                
                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20, alignItems: 'center'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={{padding: 30, margin: -30}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                                
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    
                    
                    <Text style={styles.header}>
                        My Stories
                    </Text>
                </View>

                <View style={{height: '86%'}}>
                    <FlatList 
                        data={Stories}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        extraData={Stories}
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
                                    {isLoading === true ? (
                                    <View style={{margin: 30}}>
                                        <ActivityIndicator size='small' color='cyan' />
                                    </View>
                                    ) : (
                                    <Text style={{ color: 'white', margin: 20,}}>
                                        There is nothing here! Tap the pin icon to add a story to your playlist.
                                    </Text>
                                    )}
                                </View>
                        );}}
                    />
                </View>
            </LinearGradient>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        //flex: 1
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginVertical: 20,
    },
    subparagraph: {
        fontSize: 12,
        color: '#ffffffa5'
    },
    subblock: {
        width: '75%',
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

export default MyStories;