import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    FlatList,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';

import { Modal, Portal, Provider } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { updateUser, createImageAsset } from '../src/graphql/mutations';
import { listImageAssets } from '../src/graphql/queries';

const MyArt = ({navigation} : any) => {

    //art styles modal
    const [visible, setVisible] = useState(false);
    const showImageModal = () => setVisible(true);
    const hideImageModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

    //data form AWS image asset table
    const [imageData, setImageData] = useState()

    //get the image data
    useEffect(() => {
        const fetchData = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            let result = await API.graphql(graphqlOperation(
                listImageAssets, { 
                    filter: {
                        userID: {
                            eq: userInfo.attributes.sub
                        }
                    }
                }
            ))
            setImageData(result.data.listImageAssets.items)
        }
        fetchData();
    }, [])

    const Item = ({title, imageKey} : any) => {

        const [imageUri, setImageUri] = useState('')

        useEffect(() => {
            const fetchImage = async () => {
                const getUri = await Storage.get(imageKey);
                setImageUri(getUri);
            };
            fetchImage();
        }, [])

        return (
            <TouchableWithoutFeedback onPress={showImageModal}>
                <View style={{marginTop: 20}}>
                    <Image 
                        source={{uri: imageUri}}
                        style={{borderRadius: 8, margin: 10, width: Dimensions.get('window').width/2 - 20, height: 120}}
                    />
                    <Text style={{marginLeft: 10, color: '#fff'}}>
                        {title}
                    </Text>
                </View>
                
            </TouchableWithoutFeedback>
        )
    }

    const renderItem = ({item} : any) => {
        return(
            <Item 
                title={item.title}
                imageKey={item.imageUri}
            />
        )
    }

    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideImageModal} contentContainerStyle={containerStyle}>
                    <View>

                    </View>
                </Modal>
            </Portal>

            <ScrollView>
                <View style={{marginHorizontal: 20, marginTop: 50}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                                <View style={{alignSelf: 'center', padding: 30, margin: -30}}>
                                    <FontAwesome5 
                                        name='chevron-left'  
                                        color="#fff"
                                        size={20}
                                        style={{alignSelf: 'center'}}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <Text style={styles.header}>
                                My Artwork
                            </Text>
                        </View>
                    </View>  
                </View>

                <View style={{marginTop: 40}}>
                    <FlatList 
                        data={imageData}
                        renderItem={renderItem}
                        keyExtractor={item => item}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        
                    />
                </View>
            </ScrollView> 
        </Provider>
        

    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        width: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 40
    },
});

export default MyArt;