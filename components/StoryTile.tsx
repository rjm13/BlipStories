import React, {useState} from 'react';

import {
    View, 
    Text, 
    TouchableOpacity, 
    TouchableWithoutFeedback
} from'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useNavigation} from '@react-navigation/native';

import UnPinStory from './functions/UnPinStory';

const StoryTile = ({
    title, 
    genreName, 
    summary, 
    imageUri, 
    nsfw, 
    audioUri, 
    author, 
    narrator, 
    time, 
    id} : any) => {
        
        
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

    const [isQ, setQd] = useState(true);
    
    const onQPress = () => {
        if ( isQ === false ) {
            setQd(true);
        }
        if ( isQ === true ) {
            setQd(false);
            UnPinStory({storyID: id});
            setDidUpdate(!didUpdate)
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
                                    12:53
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
                                        {AverageUserRating}%
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

export default StoryTile;