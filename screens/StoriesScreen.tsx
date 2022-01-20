import React, {useState, useEffect} from 'react';
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

import genres  from '../data/dummygenre';

import { listTags } from '../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';


const AudioStoryHome = ({navigation} : any) => {

  const Item = ({genre, icon, iconcolor, boxcolor, source} : any) => {

    return (
      <TouchableWithoutFeedback onPress = {() => navigation.navigate('GenreHome', {genre: genre})}>
        <View style={[styles.genrebox, {flexDirection: 'row', }]}>
            <Image
              source={{ uri: source}}
              style={{width: '40%', height: '100%', borderRadius: 15, position: 'absolute', backgroundColor: 'gray', left: 192}}
            />
              <LinearGradient 
                colors={[boxcolor, boxcolor, boxcolor, boxcolor + '99']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.genrebox]}
              >
                <Text style={styles.genre}>
                  {genre}
                </Text>
              </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
    );
  }
    
  const renderItem = ({ item } : any) => (
    <Item 
        genre={item.genre}
        icon={item.icon}
        iconcolor={item.iconcolor}
        boxcolor={item.boxcolor}
        source={item.source}
    />
  );

  const [tags, setTags] = useState([])

//list the most popular tags
  useEffect(() => {

    const fetchTags = async () => {
      
      const result = await API.graphql(graphqlOperation(listTags, {limit: 8}))

      if (result) {setTags(result.data.listTags.items)}
    }
    fetchTags();
  }, [])

//tag item
  const Tag = ({id, tag}: any) => {
    return (
      <View style={{marginTop: 14}}>
        <TouchableOpacity onPress={() => navigation.navigate('TagSearchScreen', {mainTag: id, tagName: tag})}>
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
                                          <View style={[styles.box, { backgroundColor: '#15c7ca'}]}>
                                              <FontAwesome5 
                                              name='book-reader'
                                              color='#000000'
                                              size={30}
                                              />
                                              <Text style={styles.title}>
                                                  Browse
                                              </Text>
                                          </View>
                                      </TouchableWithoutFeedback>

                                      <TouchableWithoutFeedback onPress={() => navigation.navigate('BrowseNarrator')}>
                                          <View style={[styles.box, { backgroundColor: 'pink'}]}>
                                              <FontAwesome5 
                                                  name='book-reader'
                                                  color='#000000'
                                                  size={30}
                                              />
                                              <Text style={styles.title}>
                                              Featured
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
                        <View style={{ height:  70, alignItems: 'center'}}>
                            
                        </View>
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
    height: 100,
    width: 140,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    justifyContent: 'flex-end',
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
