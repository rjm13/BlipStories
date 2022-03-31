import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Dimensions, 
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser, listFollowingConns, listImageAssets } from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';

const ModSection = ({navigation} : any) => {

    useEffect(() => {
        const getUser = async () => {
            let response = await Auth.currentAuthenticatedUser();
            if (response.attributes.email === 'martianspidermedia@gmail.com') {
                return
            } else {
                navigation.navigate('HomeScreen');
            }
        }
        getUser();
    }, [])


    return (
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 60, marginBottom: 30, marginLeft: 20 }}>
                <FontAwesome5 
                    name='chevron-left'
                    size={20}
                    color='#fff'
                    style={{padding: 30, margin: -30}}
                    onPress={() => navigation.goBack()}
                />
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18, marginLeft: 40}}>
                    New Comments
                </Text>
            </View>

            <TouchableWithoutFeedback>
                <View style={{paddingHorizontal: 20, paddingVertical: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>
                        Pending Stories
                    </Text>
                    <Text style={{color: '#fff'}}>
                        0
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            

            <TouchableWithoutFeedback>
                <View style={{paddingHorizontal: 20, paddingVertical: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>
                        Flagged Stories
                    </Text>
                    <Text style={{color: '#fff'}}>
                        0
                    </Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
                <View style={{paddingHorizontal: 20, paddingVertical: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>
                        New Comments
                    </Text>
                    <Text style={{color: '#fff'}}>
                        0
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default ModSection;