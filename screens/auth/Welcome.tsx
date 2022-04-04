import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Welcome = ({navigation} : any) => {

    const SCREEN_HEIGHT = Dimensions.get('window').height
    
    return (
        <View style={{justifyContent: 'space-between', height: SCREEN_HEIGHT}}>
            <View style={{marginTop: 100, alignItems: 'center'}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: '#fff', fontSize: 22, fontWeight: 'bold'}}>
                        Welcome to Blip!
                    </Text>
                    <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 20}}>
                        Your home for audio short stories
                    </Text>

                    <Text style={{color: '#fff', textAlign: 'center', marginTop: 40, marginHorizontal: 20}}>
                        Blip curates stories, but also allows authors to share their own. Sign up as an:
                    </Text>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <Text style={{color: 'cyan', textAlign: 'center', marginHorizontal: 20}}>
                        Author
                    </Text>
                    <Text style={{color: 'pink', textAlign: 'center', marginHorizontal: 20}}>
                        Narrator 
                    </Text>
                    <Text style={{color: '#27d995', textAlign: 'center', marginHorizontal: 20}}>
                        Illustrator
                    </Text>
                    </View>
                    
                    <Text style={{color: '#fff', textAlign: 'center', marginTop: 20, marginHorizontal: 20}}>
                        To get started, head over to the publishing tab under the profile screen.
                    </Text>
                </View>
            </View>

{/* FOOTER */}
            <View style={{height: '10%'}}>
                <TouchableOpacity onPress={() => navigation.navigate('SplashCarousel')}>
                    <Text style={{alignSelf: 'center', backgroundColor: 'cyan', paddingVertical: 6, paddingHorizontal: 20, borderRadius: 15, textAlign: 'center'}}>
                        Next
                    </Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

export default Welcome;