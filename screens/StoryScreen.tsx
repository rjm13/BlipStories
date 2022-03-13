import React, {useState, useEffect, useRef, useContext} from 'react';
import {
    Text, 
    View, 
    StyleSheet, 
    Dimensions, 
    ImageBackground, 
    ScrollView, 
    TouchableOpacity, 
    Animated,
    TouchableWithoutFeedback,
    FlatList,
    RefreshControl,
    Image,
    TextInput,
    ActivityIndicator,
    Share
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { Modal, Portal, Provider } from 'react-native-paper';

import Comments from '../components/Comments';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as Animatable from 'react-native-animatable';
import { format, parseISO } from "date-fns";

import {graphqlOperation, API, Auth, Storage} from 'aws-amplify';
import { getStory, getUser, listComments, listPinnedStories, listRatings, listStoryTags, listFinishedStories } from '../src/graphql/queries';
import { createComment, createFlag, createRating, updateRating, updateStory } from '../src/graphql/mutations';

import { AppContext } from '../AppContext';
import PinStory from '../components/functions/PinStory';
import unPinStory from '../components/functions/UnPinStory';


const StoryScreen  = ({navigation} : any) => {


//ref to scroll to comment section
    const scrollRef = useRef();
    const [viewPosition, setViewPosition] = useState(0);

    const scrollToView = () => {
        scrollRef.current?.scrollTo({y: viewPosition + 220, animated: true});
      }

//recieve story ID as props
    const route = useRoute();
    const {storyID} = route.params;

    const [storyUri, setStoryUri] = useState(null);

//use storyID to retrieve Story from AWS
    const [Story, setStory] = useState();
    const [AudioUri, setAudioUri] = useState('');

    //share the story
// const handleShareWithLinking = () => {
    
//       //Linking.openURL(deepUri);
//   };

  const handleShareWithLinking = async () => {

    let deepUri = Linking.createURL('storyscreen', {
            queryParams: { id: Story?.id },
    });    

    try {
      const result = await Share.share({
        message: Story?.title + ', : ' + deepUri,
        url: deepUri,
        title: 'Check out this short story on Blip!'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //alert(error.message);
    }
}

//   useEffect(() => {
    
//     const handleUrl = ({ storylinkid } : any) => {
//         if (storylinkid) {
//             setStoryUri({ storylinkid });
//             let { path, queryParams } = Linking.parse(url);
//             alert(`Linked to app with path: ${path} and data: ${JSON.stringify(queryParams)}`);
//         }
//     };
//     //handleUrl(storylinkid);

//   }, [])

  

//set the position of the audio player if the screen is full page
    const { setIsRootScreen } = useContext(AppContext);

    useEffect(() => {
        setIsRootScreen(true)
    },[])

//send context to audio player
    const { setStoryID } = useContext(AppContext);

//set global state context to the storyID to play the story
    const onPlay = () => {setStoryID(storyID);}

//get the story attributes using the storyID
    useEffect(() => {
        const fetchStory = async () => {
            try {
                const storyData = await API.graphql(graphqlOperation(getStory, {id: storyID}))

                if (storyData) {
                    setStory(storyData.data.getStory);
                    let response = await Storage.get(storyData.data.getStory.imageUri);
                    setImageU(response);
                }
            } catch (e) {
                console.log(e);
            }}
        fetchStory();
    }, [storyID])

    const [imageU, setImageU] = useState()
        

//rating state (if rated or not)
    const [isLiked, setIsLiked] = useState(false);
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }  
    };

//scrolling annimation
    const animation = useRef(new Animated.Value(0)).current;

    const animatedColor = animation.interpolate({
        inputRange: [0, 500],
        outputRange: ['transparent', '#363636'],
        extrapolate: 'clamp',
        });

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 500],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        });

