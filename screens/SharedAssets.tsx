import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableWithoutFeedback, 
    TouchableOpacity,  
    Image,
    ActivityIndicator,
    RefreshControl,
    FlatList,
    TextInput,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';
import uuid from 'react-native-uuid';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Modal, Portal, Provider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getUser, listAudioAssets, listUsers } from '../src/graphql/queries';
import { updateAudioAsset, createAudioAsset } from '../src/graphql/mutations';

import { useNavigation } from '@react-navigation/native';

import { AppContext } from '../AppContext';




const SharedAssets = ({navigation} : any) => {

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

      const [updateAssetState, setUpdateAssetState] = useState();


    const Item = ({id, title, time, userID, sharedUserID, audioUri, isSample, createdAt, pseudonym} : any) => {

    //convert the time to show in the modal
    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(time / 60000);
        let seconds = Math.floor((time % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);  
    }  

    return (
        <View>
            <View style={styles.tile}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    
                        <View>
                            <Text style={styles.name}>
                                {title}
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                            <Text style={{color: '#fff'}}>
                                {millisToMinutesAndSeconds()}
                            </Text>
                        </View>
                    
                    
                </View> 
                
                    <View style={{flexDirection: 'row', width: '100%'}}>
                        {/* <TouchableWithoutFeedback onPress={() => {showDeleteModal()}}>
                            <View style={{alignItems: 'center', marginTop: 20, width: 80, paddingVertical: 6, borderRadius: 20, backgroundColor: 'gray'}}>
                                <Text style={{color: '#000'}}>
                                    Delete
                                </Text> 
                            </View>
                        </TouchableWithoutFeedback> */}
                        {sharedUserID ? (
                            <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: sharedUserID})}>
                                <View style={{marginTop: 10}}>
                                    <Text style={{color: 'gray', }}>
                                        Shared with {pseudonym}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            
                        ) : (
                            <TouchableWithoutFeedback onPress={() => {showDeleteModal(); setUpdateAssetState(id)}}>
                                <View style={{alignItems: 'center', marginTop: 12, width: 72, paddingVertical: 4, borderRadius: 20, backgroundColor: '#00ffffa5'}}>
                                    <Text style={{color: '#000'}}>
                                        Share
                                    </Text> 
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        
                    </View>
                
            </View>
        </View>
        )
    }

    const renderItem = ({ item }: any) => {

        let pseudonym = ''

        if (item.sharedUser) {
            pseudonym = item.sharedUser.pseudonym
        }
        
        return (
        <Item 
            id={item.id}
            title={item.title}
            audioUri={item.audioUri}
            time={item.time}
            isSample={item.isSample}
            userID={item.userID}
            sharedUserID={item.sharedUserID}
            createdAt={item.createdAt}
            pseudonym={pseudonym}
        />
      );}

    
    //update trigger for fetching the stories
    const [didUpdate, setDidUpdate] = useState(false);

    const [audioAssets, setAudioAssets] = useState([])

    //on render, list the stories for that user
    useEffect(() => {

        const fetchAssets = async () => {

            setIsLoading(true);

            const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            try {

                const userAssets = await API.graphql(graphqlOperation(
                    listAudioAssets, {
                        type: 'AudioAsset',
                        sortDirection: 'DESC',
                        filter: {
                            userID: {
                                eq: userInfo.attributes.sub
                            },
                        }
                }))

                setAudioAssets(userAssets.data.listAudioAssets.items);
                
                setIsLoading(false);

            } catch (e) {
            console.log(e);
          }
        }
           fetchAssets(); 
      }, [didUpdate]);

    const [data, setData] = useState({
        title: '',
        time: 0,
        sharedUserID: null,
        sharedUserName: '',
        createdAt: new Date(),
})

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
        setData({...data, time: duration.durationMillis});
        console.log(duration);
        }
    };

    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

    const [isLoading, setIsLoading] = useState(false);

//Modal
    const [visible, setVisible] = useState(false);
  
    const showModal = () => setVisible(true);

    const hideModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        margin: 20,
        borderRadius: 15
    };

//Modal
    const [visible2, setVisible2] = useState(false);
  
    const showUploadModal = () => setVisible2(true);

    const hideUploadModal = () => setVisible2(false);

