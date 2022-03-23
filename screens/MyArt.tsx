import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList,
    ScrollView,
    StyleSheet,
    Dimensions,
    TextInput,
    ActivityIndicator,
    Platform
} from 'react-native';

import { Modal, Portal, Provider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { deleteImageAsset, createImageAsset, updateImageAsset, createMessage } from '../src/graphql/mutations';
import { listImageAssets, listUsers, getUser } from '../src/graphql/queries';

const MyArt = ({navigation} : any) => {

    //on render, request permission for camera roll
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

    const SCREEN_WIDTH = Dimensions.get('window').width

    const [imageState, setImageState] = useState();
    const [titleState, setTitleState] = useState();
    const [indexState, setIndexState] = useState();
    const [imageIDState, setImageIDState] = useState();

    const [data, setData] = useState({
        imageUri: '',
        title: '',
        index: '',
        id: '',
        sharedUserID: '',
        sharedUserName: '',
    })

    const UpdateAsset = async () => {

        setIsUploading(true);

        let response = await API.graphql(graphqlOperation(
            updateImageAsset, {input: {
                id: data.id,
                sharedUserID: data.sharedUserID
            }}
        ))

        if (response) {

            const userInfo = await Auth.currentAuthenticatedUser();

            const user = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))

            let message = await API.graphql(graphqlOperation(
                createMessage, {input: {
                    type: 'Message',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userID: data.sharedUserID,
                    otherUserID: userInfo.attributes.sub,
                    content: 'You have new shared art work to use as cover art for your short story. \n This art is to be used for this purpose only and any other use will be considered copywrite infringement in which you may be held liable. \n To view this art, open the Shared Assets list from your Publisher Account. \n\n To add this art as cover art for your story, select from Shared Art on the Publish Story screen.',
                    title: user.data.getUser.artistPseudo + ' shared art with you!',
                    subtitle: 'artist',
                    isReadbyUser: false,
                    isReadByOtherUser: true,
                    docID: null,
                    request: 'art',
                }}
            ));
            console.log(message)
        }

        setDidUpdate(!didUpdate);
        setData({
            imageUri: '',
            title: '',
            index: '',
            id: '',
            sharedUserID: '',
            sharedUserName: '', 
        })
        setIsUploading(false);
        hideConfirmModal();
        hideUserListModal();
        hideImageModal();
        
    }


    const [sampleState, setSampleState] = useState(false)

    const [isUploading, setIsUploading] = useState(false);

    //art styles modal
    const [visible, setVisible] = useState(false);
    const showImageModal = ({title, imageUri, id, index, sharedUserID, sharedUserName} : any) => {
        setVisible(true);
        setData({...data, imageUri: imageUri, title: title, index: index, id: id, sharedUserID: sharedUserID, sharedUserName: sharedUserName})

    }
    const hideImageModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        borderRadius: 15,
        paddingVertical: 40
    };

    //upload modal
        const [visible2, setVisible2] = useState(false);
        const showUploadModal = () => {
            setVisible2(true);
            setData({...data, imageUri: ''})
        }
        const hideUploadModal = () => setVisible2(false);

    //user list modal
        const [visible4, setVisible4] = useState(false);
        const showUserListModal = () => {
            setVisible4(true);
        }
        const hideUserListModal = () => setVisible4(false);

    //delete modal
        const [visible3, setVisible3] = useState(false);
        const showDeleteModal = () => {
            setVisible3(true);
        }
        const hideDeleteModal = () => setVisible3(false);

    //confirm modal
        const [visible5, setVisible5] = useState(false);
        const showConfirmModal = () => {
            setVisible5(true);
        }
        const hideConfirmModal = () => setVisible5(false);


    //data form AWS image asset table
    const [imageData, setImageData] = useState();

    const [sampleImages, setSampleImages] = useState([]);

    const [didUpdate, setDidUpdate] = useState(false);

    //text input state
    const [textChange, setTextChange] = useState()

     //function for the text input
     const titleInputChange = (val : any) => {

        if( val.length !== 0 ) {
            setTextChange(val);
        } else {
            setTextChange(val);
        }
    }

    //get the image data
    useEffect(() => {
        const fetchData = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            let result = await API.graphql(graphqlOperation(
                listImageAssets, { 
                    filter: {
                        userID: {
                            eq: userInfo.attributes.sub
                        }
                    }
                }
            ))
            //setImageData(result.data.listImageAssets.items)

            let newArr = result.data.listImageAssets.items.filter((item : any) => item.isSample === false);

            for (let i = 0; i < newArr.length; i++) {
            
                const getUri = await Storage.get(newArr[i].imageUri);

                newArr[i].imageUri = getUri
            }
            console.log(newArr)
            setImageData(newArr)

            let sampleArr = result.data.listImageAssets.items.filter((item : any) => item.isSample === true);

            for (let i = 0; i < sampleArr.length; i++) {
            
                const getUri = await Storage.get(sampleArr[i].imageUri);

                sampleArr[i].imageUri = getUri
            }

            setSampleImages(sampleArr)
        }

        fetchData();
    }, [didUpdate])

    const Item = ({title, imageUri, id, index, sharedUserID, sharedUserName} : any) => {

        return (
            <TouchableWithoutFeedback onPress={() => showImageModal({title, imageUri, id, index, sharedUserID, sharedUserName})}>
                <View style={{marginTop: 20}}>
                    <Image 
                        source={{uri: imageUri}}
                        style={{borderRadius: 8, margin: 10, width: SCREEN_WIDTH/2 - 20, height: 120}}
                    />
                    <Text style={{marginLeft: 10, color: '#fff'}}>
                        {title}
                    </Text>
                </View>
                
            </TouchableWithoutFeedback>
        )
    }

    const renderItem = ({item, index} : any) => {
        return(
            <Item 
                title={item.title}
                imageUri={item.imageUri}
                id={item.id}
                index={index}
                sharedUserID={item.sharedUserID}
                sharedUserName={item.sharedUser?.pseudonym}
            />
        )
    };

    //pick the image from the camera roll
    const PickImage = async () => {

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                    setData({...data, imageUri: result.uri});
                    }
            console.log(result); 
      };

    const UploadToS3 = async () => {

        if (sampleImages.length === 4 && sampleState === true) {
            alert('You are only allowed a maximum of 4 sample images for your profile. Please remove one to continue.');
        } else {
            console.log(sampleImages)
            console.log('state is' + sampleState)
            setIsUploading(true);

            let userInfo = await Auth.currentAuthenticatedUser();

            const response = await fetch(data.imageUri);
                    const blob = await response.blob();
                    const filename =  uuid.v4().toString();
                    const s3Response = await Storage.put(filename, blob);

            let result = await API.graphql(graphqlOperation(
                createImageAsset, {input: {
                    userID: userInfo.attributes.sub,
                    title: textChange,
                    imageUri: s3Response.key,
                    isSample: sampleState,
                    type: 'ImageAsset',
                    createdAt: new Date(),
                }}
            ))

            console.log(result);
            setDidUpdate(!didUpdate)
            setIsUploading(false);
            hideUploadModal();
        }
        
      }

      const DeleteImage = async () => {
        let deleted = await API.graphql(graphqlOperation(
            deleteImageAsset, {input: {
                id: data.id
            }}
        ))
        console.log(deleted);
        setDidUpdate(!didUpdate);
        setData({
            imageUri: '',
            title: '',
            index: '',
            id: '',
            sharedUserID: '',
            sharedUserName: '', 
        })
        hideDeleteModal();
        hideImageModal();
      }

    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        const fetchPublishers = async () => {
            const response = await API.graphql(graphqlOperation(
                listUsers, {
                    filter: {
                        isPublisher: {
                            eq: true
                        }
                    }
                }
            ))
            setPublishers(response.data.listUsers.items)
        }
        fetchPublishers();
    }, []);

    const PublishItem = ({id, pseudonym, imageUri} : any) => {

        const [imageU, setImageU] = useState('')
        
        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(imageUri);
                setImageU(response);
            }
            fetchImage()
        }, [])


        return (
            <TouchableWithoutFeedback onPress={() => {setData({...data, sharedUserID: id, sharedUserName: pseudonym}); showConfirmModal();}}>
                <View style={{width: Dimensions.get('window').width - 60, paddingVertical: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image 
                            source={{uri: imageU}}
                            style={{width: 50, height: 50, borderRadius: 25, backgroundColor: 'gray'}}
                        />
                        <View style={{alignSelf: 'center'}}>
                            <Text style={{fontWeight: 'bold', color: '#fff', marginLeft: 10}}>
                                {pseudonym}
                            </Text>
                            <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 6}}>
                                <FontAwesome5 
                                    name='book-reader'
                                    color='#ffffffa5'
                                    style={{alignSelf: 'center'}}
                                />
                                {/* <Text style={{color: '#fff', marginLeft: 10}}>
                                    {authored}
                                </Text>  */}
                            </View>
                        </View>
                        
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>
            
        )
    }

