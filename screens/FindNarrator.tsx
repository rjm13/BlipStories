import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Linking, 
    TouchableOpacity,  
    Image,
    FlatList
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';
import { Modal, Portal, Provider } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getUser, listUsers } from '../src/graphql/queries';


const FindNarrator = ({navigation} : any) => {

    const [narrators, setNarrators] = useState([])

    useEffect(() => {
        const fetchNarrators = async () => {
            let response = await API.graphql(graphqlOperation(
                listUsers, {
                    filter: {
                        isNarrator: {
                            eq: true
                        }
                    }
                }
            ))
        setNarrators(response.data.listUsers.items)
        }
        fetchNarrators();
    }, [])

    const Item = ({id, narratorPseudo, narratorText, voice, imageUri} : any) => {

        const [imageU, setImageU] = useState('')

        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(imageUri)
                setImageU(response);
            }
            fetchImage();
        }, [])

        return (
            <View style={{backgroundColor: '#363636', borderRadius: 15, paddingTop: 10, paddingBottom: 18, paddingHorizontal: 20, marginHorizontal: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image 
                        source={{uri: imageU}}
                        style={{width: 50, height: 50, borderRadius: 25}}
                    />
                    <View>
                        <Text style={{marginLeft: 10, color: '#fff', fontWeight: 'bold', }}>
                            {narratorPseudo}
                        </Text>
                        <Text style={{textTransform: 'capitalize',marginLeft: 10, color: '#ffffffa5', fontSize: 12 }}>
                            {voice}
                        </Text>
                    </View>
                    
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={{ color: '#fff', fontSize: 12, }}>
                        {narratorText}
                    </Text>
                </View>
                <View style={{marginTop: 10, flexDirection: 'row'}}>
                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                        Accents: 
                    </Text>
                    <Text style={{textTransform: 'capitalize', color: '#ffffffa5', fontSize: 12, marginLeft: 10}}>
                        British, Canadian
                    </Text>
                </View>
                <View style={{marginTop: 30, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                            Avg delivery:
                        </Text>
                        <Text style={{ color: '#ffffffa5', fontSize: 12, marginLeft: 6}}>
                            7 days 
                        </Text>
                    </View>
                    
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('UserScreen', {userID: id, status: 'narrator'})}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: 'cyan', fontSize: 12, marginLeft: 10}}>
                                CONNECT
                            </Text>
                            <FontAwesome5 
                                name='arrow-right'
                                size={18}
                                color='cyan'
                                style={{marginLeft: 6}}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

    const renderItem = ({item} : any) => {
        return (
            <Item 
                id={item.id}
                narratorPseudo={item.narratorPseudo}
                narratorText={item.narratorText}
                voice={item.voice}
                imageUri={item.imageUri}
            />
        );
    }

       //intro modal
       const [visible, setVisible] = useState(false);
       const showModal = () => {setVisible(true);}
       const hideModal = () => setVisible(false);
       const containerStyle = {
        backgroundColor: '#363636', 
        borderRadius: 15,
        paddingVertical: 40
    };

    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View>
                        <Text>

                        </Text>
                    </View>
                </Modal>
            </Portal>
            <View>
                <LinearGradient
                    colors={['black', '#363636a5', 'black']}
                    style={{height: Dimensions.get('window').height}}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={{marginHorizontal: 20, marginTop: 50}}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                                    <View style={{padding: 30, margin: -30}}>
                                        <FontAwesome5 
                                            name='chevron-left'
                                            color="#fff"
                                            size={20}
                                            style={{alignSelf: 'center'}}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                
                                <Text style={styles.header}>
                                    Find a Narrator
                                </Text>
                            </View>
                            <View>
                                <Ionicons 
                                    name='filter'
                                    color='#fff'
                                    size={16}
                                    style={{padding: 10}}
                                    onPress={showModal}
                                />
                            </View>
                        </View>  
                    </View>
                    <View style={{marginTop: 40}}>
                        <FlatList
                            data={narrators}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            maxToRenderPerBatch={10}
                        /> 
                    </View>
                </LinearGradient>
            </View>
        </Provider>
        
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        width: Dimensions.get('window').width,
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 40,
    },
});

export default FindNarrator;