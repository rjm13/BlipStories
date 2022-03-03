import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback, Linking, TouchableOpacity,  Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';

const FindArtist = () => {


    return (
        <View>
            
        </View>
    );
}

export default FindArtist;