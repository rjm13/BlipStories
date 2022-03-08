import React, { useEffect, useState } from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    ScrollView, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getUser, messagesByDate } from '../src/graphql/queries';
import { createMessage } from '../src/graphql/mutations';

import { useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

const CreateMessage = ({navigation} : any) => {

    const route = useRoute();
    const {otherUserID} = route.params;

    const [isSending, setIsSending] = useState(false);

    const [imageU, setImageU] = useState('');
    const [imageU2, setImageU2] = useState('');

    const [user, setUser] = useState({})
    const [otherUser, setOtherUser] = useState({})

    const [data, setData] = useState({
        userID: '',
        otherUserID: otherUserID,
        content: '',
        title: '',
        subtitle: '',
    });

    useEffect(() => {

        const fetchUser = async () => {

            let userInfo = await Auth.currentAuthenticatedUser(); 
                      
            let response = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))
            let imageResponse = await Storage.get(response.data.getUser.imageUri);
            setImageU(imageResponse);
            setData({...data, userID: userInfo.attributes.sub});
            setUser(response.data.getUser);
        }
        fetchUser();
    }, [])

        useEffect(() => {
            const fetchOtherUser = async () => {
                                
                let response = await API.graphql(graphqlOperation(
                    getUser, {id: otherUserID}
                ))
                let imageResponse = await Storage.get(response.data.getUser.imageUri);
                setImageU2(imageResponse);
                setData({...data, otherUserID: otherUserID})
                setOtherUser(response.data.getUser);
            }
            fetchOtherUser();
        }, [otherUserID])
        

    

    const SendMessage = async () => {

        console.log(data)

        if (data.userID === '' || data.otherUserID === '' || data.content === '') {
            alert('Error. Please try again.')
            return;
        }

        setIsSending(true);

        let response = await API.graphql(graphqlOperation(
            createMessage, {input: {
                type: 'Message',
                createdAt: new Date(),
                userID: data.userID,
                otherUserID: data.otherUserID,
                content: data.content,
                title: data.title,
                subtitle: data.subtitle,
                isRead: false,
            }}
        ));
        console.log(response);
        setIsSending(false);
        navigation.goBack();
    }

    return (
        <View >
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'black']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{height: Dimensions.get('window').height, }}
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
                            Compose Message
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row', marginHorizontal: 20, marginVertical: 20, justifyContent: 'space-around'}}>
                        <View style={{alignItems: 'center', width: '30%'}}>
                            <Image 
                                source={{uri: imageU2}}
                                style={{marginBottom: 10, width: 50, height: 50, borderRadius: 25, backgroundColor: 'gray'}}
                            />
                            <Text style={{color: '#00ffffa5', textAlign: 'center'}}>
                               {otherUser?.pseudonym}
                            </Text>
                        </View>

                        <View style={{marginBottom: 20, flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome5 name='arrow-left' size={25} color='cyan' />
                            <FontAwesome5 name='arrow-right' size={25} color='cyan' />
                        </View>
                        
                        <View style={{alignItems: 'center', width: '30%'}}>
                            <Image 
                                source={{uri: imageU}}
                                style={{marginBottom: 10, width: 50, height: 50, borderRadius: 25, backgroundColor: 'gray'}}
                            />
                            <Text style={{color: '#00ffffa5'}}>
                                Myself
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <TextInput
                            placeholder='....'
                            placeholderTextColor='#ffffffa5'
                            style={{color: '#fff', width: '90%', backgroundColor: '#303030', borderRadius: 8, paddingHorizontal: 10}}
                            maxLength={50}
                            multiline={true}
                            numberOfLines={2}
                            onChangeText={val => setData({...data, title: val})}
                        />
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 20}}>
                        <TextInput
                            placeholder='....'
                            placeholderTextColor='#ffffffa5'
                            style={{color: '#fff', height: 280, width: '90%', backgroundColor: '#303030', borderRadius: 8, padding: 10}}
                            maxLength={1000}
                            multiline={true}
                            onChangeText={val => setData({...data, content: val})}
                            textAlignVertical='top'
                        />
                        <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                            <Text style={{color: '#00ffffa5' }}>
                                Attatch Story
                            </Text> 
                            <Text style={{color: '#00ffffa5'}}>
                                TODO: File Name
                            </Text> 
                        </View>
                        
                    </View>

                <View style={{alignItems: 'center', justifyContent: 'flex-end', marginTop: 20}}>
                    {isSending === true ? (
                        <ActivityIndicator size='large' color='cyan'/>
                        ) : (
                        <TouchableOpacity onPress={SendMessage}>
                            <Text style={{backgroundColor: 'cyan', paddingVertical: 6, paddingHorizontal: 20, borderRadius: 15}}>
                                Send
                            </Text>
                        </TouchableOpacity>
                    )}
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
        marginHorizontal: 40,
        marginVertical: 20,
    },
    tile: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 40, 
        marginVertical: 20
    }
});

export default CreateMessage;