import React, {useState, useEffect, useContext, useRef} from 'react';
import { 
    View, 
    Modal, 
    StyleSheet, 
    Text, 
    FlatList, 
    Dimensions, 
    RefreshControl, 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    Image, 
    Animated, 
    PanResponder 
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


const AudioListByGenre = ({navigation} : any) => {

//route params from the GenreHome to specifiy the genre
    const route = useRoute();
    const {genreRoute} = route.params

    //global context for the story that is playing
    const { setStoryID } = useContext(AppContext);

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
    const [carouselStories, setCarouselStories] = useState([]);

    useEffect(() => {
        const fetchStorys = async () => {
                
            if (genreRoute) {
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            listStories, {
                                limit: 5,
                                filter: {
                                    genre: {
                                        genreID: {
                                        eq: genreRoute 
                                        }
                                        
                                    }
                                }
                            } 
                        )
                    )
                    setCarouselStories(response.data.listStories.items);
                } catch (e) {
                    console.log(e);}
            }
        }

        fetchStorys();

    },[didUpdate])

    const [Color, setColor] = useState('#363636')

      const animation = useRef(new Animated.Value(0)).current;

      const [isScrollEnabled, setIsScrollEnabled] = useState(true);

      const [scrollOffset, setScrollOffset] = useState(0);


    // const animatedHeight = {
    //     transform: animation.getTranslateTransform(),
    // };

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        });

    const animatedAppearOpacity = animation.interpolate({
        inputRange: [0, 300],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        });

    const animatedHeaderHeight = animation.interpolate({
        inputRange: [0, 300],
        outputRange: [300, 80],
        extrapolate: 'clamp',
        });

    const animatedColor = animation.interpolate({
        inputRange: [0, 300],
        outputRange: ['#000000', Color],
        extrapolate: 'clamp',
        });

    // const BackgroundColors = {
    //     backgroundColor: 
    //         genre === 'crime' ? '#cac715' : 
    //         genre === 'fantasy' ? '#15ca54' :
    //         genre === 'suspense' ? '#1579ca' :
    //         genre === 'comedy' ? '#ff9ce6' :
    //         genre === 'science fiction' ? '#c97f8b' :
    //         genre === 'life & adventure' ? '#15b8ca' :
    //         genre === 'fan fiction' ? '#a05ebf' :
    //         genre === 'after dark' ? '#5b6ade' : 
    //         'cyan'
    // }




    return (

        <View style={[styles.container]}>


            <Animated.FlatList 
                data={Storys}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={true}
                //stickyHeaderIndices={[0]}
                //onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: animation } } }],
                    { useNativeDriver: false }
                  )}
                scrollEventThrottle={1}
                //style={{marginTop: 300}}
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
                    );}
                }
                ListHeaderComponent={ () => {

                    

                    return (
                        <View style={{ height: 300}}>
                        </View>
                    )
                }}
            />

            <Animated.View 
                style={[ {backgroundColor: animatedColor, height: animatedHeaderHeight, width: Dimensions.get('window').width, position: 'absolute'}]}
            >
                <Modal
                animationType="slide"
                transparent={true}
                //presentationStyle='overFullScreen'
                visible={sortModalVisible}
                onRequestClose={() => {
                setSortModalVisible(!sortModalVisible);
                }}
            >
                    <View 
                        style={{    
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20}}>
                                <View 
                                    style={{
                                        margin: 40,
                                        backgroundColor: "#363636",
                                        borderRadius: 20,
                                        padding: 35,
                                        alignItems: "center",
                                        shadowColor: "#fff",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2
                                            },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4,
                                        elevation: 5,
                                        width: Dimensions.get('window').width/1.5
                                        }}>
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', width: '100%'}}>Sort by</Text>
                        <View style={{ marginTop: 20}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    value="first"
                                    status={ checked === 'first' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('first')}
                                /> 
                                <Text style={{marginHorizontal: 20, color: '#fff'}}>
                                    A - Z
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    value="second"
                                    status={ checked === 'second' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('second')}
                                /> 
                                <Text style={{marginHorizontal: 20, color: '#fff'}}>
                                    Z - A
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    value="third"
                                    status={ checked === 'third' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('third')}
                                /> 
                                <Text style={{marginHorizontal: 20, color: '#fff'}}>
                                    Newest
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    value="fourth"
                                    status={ checked === 'fourth' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('fourth')}
                                /> 
                                <Text style={{marginHorizontal: 20, color: '#fff'}}>
                                    Oldest
                                </Text>
                            </View>
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    value="fifth"
                                    status={ checked === 'fifth' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('fifth')}
                                /> 
                                <Text style={{marginHorizontal: 20, color: '#fff'}}>
                                    Highest Rating
                                </Text>
                            </View>
                            
                        </View>

                        <View style={{marginTop: 50}}>
                            <TouchableOpacity onPress={() => {setSortModalVisible(!sortModalVisible);}}>
                                <Text style={{color: '#ffffffa5'}}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                    
                    </View>
                </Modal>
                <LinearGradient
                    colors={[Color, Color, 'transparent']}
                    style={{height: '100%'}}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <View style={{ marginTop: 40, flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between'}}>
                        <View style={{ flexDirection: 'row'}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#000'
                                size={22}
                                onPress={() => navigation.goBack()}
                            />
                            <Animated.Text style={{ marginLeft: 20, textAlign: 'center', opacity: animatedAppearOpacity, fontSize: 18, textTransform: 'capitalize', fontWeight: 'bold'}}>
                                {genre}
                            </Animated.Text>
                        </View>
                        <FontAwesome5 
                            name='sort-alpha-down'
                            color='#000'
                            size={22}
                            onPress={() => setSortModalVisible(!sortModalVisible)}
                        />
                    </View>
                    <View style={{ top: 40, alignItems: 'center'}}>
                        <Animated.Text style={{ fontSize: 32, color: '#000', textTransform: 'capitalize', fontWeight: 'bold', opacity: animatedOpacity}}>
                            {genre}
                        </Animated.Text>
                    </View>
                    
                </LinearGradient>
            </Animated.View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
       width: Dimensions.get('window').width, 
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
        color: 'cyan',
        //fontStyle: 'italic',
        marginVertical: 3,
        textTransform: 'capitalize'

    },

});

export default AudioListByGenre;
