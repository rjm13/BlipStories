import React, {useState, useEffect, useRef} from 'react';
import { 
    StyleSheet, 
    Text, 
    Image, 
    TouchableOpacity, 
    View, 
    TextInput, 
    Platform, 
    ActivityIndicator, 
    TouchableWithoutFeedback, 
    ScrollView,
    Dimensions,
    FlatList,
}
from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, parseISO } from "date-fns";


import { Modal, Portal, Provider } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import uuid from 'react-native-uuid';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { createStory, createStoryTag, createTag, updateUser, updateTag } from '../src/graphql/mutations';
import { listTags, getUser, listGenres, listAudioAssets, audioAssetsByDate, imageAssetsByDate } from '../src/graphql/queries';
import { getStory, listStoryTags } from '../src/graphql/queries';


const UploadAudio = ({navigation} : any) => {   

    //set the current user
    const [user, setUser] = useState()

    useEffect(() => {
        const fetchUser = async () => {
            let userInfo = await Auth.currentAuthenticatedUser();
            let response = await API.graphql(graphqlOperation(
                getUser, { 
                    id: userInfo.attributes.sub
                }
            ))
            setUser(response.data.getUser)
        }
        fetchUser();
    }, [])



//audio object and image object
    const [pendingImageState, setPendingImageState] = useState('');
    const [pendingAudioState, setPendingAudioState] = useState('');

    //text data input state holders. Will be sent to aws
    const [data, setData] = useState({
        title: '',
        summary: '',
        description: '',
        genreID: '',
        genre: '',
        author: '',
        narrator: '',
        artistName: '',
        time: 0,
        imageUri: '',
        audioUri: '',
        nsfw: false,
        narratorID: null,
        artistID: null,

    });

    const [numAuthored, setNumAuthored] = useState(0)

        //get the user in order to prefill the author's name
        useEffect(() => {
            const fetchUser = async () => {
    
              const userInfo = await Auth.currentAuthenticatedUser();
                    if (!userInfo) {return;}
    
              try {
                const userData = await API.graphql(graphqlOperation(
                  getUser, {id: userInfo.attributes.sub}
                ))
                    if (userData) {
                        setData({...data, author: userData.data.getUser.pseudonym});
                        setNumAuthored(userData.data.getUser.numAuthored);
                }
    
                console.log(userData.data.getUser);
    
              } catch (e) {
                console.log(e);
              }
            }
            fetchUser();
          }, [])

    const [localImageUri, setLocalImageUri] = useState('');
    const [localAudioUri, setLocalAudioUri] = useState('');

//upload audio and image to s3
    const [isLoading, setIsLoading] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);

    const UploadToS3 = async () => {

        setIsLoading(true);

        // if (localImageUri) {
        
        //         const response = await fetch(localImageUri);
        //         const blob = await response.blob();
        //         const filename = uuid.v4().toString();
        //         const s3ResponseImage = await Storage.put(filename, blob);
                
        //         const result = await Storage.get(s3ResponseImage.key);
        //         setPendingImageState(result);          
        // }
        
        // if (localAudioUri) {
        //     try {
        //         const response = await fetch(localAudioUri);
        //         const blob = await response.blob();
        //         const filename = uuid.v4().toString();
        //         const s3ResponseAudio = await Storage.put(filename, blob);

        //         //const response_a = await Storage.get(s3ResponseAudio.key);
        //         setPendingAudioState(s3ResponseAudio.key);
        //     } catch (e) {
        //         console.error(e);
        //     }
        // }

        setIsLoading(false);
        setIsLoaded(true);
    }

//progress of upload
    const [progressText, setProgressText] = useState(0);

