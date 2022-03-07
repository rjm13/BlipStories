import React, { useEffect, useState } from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    ScrollView, 
    TouchableWithoutFeedback,  
    Image,
    FlatList,
    Dimensions
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getUser, messagesByDate } from '../src/graphql/queries';
const Inbox = ({navigation} : any) => {
    
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let getMessages = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            const response = await API.graphql(graphqlOperation(
                messagesByDate, {
                    type: 'Message',
                    sortDirection: 'DESC',
                    filter: {
                        userID: {
                            eq: userInfo.attributes.sub
                        }
                    }
                }
            ))
            setMessages(response.data.messagesByDate.items)
        }
        getMessages();
    }, [])

    const Item = ({id, title, content, subtitle, uersID, otherUserID, createdAt} : any) => {

        return (
            <View>

            </View>
        );
    }

    const renderItem = ({item}: any) => {
        return (
            <Item 
                id={item.id}
                title={item.title}
                content={item.content}
                subtitle={item.subtitle}
                userID={item.userID}
                otherUserID={item.otherUserID}
                createdAt={item.createdAt}
            />
        )
    }

    return (
        <View >
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'black']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{height: Dimensions.get('window').height}}
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
                            Inbox
                        </Text>
                </View>

                <View>
                    <FlatList 
                        data={messages}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
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

export default Inbox;