//get the list of publishers to share with
    const renderPublishers = ({item} : any) => {


        return(
            <PublishItem 
                id={item.id}
                pseudonym={item.pseudonym}
                imageUri={item.imageUri}
            />
        )
    }

    return (
        <Provider>
            <Portal>

{/* image modal */}
                <Modal visible={visible} onDismiss={hideImageModal} contentContainerStyle={containerStyle}>
                    <View>
                        <Image 
                            source={{uri: data.imageUri}}
                            style={{alignSelf: 'center', width: SCREEN_WIDTH, height: SCREEN_WIDTH*0.75}}
                        />

                        <View style={{marginTop: 20, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                            {data.sharedUserID !== null ? (
                                <View>
                                    <Text style={{color: '#00ffffa5'}}>
                                        Shared with {data.sharedUserName}
                                    </Text>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={() => showUserListModal()}>
                                    <Text style={{borderRadius: 15, paddingVertical: 4, paddingHorizontal: 16, backgroundColor: '#00ffff'}}>
                                        Share
                                    </Text>
                                </TouchableOpacity>
                            )}

                            <TouchableWithoutFeedback onPress={showDeleteModal}>
                                <FontAwesome5 
                                    name='trash'
                                    size={16}
                                    color='#fff'
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        
                        
                            <View style={{alignSelf: 'center', marginTop: 20}}>
                                <Text style={{fontSize: 16, textAlign: 'center', color: '#fff', marginTop: 20, alignSelf: 'center'}}>
                                    {data.title}
                                </Text>
                                
                            </View>
                        
                        
                    </View>
                </Modal>

{/* upload modal */}
                <Modal visible={visible2} onDismiss={hideUploadModal} contentContainerStyle={containerStyle}>
                    <View>
                        <View>
                            <Text style={{marginLeft: 20, color: '#fff', fontWeight: 'bold'}}>
                                Title
                            </Text>
                            <TextInput
                                placeholder='Name Your Art'
                                placeholderTextColor='#fff'
                                style={{color: '#fff', paddingHorizontal: 20, marginVertical: 10, alignSelf: 'center', height: 40, backgroundColor: '#000000a5', borderRadius: 8, width: '90%'}}
                                maxLength={30}
                                onChangeText={(val) => titleInputChange(val)}
                                autoCapitalize='words'
                            />
                            
                            <TouchableWithoutFeedback onPress={PickImage}>
                                <View style={{marginVertical: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: 40, backgroundColor: '#000000a5', borderRadius: 8, width: '90%'}}>
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                        Select File
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <Image 
                                source={{uri: data.imageUri}}
                                style={{marginTop: 20, alignSelf: 'center', width: SCREEN_WIDTH - 40, height: (SCREEN_WIDTH - 40)*0.75}}
                            />
                        </View>

                        <TouchableWithoutFeedback onPress={() => setSampleState(!sampleState)}>
                            <View style={{marginTop: 20, alignSelf: 'center', flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesome
                                    name={sampleState ? 'check-square-o' : 'square-o'}
                                    size={20}
                                    color={sampleState ? 'cyan' : 'gray'}
                                />
                                <Text style={{marginLeft: 10, color: '#fff'}}>
                                    This is a sample image for my profile
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        

                        <View style={{alignItems: 'center', marginTop: 40}}>
                            {isUploading === true ? (
                                <ActivityIndicator size='small' color='cyan'/>
                            ) : (
                                <TouchableOpacity onPress={UploadToS3}>
                                    <Text style={{borderRadius: 20, backgroundColor: 'cyan', paddingHorizontal: 20, paddingVertical: 6}}>
                                        Upload
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </Modal>

{/* image modal */}
                <Modal visible={visible3} onDismiss={hideDeleteModal} contentContainerStyle={[containerStyle, {marginHorizontal: 20}]}>
                    <View>
                        <Text style={{textAlign: 'center', color: '#fff', marginTop: 20, alignSelf: 'center'}}>
                            Are you sure you want to delete this image?
                        </Text>
                       
                        <TouchableWithoutFeedback>
                            <View style={{alignSelf: 'center', marginTop: 40}}>
                                {isUploading === true ? (
                                    <ActivityIndicator size='small' color='cyan'/>
                                ) : (
                                    <TouchableOpacity onPress={DeleteImage}>
                                        <Text style={{color: '#fff', borderRadius: 20, backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 6}}>
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                        
                    </View>
                </Modal>
                
{/* user list modal */}
                <Modal visible={visible4} onDismiss={hideUserListModal} contentContainerStyle={[containerStyle, {marginHorizontal: 20}]}>
                    <View style={{height: 500, paddingHorizontal: 20}}>
                        <Text style={{marginBottom: 20, fontWeight: 'bold', textAlign: 'center', color: '#fff', alignSelf: 'center'}}>
                            Select Publisher
                        </Text>
                       
                        <FlatList 
                            data={publishers}
                            keyExtractor={item => item.id}
                            renderItem={renderPublishers}
                            showsVerticalScrollIndicator={false}
                            
                        />
                        
                    </View>
                </Modal>
{/* user list modal */}
                <Modal visible={visible5} onDismiss={hideConfirmModal} contentContainerStyle={[containerStyle, {marginHorizontal: 20}]}>
                    <View style={{paddingHorizontal: 20}}>
                        <Text style={{marginBottom: 20, fontWeight: 'bold', textAlign: 'center', color: '#fff', alignSelf: 'center'}}>
                            Share with {data.sharedUserName}?
                        </Text>
                        {isUploading === true ? (
                            <ActivityIndicator size='small' color='cyan'/>
                        ) : (
                            <TouchableOpacity onPress={UpdateAsset}>
                                <Text style={{marginTop: 10, alignSelf: 'center', textAlign: 'center', paddingVertical: 6, paddingHorizontal: 15, borderRadius: 15, backgroundColor: 'cyan'}}>
                                    Confirm Share
                                </Text>
                            </TouchableOpacity>
                        )}
                       
                    
                    </View>
                </Modal>
            </Portal>

            <ScrollView>
                <View style={{marginHorizontal: 20, marginTop: 50}}>
                    <View style={{width: SCREEN_WIDTH - 40, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                                    <View style={{alignSelf: 'center', padding: 30, margin: -30}}>
                                        <FontAwesome5 
                                            name='chevron-left'  
                                            color="#fff"
                                            size={20}
                                            style={{alignSelf: 'center'}}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={styles.header}>
                                    My Artwork
                                </Text>
                            </View>
                            
                                <TouchableWithoutFeedback onPress={showUploadModal}>
                                    <View style={{alignSelf: 'center', padding: 30, margin: -30}}>
                                        <FontAwesome5 
                                            name='plus'  
                                            color="#fff"
                                            size={20}
                                            style={{alignSelf: 'center'}}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                        </View>
                    </View>  
                </View>

                <View style={{marginTop: 40}}>
                    <Text style={{color: '#fff', marginBottom: 10, marginLeft: 20, fontWeight: 'bold'}}>
                        Samples
                    </Text>
                    <View style={{height: 1, backgroundColor: '#fff', marginHorizontal: 20}}>
                    </View>
                    <FlatList 
                        data={sampleImages}
                        renderItem={renderItem}
                        extraData={sampleImages}
                        keyExtractor={(item, index) => item.id + index}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        scrollEnabled={false}
                        maxToRenderPerBatch={10}
                    />
                </View>

                <View style={{marginTop: 40}}>
                    <Text style={{color: '#fff', marginBottom: 10, marginLeft: 20, fontWeight: 'bold'}}>
                        For Stories
                    </Text>
                    <View style={{height: 1, backgroundColor: '#fff', marginHorizontal: 20}}>
                    </View>
                    <FlatList 
                        data={imageData}
                        renderItem={renderItem}
                        extraData={imageData}
                        keyExtractor={(item, index) => item.id + index}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        scrollEnabled={false}
                    />
                </View>
                <View style={{height: 100}}/>
            </ScrollView> 
        </Provider>
        

    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        width: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 40
    },
});

export default MyArt;