//upload audio object to graphql database
    const [isPublishing, setIsPublishing] = useState(false);

    const [isLocalImage, setIsLocalImage] = useState(false);

    const [isLocalAudio, setIsLocalAudio] = useState(false);



    const PublishStory = async () => {

        setIsPublishing(true);

        if (isLocalImage === true && isLocalAudio === true) {
            try {
                let userInfo = await Auth.currentAuthenticatedUser();

                const responseImage = await fetch(localImageUri);
                const blobImage = await responseImage.blob();
                const filenameImage = uuid.v4().toString();
                const s3ResponseImage = await Storage.put(filenameImage, blobImage);
            
                const responseAudio = await fetch(localAudioUri);
                const blob = await responseAudio.blob();
                const filename = uuid.v4().toString();
                const s3ResponseAudio = await Storage.put(filename, blob, {
                    progressCallback(uploadProgress) {
                        setProgressText(
                            Math.round((uploadProgress.loaded / uploadProgress.total) * 100)
                        );
                    }
                })

                
            let result = await API.graphql(
                graphqlOperation(createStory, { input: 
                    {
                        title: data.title,
                        summary: data.summary,
                        description: data.description,
                        genreID: data.genreID,
                        author: data.author,
                        narrator: data.narrator,
                        artistName: data.artistName,
                        narratorID: data.narratorID,
                        artistID: data.artistID,
                        time: data.time,
                        approved: true,
                        hidden: false,
                        imageUri: s3ResponseImage.key,
                        audioUri: s3ResponseAudio.key,
                        userID: userInfo.attributes.sub,
                        nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : data.nsfw,
                        ratingAvg: 0,
                        ratingAmt: 0,
                        type: 'Story'
                    }
            }))

                //for each tag, check and see if the tag alreadyt exists
                if (TagsArray.length > 0) {
                    for (let i = 0; i < TagsArray.length; i++) {
                        let tagCheck = await API.graphql(graphqlOperation(
                            listTags, {filter: {tagName: {eq: TagsArray[i].name.toLowerCase()}}}
                        ))
                //if the tag exists, create a StoryTag with the tagID and storyID
                        if (tagCheck.data.listTags.items.length === 1) {
                            let addTag = await API.graphql(graphqlOperation(
                                createStoryTag, {input: {tagID: tagCheck.data.listTags.items[0].id, storyID: result.data.createStory.id, }}
                            ))
                            let updateATag = await API.graphql(graphqlOperation(
                                updateTag, {id: tagCheck.data.listTags.items[0].id, updatedAt: new Date()}
                            ))
                            console.log(addTag)
                            console.log(updateATag)
                //if the tag does not exist, create the tag and then the StoryTag with the tagID and storyID
                        } else if (tagCheck.data.listTags.items.length === 0) {
                            let newTag = await API.graphql(graphqlOperation(
                                createTag, {input: {createdAt: new Date(), type: 'Tag', tagName: TagsArray[i].name.toLowerCase(), genreID: data.genreID, nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : false}}
                            ))
                            if (newTag) {
                                let makeStoryTag = await API.graphql(graphqlOperation(
                                    createStoryTag, {input: {tagID: newTag.data.createTag.id, storyID: result.data.createStory.id}}
                                ))
                                console.log('story tags are...')
                                console.log(makeStoryTag)
                            }
                        }

                    }
                }

            let updateUserInfo = await API.graphql(
                graphqlOperation(updateUser, { input: {
                    id: userInfo.attributes.sub,
                    numAuthored: numAuthored + 1
                }
            }));
            console.log(updateUserInfo);

            setIsPublishing(false);
            navigation.goBack();

            console.log(result);
                } catch (e) {
                        console.error(e);
        }
        } else if (isLocalImage === true && isLocalAudio === false) {
            try {
                let userInfo = await Auth.currentAuthenticatedUser();

                const responseImage = await fetch(localImageUri);
                const blobImage = await responseImage.blob();
                const filenameImage = uuid.v4().toString();
                const s3ResponseImage = await Storage.put(filenameImage, blobImage);
            
                // const responseAudio = await fetch(localAudioUri);
                // const blob = await responseAudio.blob();
                // const filename = uuid.v4().toString();
                // const s3ResponseAudio = await Storage.put(filename, blob, {
                //     progressCallback(uploadProgress) {
                //         setProgressText(
                //             Math.round((uploadProgress.loaded / uploadProgress.total) * 100)
                //         );
                //     }
                // })

                
            let result = await API.graphql(
                graphqlOperation(createStory, { input: 
                    {
                        title: data.title,
                        summary: data.summary,
                        description: data.description,
                        genreID: data.genreID,
                        author: data.author,
                        narrator: data.narrator,
                        narratorID: data.narratorID,
                        artistID: data.artistID,
                        time: data.time,
                        approved: true,
                        hidden: false,
                        imageUri: s3ResponseImage.key,
                        audioUri: data.audioUri,
                        userID: userInfo.attributes.sub,
                        nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : data.nsfw,
                        ratingAvg: 0,
                        ratingAmt: 0,
                        type: 'Story'
                    }
            }))

                //for each tag, check and see if the tag alreadyt exists
                if (TagsArray.length > 0) {
                    for (let i = 0; i < TagsArray.length; i++) {
                        let tagCheck = await API.graphql(graphqlOperation(
                            listTags, {filter: {tagName: {eq: TagsArray[i].name}}}
                        ))
                //if the tag exists, create a StoryTag with the tagID and storyID
                        if (tagCheck.data.listTags.items.length === 1) {
                            let addTag = await API.graphql(graphqlOperation(
                                createStoryTag, {input: {tagID: tagCheck.data.listTags.items[0].id, storyID: result.data.createStory.id, }}
                            ))
                            let updateATag = await API.graphql(graphqlOperation(
                                updateTag, {id: tagCheck.data.listTags.items[0].id, updatedAt: new Date()}
                            ))
                            console.log(addTag)
                            console.log(updateATag);
                //if the tag does not exist, create the tag and then the StoryTag with the tagID and storyID
                        } else if (tagCheck.data.listTags.items.length === 0) {
                            let newTag = await API.graphql(graphqlOperation(
                                createTag, {input: {createdAt: new Date(), type: 'Tag', tagName: TagsArray[i].name.toLowerCase(), genreID: data.genreID, nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : false}}
                            ))
                            if (newTag) {
                                let makeStoryTag = await API.graphql(graphqlOperation(
                                    createStoryTag, {input: {tagID: newTag.data.createTag.id, storyID: result.data.createStory.id}}
                                ))
                                console.log('story tags are...')
                                console.log(makeStoryTag)
                            }
                        }

                    }
                }

            let updateUserInfo = await API.graphql(
                graphqlOperation(updateUser, { input: {
                    id: userInfo.attributes.sub,
                    numAuthored: numAuthored + 1
                }
            }));
            console.log(updateUserInfo);

            setIsPublishing(false);
            navigation.goBack();

            console.log(result);
                } catch (e) {
                        console.error(e);
        }
        } else if (isLocalImage === false && isLocalAudio === true) {
            try {
                let userInfo = await Auth.currentAuthenticatedUser();

                // const responseImage = await fetch(localImageUri);
                // const blobImage = await responseImage.blob();
                // const filenameImage = uuid.v4().toString();
                // const s3ResponseImage = await Storage.put(filenameImage, blobImage);
            
                const responseAudio = await fetch(localAudioUri);
                const blob = await responseAudio.blob();
                const filename = uuid.v4().toString();
                const s3ResponseAudio = await Storage.put(filename, blob, {
                    progressCallback(uploadProgress) {
                        setProgressText(
                            Math.round((uploadProgress.loaded / uploadProgress.total) * 100)
                        );
                    }
                })

                
            let result = await API.graphql(
                graphqlOperation(createStory, { input: 
                    {
                        title: data.title,
                        summary: data.summary,
                        description: data.description,
                        genreID: data.genreID,
                        author: data.author,
                        narrator: data.narrator,
                        narratorID: data.narratorID,
                        artistID: data.artistID,
                        time: data.time,
                        approved: true,
                        hidden: false,
                        imageUri: data.imageUri,
                        audioUri: s3ResponseAudio.key,
                        userID: userInfo.attributes.sub,
                        nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : data.nsfw,
                        ratingAvg: 0,
                        ratingAmt: 0,
                        type: 'Story'
                    }
            }))

                //for each tag, check and see if the tag alreadyt exists
                if (TagsArray.length > 0) {
                    for (let i = 0; i < TagsArray.length; i++) {
                        let tagCheck = await API.graphql(graphqlOperation(
                            listTags, {filter: {tagName: {eq: TagsArray[i].name}}}
                        ))
                //if the tag exists, create a StoryTag with the tagID and storyID
                        if (tagCheck.data.listTags.items.length === 1) {
                            let addTag = await API.graphql(graphqlOperation(
                                createStoryTag, {input: {tagID: tagCheck.data.listTags.items[0].id, storyID: result.data.createStory.id, }}
                            ))
                            let updateATag = await API.graphql(graphqlOperation(
                                updateTag, {id: tagCheck.data.listTags.items[0].id, updatedAt: new Date()}
                            ))
                            console.log(addTag);
                            console.log(updateATag);
                //if the tag does not exist, create the tag and then the StoryTag with the tagID and storyID
                        } else if (tagCheck.data.listTags.items.length === 0) {
                            let newTag = await API.graphql(graphqlOperation(
                                createTag, {input: {createdAt: new Date(), type: 'Tag', tagName: TagsArray[i].name.toLowerCase(), genreID: data.genreID, nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : false}}
                            ))
                            if (newTag) {
                                let makeStoryTag = await API.graphql(graphqlOperation(
                                    createStoryTag, {input: {tagID: newTag.data.createTag.id, storyID: result.data.createStory.id}}
                                ))
                                console.log('story tags are...')
                                console.log(makeStoryTag)
                            }
                        }

                    }
                }

            let updateUserInfo = await API.graphql(
                graphqlOperation(updateUser, { input: {
                    id: userInfo.attributes.sub,
                    numAuthored: numAuthored + 1
                }
            }));
            console.log(updateUserInfo);

            setIsPublishing(false);
            navigation.goBack();

            console.log(result);
                } catch (e) {
                        console.error(e);
        }
        } else if (isLocalImage === false && isLocalAudio === false) {
            try {
                let userInfo = await Auth.currentAuthenticatedUser();

                // const responseImage = await fetch(localImageUri);
                // const blobImage = await responseImage.blob();
                // const filenameImage = uuid.v4().toString();
                // const s3ResponseImage = await Storage.put(filenameImage, blobImage);
            
                // const responseAudio = await fetch(localAudioUri);
                // const blob = await responseAudio.blob();
                // const filename = uuid.v4().toString();
                // const s3ResponseAudio = await Storage.put(filename, blob, {
                //     progressCallback(uploadProgress) {
                //         setProgressText(
                //             Math.round((uploadProgress.loaded / uploadProgress.total) * 100)
                //         );
                //     }
                // })

                
            let result = await API.graphql(
                graphqlOperation(createStory, { input: 
                    {
                        title: data.title,
                        summary: data.summary,
                        description: data.description,
                        genreID: data.genreID,
                        author: data.author,
                        narrator: data.narrator,
                        narratorID: data.narratorID,
                        artistID: data.artistID,
                        time: data.time,
                        approved: true,
                        hidden: false,
                        imageUri: data.imageUri,
                        audioUri: data.audioUri,
                        userID: userInfo.attributes.sub,
                        nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : data.nsfw,
                        ratingAvg: 0,
                        ratingAmt: 0,
                        type: 'Story'
                    }
            }))

                //for each tag, check and see if the tag alreadyt exists
                if (TagsArray.length > 0) {
                    for (let i = 0; i < TagsArray.length; i++) {
                        let tagCheck = await API.graphql(graphqlOperation(
                            listTags, {filter: {tagName: {eq: TagsArray[i].name}}}
                        ))
                //if the tag exists, create a StoryTag with the tagID and storyID
                        if (tagCheck.data.listTags.items.length === 1) {
                            let addTag = await API.graphql(graphqlOperation(
                                createStoryTag, {input: {tagID: tagCheck.data.listTags.items[0].id, storyID: result.data.createStory.id, }}
                            ))
                            let updateATag = await API.graphql(graphqlOperation(
                                updateTag, {id: tagCheck.data.listTags.items[0].id, updatedAt: new Date()}
                            ))
                            console.log(addTag)
                            console.log(updateATag);
                //if the tag does not exist, create the tag and then the StoryTag with the tagID and storyID
                        } else if (tagCheck.data.listTags.items.length === 0) {
                            let newTag = await API.graphql(graphqlOperation(
                                createTag, {input: {createdAt: new Date(), type: 'Tag', tagName: TagsArray[i].name.toLowerCase(), genreID: data.genreID, nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : false}}
                            ))
                            if (newTag) {
                                let makeStoryTag = await API.graphql(graphqlOperation(
                                    createStoryTag, {input: {tagID: newTag.data.createTag.id, storyID: result.data.createStory.id}}
                                ))
                                console.log('story tags are...')
                                console.log(makeStoryTag)
                            }
                        }

                    }
                }

            let updateUserInfo = await API.graphql(
                graphqlOperation(updateUser, { input: {
                    id: userInfo.attributes.sub,
                    numAuthored: numAuthored + 1
                }
            }));
            console.log(updateUserInfo);

            setIsPublishing(false);
            navigation.goBack();

            console.log(result);
                } catch (e) {
                        console.error(e);
        }
        }
        // try {
        //         let userInfo = await Auth.currentAuthenticatedUser();

        //         const responseImage = await fetch(localImageUri);
        //         const blobImage = await responseImage.blob();
        //         const filenameImage = uuid.v4().toString();
        //         const s3ResponseImage = await Storage.put(filenameImage, blobImage);
            
        //         const responseAudio = await fetch(localAudioUri);
        //         const blob = await responseAudio.blob();
        //         const filename = uuid.v4().toString();
        //         const s3ResponseAudio = await Storage.put(filename, blob, {
        //             progressCallback(uploadProgress) {
        //                 setProgressText(
        //                     Math.round((uploadProgress.loaded / uploadProgress.total) * 100)
        //                 );
        //             }
        //         })

                
        //     let result = await API.graphql(
        //         graphqlOperation(createStory, { input: 
        //             {
        //                 title: data.title,
        //                 summary: data.summary,
        //                 description: data.description,
        //                 genreID: data.genreID,
        //                 author: data.author,
        //                 narrator: data.narrator,
        //                 narratorID: data.narratorID,
        //                 artistID: data.artistID,
        //                 time: data.time,
        //                 approved: true,
        //                 hidden: false,
        //                 imageUri: isLocalImage === true ? s3ResponseImage.key : data.imageUri,
        //                 audioUri: isLocalAudio === true ? s3ResponseAudio.key : data.audioUri,
        //                 userID: userInfo.attributes.sub,
        //                 nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : data.nsfw,
        //                 ratingAvg: 0,
        //                 ratingAmt: 0,
        //                 type: 'Story'
        //             }
        //     }))

        //         //for each tag, check and see if the tag alreadyt exists
        //         if (TagsArray.length > 0) {
        //             for (let i = 0; i < TagsArray.length; i++) {
        //                 let tagCheck = await API.graphql(graphqlOperation(
        //                     listTags, {filter: {tagName: {eq: TagsArray[i].name}}}
        //                 ))
        //         //if the tag exists, create a StoryTag with the tagID and storyID
        //                 if (tagCheck.data.listTags.items.length === 1) {
        //                     let addTag = await API.graphql(graphqlOperation(
        //                         createStoryTag, {input: {tagID: tagCheck.data.listTags.items[0].id, storyID: result.data.createStory.id, }}
        //                     ))
        //                     console.log(addTag)
        //         //if the tag does not exist, create the tag and then the StoryTag with the tagID and storyID
        //                 } else if (tagCheck.data.listTags.items.length === 0) {
        //                     let newTag = await API.graphql(graphqlOperation(
        //                         createTag, {input: {tagName: TagsArray[i].name, genreID: data.genreID, nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : false}}
        //                     ))
        //                     if (newTag) {
        //                         let makeStoryTag = await API.graphql(graphqlOperation(
        //                             createStoryTag, {input: {tagID: newTag.data.createTag.id, storyID: result.data.createStory.id}}
        //                         ))
        //                         console.log('story tags are...')
        //                         console.log(makeStoryTag)
        //                     }
        //                 }

        //             }
        //         }

        //     let updateUserInfo = await API.graphql(
        //         graphqlOperation(updateUser, { input: {
        //             id: userInfo.attributes.sub,
        //             numAuthored: numAuthored + 1
        //         }
        //     }));
        //     console.log(updateUserInfo);

        //     setIsPublishing(false);
        //     navigation.goBack();

        //     console.log(result);
        //         } catch (e) {
        //                 console.error(e);
        // }
    }


