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

    const SCREEN_WIDTH = Dimensions.get('window').width

    const [imageState, setImageState] = useState();
    const [titleState, setTitleState] = useState();
    const [indexState, setIndexState] = useState()

    //art styles modal
    const [visible, setVisible] = useState(false);
    const showImageModal = ({title, imageUri, index} : any) => {
        setVisible(true);
        setImageState(imageUri);
        setTitleState(title);
        setIndexState(index);
    }
    const hideImageModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        borderRadius: 15,
        paddingVertical: 40
    };

    //data form AWS image asset table
    const [imageData, setImageData] = useState()

    const [didUpdate, setDidUpdate] = useState(false);

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
            //setImageData(result.data.listImageAssets.items)

            let newArr = result.data.listImageAssets.items;

            for (let i = 0; i < result.data.listImageAssets.items.length; i++) {
            
                const getUri = await Storage.get(result.data.listImageAssets.items[i].imageUri);

                newArr[i].imageUri = getUri
            }

            setImageData(newArr)
        }

        fetchData();
    }, [didUpdate])

    const Item = ({title, imageUri, index} : any) => {

        return (
            <TouchableWithoutFeedback onPress={() => showImageModal({title, imageUri, index})}>
                <View style={{marginTop: 20}}>
                    <Image 
                        source={{uri: imageUri}}
                        style={{borderRadius: 8, margin: 10, width: SCREEN_WIDTH/2 - 20, height: 120}}
                    />
                    <Text style={{marginLeft: 10, color: '#fff'}}>
                        {title}
                    </Text>
                </View>
                
            </TouchableWithoutFeedback>
        )
    }

    const renderItem = ({item, index} : any) => {
        return(
            <Item 
                title={item.title}
                imageUri={item.imageUri}
                index={index}
            />
        )
    }

    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideImageModal} contentContainerStyle={containerStyle}>
                    <View>
                        <Image 
                            source={{uri: imageState}}
                            style={{alignSelf: 'center', width: SCREEN_WIDTH, height: SCREEN_WIDTH*0.75}}
                        />
                        <Text style={{textAlign: 'center', color: '#fff', marginTop: 20, alignSelf: 'center'}}>
                            {titleState}
                        </Text>
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
                        extraData={imageData}
                        keyExtractor={(item, index) => item + index}
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