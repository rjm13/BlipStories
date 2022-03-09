import React, { useEffect, useState, useRef } from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    ScrollView, 
    TouchableWithoutFeedback,  
    Image,
    FlatList,
    Dimensions,
    TextInput,
    Keyboard,
    TouchableOpacity,
    Platform
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';
import { StorageAccessFramework } from 'expo-file-system';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library';
//import RNFetchBlob from 'rn-fetch-blob';
//import pdf2base64 from 'pdf-to-base64';
import { format, formatRelative, parseISO } from "date-fns";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getMessage, repliesByDate } from '../src/graphql/queries';
import { updateMessage, createReply } from '../src/graphql/mutations';

import { useRoute } from '@react-navigation/native';

const ViewMessage = ({navigation} : any) => {

    let clear = useRef(null)

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardVisible(true); // or some other action
        }
        );
        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardVisible(false); // or some other action
        }
        );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

    const route = useRoute();
    const { messageid } = route.params;

    const [keyboardOpen, setKeyboardOpen] = useState(false);

    const [message, setMessage] = useState({});
    const [imageU, setImageU] = useState('');
    const [messageDate, setMessageDate] = useState('');

    const [isExpanded, setIsExpanded] = useState(true);

    const SCREEN_WIDTH = Dimensions.get('window').width;

    const [reply, setReply] = useState('')

    const [user, setUser] = useState('')

    useEffect(() => {
        const markRead = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();
            setUser(userInfo.attributes.sub);

            let response = await API.graphql(graphqlOperation(
                updateMessage, {input: {
                    id: messageid,
                    isRead: true,
                }}
            ))
            console.log(response);
            

            let messageresponse = await API.graphql(graphqlOperation(
                getMessage, {id: messageid}
            ))
            let imageresponse = await Storage.get(messageresponse.data.getMessage.otherUser.imageUri)
            setMessage(messageresponse.data.getMessage);
            setImageU(imageresponse)
            setMessageDate(format(parseISO(messageresponse.data.getMessage.createdAt), "MMM do yyyy"))
            
        }
        markRead();
    }, [])

    const [didUpdate, setDidUpdate] = useState(false);

    const [replies, setReplies] = useState([]);

    useEffect(() => {
        const fetchReplies = async () => {
            let response = await API.graphql(graphqlOperation(
                repliesByDate, {
                    type: 'Reply',
                    sortDirection: 'DESC',
                    filter: {
                        messageID: {
                            eq: messageid
                        }
                    }
                }
            ))
            setReplies(response.data.repliesByDate.items)
            if (response.data.repliesByDate.items.length > 0) {
                setIsExpanded(false);
            }
        }
        fetchReplies();
    },[didUpdate, messageid]);

    const Reply = ({id, content, createdAt, isRead, userID, userName, otherUserName} : any) => {


        return (
            <View style={{backgroundColor: userID === user ? '#132F35' : '#000', width: SCREEN_WIDTH*0.8, borderRadius: 8, margin: 10, alignSelf: userID === user ? 'flex-end' : 'flex-start'}}>
                <Text style={{padding: 10, color: '#fff'}}>
                    {content}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                    <Text style={{color: '#ffffffa5', fontSize: 10, textTransform: 'capitalize'}}>
                        {userID === user ? userName : otherUserName}
                    </Text>
                    <Text style={{color: '#ffffffa5', fontSize: 10, textTransform: 'capitalize'}}>
                        {formatRelative(parseISO(createdAt), new Date())}
                    </Text>
                </View>
            </View>
        );
    }

    const renderReplies = ({item}: any) => {
        return (
            <Reply 
                id={item.id}
                content={item.content}
                createdAt={item.createdAt}
                isRead={item.isRead}
                userID={item.userID}
                userName={item.user.pseudonym}
                otherUserName={item.user.pseudonym}
            />
        )
    }

    const SubmitReply = async () => {
        if (reply !== '') {
            let response = await API.graphql(graphqlOperation(
                createReply, {input: {
                    content: reply,
                    createdAt: new Date(),
                    isRead: false,
                    type: 'Reply',
                    messageID: message?.id,
                    userID: user
                }}
            ))
            console.log(response)
            setDidUpdate(!didUpdate);
            setReply('');
            clear.current.clear()
        }
    }



    const DownloadDocument = async () => {
        let response = await Storage.get(message?.doc.docUri);

        const targetUri = FileSystem.documentDirectory + message?.doc.title

        const downloadedFile = await FileSystem.downloadAsync(response, targetUri)


            if (downloadedFile.status === 200) {
                if (Platform.OS === 'android') {

                    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
                    if (!permissions.granted) {
                        return;
                    }

                    const base64Data = await FileSystem.readAsStringAsync(downloadedFile.uri, { encoding: FileSystem.EncodingType.Base64 })

                    try {
                        await StorageAccessFramework.createFileAsync(permissions.directoryUri, message?.doc.title, 'application/pdf')
                            .then(async(uri) => {
                                await FileSystem.writeAsStringAsync(uri, base64Data, { encoding: FileSystem.EncodingType.Base64 });
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    } catch (e) {
                        throw new Error(e);
}
                    // const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
                    // if (!mediaLibraryPermissions.granted) {
                    //     return;
                    // }
                    // try {
                      
                    //     const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri)
                        
                    //     //const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
                        
                    //     const album = await MediaLibrary.getAlbumAsync('Blip');
                    //     if (album == null) {
                    //       await MediaLibrary.createAlbumAsync('Blip', asset, false);
                    //     } else {
                    //       await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                    //     }
                    //   } catch (e) {
                    //     console.log(e);
                    //   }
            
        }
            }
        }
    



    return (
        <View >
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'black']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{}}
            >
                <View style={{justifyContent: 'space-between', height: Dimensions.get('window').height}}>
                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 20, alignItems: 'center'}}>
                            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                                <View style={{padding: 30, margin: -30}}>
                                    <FontAwesome5 
                                        name='chevron-left'
                                        color='#fff'
                                        size={20}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            
                            <Image 
                                source={{uri: imageU}}
                                style={{height: 40, width: 40, borderRadius: 25, marginLeft: 40}}
                            />
                            <Text style={styles.header}>
                                {message?.user === user && message?.subtitle === 'artist' ? message?.otherUser?.artistPseudo : message?.user === user && message?.subtitle === 'narrator' ? message?.otherUser?.narratorPseudo : message?.user?.pseudonym}
                            </Text>
                        </View>

                        <View style={{marginTop: 0, borderRadius: 15, alignSelf: 'center', backgroundColor: '#303030', padding: 20, width: Dimensions.get('window').width - 40}}>
                                                
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                    {message?.title}
                                </Text>
                              
                                <FontAwesome5 
                                    name={isExpanded === true ? 'chevron-up' : 'chevron-down'}
                                    size={17}
                                    color='#fff'
                                    style={{padding: 20, margin: -20}}
                                    onPress={() => setIsExpanded(!isExpanded)}
                                />
                            </View>
                            
                            {isExpanded === true ? (
                                <View>
                                    <Text style={{fontSize: 13, color: '#fff', marginTop: 14}}>
                                        {message?.content}
                                    </Text>
                                    <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                        <Text style={{color: '#00ffffa5', fontSize: 12, marginTop: 20}}>
                                            {messageDate}
                                        </Text>
                                        {message?.docID !== null ? (
                                            <TouchableWithoutFeedback onPress={DownloadDocument}>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <FontAwesome5 
                                                        name='download'
                                                        size={14}
                                                        color='#00ffff'
                                                        style={{paddingRight: 6}}
                                                    />
                                                    <Text style={{color: '#00ffff', }}>
                                                        PDF
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        ) : null}
                                        
                                        
                                    </View>
                                    
                                </View>
                            ) : null}
                            
                        </View>

                    </View>

                    <View style={{marginBottom: 120, height: isExpanded === true ? '49%' : '59%'}}>
                        <FlatList 
                            data={replies}
                            keyExtractor={item => item.id}
                            renderItem={renderReplies}
                            showsVerticalScrollIndicator={false}
                            maxToRenderPerBatch={20}
                            extraData={replies}
                            inverted
                            ListFooterComponent={() => {
                                return(
                                    <View style={{height: 20}}/>
                                )
                                
                            }}
                        />
                    </View>