//request permission to access camera roll
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

//audio picker
    const [audioName, setAudioName] = useState('');

    const pickAudio = async () => {
        let result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: false,
        });

        console.log(result);

        if (result) {
        setLocalAudioUri(result.uri);
        setAudioName(result.name);
        let { sound } = await Audio.Sound.createAsync(
            {uri: result.uri},
            {shouldPlay: false}
        );
        let duration = await sound.getStatusAsync();
        setData({...data, time: duration.durationMillis, narratorID: user.id, narrator: user.narratorPseudo});
        setIsLocalAudio(true);
        console.log(duration);
        }
    };

//image picker

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
        setLocalImageUri(result.uri);
        setData({...data, artistID: user.id, artistName: user.artistPseudo})
        setIsLocalImage(true);
        console.log(result)
        }
    };
  
//Modal dropdown

    const [Genres, setGenres] = useState([]);

    useEffect(() => {

        let genrearray = []

        const fetchGenres = async () => {
            
        const result = await API.graphql(graphqlOperation(listGenres))

        if (result) {
            genrearray = result.data.listGenres.items
            setGenres(genrearray.sort((a : any, b : any) => a.genre.localeCompare(b.genre)))
        }
    }

    fetchGenres();

    },[])

    const Genre = Genres.map((item, index) => item.genre)

    const ConvertToString = (val : any) => {
        setData({...data, genreID: Genres[val].id, genre: Genres[val].genre, nsfw: Genres[val].id === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : false});
    }
  
