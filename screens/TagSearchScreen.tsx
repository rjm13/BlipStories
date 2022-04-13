import React, {useState, useEffect, useContext, useRef} from 'react';
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
    TextInput,
    Keyboard,
    ScrollView
} from 'react-native';

import {useNavigation} from '@react-navigation/native'

import { Searchbar } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LinearGradient} from 'expo-linear-gradient';

import SearchStoriesList from '../components/SearchStoriesList';

import { useRoute } from '@react-navigation/native';

import { AppContext } from '../AppContext';
import StoryTile from '../components/StoryTile';

//import { listStoryTags } from '../src/customGraphql/customQueries';
import { listPinnedStories, listRatings, listTags, listStories, listStoryTags, getTag } from '../src/graphql/queries';
import { deletePinnedStory } from '../src/graphql/mutations';
import {graphqlOperation, API, Auth} from 'aws-amplify';

const TagSearchScreen = ({navigation} : any) => {

//set the position of the audio player if the screen is full page
    // const { setIsRootScreen } = useContext(AppContext);
    const { nsfwOn } = useContext(AppContext);
    const { ADon } = useContext(AppContext);

    // useEffect(() => {
    //     setIsRootScreen(true)
    // },[])

    const route = useRoute();
    const {mainTag, tagName} = route.params


    //search function trigger that refreshes the search results
    const [didUpdate, setDidUpdate] = useState(false);


    //primary data set of searched stories for the flatlist
    const [searchedStories, setSearchedStories] = useState([])

    //on render, get the user and then list the following connections for that user. Using listStoryTags produces
    //an error where not every story tag loads. Using getTag instead
    // useEffect(() => {

    //   const fetchStories = async () => {

    //         let stories = []

    //         try {

    //             const searchResults = await API.graphql(graphqlOperation(
    //                 listStoryTags, {
    //                     filter: {
    //                         tagID: {
    //                             eq: mainTag
    //                         },
    //                         // story: {
    //                         //     approved: {
    //                         //         eq: true,
    //                         //     },
    //                         //     hidden: {
    //                         //         eq: false
    //                         //     }
    //                         // }
    //                     }
    //                 }))

    //             if (searchResults.data.listStoryTags.items.length > 0) {
    //                 for(let i = 0; i < searchResults.data.listStoryTags.items.length; i++) {
    //                     if (searchResults.data.listStoryTags.items[i].story.approved === 'approved' && searchResults.data.listStoryTags.items[i].story.hidden === false) {
    //                         stories.push(searchResults.data.listStoryTags.items[i].story)
    //                     } 
                        
    //                 }
    //             }

    //             setSearchedStories(stories)


    //         } catch (e) {
    //             console.log(e);
    //         }
    // }
    // fetchStories(); 
    
    // }, [didUpdate])


    useEffect(() => {

        let stories = []

        const fetchTags = async () => {
            let response = await API.graphql(graphqlOperation(
                getTag, {
                    id: mainTag
                }
            ))

            console.log(response.data.getTag.id)
            console.log(response.data.getTag.tagName)

            if (response.data.getTag.stories.items.length > 0) {
                for(let i = 0; i < response.data.getTag.stories.items.length; i++) {
                    if (response.data.getTag.stories.items[i].story.approved === 'approved' && response.data.getTag.stories.items[i].story.hidden === false) {
                        if (nsfwOn === false) {
                            if (ADon === false) {
                                stories.push(response.data.getTag.stories.items[i].story)
                            }
                            if (ADon === true && response.data.getTag.stories.items[i].story.genreID !== '1108a619-1c0e-4064-8fce-41f1f6262070') {
                                stories.push(response.data.getTag.stories.items[i].story)
                            }
                            
                        }
                        if (nsfwOn === true && response.data.getTag.stories.items[i].story.nsfw === false) {
                            stories.push(response.data.getTag.stories.items[i].story)
                        }
                            
                    } 
                    
                }
            }

            setSearchedStories(stories)

        }
        fetchTags()
    }, [didUpdate])

    const renderItem = ({ item } : any) => {
        
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


    return (
        <View >
          <LinearGradient
          colors={['#363636','#2f217966', '#000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={{marginTop: 60, marginBottom: 10, marginHorizontal: 30}}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                  <View style={{padding: 30, margin: -30}}>
                    <FontAwesome5 
                        name='chevron-left'
                        color='#fff'
                        size={20}
                    />
                  </View>
                </TouchableWithoutFeedback>
                
                <View style={{marginLeft: 40}}>
                    <Text style={{color: 'cyan', fontSize: 22 }}>
                        #{tagName}
                    </Text>
                </View>
                
            </View>
            <View style={{ flexDirection: 'row'}}>
            
            </View>
          </View>

            

            <View style={{ alignSelf: 'center',marginHorizontal: 0, height: '90%'}}>
              <FlatList 
                data={searchedStories}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={searchedStories}
                // refreshControl={
                //     <RefreshControl
                //     refreshing={isFetching}
                //     onRefresh={onRefresh}
                //     />
                // }
                showsVerticalScrollIndicator={false}   
                initialNumToRender={20}
                maxToRenderPerBatch={20} 
                ListFooterComponent={ () => {
                    return (
                        <View style={{ height:  150}}/>
                );}}
                ListHeaderComponent={ () => {
                    return (
                        <View style={{}}>
                            <Text style={{ width: Dimensions.get('window').width-40, fontSize: 18, fontWeight: 'bold', color: 'white', margin: 20,}}>
                                Stories
                            </Text>
                        </View>
                );}}
                ListEmptyComponent={ () => {
                    return (
                        <View style={{ height:  70, alignItems: 'center'}}>
                            <Text style={{ color: 'white', margin: 20,}}>
                                There are no stories for this tag.
                            </Text>
                        </View>
                );}}
            />
            </View>

        </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
  container: {
    width: Dimensions.get('window').width, 
 },
  header: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  box: {
    height: 100,
    width: 140,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  genrebox: {
    height: 80,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
tagtext: {
    color: 'cyan',
    fontSize: 14,
    backgroundColor: '#1A4851a5',
    borderColor: '#00ffffa5',
    borderWidth: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20
},
});

export default TagSearchScreen;