//convert time to string
    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(Story?.time / 60000);
        let seconds = Math.floor((Story?.time % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

//tags flatlist data
    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        //setDidUpdate(!didUpdate);
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

      const [Tags, setTags] = useState([])

      useEffect(() => {

        const fetchTags = async () => {

        let storytag = storyID

        let tags = []
    
        const result = await API.graphql(graphqlOperation(
            listStoryTags, {
                filter: {
                    storyID: {
                        eq: storytag
                    }
                },
                //limit: 12
            }
          ))
    
          if (result) {
              for (let i = 0; i < result.data.listStoryTags.items.length; i++) {
                  tags.push(result.data.listStoryTags.items[i].tag)
              }
            setTags(tags)
          }
        }
        fetchTags();
      }, [storyID])
    
      const Tag = ({id, tag}: any) => {
        return (
          <View style={{marginTop: 14}}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('TagSearchScreen', {mainTag: id, tagName: tag})}>
                <View style={[styles.tagbox]}>
                    <Text style={styles.tagtext}>
                        #{tag}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
          </View>
        )
      }
    
      const renderTag = ({ item } : any) => (
    
        <Tag 
            id={item.id}
            tag={item.tagName}
        />
      );

//add a story to the pinned playlist function
    // const PinStory = async () => {

    //     let userInfo = await Auth.currentAuthenticatedUser();
    
    //     let createPin = await API.graphql(graphqlOperation(
    //         createPinnedStory, {input: {userID: userInfo.attributes.sub, storyID: storyID}}
    //     ))
    //     console.log(createPin)
    // }

//unpin a story
    // const unPinStory = async () => {

    //     let userInfo = await Auth.currentAuthenticatedUser();
    
    //     let getPin = await API.graphql(graphqlOperation(
    //         listPinnedStories, {
    //             filter: {
    //                 userID: {
    //                     eq: userInfo.attributes.sub
    //                 },
    //                 storyID: {
    //                     eq: storyID
    //                 }
    //             }
    //         }
    //     ))
    //     console.log(getPin)
        
    //     let connectionID = getPin.data.listPinnedStories.items[0].id
    //     console.log(connectionID)

    //     let deleteConnection = await API.graphql(graphqlOperation(
    //         deletePinnedStory, {id: connectionID}
    //     ))
    //     console.log(deleteConnection)
    // }

//queueing the item state when pressed
    const [isQ, setQd] = useState(false);
        
    const onQPress = () => {
        if ( isQ === false ) {
            setQd(true);
            PinStory({storyID: storyID})
        }
        if ( isQ === true ) {
            setQd(false);
            unPinStory({storyID: storyID});
        }  
    };

//on render, determine if the story in alraedy pinned or not
    useEffect(() => {
        const fetchPin = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            try {
                let getPin = await API.graphql(graphqlOperation(
                    listPinnedStories, {
                        filter: {
                            userID: {
                                eq: userInfo.attributes.sub
                            },
                            storyID: {
                                eq: storyID
                            }
                        }
                    }
                ))

                if (getPin.data.listPinnedStories.items.length === 1) {
                    setQd(true);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPin();
    }, [])

//Ratings Modal
    const [visible, setVisible] = useState(false);
    const showRatingModal = () => setVisible(true);
    const hideRatingModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

//Flag Modal
    const [visibleFlag, setVisibleFlag] = useState(false);
    const showFlagModal = () => setVisibleFlag(true);
    const hideFlagModal = () => setVisibleFlag(false);
    const containerStyleFlag = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

//rating functions

    //check if the story is rated or not
    const [isRated, setIsRated] = useState(false);

    //the rating average
    const [ratingNum, setRatingNum] = useState(0);

    //the rating id for the AWS
    const [ratingID, setRatingID] = useState();

    //updating state
    const [isUpdating, setIsUpdating] = useState(false);

    //submitting a new rating to AWS
    const SubmitRating = async () => {

        setIsUpdating(true);

        let userInfo = await Auth.currentAuthenticatedUser();

        if (isRated === true) {
            let Rate = await API.graphql(graphqlOperation(
                updateRating, {input: {
                    id: ratingID,
                    rating: ratingNum
                }}
            ))
            console.log(Rate)
        } else {
            let Rate = await API.graphql(graphqlOperation(
                createRating, {input: {
                    userID: userInfo.attributes.sub, 
                    storyID: storyID,
                    rating: ratingNum,
                    genreID: Story?.genreID,
                    type: 'Rating',
                    createdAt: new Date(),
                }}
            ))
        console.log(Rate)
        }

        //determine the new average and update the story

        let Average = []

        let RatingAvg = await API.graphql(graphqlOperation(
            listRatings, {filter: {
                storyID: {
                    eq: storyID
                }
            }}
        ))

        if (RatingAvg.data.listRatings.items.length > 0) {
            for (let i = 0; i < RatingAvg.data.listRatings.items.length; i++) {
                Average.push(RatingAvg.data.listRatings.items[i].rating) 
            }
            
            let newRating =  Math.floor(((Average.reduce((a, b) => {return a + b}))/(RatingAvg?.data.listRatings.items.length))*10)
            let newLength = RatingAvg.data.listRatings.items.length

            let newResult = await API.graphql(graphqlOperation(
                updateStory, {input: {
                    id: storyID, ratingAvg: newRating, ratingAmt: newLength}}
            ))
            console.log(newResult)
        }


        hideRatingModal();
        setIsUpdating(false);
    }



    useEffect(() => {


        const fetchRating = async () => {

            let userInfo = await Auth.currentAuthenticatedUser();

            let Rating = await API.graphql(graphqlOperation(
                listRatings, {filter: {
                    userID: {
                        eq: userInfo.attributes.sub
                    },
                    storyID: {
                        eq: storyID
                    }
                }}
            ))
            if (Rating.data.listRatings.items.length === 1) {
                setRatingNum(Rating.data.listRatings.items[0].rating);
                setIsRated(true);
                setRatingID(Rating.data.listRatings.items[0].id);
            } else {
                setRatingNum(0);
                setIsRated(false);
            }

            let storyCheck = await API.graphql(graphqlOperation(
                listFinishedStories, {filter: {
                    userID: {
                        eq: userInfo.attributes.sub
                        },
                    storyID: {
                        eq: storyID
                    }
                    }
                }
            ));

            if (storyCheck.data.listFinishedStories.items.length === 1) {
                setIsFinished(true);
            }

            if (Rating.data.listRatings.items.length === 0 && storyCheck.data.listFinishedStories.items.length === 1 ) {
                showRatingModal();
            }
        }
        fetchRating();
    }, [storyID])

//if item is finished state
    const [isFinished, setIsFinished] = useState(false);

//report states
    const [offensiveContent, setOffensiveContent] = useState(false);
    const [poorQuality, setPoorQuality] = useState(false);
    const [poorNarrator, setPoorNarrator] = useState(false);
    const [noPlay, setNoPlay] = useState(false);
    const [other, setOther] = useState(false);

//report the story
    const [isReported, setIsReported] = useState(false);

    //const [flags, setFlags] = useState([])

    const ReportStory = async () => {

        let flags = [];

        if (offensiveContent) {flags.push('OffensiveContent')};
        if (poorQuality) {flags.push('PoorQuality')};
        if (poorNarrator) {flags.push('PoorNarrator')};
        if (noPlay) {flags.push('NoPlay')};
        if (other) {flags.push('Other')};

        try {

            let userInfo = await Auth.currentAuthenticatedUser();

            const report = await API.graphql(graphqlOperation(
                createFlag, {input: {
                    storyID: storyID,
                    userID: userInfo.attributes.sub,
                    flagTypes: flags,
                }}
          ))
          console.log(report)
        } catch (e) {
            console.log(e)
        }
        setIsReported(true);
        //hideFlagModal();

    }

    const Item = ({content, createdAt, userName, userImageUri}: any) => {

        return (
            <View style={{ marginVertical: 10, backgroundColor: '#132F35', borderRadius: 15}}>
    
                <View style={{ margin: 10, flexDirection: 'row'}}>
                    <View>
                       <Image 
                                source={ userImageUri ? { uri: userImageUri} : require('../assets/images/blankprofile.png')}
                                style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'lightgray'}}
                        /> 
                    </View>
                    <View style={{marginHorizontal: 20, alignSelf: 'center'}}>
                        <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
                            {userName}
                        </Text>
                        <Text style={{color: '#ffffffa5', fontSize: 12}}>
                            {format(parseISO(createdAt), 'MMM Do yyyy')}
                        </Text>
                    </View>
                </View>
    
                <View>
                    <Text style={{ color: '#ffffff', marginBottom: 20, marginTop: 10, marginHorizontal: 20}}>
                        {content}
                    </Text>
                </View>
            </View>
        );
    }
    
        const [commentUpdated, setCommentUpdated] = useState(false);
    
        //get the comments for that story using the storyID
        useEffect(() => {
    
            const fetchComments = async () => {
               
                    try {
                        const response = await API.graphql(
                            graphqlOperation(
                                listComments, {
                                    filter: {
                                        storyID: {
                                            eq: storyID
                                        },
                                    }
                                } 
                            )
                        )
                        setCommentList(response.data.listComments.items);
                        console.log(response.data.listComments.items)
                    } catch (e) {
                        console.log(e);}  
            }
            fetchComments();
        },[storyID, commentUpdated])
    
        const [commentList, setCommentList ] = useState([]);
    
        //const [story, setStory] = useState(storyId);
    
        const { userID } = useContext(AppContext);
        const { setUserID } = useContext(AppContext);
    
        const [user, setUser] = useState();
    
        useEffect(() => {
            const fetchUser = async () => {
    
                // const userInfo = await Auth.currentAuthenticatedUser(
                //     { bypassCache: true }
                //   );
    
                const userData = await API.graphql(
                    graphqlOperation(
                    getUser, 
                    { id: userID,
                    }
                    )
                )
                setUser(userData.data.getUser);
            }
        fetchUser();
        }, [])
        
        const renderItem = ({ item } : any) => (
    
            <Item 
                //id={item.id}
                content={item.content}
                createdAt={item.createdAt}
                userName={item.user && item.user.name}
                userImageUri={item.user && item.user.imageUri}
            />
          );
        
        const [comment, setComment] = useState('');
    
        const handlePostComment = async () => {
    
            const poster = await Auth.currentAuthenticatedUser()
    
            if (comment.length > 0) {
                try {
                    let result = await API.graphql(
                            graphqlOperation(createComment, { input: 
                                {
                                    storyID: storyID,
                                    content: comment,
                                    userID: poster.attributes.sub
                                }
                            }))
                                console.log(result);
                        } catch (e) {
                                console.error(e);
                }
                setComment('');
                setCommentUpdated(!commentUpdated)
            }
        }

    return (
        <Provider>
            <View style={styles.container}>
                <Portal>
{/* Rate the story modal */}
                    <Modal visible={visible} onDismiss={hideRatingModal} contentContainerStyle={containerStyle}>
                        <View style={{alignItems: 'center'}}>
                            <View style={{}}>
                                <Text style={{margin: 20, fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                                    Leave a Rating
                                </Text>
                                <Text style={{margin: 20, textAlign: 'center', fontSize: 20, color: '#fff'}}>
                                    {ratingNum}/10
                                </Text>
                            </View>
                            <View style={{marginBottom: 20, flexDirection: 'row'}}>
                                <FontAwesome onPress={() => setRatingNum(1)} style={{marginHorizontal: 4 }} name={ratingNum < 1 ? 'star-o' : 'star'} size={22} color={ratingNum < 1 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(2)} style={{marginHorizontal: 4 }} name={ratingNum < 2 ? 'star-o' : 'star'} size={22} color={ratingNum < 2 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(3)} style={{marginHorizontal: 4 }} name={ratingNum < 3 ? 'star-o' : 'star'} size={22} color={ratingNum < 3 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(4)} style={{marginHorizontal: 4 }} name={ratingNum < 4 ? 'star-o' : 'star'} size={22} color={ratingNum < 4 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(5)} style={{marginHorizontal: 4 }} name={ratingNum < 5 ? 'star-o' : 'star'} size={22} color={ratingNum < 5 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(6)} style={{marginHorizontal: 4 }} name={ratingNum < 6 ? 'star-o' : 'star'} size={22} color={ratingNum < 6 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(7)} style={{marginHorizontal: 4 }} name={ratingNum < 7 ? 'star-o' : 'star'} size={22} color={ratingNum < 7 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(8)} style={{marginHorizontal: 4 }} name={ratingNum < 8 ? 'star-o' : 'star'} size={22} color={ratingNum < 8 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(9)} style={{marginHorizontal: 4 }} name={ratingNum < 9 ? 'star-o' : 'star'} size={22} color={ratingNum < 9 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(10)} style={{marginHorizontal: 4 }} name={ratingNum < 10 ? 'star-o' : 'star'} size={22} color={ratingNum < 10 ? 'white' : 'gold'}/>                                
                            </View>
                            {isUpdating === true ? (
                                <ActivityIndicator size='large' color='cyan '/>
                            ) :
                            <TouchableOpacity onPress={SubmitRating}>
                                <View style={{marginTop: 40, paddingVertical: 6, paddingHorizontal: 30, backgroundColor: '#00ffff', margin: 10, borderRadius: 30}}>
                                        <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold', }}>
                                            Submit
                                        </Text>
                                </View>
                            </TouchableOpacity>
                            }
                        </View>
                    </Modal>
{/* flag this story modal */}
                    <Modal visible={visibleFlag} onDismiss={hideFlagModal} contentContainerStyle={containerStyleFlag}>
                        <View style={{alignItems: 'center'}}>
                            {isReported === false ? (
                            <View style={{}}>
                                <Text style={{margin: 20, fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                                    Report this Story
                                </Text>

                                <TouchableWithoutFeedback onPress={() => setOffensiveContent(!offensiveContent)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={offensiveContent === true ? 'check-square-o' : 'square-o'}
                                            color={offensiveContent === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Offensive Content
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => setPoorQuality(!poorQuality)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={poorQuality === true ? 'check-square-o' : 'square-o'}
                                            color={poorQuality === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Poor Audio Quality
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => setPoorNarrator(!poorNarrator)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={poorNarrator === true ? 'check-square-o' : 'square-o'}
                                            color={poorNarrator === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Poor Narration
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => setNoPlay(!noPlay)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={noPlay === true ? 'check-square-o' : 'square-o'}
                                            color={noPlay === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Could Not Play
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => setOther(!other)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={other === true ? 'check-square-o' : 'square-o'}
                                            color={other === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Other
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>
                                
                                
                            </View>
                            ) : null}

                            {isReported ? (
                                <View style={{marginVertical: 40}}>
                                <Text style={{textAlign: 'center', color: '#fff'}}>
                                    Thank you for reporting this story. It will be placed under review.
                                </Text>
                                
                                </View>
                            ) : (
                                <TouchableOpacity onPress={ReportStory}>
                                    <View style={{marginTop: 40, paddingVertical: 6, paddingHorizontal: 30, backgroundColor: '#00ffff', margin: 10, borderRadius: 30}}>
                                            <Text style={{color: '#000000', fontSize: 16}}>
                                                Report
                                            </Text>
                                    </View>
                                </TouchableOpacity>
                            )}

                            
                            
                        </View>
                    </Modal>
                </Portal>

                <ImageBackground 
                    source={{uri: imageU}}
                    style={{  backgroundColor: '#363636', width: Dimensions.get('window').width, height: 330,  position: 'absolute'  }}
                >
                    
                    
                    {Story?.imageUri ? (null) : (
                        <View style={{ alignSelf: 'center', marginTop: 140}}>
                            <FontAwesome5 
                                name={Story?.genre?.icon}
                                color='#ffffffa5'
                                size={50}
                            />
                        </View>
                    )}
                     
                </ImageBackground>

                <Animated.View style={{ alignItems: 'center', backgroundColor: animatedColor, flexDirection: 'row', paddingTop: 40, paddingBottom: 20, width: Dimensions.get('window').width, justifyContent: 'space-between'}}>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => {navigation.goBack(); setIsRootScreen(false)}}>
                            <View style={ [styles.button, {backgroundColor: '#363636a5', flexDirection: 'row'}]}>
                                <AntDesign 
                                    name='close'
                                    size={22}
                                    color='#fff'
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <Animated.Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', opacity: animatedOpacity}}>
                            {Story?.title}
                        </Animated.Text>
                    </View>

                    <TouchableOpacity onPress={onPlay}>
                        <Animated.View style={{marginHorizontal: 20, height: 30, width: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00ffff', borderRadius: 15, opacity: animatedOpacity}}>
                            <FontAwesome5 
                                name='play'
                                size={16}
                                color='#363636'
                                style={{marginLeft: 2}}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                    
                </Animated.View>

                <Animatable.View animation='bounceInUp' style={{}}>
                    <ScrollView 
                        style={{}}
                        ref={scrollRef}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: animation } } }],
                            { useNativeDriver: false })}
                        scrollEventThrottle={1}
                        showsVerticalScrollIndicator={false}
                    >
                        
                        <View style={{ height: 220, backgroundColor: 'transparent', alignItems: 'flex-start'}}>
                            {Story?.imageUri ? (
                                <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: Story?.artistID, status: 'artist'})}>
                                    <View style={{marginLeft: 10, marginTop: 186, alignItems: 'center', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#363636a5', flexDirection: 'row'}}>
                                        <FontAwesome5 
                                            name='palette'
                                            size={14}
                                            color='#fff'
                                            style={{marginRight: 10}}
                                        />
                                        <Text style={{color: '#fff'}}>
                                            {Story?.artistName}
                                        </Text>
                                    </View> 
                                </TouchableOpacity>
                            ) : null}
                        </View>
                        <LinearGradient 
                            colors={['#202020', '#282828', '#000', '#000']}
                            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20,paddingVertical: 5, paddingHorizontal: 0}}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <View style={{  }}>
                                <View style={{ margin: 20, alignItems: 'center'}}>
                                    <Text style={styles.name}>
                                        {Story?.title}
                                    </Text>

                                    <View style={{ width: '100%', flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: Story?.userID, status: 'publisher'})}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <FontAwesome5 
                                                    name='book-open'
                                                    color='#ffffffCC'
                                                    size={15}
                                                    style={{ marginRight: 10}}
                                                />
                                                <Text style={styles.username}>
                                                    {Story?.author}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: Story?.narratorID, status: 'narrator'})}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <FontAwesome5 
                                                    name='book-reader'
                                                    color='#ffffffCC'
                                                    size={15}
                                                    style={{ marginRight: 10}}
                                                />
                                                <Text style={styles.username}>
                                                    {Story?.narrator}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={ styles.icon}>
                                            <AntDesign 
                                                name={isQ ? 'pushpin' : 'pushpino'}
                                                size={20}
                                                color={isQ ? 'cyan' : 'white'}
                                                onPress={onQPress}
                                                style={{ }}
                                            />
                                        </View>
                                        <View style={ styles.icon}>
                                            <FontAwesome 
                                                name='commenting-o'
                                                size={20}
                                                color='white'
                                                onPress={scrollToView}
                                                style={{ }}
                                            />
                                        </View>
                                        <View style={ styles.icon}>
                                            <FontAwesome 
                                                name='share'
                                                size={20}
                                                color='white'
                                                onPress={handleShareWithLinking}
                                                style={{ }}
                                            />
                                        </View>
                                    </View>

                                    <TouchableWithoutFeedback onPress={showRatingModal}>
                                        <View style={{justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
                                            <FontAwesome 
                                                name={isRated === true ? 'star' : 'star-o'}
                                                size={17}
                                                color={isRated === true || isFinished === true ? 'gold' : 'white'}
                                                onPress={onLikePress}
                                                style={{marginHorizontal: 6 }}
                                            />
                                            <Text style={{textAlign: 'center', color: '#e0e0e0', fontSize: 17}}>
                                                {/* {AverageUserRating}% */}
                                                {Story?.ratingAvg}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    
                                </View>

                                <View style={{marginTop: 16, height: 80}}>

                                    <FlatList
                                        data={Tags}
                                        extraData={Tags}
                                        renderItem={renderTag}
                                        horizontal={true}
                                        style={{width:  Dimensions.get('window').width, backgroundColor: 'transparent', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}}
                                        keyExtractor={(item) => item.id}
                                        initialNumToRender={8}
                                        showsHorizontalScrollIndicator={false}
                                        maxToRenderPerBatch={8}
                                        showsVerticalScrollIndicator={false}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={isFetching}
                                                onRefresh={onRefresh}
                                            />
                                        }
                                        ListHeaderComponent={() => {
                                            return (
                                                <View style={{marginHorizontal: 20, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                                    <Text style={{fontSize: 15, textTransform: 'capitalize', textAlign: 'center', color: '#fff'}}>
                                                        {Story?.genre?.genre}
                                                    </Text>
                                                </View>
                                            )
                                        }}
                                        ListEmptyComponent={() => {
                                            return (
                                                <View style={{margin: 40, alignItems: 'center', justifyContent: 'center'}}>
                                                    
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                
                                <View>
                                    <TouchableOpacity onPress={onPlay}>
                                        <View style={{paddingVertical: 6, paddingHorizontal: 30, backgroundColor: '#00ffff', margin: 10, borderRadius: 30}}>
                                                <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold', }}>
                                                    Play
                                                </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <Text style={{color: '#ffffff', fontSize: 18}}>
                                        {millisToMinutesAndSeconds()}
                                    </Text>
                                </View>

                                <View style={{marginVertical: 20, marginHorizontal: 4, flex: 1 }}>
                                    <Text style={{color: '#fff', flexWrap: 'wrap', marginBottom: 10}}>
                                        {Story?.description}
                                    </Text>
                                </View> 

                                <View style={{width: '100%', marginTop: 20}} >
                                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                                                Discussion
                                            </Text>
                                            <Text style={{color: '#fff', marginLeft: 10}}>
                                                ({commentList.length})
                                            </Text>
                                        </View>
                                        
                                        <FontAwesome 
                                            name='flag'
                                            size={20}
                                            color='gray'
                                            onPress={showFlagModal}
                                        />
                                    </View>
                                    <View onLayout={e => setViewPosition(e.nativeEvent.layout.y)}>
                                        {/* <Comments storyId={Story?.id} /> */}
                                        <View style={{backgroundColor: '#363636', padding: 20, marginVertical: 10, borderRadius: 15, }}>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Image 
                                                        source={ user?.imageUri ? { uri: user?.imageUri} : require('../assets/images/blankprofile.png')}
                                                        style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'gray'}}
                                                    />
                                                <TextInput 
                                                    placeholder='Leave a comment'
                                                    placeholderTextColor='#ffFFFFa5'
                                                    style={{
                                                        color: '#ffffff',
                                                        fontSize: 14,
                                                        marginLeft: 20,
                                                        marginRight: 30,    
                                                    }}
                                                    maxLength={250}
                                                    multiline={true}
                                                    numberOfLines={2}
                                                    onChangeText={comment => setComment(comment)}
                                                    value={comment}
                                                />
                                            </View>
                                                {comment.length > 0 ? (
                                                    <View>
                                                        <View style={{marginTop: 20, alignSelf: 'center', width: '70%', height: 1, borderWidth: 0.5, borderColor: '#ffffffa5'}}>
                                                        </View>
                                                        <TouchableOpacity onPress={handlePostComment}>
                                                            <View style={{ marginTop: 20, alignItems: 'center'}}>
                                                                <Text style={{backgroundColor: 'cyan', width: 80, padding: 5, borderRadius: 20, color: '#000', borderWidth: 0.5, borderColor: '#00ffff', textAlign: 'center'}}>
                                                                    Post
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : null}
                                        </View>

                                        <FlatList 
                                            data={commentList}
                                            renderItem={renderItem}
                                            keyExtractor={item => item.id}
                                            showsVerticalScrollIndicator={false}
                                            scrollEnabled={false}
                                            extraData={commentList}
                                            initialNumToRender={10}
                                            maxToRenderPerBatch={10}
                                            ListFooterComponent={ () => {
                                                return (
                                                    <View style={{height:  300}}>
                                                    </View>
                                                );
                                            }}
                                            // ListHeaderComponent={ () => {
                                            //     return (
                                            //     <View>
                                            //     </View>
                                            //     );
                                            // }}
                                        />
                                    </View>
                                </View>

                            </View>
                        </View>
                    </LinearGradient> 
                </ScrollView>
            </Animatable.View>
            <StatusBar style='light' backgroundColor='#0000004D' />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create ({
    container: {
    },
    name: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    username: {
        color: '#ffffffCC',
        fontSize: 14,
        marginVertical: 5,
        textTransform: 'capitalize'
    },
    footer: {
        marginVertical: 0,
    },
    highlight: { 
        marginHorizontal: -10,
        color: '#ffffffCC',
        fontSize: 14,
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 50,
        width: 36,
        height: 36,
        marginHorizontal: 10,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginRight: 30,
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
        borderRadius: 20,
    },
   
});

export default StoryScreen;