//Modal
      const [visible, setVisible] = useState(false);
  
      const showModal = () => 
      
        termsAgree === true &&
        audioName !== '' &&
        localImageUri !== '' &&
        data.author !== '' &&
        data.genre !== '' &&
        data.description !== '' &&
        data.summary !== '' &&
        data.title !== '' ?

      setVisible(true) : null;

      const hideModal = () => setVisible(false);
      const containerStyle = {
          backgroundColor: '#363636', 
          padding: 20,
          borderRadius: 20, 
      }; 

//Modal
    const [visible2, setVisible2] = useState(false);
    
    const showNarratorModal = () => setVisible2(true);

    const hideNarratorModal = () => setVisible2(false);

//shared art modal
    const [visible3, setVisible3] = useState(false);
    
    const showArtModal = () => setVisible3(true);

    const hideArtModal = () => setVisible3(false);
 
      
//terms state management
      const [termsAgree, setTermsAgree] = useState(false);

      const handleTerms = () => {
          if (termsAgree === true) {
            setTermsAgree(false)
          }
          if (termsAgree === false) {
              setTermsAgree(true)
          }
      }

//Tags flatlist, data, and functions

    const clear = useRef()

    const [TagsArray, setTagsArray] = useState([])

    const [tagText, setTagText] = useState('')