{/* Footer */}
                    <View style={{position: 'absolute', bottom: isKeyboardVisible ? 300 : 0, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, width: SCREEN_WIDTH, height: 80, backgroundColor: '#303030'}}>
                        <TextInput
                            placeholder={'Reply to ' + (message?.user === user && message?.subtitle === 'artist' ? message?.otherUser?.artistPseudo : message?.user === user && message?.subtitle === 'narrator' ? message?.otherUser?.narratorPseudo : message?.user?.pseudonym)}
                            placeholderTextColor='#ffffffa5'
                            style={{color: '#fff', padding: 10, width: SCREEN_WIDTH - 60}}
                            maxLength={1000}
                            multiline={true}
                            onChangeText={val => setReply(val)}
                            textAlignVertical='top'
                            ref={clear}
                        />
                       
                            <View style={{justifyContent: 'center'}}>
                                <TouchableOpacity onPress={SubmitReply}>
                                    <FontAwesome5 
                                        name='arrow-right'
                                        color='#fff'
                                        size={20}
                                        style={{paddingHorizontal: 20}}
                                    />
                                </TouchableOpacity>
                            </View>
                    </View>
                    

                </View>
                
                
                
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        height: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 20,
    },
    tile: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 40, 
        marginVertical: 20
    }
});

export default ViewMessage;