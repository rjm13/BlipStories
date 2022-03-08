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
    Keyboard
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';
import { format, parseISO } from "date-fns";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getMessage } from '../src/graphql/queries';
import { updateMessage } from '../src/graphql/mutations';

import { useRoute } from '@react-navigation/native';

const ViewMessage = ({navigation} : any) => {

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

    useEffect(() => {
        const markRead = async () => {
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
                                {message?.otherUser?.pseudonym}
                            </Text>
                        </View>

                        <View style={{marginTop: 20, borderRadius: 15, alignSelf: 'center', backgroundColor: '#303030', padding: 20, width: Dimensions.get('window').width - 40}}>
                                                
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
                                    <Text style={{color: '#00ffffa5', fontSize: 12, marginTop: 20}}>
                                        {messageDate}
                                    </Text>
                                </View>
                            ) : null}
                            
                        </View>

                    </View>
                    
                    <View style={{position: 'absolute', bottom: isKeyboardVisible ? 300 : 0, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, width: SCREEN_WIDTH, height: 80, backgroundColor: '#303030'}}>
                        <TextInput
                            placeholder={'Reply to ' + message?.otherUser?.pseudonym}
                            placeholderTextColor='#ffffffa5'
                            style={{color: '#fff', padding: 10, width: SCREEN_WIDTH - 60}}
                            maxLength={1000}
                            multiline={true}
                            onChangeText={val => setReply(val)}
                            textAlignVertical='top'
                        />
                        <View style={{justifyContent: 'center'}}>
                            <FontAwesome5 
                                name='arrow-right'
                                color='#fff'
                                size={20}
                                style={{paddingHorizontal: 20}}
                            />
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