//add a new tag to the array
    const AddToTagArray = () => {

        let Tags = []

        if (tagText.includes('#')) {
            return;
        } else {
            Tags.push(...TagsArray, {id: TagsArray.length + 1, name: tagText.replace(/ /g, '')});
            setTagsArray(Tags);
            clear.current.clear();
        }
    }

    //convert the time to show in the modal
    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(data.time / 60000);
        let seconds = Math.floor((data.time % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
        
    }  

//local audio picking

    const [localAudioVisible, setLocalAudioVisible] = useState(false);

    const showLocalAudioModal = () => {setLocalAudioVisible(true)}

    const hideLocalAudioModal = () => {setLocalAudioVisible(false)}

    const LocalAudioContainerStyle = {
        backgroundColor: 'transparent', 
        padding: 15,
    }; 

    const [localAudioArray, setLocalAudioArray] = useState([])

    useEffect(() => {
        const PickLocalAudio = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();

            let saved = await AsyncStorage.getAllKeys();
        
            if (saved != null) {
                let result = saved.filter((item) => item.includes("recording" + userInfo.attributes.sub));
            setLocalAudioArray(result)
            } 
        }
        PickLocalAudio();
    }, [])
    

    const Item = ({item} : any) => {

        let [itemState, setItemState] = useState({
            title: '',
            time: 0,
            created: new Date(),
            id: null,
            audio: '',
        })

        const SetAudio = () => {
            setLocalAudioUri(itemState.audio);
            setAudioName(itemState.title);
            setData({...data, time: itemState.time, narratorID: user.id, narrator: user.narratorPseudo})
            setIsLocalAudio(true);
            hideLocalAudioModal();
        }

        //get the item from async storage
        useEffect(() => {
            let componentMounted = true;
            const fetchData = async () => {
                try {
                    console.log('whats going on here')
                    let object = await AsyncStorage.getItem(item);
                    let objs = object ? JSON.parse(object) : null
                    if(componentMounted) {
                        setItemState({
                            title: objs.title,
                            time: objs.time,
                            created: parseISO(objs.created),
                            id: objs.id,
                            audio: objs.audioUri
                        })
                }
                } catch(e) {
                    // read error
                }
                
            };
            fetchData();
            return () => {
            componentMounted = false;
            }
        }, []);

        return (
            <View style={{marginBottom: 10, padding: 10, width: '100%', backgroundColor: '#232323', alignSelf: 'center', borderRadius: 10}}>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={SetAudio}>
                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                   <Text style={{color: '#fff', fontWeight: 'bold', marginBottom: 2}}>
                                        {itemState.title}
                                    </Text>
                                    <Text style={{color: '#ffffffa5', marginBottom: 6, fontSize: 12}}>
                                        {format(itemState.created, "MMM do yyyy")}
                                    </Text> 
                                </View>
                                
                                <Text style={{color: '#fff', fontSize: 12}}>
                                    {itemState.time}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            </View> 
        )
        

    }

    const renderItem = ({ item } : any) => (

        <Item 
          item={item}
        />
    );

    const [sharedAudio, setSharedAudio] = useState([]);

    useEffect(() => {

        const fetchAudioAssets = async () => {

        let userInfo = await Auth.currentAuthenticatedUser();  

        const response = await API.graphql(graphqlOperation(
            audioAssetsByDate, {
                type: 'AudioAsset',
                sortDirection: 'DESC',
                filter: {
                    sharedUserID: {
                        eq: userInfo.attributes.sub
                    }
                }
            }
        ))

        setSharedAudio(response.data.audioAssetsByDate.items);

        }
        fetchAudioAssets();

    }, [])


    const SharedItem = ({id, title, audioUri, userName, sharedUserName, isSample, time, userID, sharedUserID, createdAt} : any) => {
        
        //convert the time to show in the modal
        function millisToMinutesAndSeconds () {
            let minutes = Math.floor(time / 60000);
            let seconds = Math.floor((time % 60000) / 1000);
            return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);  
        }  

        const SetAudio = () => {
            setLocalAudioUri(audioUri);
            setAudioName(title);
            setData({...data, time: time, narratorID: userID, narrator: userName, audioUri: audioUri})
            hideNarratorModal();
            setIsLocalAudio(false);
        }

        
        return (
            <View>
                <View style={{marginTop: 20, padding: 10, width: '100%', backgroundColor: '#232323', alignSelf: 'center', borderRadius: 10}}>
                    <TouchableOpacity onPress={SetAudio}>
                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View>
                            <Text style={{color: '#fff', fontWeight: 'bold', marginBottom: 2}}>
                                    {title}
                                </Text>
                                <Text style={{color: '#ffffffa5', marginBottom: 6, fontSize: 12}}>
                                    {format(parseISO(createdAt), "MMM do yyyy")}
                                </Text> 
                            </View>
                            
                            <Text style={{color: '#fff', fontSize: 12}}>
                                {millisToMinutesAndSeconds()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{color: '#ffffffa5', marginTop: 2, marginLeft: 5}}>
                    Shared by {userName}
                </Text>
            </View>
        )
    }

    const renderSharedItem = ({item} : any) => {

        return (
            <SharedItem 
                id={item.id}
                title={item.title}
                audioUri={item.audioUri}
                isSample={item.isSample}
                time={item.time}
                userID={item.userID}
                userName={item.user.narratorPseudo}
                sharedUserID={item.sharedUserID}
                createdAt={item.createdAt}
                sharedUserName={item.sharedUser.pseudonym}
            />
        )
    }

    const [sharedArt, setSharedArt] = useState([]);

    useEffect(() => {

        

        const fetchArt = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            let response = await API.graphql(graphqlOperation(
                imageAssetsByDate, {
                    type: "ImageAsset",
                    sortDirection: 'DESC',
                    filter: {
                        sharedUserID: {
                            eq: userInfo.attributes.sub
                        }
                    }
                }
            ))
            setSharedArt(response.data.imageAssetsByDate.items)
        }
        fetchArt();

    }, [])

    const SharedArtItem = ({id, title, imageUri, isSample, userID, userName, sharedUserID, sharedUserName} : any) => {
        
        const SCREEN_WIDTH = Dimensions.get('window').width;

        const [imageU, setImageU] = useState('');

        useEffect(() => {
            const fetchUri = async () => {
                let response = await Storage.get(imageUri);
                setImageU(response);
            }
            console.log(imageUri)
            fetchUri();
        }, [])

        const SetImage = () => {
            setLocalImageUri(imageU);
            setIsLocalImage(false);
            setData({...data, artistID: userID, imageUri: imageUri, artistName: userName})
            hideArtModal();
        }
        
        return (
            <TouchableWithoutFeedback onPress={SetImage}>
                <View style={{marginTop: 20, marginHorizontal: 10}}>
                    <Image 
                        source={{uri: imageU}}
                        style={{borderRadius: 15, width: (SCREEN_WIDTH-80)/2, height: ((SCREEN_WIDTH-40)/2)*0.75}}
                    />
                    <Text style={{color: '#fff', marginTop: 4}}>
                        {title}
                    </Text>
                    <Text style={{color: '#00ffffa5'}}>
                        Shared by {userName}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            
        )
    }

    const renderSharedArt = ({item} : any) => {

        return (
            <SharedArtItem 
                id={item.id}
                title={item.title}
                imageUri={item.imageUri}
                isSample={item.isSample}
                userID={item.userID}
                userName={item.user.artistPseudo}
                sharedUserID={item.sharedUserID}
                sharedUserName={item.sharedUser.pseudonym}
                createdAt={item.createdAt}
            />
        )
    }

  return (
    <Provider>
        <ScrollView>
            <View style={styles.container}>

            <Portal>
{/* local audio list modal */}
                <Modal visible={localAudioVisible} onDismiss={hideLocalAudioModal} contentContainerStyle={LocalAudioContainerStyle}>
                    <ScrollView style={{ padding: 20, backgroundColor: '#363636', borderRadius: 15,}}>
                        <View>
                            <FlatList 
                                data={localAudioArray}
                                renderItem={renderItem}
                                keyExtractor={item => item}
                                style={{}}
                                initialNumToRender={20}
                                ListEmptyComponent={() => {
                                    return(
                                        <View style={{alignItems: 'center', margin: 30}}>
                                            <Text style={{color: '#fff'}}>
                                                There is nothing here.
                                            </Text>
                                        </View>
                                    )
                                }}
                                showsVerticalScrollIndicator={false}    
                                ListFooterComponent={ () => {
                                    return (
                                    <View style={{ height:  60}}>
                                    </View>
                                );}}
                                ListHeaderComponent={ () => {
                                    return (
                                    <View style={{ height:  60}}>
                                        <Text style={{textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                                            My Recordings
                                        </Text>
                                    </View>
                                );}}
                            />
                        </View>
                    </ScrollView>
                </Modal>

{/* confirm modal */}
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <ScrollView style={{ padding: 20, backgroundColor: '#363636', borderRadius: 15,}}>
                       
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <Text style={[styles.title, {textTransform: 'capitalize'}]}>
                            {data.title}
                            </Text>   
                        </View>

                        <View>
                            <Text style={{ textTransform:'capitalize', color: '#00ffffa5', marginVertical: 5,}}>
                            {data.genre}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center'}}>
                            <FontAwesome5 
                                name='book-open'
                                size={12}
                                color='#ffffffa5'
                            />
                            <Text style={styles.userId}>
                                {data.author}
                            </Text>  
                            <FontAwesome5 
                                name='book-reader'
                                size={12}
                                color='#ffffffa5'
                            />
                            <Text style={styles.userId}>
                                {data.narrator}
                            </Text> 
                        </View>

                        <ScrollView 
                        scrollEnabled={false}
                        style={{width: Dimensions.get('window').width - 20, marginHorizontal: 0, marginBottom: 20}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {TagsArray.map(({ id, name } : any) => (
                            <View key={id} style={{marginTop: 10, marginRight: 10}}>
                                <TouchableOpacity>
                                    <View style={{}}>
                                        <Text style={styles.tagtext}>
                                            #{name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                        <View style={{marginBottom: 10, width: Dimensions.get('window').width - 80, height: 1, backgroundColor: 'gray'}}>
                        </View>

                        

                        <View>
                            <Text style={{ marginVertical: 10, color: '#ffffff', borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 20,}}>
                            {data.summary}
                            </Text>
                        </View>

                        <View>
                            <Text style={{ marginVertical: 10, color: '#ffffff', borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 20,}}>
                            {data.description}
                            </Text>
                        </View>

                        <View>
                            <Text style={{ color: '#00ffffa5', marginVertical: 10,}}>
                            {audioName}
                            </Text>
                        </View>

                        <View style={{marginVertical: 10,flexDirection: 'row', borderBottomWidth: 1, borderColor: 'gray',}}>
                            <Text style={{ marginRight: 10,  color: '#ffffffa5',  paddingBottom: 20,}}>
                            Track Length:
                            </Text>
                            <Text style={{fontWeight: 'bold', color: '#ffffff', paddingBottom: 20,}}>
                                {millisToMinutesAndSeconds()}
                            </Text>
                        </View>

                        <View>
                            <Image 
                                source={{ uri: localImageUri}}
                                resizeMode='contain'
                                style={{ 
                                    marginVertical: 10,
                                    height: 200,
                                    borderRadius: 15,
                                }} 
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesome5 
                                    name='palette'
                                    size={12}
                                    color='#ffffffa5'
                                />
                                <Text style={styles.userId}>
                                    {data.artistName}
                                </Text> 
                            </View>
                            
                        </View>
                        
                        <View style={{ width: '100%', alignItems: 'center', marginBottom: 40}}>
                            {isPublishing ? (
                                <View style={{marginVertical: 40, alignContent: 'center'}}>
                                   <ActivityIndicator size="large" color="cyan"/> 
                                   <Text style={{fontSize: 16, textAlign: 'center', color: '#fff', marginTop: 10}}>
                                       {progressText} %
                                   </Text>
                                </View>
                                
                                ) : (
                            <TouchableOpacity onPress={PublishStory} style={{marginVertical: 40}}>
                                <LinearGradient
                                    colors={['cyan', 'cyan']}
                                    style={{ 
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 20,
                                        width: 100,
                                        }} >
                                    <Text style={{ color: 'black', fontSize: 16, textAlign: 'center'}}>
                                        Publish
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            )}   
                        </View>
                            
                    </ScrollView>
                </Modal>
{/* narratorn modal */}
                <Modal visible={visible2} onDismiss={hideNarratorModal} contentContainerStyle={containerStyle}>
                    <View style={{height: '80%'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                            Shared Files
                        </Text>
                        <Text style={{color: '#e0e0e0', fontSize: 11, marginTop: 4, marginBottom: 20}}>
                            Files that are shared with me from narrators will appear here for upload.
                        </Text>
                        <View style={{marginVertical: 10, alignSelf: 'center', width: '90%', height: 1, backgroundColor: '#fff'}}/>
                        <FlatList 
                            data={sharedAudio}
                            keyExtractor={item => item.id}
                            renderItem={renderSharedItem}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={() => {
                                return(
                                    <View style={{height: 60}}/>
                                )
                            }}
                        />
                        
                    </View>
                </Modal>
{/* artist modal */}
                <Modal visible={visible3} onDismiss={hideArtModal} contentContainerStyle={containerStyle}>
                    <View style={{height: '80%'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                            Shared Art
                        </Text>
                        <Text style={{color: '#e0e0e0', fontSize: 11, marginTop: 4, marginBottom: 20}}>
                            Files that are shared with me from artist will appear here for upload.
                        </Text>
                        <View style={{marginVertical: 10, alignSelf: 'center', width: '90%', height: 1, backgroundColor: '#fff'}}/>
                        <FlatList 
                            data={sharedArt}
                            keyExtractor={item => item.id}
                            renderItem={renderSharedArt}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            ListFooterComponent={() => {
                                return(
                                    <View style={{height: 60}}/>
                                )
                            }}
                        />
                        
                    </View>
                </Modal>
            </Portal>



                <View style={{ marginTop: 50, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <AntDesign 
                        name='close'
                        size={25}
                        color='#fff'
                        onPress={ () => navigation.goBack()}
                    /> 
                </View>
                <View style={{ alignItems: 'center'}}> 
                    <Text style={[styles.title, {marginBottom: 50}]}>
                        Upload a Short Story
                    </Text>

                    <Text style={styles.inputheader}>
                        Story Title *
                    </Text>
                    <View style={[styles.inputfield, {height: 60}]}>
                        
                        <TextInput
                            placeholder='....'
                                placeholderTextColor='#ffffffa5'
                            style={styles.textInputTitle}
                            maxLength={50}
                            multiline={true}
                            numberOfLines={2}
                            onChangeText={val => setData({...data, title: val})}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={data.title !== '' ? 'cyan' : '#363636'}
                            size={20}
                        />
                    </View>

                    <Text style={styles.inputheader}>
                        Summary *
                    </Text>
                    <View style={styles.inputfield}>
                        <TextInput
                            placeholder='Max 200 characters'
                            placeholderTextColor='#ffffffa5'
                            style={[styles.textInput, { height: 80 }]}
                            maxLength={200}
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={val => setData({...data, summary: val})}
                            textAlignVertical='top'
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={data.summary !== '' ? 'cyan' : '#363636'}
                            size={20}
                        />
                    </View>

                    <Text style={styles.inputheader}>
                        Description *
                    </Text>
                    <View style={styles.inputfield}>
                        <TextInput
                            placeholder='Max 1500 characters'
                            placeholderTextColor='#ffffffa5'
                            style={[styles.textInput, { height: 120 }]}
                            maxLength={1500}
                            multiline={true}
                            numberOfLines={10}
                            textAlignVertical='top'
                            onChangeText={val => setData({...data, description: val})}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={data.description !== '' ? 'cyan' : '#363636'}
                            size={20}
                        />
                    </View>

                    <Text style={styles.inputheader}>
                        Genre *
                    </Text>
                    <View style={{ 
                            width: '90%', 
                            marginBottom: 20, 
                            backgroundColor: '#363636a5',
                            marginHorizontal: 20,
                            paddingVertical: 20,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            }}>
                        <ModalDropdown 
                            options={Genre}
                            defaultValue='Select Genre...'
                            defaultTextStyle={{ color: '#ffffffa5'}}
                            onSelect={(val) => ConvertToString(val)}
                            textStyle={{ color: 'cyan', fontSize: 14, textTransform: 'capitalize',}}
                            dropdownStyle={{ 
                                backgroundColor: '#363636', 
                                width: '80%', 
                                borderWidth: 0,
                                borderRadius: 15,
                                height: 280,
                                marginTop: 10
                            }}
                            dropdownTextStyle={{ 
                                backgroundColor: 'transparent',
                                color: '#fff',
                                fontSize: 14,
                                paddingHorizontal: 20,
                                paddingVertical: 15,
                                textTransform: 'capitalize',
                            }}
                            dropdownTextHighlightStyle={{
                                color: 'cyan'
                            }}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={data.genreID !== '' ? 'cyan' : '#363636'}
                            size={20}
                        />

                    </View>

                    <Text style={styles.inputheader}>
                        Tags
                    </Text>

                    <ScrollView 
                        scrollEnabled={false}
                        style={{width: Dimensions.get('window').width - 40, marginHorizontal: 20, marginBottom: 20}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {TagsArray.map(({ id, name } : any) => (
                            <View key={id} style={{marginTop: 10, marginRight: 10}}>
                                <TouchableOpacity>
                                    <View style={{}}>
                                        <Text style={styles.tagtext}>
                                            #{name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginBottom: 20, marginTop: 0, }}>
                        <TouchableOpacity>
                            <View style={{ width: Dimensions.get('window').width - 140, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                <TextInput
                                    placeholder='#'
                                    placeholderTextColor='#ffffffa5'
                                    style={styles.textInputTitle}
                                    maxLength={20}
                                    multiline={false}
                                    numberOfLines={1}
                                    ref={clear}
                                    onChangeText={val => setTagText(val)}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={AddToTagArray}>
                            <View style={{ marginHorizontal: 20, padding: 10}}>
                                <FontAwesome5
                                    name='chevron-up'
                                    size={20}
                                    color='#fff'
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* <Text style={styles.inputheader}>
                        Author *
                    </Text>
                    <View style={[styles.inputfield, {height: 60}]}>
                        <TextInput
                            placeholder={!!user ? user?.pseudonym : '....'}
                            placeholderTextColor='#ffffffa5'
                            style={styles.textInputTitle}
                            maxLength={50}
                            multiline={true}
                            numberOfLines={2}
                            onChangeText={val => setData({...data, author: val})}
                            defaultValue={user?.pseudonym}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={data.author !== '' ? 'cyan' : '#363636'}
                            size={20}
                        />
                    </View> */}

                    <Text style={styles.inputheader}>
                        Narrator *
                    </Text>
                    <View style={[styles.inputfield, {height: 60}]}>
                        <TextInput
                            placeholder='....'
                                placeholderTextColor='#ffffffa5'
                            style={styles.textInputTitle}
                            maxLength={50}
                            multiline={true}
                            numberOfLines={2}
                            onChangeText={val => setData({...data, narrator: val})}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={data.narrator !== '' ? 'cyan' : '#363636'}
                            size={20}
                        />
                    </View>

                    <View style={{ width: '100%', marginBottom: 20, marginTop: 10, }}>
                    <Text style={styles.inputheader}>
                        Cover Art
                    </Text>
                        <TouchableWithoutFeedback onPress={pickImage}>
                            <View style={{ marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                <Text style={{ color: '#ffffffa5'}}>
                                    Select local image
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={showArtModal}>
                            <View style={{ marginTop: 20, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                <Text style={{ color: '#ffffffa5'}}>
                                    Select from shared art
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {localImageUri !== '' ? (
                            <Image 
                                source={{uri: localImageUri}}
                                style={{alignSelf: 'center', backgroundColor: 'gray', marginVertical: 20, borderRadius: 15, width: Dimensions.get('window').width - 40, height: 200}}
                            />
                        ) : null}
                    </View>

                    <Text style={[styles.inputheader, {marginTop: 10}]}>
                        Audio *
                    </Text>
                    <View style={{ width: '100%', marginBottom: 0, marginTop: 0, }}>
                        <TouchableOpacity onPress={showNarratorModal}>
                            <View style={{ marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                <Text style={{ textAlign: 'center', color: '#ffffffa5'}}>
                                    Select shared audio
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{width: '100%', justifyContent: 'space-between', marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{ width: '48%'}}>
                            <TouchableOpacity onPress={pickAudio}>
                                <View style={{ marginLeft: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                    <Text style={{ textAlign: 'center', color: '#ffffffa5'}}>
                                        {'Select local audio'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '48%'}}>
                            <TouchableOpacity onPress={showLocalAudioModal}>
                                <View style={{ marginRight: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                    <Text style={{ textAlign: 'center', color: '#ffffffa5'}}>
                                        {'Select Blip recording'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    

                    {audioName !== '' ? (
                        <View style={{marginTop: 20, }}>
                            <Text style={{color: 'cyan'}}>
                                {audioName}
                            </Text>
                        </View>
                    ) : null}

                    {data.nsfw === true ? (
                        <View style={{marginTop: 40, alignSelf: 'flex-start', marginLeft: 20}}>
                            <Text style={{borderColor: 'red', borderWidth: 0.5, borderRadius: 4, paddingVertical: 4, paddingHorizontal: 10, color: 'red'}}>
                                Explicit Content
                            </Text>
                        </View>
                    ) : null}
                    
                    <TouchableWithoutFeedback onPress={
                        () => {data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? null : setData({...data, nsfw: !data.nsfw})}}
                        >
                        <View style={{ alignSelf: 'flex-start', marginTop: 40, marginHorizontal: 20, flexDirection: 'row'}}>
                            <FontAwesome5 
                                name='check-circle'
                                color={data.nsfw === true ? 'cyan' : '#363636'}
                                size={20}
                            />
                            <Text style={{ color: '#ffffffa5', fontSize: 12, marginRight: 4, marginLeft: 20, textAlign: 'left'}}>
                                This story contains graphic sexual or explicit content and is not suitable for minors.
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    
                    <TouchableWithoutFeedback onPress={handleTerms}>
                        <View style={{ margin: 20, flexDirection: 'row', alignSelf: 'flex-start'}}>
                            <FontAwesome5 
                                name='check-circle'
                                color={termsAgree === true ? 'cyan' : '#363636'}
                                size={20}
                            />
                            <Text style={{ color: '#ffffffa5', fontSize: 12, marginRight: 4, marginLeft: 20, textAlign: 'left'}}>
                                I agree to the
                            </Text>
                            <TouchableWithoutFeedback>
                                <Text style={{ color: '#ffffffa5', fontSize: 12, textAlign: 'left', textDecorationLine: 'underline'}}>
                                    Publishing Terms and Conditions.
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                    

                        <TouchableOpacity onPress={showModal}>
                            <View style={[styles.uploadbutton, {
                                backgroundColor: 
                                    termsAgree === true &&
                                    audioName !== '' &&
                                    localImageUri !== '' &&
                                    data.author !== '' &&
                                    data.genre !== '' &&
                                    data.description !== '' &&
                                    data.title !== ''
                                    ? 'cyan' : 'transparent',
                                    borderColor: 
                                        termsAgree === true &&
                                        audioName !== '' &&
                                        localImageUri !== '' &&
                                        data.author !== '' &&
                                        data.genre !== '' &&
                                        data.description !== '' &&
                                        data.title !== ''
                                        ? 'cyan' : 'gray'
                            }]}>
                                <Text style={{ fontSize: 16, color: 
                                    termsAgree === true && 
                                    audioName !== '' &&
                                    localImageUri !== '' &&
                                    data.author !== '' &&
                                    data.genre !== '' &&
                                    data.description !== '' &&
                                    data.title !== ''
                                    ? '#000' : 'gray'
                                }}>
                                    Preview
                                </Text>
                            </View>   
                        </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    </Provider>
);
}

const styles = StyleSheet.create({
container: {
    //alignItems: 'center',
},
title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 0,
},
inputheader: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    alignSelf: 'flex-start'
},
inputfield: {
    width: '90%',
    backgroundColor: '#363636a5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row', 
    justifyContent: 'space-between'
    
},
textInputTitle: {
    color: '#fff',
    fontWeight: 'bold',
    width: '90%'
},
textInput: {
    color: '#fff',
    width: '92%'
},
userId: {
    fontSize: 12,
    color: '#ffffffa5',
    marginRight: 15,
    marginLeft: 5,
},
uploadbutton: {
    paddingHorizontal: 20, 
    paddingVertical: 10,
    marginBottom: 60, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: '#00ffff',
    borderWidth: 0.5,
},
timer: {
    color: '#ffffff',
    fontSize: 16,
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

export default UploadAudio;
