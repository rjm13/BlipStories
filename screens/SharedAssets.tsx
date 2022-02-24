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
    TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';
import uuid from 'react-native-uuid';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Modal, Portal, Provider } from 'react-native-paper';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getUser, listAudioAssets, listUsers } from '../src/graphql/queries';
import { updateStory, createAudioAsset } from '../src/graphql/mutations';

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


    const Item = ({id, title, time, userID, sharedUserID, audioUri, isSample, createdAt} : any) => {

    //arrow state
    const [optionsVisible, setOptionsVisible] = useState(false)

    return (
        <View>
            <View style={styles.tile}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ width: '78%'}}>
                        <View>
                            <Text style={styles.name}>
                                {title}
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                            <FontAwesome5 
                                name='book-open'
                                size={12}
                                color='#ffffffa5'
                            />
                            <Text style={styles.userId}>
                                {sharedUserID}
                            </Text>  
                            <FontAwesome5 
                                name='book-reader'
                                size={12}
                                color='#ffffffa5'
                            />
                            <Text style={styles.userId}>
                                {userID}
                            </Text> 
                        </View>
                    </View>

                    <View style={{alignSelf: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => setOptionsVisible(!optionsVisible)}>
                            <View style={{alignItems: 'center', borderRadius: 20, height: 40,
                                width: 40, justifyContent: 'center',
                            }}>
                                <FontAwesome5 
                                    name={optionsVisible === true ? 'chevron-down' : 'chevron-right'}
                                    color='#ffffff'
                                    size={20}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    
                </View> 
                
                {optionsVisible === true ? (
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
                        <TouchableWithoutFeedback onPress={() => {showModal();}}>
                            <View style={{alignItems: 'center', marginTop: 20, width: 80, paddingVertical: 6, borderRadius: 20, backgroundColor: 'gray'}}>
                                <Text style={{color: '#000'}}>
                                    Delete
                                </Text> 
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('EditAudioStory', {storyID: id})}>
                            <View style={{alignItems: 'center', marginTop: 20, width: 80, paddingVertical: 6, borderRadius: 20, backgroundColor: '#00ffffa5'}}>
                                <Text style={{color: '#000'}}>
                                    Edit
                                </Text> 
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                ) : null}
                
            </View>
        </View>
        )
    }

    const renderItem = ({ item }: any) => {
        
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
        sharedUserID: 0,
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


        return (
            <TouchableWithoutFeedback onPress={() => {setData({...data, sharedUserID: id, sharedUserName: pseudonym}); hideModal();}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Image 
                            source={{uri: imageUri}}
                            style={{width: 50, height: 50, borderRadius: 25, backgroundColor: 'gray'}}
                        />
                        <Text style={{fontWeight: 'bold', color: '#fff'}}>
                            {pseudonym}
                        </Text>
                    </View>
                    <View>
                        <Text>

                        </Text> 
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
            setIsPublishing(false)
            hideUploadModal();
        } catch (e) {
            console.log(e)
        }        
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
                                    <TouchableWithoutFeedback onPress={showModal}>
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
                                <View>
                                    <ActivityIndicator size='large' color='cyan'/>
                                    <Text style={{color: '#fff', marginTop: 10}}>
                                        {progressText}
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

                <Modal visible={visible} onDismiss={() => {hideModal()}} contentContainerStyle={containerStyle}>
                    <View style={{paddingHorizontal: 20, paddingVertical: 40, alignItems: 'center' }}>
                        <Text style={{fontSize: 14, marginBottom: 20, textAlign: 'center', color: '#fff'}}>
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