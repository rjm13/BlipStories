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

import { AppContext } from '../AppContext';
import StoryTile from '../components/StoryTile';

import { listPinnedStories, listRatings, listStories, listTags } from '../src/graphql/queries';
import { deletePinnedStory } from '../src/graphql/mutations';
import {graphqlOperation, API, Auth} from 'aws-amplify';

const SearchScreen = ({navigation} : any) => {

  //search function states
    const [newSearch, setNewSearch] = useState();

    //search function trigger that refreshes the search results
    const [didUpdate, setDidUpdate] = useState(false);

    //focus the keyboard only on initial render
    const focus = useRef(null)

    useEffect(() => {
      focus.current.focus()
    }, [])

  //this is the search bar
    function SearchBar () {

        const [searchQuery, setSearchQuery] = useState('');

        const onChangeSearch = (query : any)  => setSearchQuery(query); 

        return (
          <View>
            <Searchbar
              placeholder={'Search Stories, Tags'}
              placeholderTextColor='#000000a5'
              autoComplete={true}
              onChangeText={onChangeSearch}
              onIconPress={() => {setNewSearch(searchQuery); setDidUpdate(!didUpdate); }}
              onSubmitEditing={() => {setNewSearch(searchQuery); setDidUpdate(!didUpdate);}}
              value={searchQuery}
              ref={focus}
              maxLength={20}
              icon={() => {return(
                <FontAwesome5 
                  name='search'
                  color='#000000a5'
                  size={18}
                />)}}
              iconColor='#000000a5'
              style={{
                height: 35,
                marginLeft: 40,
                borderRadius: 8,
                backgroundColor: '#e0e0e0',
                width: Dimensions.get('window').width - 100 
              }}
              inputStyle={{fontSize: 16,}}
            />
          </View>
        );
      };

      //this is the rendered search result item
      const Item = ({title, genreName, icon, primary, summary, imageUri, nsfw, audioUri, author, narrator, time, id} : any) => {
        
        

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
                        },
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

        //calculate the average user rating fora  story
    const [AverageUserRating, setAverageUserRating] = useState(0);

    //rating function
    const [isRated, setIsRated] = useState(false);

    useEffect(() => {

        let Average = []

        const fetchRating = async () => {

            let userInfo = await Auth.currentAuthenticatedUser();

            let Rating = await API.graphql(graphqlOperation(
                listRatings, {filter: {
                    userID: {
                        eq: userInfo.attributes.sub
                    },
                    storyID: {
                        eq: id
                    }
                }}
            ))
            if (Rating.data.listRatings.items.length === 1) {
                //setRatingNum(Rating.data.listRatings.items[0].rating);
                setIsRated(true);
                //setRatingID(Rating.data.listRatings.items[0].id);
            } else {
                //setRatingNum(0);
                setIsRated(false);
            }

            let RatingAvg = await API.graphql(graphqlOperation(
                listRatings, {filter: {
                    storyID: {
                        eq: id
                    }
                }}
            ))

            if (RatingAvg.data.listRatings.items.length > 0) {
                for (let i = 0; i < RatingAvg.data.listRatings.items.length; i++) {
                    Average.push(RatingAvg.data.listRatings.items[i].rating) 
                }
                setAverageUserRating(
                    Math.floor(((Average.reduce((a, b) => {return a + b}))/(RatingAvg?.data.listRatings.items.length))*10)
                )
            }
        }
        fetchRating();
    }, [])

    //convert time to formatted string
    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(time / 60000);
        let seconds = Math.floor((time % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

        return (
            <View>
                <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
                    <View style={styles.tile}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{ width: '78%'}}>
                                <TouchableOpacity onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
                                    <Text style={styles.name}>
                                        {title}
                                    </Text>
                                </TouchableOpacity>
                                 
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[styles.category]}>
                                        {genreName}
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
                                        {millisToMinutesAndSeconds()}
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
                                            size={20}
                                            color={isQ ? 'cyan' : 'white'}
                                            onPress={onQPress}
                                        />
                                    </View>

                                    <View style={{alignItems: 'center'}}>
                                        <FontAwesome
                                            name='share'
                                            size={20}
                                            color='white'
                                            onPress={onLikePress}
                                        />
                                    </View>
                                </View>

                                <View>
                                    <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
                                        <FontAwesome
                                            name={isRated ? 'star' : 'star-o'}
                                            size={17}
                                            color={isRated ? 'gold' : 'white'}
                                            style={{paddingHorizontal: 10}}
                                        />
                                        <Text style={{textAlign: 'center', fontSize: 17, color: '#e0e0e0'}}>
                                            {AverageUserRating}
                                        </Text>
                                    </View>
                                </View>
                        
                            </View>  
                        </View>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
                            <Image 
                                source={{uri: imageUri}}
                                style={{
                                    height: imageUri ? 200 : 0,
                                    borderRadius: 15,
                                    marginVertical: 15,
                                    marginHorizontal: -10
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <Text style={styles.paragraph}>
                            {summary}
                        </Text>
                    </View>
                ) : false }  
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    //primary data set of searched stories for the flatlist
    const [searchedStories, setSearchedStories] = useState([])

    //array of tags that show from search results
    const [TagsArray, setTagsArray] = useState([]);

    useEffect(() => {

        //let tags = []

        const fetchTags = async () => {
            const tagResults = await API.graphql(graphqlOperation(
                listTags, {
                    filter: {
                        tagName: {
                            contains: newSearch.toLowerCase()
                        }
                    }
                }
            ))
            setTagsArray(tagResults.data.listTags.items)
        }
        fetchTags();
    },[didUpdate])

    //on render, get the user and then list the following connections for that user
    useEffect(() => {

      const fetchStories = async () => {

            //let tags = []

          if (newSearch.length > 2 ) {

          try {

              const searchResults = await API.graphql(graphqlOperation(
                  listStories, {
                      filter: {
                        or: [
                          {title: {
                              contains: newSearch
                          },
                          approved: {
                              eq: true
                          },
                          hidden: {
                              eq: false
                          }
                        },
                          {summary: {
                            contains: newSearch
                            },
                            approved: {
                                eq: true
                            },
                            hidden: {
                                eq: false
                            }
                        }
                        ]
                      }
              }))

            //   const tagResults = await API.graphql(graphqlOperation(
            //       listTags, {
            //           filter: {
            //               contains: newSearch
            //           }
            //       }
            //   ))

              setSearchedStories(searchResults.data.listStories.items);

            //   if (tagResults.data.listTags.items > 0) {
            //     //   for(let i = 0; i < tagResults.data.listTags.items.length; i++) {
            //     //     tags.push(tagResults.data.listTags.items[i].tagName)
            //     //   }
            //     setTagsArray(tags);   
            //   }

            //setTagsArray(tagResults.data.listTags.items)
              

          } catch (e) {
          console.log(e);
        }
      } else {
        return;
      }
    }
         fetchStories(); 
    
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
      />
    );}


    return (
        <View >
          <LinearGradient
          colors={['#363636','#2f217966', '#000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={{marginTop: 40, marginBottom: 10, marginHorizontal: 20}}>
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
                
                <SearchBar />
                
            </View>
            <View style={{ flexDirection: 'row'}}>
            
            </View>
          </View>

            

            <View style={{ alignSelf: 'center',marginHorizontal: 0, height: '90%'}}>
              <FlatList 
                data={searchedStories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={searchedStories}
                // refreshControl={
                //     <RefreshControl
                //     refreshing={isFetching}
                //     onRefresh={onRefresh}
                //     />
                // }
                showsVerticalScrollIndicator={false}   
                initialNumToRender={12}
                maxToRenderPerBatch={10} 
                ListFooterComponent={ () => {
                    return (
                        <View style={{ height:  70, alignItems: 'center'}}>
                            <Text style={{ color: 'white', margin: 20,}}>
                                
                            </Text>
                        </View>
                );}}
                ListHeaderComponent={ () => {
                    return (
                        <View style={{}}>
                            {TagsArray.length > 0 ? (
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', margin: 20,}}>
                                        Tags
                                    </Text>
                                    <View>
                                        <ScrollView style={{width: Dimensions.get('window').width - 40, marginHorizontal: 20, marginBottom: 20}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                            {TagsArray.map(({ index, tagName, id } : any) => (
                                                <View key={index} style={{marginTop: 10, marginRight: 10}}>
                                                    <TouchableOpacity onPress={() => navigation.navigate('TagSearchStack', {mainTag: id, tagName: tagName})}>
                                                        <View style={{}}>
                                                            <Text style={styles.tagtext}>
                                                                #{tagName}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </View>
                            ) : null}
                            {searchedStories.length > 0? (
                                <Text style={{ width: Dimensions.get('window').width-40, fontSize: 18, fontWeight: 'bold', color: 'white', margin: 20,}}>
                                    Stories
                                </Text>
                            ) : null}
                            
                        </View>
                );}}
                ListEmptyComponent={ () => {
                    return (
                        <View style={{ height:  70, alignItems: 'center'}}>
                            <Text style={{ color: 'white', margin: 20,}}>
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

export default SearchScreen;
