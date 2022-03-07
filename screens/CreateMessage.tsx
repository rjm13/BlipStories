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
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getUser, messagesByDate } from '../src/graphql/queries';

const CreateMessage = ({navigation} : any) => {

    const [imageU, setImageU] = useState('');

    const [data, setData] = useState({
        userID: '',
        otherUserID: '',
        content: '',
        title: '',
        subtitle: '',

    })

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
                        Compose Message
                    </Text>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal: 20, marginVertical: 20, justifyContent: 'space-around'}}>
                    <View style={{alignItems: 'center'}}>
                        <Image 
                            source={{uri: imageU}}
                            style={{marginBottom: 10, width: 50, height: 50, borderRadius: 25, backgroundColor: 'gray'}}
                        />
                        <Text style={{color: '#00ffffa5'}}>
                            Tex Jahones
                        </Text>
                    </View>

                    <View style={{marginBottom: 20, flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome5 name='arrow-left' size={25} color='cyan' />
                        <FontAwesome5 name='arrow-right' size={25} color='cyan' />
                    </View>
                    
                    <View style={{alignItems: 'center'}}>
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
                        style={{width: '90%', backgroundColor: '#303030', borderRadius: 8, paddingHorizontal: 10}}
                        maxLength={50}
                        multiline={true}
                        numberOfLines={2}
                        onChangeText={val => setData({...data, title: val})}
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

export default CreateMessage;