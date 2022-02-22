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
    ActivityIndicator
} from 'react-native';

import { Modal, Portal, Provider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { deleteImageAsset, createImageAsset } from '../src/graphql/mutations';
import { listImageAssets } from '../src/graphql/queries';

const MyArt = ({navigation} : any) => {

    const SCREEN_WIDTH = Dimensions.get('window').width

    const [imageState, setImageState] = useState();
    const [titleState, setTitleState] = useState();
    const [indexState, setIndexState] = useState();
    const [imageIDState, setImageIDState] = useState();

    const [sampleState, setSampleState] = useState(false)

    const [isUploading, setIsUploading] = useState(false);

    //art styles modal
    const [visible, setVisible] = useState(false);
    const showImageModal = ({title, imageUri, id, index} : any) => {
        setVisible(true);
        setImageState(imageUri);
        setTitleState(title);
        setIndexState(index);
        setImageIDState(id)
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
            setImageState(null);
        }
        const hideUploadModal = () => setVisible2(false);

    //upload modal
        const [visible3, setVisible3] = useState(false);
        const showDeleteModal = () => {
            setVisible3(true);
        }
        const hideDeleteModal = () => setVisible3(false);


    //data form AWS image asset table
    const [imageData, setImageData] = useState();

    const [sampleImages, setSampleImages] = useState();

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

            let newArr = result.data.listImageAssets.items.filter((item : any) => item.isSample === true);

            for (let i = 0; i < newArr.length; i++) {
            
                const getUri = await Storage.get(newArr[i].imageUri);

                newArr[i].imageUri = getUri
            }
            console.log(newArr)
            setImageData(newArr)

            let sampleArr = result.data.listImageAssets.items.filter((item : any) => item.isSample === false);

            for (let i = 0; i < sampleArr.length; i++) {
            
                const getUri = await Storage.get(sampleArr[i].imageUri);

                sampleArr[i].imageUri = getUri
            }

            setSampleImages(sampleArr)
        }

        fetchData();
    }, [didUpdate])

    const Item = ({title, imageUri, id, index} : any) => {

        return (
            <TouchableWithoutFeedback onPress={() => showImageModal({title, imageUri, id, index})}>
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
                    setImageState(result.uri);
                    }
            console.log(result);
      };

      const UploadToS3 = async () => {
        setIsUploading(true);

        let userInfo = await Auth.currentAuthenticatedUser();

        const response = await fetch(imageState);
                const blob = await response.blob();
                const filename =  uuid.v4().toString();
                const s3Response = await Storage.put(filename, blob);

        let result = await API.graphql(graphqlOperation(
            createImageAsset, {input: {
                userID: userInfo.attributes.sub,
                title: textChange,
                imageUri: s3Response.key,
                isSample: sampleState,
            }}
        ))

        console.log(result);
        setDidUpdate(!didUpdate)
        setIsUploading(false);
        hideUploadModal();
      }

      const DeleteImage = async () => {
        let deleted = await API.graphql(graphqlOperation(
            deleteImageAsset, {input: {
                id: imageIDState
            }}
        ))
        console.log(deleted);
        setDidUpdate(!didUpdate);
        hideDeleteModal();
        hideImageModal();
      }

    return (
        <Provider>
            <Portal>
{/* image modal */}
                <Modal visible={visible} onDismiss={hideImageModal} contentContainerStyle={containerStyle}>
                    <View>
                        <Image 
                            source={{uri: imageState}}
                            style={{alignSelf: 'center', width: SCREEN_WIDTH, height: SCREEN_WIDTH*0.75}}
                        />
                        <Text style={{textAlign: 'center', color: '#fff', marginTop: 20, alignSelf: 'center'}}>
                            {titleState}
                        </Text>
                       
                        <TouchableWithoutFeedback onPress={showDeleteModal}>
                            <View style={{alignSelf: 'center', marginTop: 40}}>
                                <FontAwesome5 
                                    name='trash'
                                    size={25}
                                    color='#fff'
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        
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
                                source={{uri: imageState}}
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
                                    This is a sample image fior my profile
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
                        data={imageData}
                        renderItem={renderItem}
                        extraData={imageData}
                        keyExtractor={(item, index) => item + index}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        scrollEnabled={false}
                    />
                </View>

                <View style={{marginTop: 40}}>
                    <Text style={{color: '#fff', marginBottom: 10, marginLeft: 20, fontWeight: 'bold'}}>
                        For Stories
                    </Text>
                    <View style={{height: 1, backgroundColor: '#fff', marginHorizontal: 20}}>
                    </View>
                    <FlatList 
                        data={sampleImages}
                        renderItem={renderItem}
                        extraData={sampleImages}
                        keyExtractor={(item, index) => item + index}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        scrollEnabled={false}
                    />
                </View>
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