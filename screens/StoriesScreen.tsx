import React, {useState, useEffect, useContext} from 'react';
import { 
  StyleSheet, 
  Dimensions, 
  TouchableWithoutFeedback,
  TouchableOpacity, 
  View, 
  Text, 
  Image,
  FlatList,
  ScrollView } 
from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LinearGradient} from 'expo-linear-gradient';

import { listGenres, tagsByUpdated } from '../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';
import { AppContext } from '../AppContext';


const AudioStoryHome = ({navigation} : any) => {

  //nsfw global app context
  const { nsfwOn } = useContext(AppContext);

//genre array state
  const[genres, setGenres] = useState([]);
    
//fetch the genres
  useEffect(() => {

    let genrearray = []

    const fetchGenres = async () => {
        
      const result = await API.graphql(graphqlOperation(listGenres))

      if (result) {
        genrearray = result.data.listGenres.items
        setGenres(genrearray.sort((a, b) => a.genre.localeCompare(b.genre)))
      }
    }

    fetchGenres();

  }, [])

  const Item = ({genre, icon, id, PrimaryColor, imageUri} : any) => {

    const [locked, setIsLocked] = useState(false);

    useEffect(() => {
      if (nsfwOn === false && id === '1108a619-1c0e-4064-8fce-41f1f6262070') {
        setIsLocked(true)
      }
    }, [nsfwOn])

    return (
      <TouchableWithoutFeedback onPress = {() => locked === false ? (navigation.navigate('GenreHome', {genreRoute: id})) : null}>
        <View style={{
          flexDirection: 'row', height: 60, borderRadius: 15, alignItems: 'center', marginVertical: 10, width: '100%'}}>
            <Image
              source={{ uri: imageUri}}
              style={{width: '40%', height: '100%', borderRadius: 15, position: 'absolute', backgroundColor: 'gray', left: 192}}
            />
              <LinearGradient 
                colors={[PrimaryColor, PrimaryColor, PrimaryColor, PrimaryColor + '99']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.genrebox]}
              >
                <View style={{justifyContent: 'center', backgroundColor: locked === true ? '#363636a5' : 'transparent', width: '100%', height: '100%'}}>
                  <Text style={styles.genre}>
                    {genre}
                  </Text>
                  {locked === true ? (
                    <FontAwesome5 
                      name='lock'
                      size={20}
                      color='gray'
                      style={{alignSelf: 'center', position: 'absolute'}}
                    />
                  ) : null}
                  
                </View>
              </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
    );
  }
    
  const renderItem = ({ item } : any) => (
    <Item 
        id={item.id}
        genre={item.genre}
        icon={item.icon}
        PrimaryColor={item.PrimaryColor}
        imageUri={item.imageUri}
    />
  );

  const [tags, setTags] = useState([])

//list the most popular tags by the order they were last updated
  useEffect(() => {

    const fetchTags = async () => {
      
      const result = await API.graphql(graphqlOperation(
        tagsByUpdated, {
          type: 'Tag',
          sortDirection: 'DESC',
          limit: 15,
          filter: {
            genreID: {
              ne: '1108a619-1c0e-4064-8fce-41f1f6262070'
            },
          }
      }))

      if (result) {setTags(result.data.tagsByUpdated.items)}
    }
    fetchTags();
  }, [])

//tag item
  const Tag = ({id, tag}: any) => {
    return (
      <View style={{marginTop: 14}}>
        <TouchableOpacity onPress={() => navigation.navigate('TagSearchStack', {mainTag: id, tagName: tag})}>
            <View style={[styles.tagbox]}>
                <Text style={styles.tagtext}>
                    #{tag}
                </Text>
            </View>
        </TouchableOpacity>
      </View>
    )
  }

  //render the tag item for flatlist
  const renderTag = ({ item } : any) => (
    <Tag 
        id={item.id}
        tag={item.tagName}
    />
  );

//return the primary function
    return (
        <View >
          <LinearGradient
            colors={['#363636','#2f217966', '#000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
          <ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60, marginBottom: 20, marginHorizontal: 20}}>
                  <Text style={{ color: 'white', marginHorizontal: 0, fontSize: 22, fontWeight: 'bold'}}>
                      Discover Stories
                  </Text>
            </View>
        
            <View style={{ marginBottom: 20, marginHorizontal: 20, alignItems: 'center'}}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('SearchScreen')}>
                  <View style={{alignItems: 'center', paddingHorizontal: 10, borderRadius: 8, flexDirection: 'row', backgroundColor: '#e0e0e0', height: 35, width: Dimensions.get('window').width - 40}}>
                    <FontAwesome5 
                      name='search'
                      color='#000000a5'
                      size={18}
                    />
                  </View>
                </TouchableWithoutFeedback>
            </View>

            <View style={{ marginHorizontal: 20, height: '100%'}}>
              <View>
                <FlatList 
                    data={genres}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={ () => {

                        return (
                            <View style={{ marginTop: 20}}>
                                <View>
                                  <Text style={styles.header}>
                                      Authors
                                  </Text>
                                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20}}>

                                      <TouchableWithoutFeedback onPress={() => navigation.navigate('BrowseAuthor')}>
                                          <View style={[styles.box, { backgroundColor: '#15c7ca', flexDirection: 'row', paddingLeft: 20}]}>
                                              <FontAwesome5 
                                              name='book-open'
                                              color='#000000'
                                              size={22}
                                              />
                                              <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold', marginLeft: 20}}>
                                                  Browse Publishers
                                              </Text>
                                          </View>
                                      </TouchableWithoutFeedback>
                                  </View>
                                </View>

                                <View style={{marginTop: 20}}>
                                  <Text style={styles.header}>
                                      Popular Tags
                                  </Text>
                                  <View>
                                    <FlatList 
                                      data={tags}
                                      renderItem={renderTag}
                                      keyExtractor={(item) => item.id}
                                      scrollEnabled={false}
                                      maxToRenderPerBatch={9}
                                      showsVerticalScrollIndicator={false}
                                      style={{flexDirection: 'row', flexWrap: 'wrap', width: Dimensions.get('window').width - 20, marginBottom: 20}}
                                    />
                                  </View>
                                </View>

                                <View style={{marginTop: 20}}>
                                  <Text style={styles.header}>
                                      Genres
                                  </Text>
                                </View>
                                
                            </View>                           
                        );
                    }}
                    ListFooterComponent={ () => {
                        return (
                        <View style={{ height:  70, alignItems: 'center'}}/>
                        );
                    }}
                />
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
}

const styles = StyleSheet.create ({
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    textTransform: 'capitalize'
},
genre: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    paddingHorizontal: 20,
},
  header: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
},
box: {
    height: 60,
    width: Dimensions.get('window').width - 40,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
  },
  tagbox: {
    marginRight: 10   
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
  genrebox: {
    height: 60,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%'
  },
});

export default AudioStoryHome;
