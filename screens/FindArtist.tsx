import React, {useState, useEffect, useRef} from 'react';
import { 
    View, 
    Text, 
    Dimensions, 
    ScrollView, 
    TouchableWithoutFeedback, 
    TouchableOpacity,  
    Image,
    FlatList
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Modal, Portal, Provider } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Storage } from "aws-amplify";
import { usersByArtistActiveAt } from '../src/graphql/queries';


const FindArtist = ({navigation} : any) => {

    const [artists, setArtists] = useState([])

    //state to determine the filter by accents
    const [accentList, setAccentList] = useState([]);

    //state for expanding the accent list in the modal
    const [isExpanded, setIsExpanded] = useState(false);

    //state to determine the filter of the voice
    const [isMasculine, setIsMasculine] = useState(true);
    const [isFeminine, setIsFeminine] = useState(true);

    const Item = ({id, artistPseudo, artistText, imageUri, artStyles, artistActiveAt} : any) => {

        const date = new Date();
        

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
    
        //const c = new Date(year + 1, month, day).toISOString() // PLUS 1 YEAR
        //const newdate = new Date(year, month - 1, day).toISOString() // PLUS 1 MONTH
        const newdate = new Date(year, month, day  - 7).toISOString() // PLUS 1 DAY

        const [imageU, setImageU] = useState('')

        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(imageUri)
                setImageU(response);
            }
            fetchImage();
        }, [])

        return (
            <View style={{marginTop: 20, backgroundColor: '#363636', borderRadius: 15, paddingTop: 10, paddingBottom: 18, paddingHorizontal: 20, marginHorizontal: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image 
                        source={{uri: imageU}}
                        style={{width: 50, height: 50, borderRadius: 25}}
                    />
                    <View>
                        <Text style={{marginLeft: 10, color: '#fff', fontWeight: 'bold', textTransform: 'capitalize' }}>
                            {artistPseudo}
                        </Text>
                        <Text style={{textTransform: 'capitalize',marginLeft: 10, color: '#ffffffa5', fontSize: 12 }}>
                            
                        </Text>
                    </View>
                    
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={{ color: '#fff', fontSize: 12, }}>
                        {artistText}
                    </Text>
                </View>
                <View style={{marginTop: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                        Styles: 
                    </Text>
                    {artStyles.map((item : any) => 
                        <Text style={{textTransform: 'capitalize', color: '#ffffffa5', fontSize: 12, marginLeft: 8}}>
                            {item}
                        </Text>
                    )}
                </View>
                <View style={{marginTop: 30, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        {newdate < artistActiveAt ? (
                            <View style={{ flexDirection: 'row'}}>
                            <FontAwesome5 
                                name='bolt'
                                color='gold'
                                size={12}
                                style={{alignSelf: 'center', marginRight: 6}}
                            />
                            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                            Active
                        </Text>
                        </View>
                        ) : null}
                        
                        {/* <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                            Avg delivery:
                        </Text>
                        <Text style={{ color: '#ffffffa5', fontSize: 12, marginLeft: 6}}>
                            7 days 
                        </Text> */}
                    </View>
                    
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('UserScreen', {userID: id, status: 'artist'})}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: 'cyan', fontSize: 12, marginLeft: 10}}>
                                CONNECT
                            </Text>
                            <FontAwesome5 
                                name='arrow-right'
                                size={18}
                                color='cyan'
                                style={{marginLeft: 6}}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

    const renderItem = ({item} : any) => {
        return (
            <Item 
                id={item.id}
                artistPseudo={item.artistPseudo}
                artistText={item.artistText}
                imageUri={item.imageUri}
                artStyles={item.artStyles}
                artistActiveAt={item.artistActiveAt}
            />
        );
    }

       //intro modal
       const [visible, setVisible] = useState(false);
       const showModal = () => {setVisible(true);}
       const hideModal = () => setVisible(false);
       const containerStyle = {
        backgroundColor: '#363636', 
        borderRadius: 15,
        paddingVertical: 0,
        paddingHorizontal: 20
    };

      //search function states
      const [newSearch, setNewSearch] = useState('');

      //search function trigger that refreshes the search results
      const [didUpdate, setDidUpdate] = useState(false);

      const [nextToken, setNextToken] = useState(null)
  
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
              placeholder={'Search illustrators'}
              placeholderTextColor='#000000a5'
              autoComplete={true}
              onChangeText={onChangeSearch}
              onIconPress={() => {setNewSearch(searchQuery); setArtists([]); setNextToken(null); setDidUpdate(!didUpdate); }}
              onSubmitEditing={() => {setNewSearch(searchQuery); setNextToken(null); setDidUpdate(!didUpdate);}}
              value={searchQuery}
              ref={focus}
              maxLength={20}
              icon={() => {return(
                <FontAwesome5 
                  name='search'
                  color='#000000a5'
                  size={16}
                />)}}
              iconColor='#000000a5'
              style={{
                height: 35,
                marginLeft: 30,
                borderRadius: 8,
                backgroundColor: '#e0e0e0',
                width: Dimensions.get('window').width - 100 
              }}
              inputStyle={{fontSize: 16,}}
            />
          </View>
        );
      };



      useEffect(() => {

        const fetchArtists = async () => {
                let response = await API.graphql(graphqlOperation(
                    usersByArtistActiveAt, {
                        type: 'User',
                        sortDirection: 'DESC',
                        filter: {
                            or: [
                                {
                                    artistPseudo: {
                                        contains: newSearch.toLowerCase()
                                    },
                                    isArtist: {
                                        eq: true
                                    },
                                    
                                },
                                
                                {
                                    artistText: {
                                        contains: newSearch.toLowerCase()
                                    },
                                    isArtist: {
                                        eq: true
                                    },
                                    
                                }
                            ]
                        }
                    }
                ))

                setNextToken(response.data.usersByArtistActiveAt.nextToken)

                setArtists(artists.concat(response.data.usersByArtistActiveAt.items))
            
            
        }
        fetchArtists();
    }, [didUpdate])



    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View>
                        <ScrollView style={{height: '75%'}}>
                            <Text style={{color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 18,}}>
                                Filter Artists
                            </Text>
                            <View style={{marginTop: 20}}>
                                {/* <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                        By Accent:
                                    </Text>
                                    <FontAwesome5 
                                        name={isExpanded ? 'chevron-down' : 'chevron-right'}
                                        color='#fff'
                                        size={16}
                                        style={{paddingHorizontal: 20}}
                                        onPress={() => setIsExpanded(!isExpanded)}
                                    />
                                </View> */}

                                {/* <View style={{height: isExpanded ? '100%' : 0, marginLeft: 20, marginTop: 10, flex: 1, flexDirection: 'row', flexWrap: 'wrap',}}>
                                    {accents.map(item => {

                                        const [isChecked, setIsChecked] = useState(false);

                                        const AddAccent = ({accent} : any) => {

                                            setIsChecked(!isChecked);

                                            if (accentList.includes(accent)) {
                                                setAccentList(accentList.filter(item => item !== accent))
                                            
                                            } else {
                                                setAccentList([...accentList, accent])
                                            }
                                        }

                                        return (
                                            <TouchableWithoutFeedback onPress={() => AddAccent({accent: item.accent})}>
                                                <View style={{width: '50%', flexDirection: 'row', paddingVertical: 10, alignItems: 'center'}}>
                                                    <FontAwesome5 
                                                        name={isChecked === true ? 'check-square' : 'square'}
                                                        size={17}
                                                        color={isChecked === true ? 'cyan' : 'gray'}
                                                        style={{paddingRight: 16}}
                                                    />
                                                    <Text style={{color: 'white', width: '68%'}}>
                                                        {item.accent}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                        }
                                        )
                                    }
                                </View> */}

                                <View style={{marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                        By Voice Type:
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                                    <TouchableWithoutFeedback onPress={() => setIsMasculine(!isMasculine)}>
                                        <View style={{flexDirection: 'row'}}>
                                            <FontAwesome5 
                                                name={isMasculine === true ? 'check-square' : 'square'}
                                                size={17}
                                                color={isMasculine === true ? 'cyan' : 'gray'}
                                                style={{paddingRight: 16}}
                                            />
                                            <Text style={{color: '#fff'}}>
                                                Masculine
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    
                                    <TouchableWithoutFeedback onPress={() => setIsFeminine(!isFeminine)}>
                                        <View style={{flexDirection: 'row'}}>
                                            <FontAwesome5 
                                                name={isFeminine === true ? 'check-square' : 'square'}
                                                size={17}
                                                color={isFeminine === true ? 'cyan' : 'gray'}
                                                style={{paddingRight: 16}}
                                            />
                                            <Text style={{color: '#fff'}}>
                                                Feminine
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    
                                </View>
                                
                            </View>
                        </ScrollView>
                        <TouchableOpacity onPress={() => {setDidUpdate(!didUpdate); hideModal();}}>
                            <Text style={{alignSelf: 'center', marginTop: 20, textAlign: 'center', paddingVertical: 6, paddingHorizontal: 20, borderRadius: 15, backgroundColor: 'cyan'}}>
                                Apply Filter
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
            <View>
                <LinearGradient
                    colors={['black', '#363636a5', 'black']}
                    style={{height: Dimensions.get('window').height}}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={{marginHorizontal: 20, marginTop: 50}}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                                    <View style={{padding: 30, margin: -30}}>
                                        <FontAwesome5 
                                            name='chevron-left'
                                            color="#fff"
                                            size={20}
                                            style={{alignSelf: 'center'}}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                
                                <SearchBar />
                            </View>
                            {/* <View>
                                <Ionicons 
                                    name='filter'
                                    color='#fff'
                                    size={16}
                                    style={{padding: 10}}
                                    onPress={showModal}
                                />
                            </View> */}
                        </View>  
                    </View>
                    <View style={{height: '85%'}}>
                        <FlatList
                            data={artists}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            maxToRenderPerBatch={20}
                            extraData={artists}
                            style={{marginTop: 10}}
                            ListHeaderComponent={
                                <View style={{height: 30}}/>
                            }
                            ListFooterComponent={
                                <View style={{ height:  150, alignItems: 'center', marginTop: 40}}>
                                    <TouchableOpacity onPress={() => setDidUpdate(!didUpdate)}>
                                        <Text style={{color: '#fff'}}>
                                            {nextToken ? 'Load More' : null}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        /> 
                    </View>
                </LinearGradient>
            </View>
        </Provider>
        
    );
}

export default FindArtist;