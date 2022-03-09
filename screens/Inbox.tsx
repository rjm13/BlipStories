import React, { useEffect, useState } from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    ScrollView, 
    TouchableWithoutFeedback,  
    Image,
    FlatList,
    Dimensions,
    RefreshControl
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';
import { format, parseISO } from "date-fns";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getUser, messagesByDate } from '../src/graphql/queries';


const Inbox = ({navigation} : any) => {
    
    const [messages, setMessages] = useState([]);

    const [didUpdate, setDidUpdate] = useState(false);

    useEffect(() => {
        let getMessages = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            const response = await API.graphql(graphqlOperation(
                messagesByDate, {
                    type: 'Message',
                    sortDirection: 'DESC',
                    limit: 100,
                    filter: {
                        or: [
                           {
                                userID: {
                                    eq: userInfo.attributes.sub
                                } 
                            },
                            {
                                otherUserID: {
                                    eq: userInfo.attributes.sub
                                } 
                            },
                        ]
                        
                    }
                }
            ))
            setMessages(response.data.messagesByDate.items)
        }
        getMessages();
    }, [didUpdate])

    const Item = ({index, id, title, content, subtitle, uersID, otherUserID, createdAt, isRead} : any) => {

        const [user, setUser] = useState({})

        useEffect(() => {
            const fetchUser = async () => {
                let response = await API.graphql(graphqlOperation(
                    getUser, {id: otherUserID}
                ))
            setUser(response.data.getUser)    
            }
            fetchUser();
        }, [])

        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ViewMessage', {messageid: id})}>
                <View style={{backgroundColor: index%2 === 0 ? '#303030a5' : 'transparent', alignItems: 'center', paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-between'}}>
                    {isRead === true ? null : (
                        <View style={{}}>
                            <FontAwesome5 
                                name='hand-point-right'
                                size={20}
                                color='#00ffffa5'
                                style={{marginLeft: 20, marginRight: 0, alignSelf: 'center'}}
                            />
                        </View>
                    )}
                    
                    <View style={{marginRight: 20, marginVertical: 10, paddingHorizontal: 20, width: isRead === true ? Dimensions.get('window').width : Dimensions.get('window').width - 40 }}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                {user?.pseudonym}
                            </Text>
                            <Text style={{color: '#fff', fontSize: 12}}>
                                {format(parseISO(createdAt), "MMM do")}
                            </Text>
                        </View>
                        <Text style={{color: '#fff', fontSize: 12, marginTop: 4 }}>
                            {title}
                        </Text>
                        <Text numberOfLines={2} style={{color: 'gray', fontSize: 12 }}>
                            {content}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
        );
    }

    const renderItem = ({item, index}: any) => {
        return (
            <Item 
                id={item.id}
                title={item.title}
                content={item.content}
                subtitle={item.subtitle}
                userID={item.userID}
                otherUserID={item.otherUserID}
                createdAt={item.createdAt}
                isRead={item.isRead}
                index={index}
            />
        )
    }

    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
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
                        extraData={messages}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        maxToRenderPerBatch={20}
                        refreshControl={
                            <RefreshControl
                            refreshing={isFetching}
                            onRefresh={onRefresh}
                            />
                        }
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