//Modal
    const [visible3, setVisible3] = useState(false);
  
    const showDeleteModal = () => setVisible3(true);

    const hideDeleteModal = () => setVisible3(false);


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
    }, [])

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
            <TouchableWithoutFeedback onPress={() => {setData({...data, sharedUserID: id, sharedUserName: pseudonym}); hideModal();}}>
                <View style={{width: Dimensions.get('window').width - 60}}>
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

//progress of upload
    const [progressText, setProgressText] = useState(0);

    const [localAudioUri, setLocalAudioUri] = useState('')

    const [isPublishing, setIsPublishing] = useState(false);

    const UploadAsset = async () => {

        setIsPublishing(true);

        try {
            const userInfo = await Auth.currentAuthenticatedUser();

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

            const asset = await API.graphql(graphqlOperation(
                createAudioAsset, {input: {
                    type: 'AudioAsset',
                    title: data.title,
                    audioUri: s3ResponseAudio.key,
                    isSample: false,
                    time: data.time,
                    userID: userInfo.attributes.sub,
                    sharedUserID: data.sharedUserID,
                    createdAt: new Date(),

                }}
            ))
            console.log(asset);
            setDidUpdate(!didUpdate);
            setIsPublishing(false);
            hideUploadModal();
            setData({ 
                title: '',
                time: 0,
                sharedUserID: null,
                sharedUserName: '',
                createdAt: new Date(),
            })
        } catch (e) {
            console.log(e)
        }        
    }

    const UpdateAsset = async () => {

        let response = await API.graphql(graphqlOperation(
            updateAudioAsset, {input: {
                id: updateAssetState,
                sharedUserID: data.sharedUserID
            }}
        ))

        console.log(response);
        setDidUpdate(!didUpdate);
        setUpdateAssetState(null);
        hideDeleteModal();
    }

    return (
        <Provider>
            <Portal>
                
                <Modal visible={visible2} onDismiss={() => {hideUploadModal();}} contentContainerStyle={containerStyle}>
                    <View style={{marginHorizontal: 20, height: '90%'}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                            Create an Audio Asset
                        </Text>
                        <View style={{justifyContent: 'space-between', height: '100%'}}>
                            <View style={{marginTop: 40, }}>
                                <View>
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                        Title
                                    </Text>
                                    <TextInput 
                                        placeholder='...'
                                        placeholderTextColor='#fff'
                                        style={styles.textinput}
                                        onChangeText={val => setData({...data, title: val})}
                                        maxLength={50}
                                    />
                                </View>

                                <View style={{marginTop: 20}}>
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                        Select Audio
                                    </Text>
                                    <TouchableWithoutFeedback onPress={pickAudio}>
                                        <View style={[styles.textinput, {justifyContent: 'center'}]}>
                                            <Text style={{color: '#fff'}}>
                                                Select Audio File
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    
                                    {audioName !== '' ? (
                                        <Text style={{marginTop: 10, textAlign: 'center', color: '#00ffffa5'}}>
                                            {audioName}
                                        </Text>
                                    ) : null}
                                </View>

                                <View style={{marginTop: 20}}>
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                        Share With
                                    </Text>
                                    <TouchableWithoutFeedback onPress={() => {showModal(); setData({...data, sharedUserID: null})}}>
                                        <View style={[styles.textinput, {justifyContent: 'center'}]}>
                                            <Text style={{color: '#fff'}}>
                                                Select a Publisher
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View>
                                        <Text style={{marginTop: 10, color: '#00ffffa5', textAlign: 'center'}}>
                                            {data.sharedUserName}
                                        </Text>
                                    </View>

                                </View>
                            </View>
                            {isPublishing === true ?  (
                                <View style={{marginBottom: 20}}>
                                    <ActivityIndicator size='large' color='cyan'/>
                                    <Text style={{color: '#fff', marginTop: 10, textAlign: 'center'}}>
                                        {progressText} %
                                    </Text>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={UploadAsset}>
                                    <View style={{alignSelf: 'center', margin: 20}}>
                                        <Text style={{backgroundColor: 'cyan', color: '#000', paddingHorizontal: 20, paddingVertical: 6, borderRadius: 15}}>
                                            Upload
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            
                            
                        </View>
                        
                    </View>
                </Modal>

                <Modal visible={visible3} onDismiss={() => {hideDeleteModal()}} contentContainerStyle={containerStyle}>
                    <View style={{paddingHorizontal: 20, paddingVertical: 40, alignItems: 'center' }}>
                        <Text style={{fontWeight: 'bold', fontSize: 14, marginBottom: 20, textAlign: 'center', color: '#fff'}}>
                            Share Asset
                        </Text>
                        <TouchableWithoutFeedback onPress={() => {showModal(); setData({...data, sharedUserID: null})}}>
                            <View style={[styles.textinput, {justifyContent: 'center', paddingHorizontal: 20}]}>
                                <Text style={{color: '#fff'}}>
                                    Select a Publisher
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{marginTop: 20}}>
                            {data.sharedUserID ? (
                                <View>
                                    <Text style={{textAlign: 'center', color: '#00ffffa5'}}>
                                        {data.sharedUserName}
                                    </Text>
                                    <TouchableOpacity onPress={() => UpdateAsset()}>
                                        <View style={{ marginTop: 20, borderRadius: 15, backgroundColor: 'cyan', paddingVertical: 6, paddingHorizontal: 20}}>
                                            <Text>
                                            Confirm Share 
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    
                                </View>
                                
                            ) : null}
                        </View>
                    </View>
                </Modal>

                <Modal visible={visible} onDismiss={() => {hideModal()}} contentContainerStyle={containerStyle}>
                    <View style={{height: 600, paddingHorizontal: 20, paddingVertical: 40, alignItems: 'center' }}>
                        <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 20, textAlign: 'center', color: '#fff'}}>
                            Find a Publisher
                        </Text>
                        <View style={{marginTop: 40}}>
                            <FlatList 
                                data={publishers}
                                keyExtractor={item => item}
                                renderItem={renderPublishers}
                            />
                        </View>
                    </View>
                </Modal>

                
            </Portal>
            <View>
                
                <LinearGradient
                    colors={['#363636a5', '#363636a5', 'black']}
                    //style={styles.container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    
                    <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20, alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                            <View style={{padding: 30, margin: -30}}>
                                <FontAwesome5 
                                    name='chevron-left'
                                    color='#fff'
                                    size={20}
                                    
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <Text style={styles.header}>
                            Shared Assets
                        </Text>
                    </View>

                    <View style={{height: '86%'}}>
                        <FlatList 
                            data={audioAssets}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            extraData={audioAssets}
                            refreshControl={
                                <RefreshControl
                                refreshing={isFetching}
                                onRefresh={onRefresh}
                                />
                            }
                            showsVerticalScrollIndicator={false}    
                            ListHeaderComponent={ () => {
                                return (
                                    <TouchableOpacity onPress={showUploadModal}>
                                        <View style={{alignSelf: 'center', backgroundColor: 'cyan', borderRadius: 15, justifyContent: 'center', marginVertical: 20, width: '90%', height: 70, alignItems: 'center'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 16}}>
                                                Upload Audio Asset to Share
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    
                            );}}
                            ListFooterComponent={ () => {
                                return (
                                    <View style={{ height:  70, alignItems: 'center'}}>
                                        
                                    </View>
                            );}}
                            ListEmptyComponent={ () => {
                                return (
                                    <View style={{ height:  90, alignItems: 'center'}}>
                                        {isLoading === true ? (
                                        <View style={{margin: 30}}>
                                            <ActivityIndicator size='small' color='cyan' />
                                        </View>
                                        ) : (
                                        <Text style={{ color: 'white', margin: 20,}}>
                                            There is nothing here! You have no uploaded any stories.
                                        </Text>
                                        )}
                                    </View>
                            );}}
                        />
                    </View>
                </LinearGradient>
                <StatusBar style="light" />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create ({
    container: {
        //flex: 1
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginVertical: 20,
    },
    subparagraph: {
        fontSize: 12,
        color: '#ffffffa5'
    },
    subblock: {
        width: '75%',
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
    textinput: {
        backgroundColor: '#000000a5', 
        borderRadius: 10,
        marginTop: 10,
        height: 40,
        paddingHorizontal: 10,
        color: '#fff'
    },

});

export default SharedAssets;