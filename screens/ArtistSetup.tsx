import React, {useState, useEffect, useRef} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    ActivityIndicator, 
    Dimensions, 
    TouchableOpacity, 
    TextInput, 
    ScrollView,
    FlatList,
    Image,
    Platform
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { updateUser, createImageAsset } from '../src/graphql/mutations';
import { getUser } from '../src/graphql/queries';

import { Modal, Portal, Provider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

const ArtistSetup = ({navigation} : any) => {

    //on render, request permission for camera roll
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    //const [userID, setUserID] = useState({})

    const route = useRoute();
    const {User} = route.params

    const [agree, setAgree] = useState(false);

    const [publishing, setPublishing] = useState(false);

    const [imageState, setImageState] = useState();
    const [imageTitleState, setImageTitleState] = useState();
    const [imageIndex, setImageIndex] = useState(0)

    const [data, setData] = useState({
        artistPseudo: '',
        isArtist: false,
        styles: [],
        artistText: ''
    });

    const [imageData, setImageData] = useState([])

    //art styles modal
    const [visible, setVisible] = useState(false);
    const showArtistModal = () => setVisible(true);
    const hideArtistModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

        //art styles modal
        const [visible2, setVisible2] = useState(false);
        const showImageModal = ({item, index} : any) => {
            setImageState(item.imageUri);
            setImageTitleState(item.imageTitle);
            setImageIndex(index)
            setVisible2(true);
        }
        const hideImageModal = () => setVisible2(false);


//function for the text input
    const textInputChange = (val : any) => {
        if( val.length !== 0 ) {
            setData({
                ... data,
                artistPseudo: val,
            });
        } else {
            setData({
                ... data,
                artistPseudo: val,
            });
        }
    }

    //function for the text input
    const aboutInputChange = (val : any) => {
        if( val.length !== 0 ) {
            setData({
                ... data,
                artistText: val,
            });
        } else {
            setData({
                ... data,
                artistText: val,
            });
        }
    }

    const [textChange, setTextChange] = useState()

     //function for the text input
     const titleInputChange = (val : any) => {

        if( val.length !== 0 ) {
            setTextChange(val);
        } else {
            setTextChange(val);
        }
    }

    const UpdateStates = () => {
        let newState = [...imageData];

        newState[imageIndex].imageTitle = textChange;
        setImageData(newState);
        hideImageModal();
    }

    const handleUpdateAttributes = async () => {

        if ( data.artistPseudo.length !== 0 ) {
          const userInfo = await Auth.currentAuthenticatedUser();
  
            const updatedUser = { 
                id: userInfo.attributes.sub, 
                artistPseudo: data.artistPseudo, 
                isArtist: true,
                artistText: data.artistText,
                artStyles: data.styles,
            }
  
          if (userInfo) {
            let result = await API.graphql(
                graphqlOperation(updateUser, { input: updatedUser }
            ))

        if (imageData.length > 0) {
            for (let i = 0; i < imageData.length; i++) {
                if (imageData[i].imageUri) {
                    const response = await fetch(imageData[i].imageUri);
                    const blob = await response.blob();
                    const filename =  uuid.v4().toString();
                    const s3Response = await Storage.put(filename, blob);

                    let imageResult = await API.graphql(graphqlOperation(
                        createImageAsset, {input: {
                            userID: userInfo.attributes.sub,
                            imageUri: s3Response.key,
                            title: imageData[i].imageTitle
                        }}
                    ))
                    console.log(imageResult)
                }
                
            }
        }
            
        console.log(result);

          if (result) {navigation.navigate('Publisher')}
          setPublishing(false);
          }
      }
  }

  const updateAsPublisher = async () => {
    if (agree === true) {
        setPublishing(true);
        handleUpdateAttributes();
    }
    else {
        alert('You must agree to the Publishing Terms and Conditions to continue.')
    }
    
}

    //styles list
    const artStyles = [
        {id: 0, style: 'Watercolor'},
        {id: 1, style: 'Charcoal'},
        {id: 2, style: 'Pencil'},
        {id: 3, style: 'Paint'},
        {id: 4, style: 'Pastels'},
        {id: 5, style: 'Animation'},
        {id: 6, style: 'Graphic Design'},
    ];

    const textRef = useRef();

    const FocusInput = () => { textRef.current.focus();}

    //pick the image from the camera roll
    const PickImage = async () => {

        if (imageData.length < 4) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled && imageData.length < 4) {
                    setImageData([
                        ...imageData,
                        {
                            imageIndex: imageData.length,
                            imageTitle: null,
                            imageUri: result.uri
                        }
                    ]);
                    }

            console.log(result);
        } else {
            alert ('You are only allowed a maximum of 4 images. To remove an image for upload, press and hold it for 3 seconds.')
        }
      };



    return(
        <Provider>
        <View>
            <Portal>
                <Modal visible={visible} onDismiss={hideArtistModal} contentContainerStyle={containerStyle}>
                    <View style={{height: 500}}>
                        <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>
                            Select Art Styles
                        </Text>
                        <ScrollView style={{marginTop: 40}} showsVerticalScrollIndicator={false}>
                            {artStyles.map(item => {

                                const [isChecked, setIsChecked] = useState(false);

                                const AddStyle = ({style} : any) => {

                                    setIsChecked(!isChecked);
                        
                                    if (data.styles.includes(style)) {
                                        setData({...data, styles: data.styles.filter(item => item !== style)})
                                     
                                    } else {
                                        setData({...data, styles: [...data.styles, style]})
                                    }
                                }

                                return (
                                    <TouchableWithoutFeedback onPress={() => AddStyle({style: item.style})}>
                                        <View style={{flexDirection: 'row', paddingVertical: 15, alignItems: 'center'}}>
                                            <FontAwesome5 
                                                name={isChecked === true ? 'check-square' : 'square'}
                                                size={17}
                                                color={isChecked === true ? 'cyan' : 'gray'}
                                                style={{paddingRight: 30}}
                                            />
                                            <Text style={{color: 'white'}}>
                                                {item.style}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }
                            )
                        }
                        </ScrollView>
                        <TouchableWithoutFeedback onPress={hideArtistModal}>
                            <View style={{marginTop: 10, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 20, alignSelf: 'center', backgroundColor: 'cyan'}}>
                                <Text style={{color: '#000'}}>
                                    Done
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        
                    </View>
                </Modal>

                <Modal visible={visible2} onDismiss={hideImageModal} contentContainerStyle={containerStyle}>
                    <View style={{alignItems: 'center'}}>
                        <Image 
                            source={{uri: imageState}}
                            style={{width: Dimensions.get('window').width - 40, height: 260}}
                        />
                        
                        <TextInput 
                            placeholder={imageTitleState ? imageTitleState : "Add Title"}
                            placeholderTextColor='#ffffff'
                            style={{color: '#fff', marginTop: 20, }}
                            maxLength={30}
                            onChangeText={(val) => titleInputChange(val)}
                            autoCapitalize='words'
                        />
                        <View style={{margin: 20}}>
                            <TouchableWithoutFeedback onPress={UpdateStates}>
                                <Text style={{borderRadius: 20, color: '#000', backgroundColor: 'cyan', paddingHorizontal: 20, paddingVertical: 6}}>
                                    Update
                                </Text>
                            </TouchableWithoutFeedback>
                            
                        </View>
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
                            Artist Setup
                        </Text>
                    </View>
                </View>  
            </View>

                <View style={{marginTop: 40}}>
                    <Text style={styles.inputheader}>
                        Pseudonym
                    </Text>
                    <View style={styles.inputfield}>
                        <TextInput 
                            placeholder='....'
                            placeholderTextColor='#ffffffa5'
                            style={styles.textInputTitle}
                            maxLength={30}
                            onChangeText={(val) => textInputChange(val)}
                            autoCapitalize='none'
                        />
                    </View>
                </View>

                <View style={{marginTop: 40}}>
                    <Text style={styles.inputheader}>
                        Art Styles
                    </Text>
                    <TouchableWithoutFeedback onPress={showArtistModal}>
                        <View style={styles.inputfield}>
                            <Text style={{color: '#ffffffa5'}}>
                                Select styles
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <ScrollView horizontal={true} scrollEnabled={false} contentContainerStyle={{flex: 1, flexDirection: "row", flexWrap: "wrap"}} style={{width: Dimensions.get('window').width}}>
                       {data.styles.map(item => {
                           return (
                                <Text style={{textTransform: 'capitalize', marginHorizontal: 20, marginTop: 20, color: '#00ffffa5', marginRight: 10}}>
                                    {item}
                                </Text>
                           )})
                        } 
                    </ScrollView>
                </View>
                              

                <View style={{marginTop: 40}}>
                    <Text style={styles.inputheader}>
                        About Yourself
                    </Text>
                    <TouchableWithoutFeedback onPress={FocusInput}>
                        <View style={[styles.inputfield, {height: 120}]}>
                            <TextInput 
                                placeholder='....'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={200}
                                onChangeText={(val) => aboutInputChange(val)}
                                autoCapitalize='none'
                                ref={textRef}
                                multiline={true}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                

                <View style={{marginTop: 40}}>
                    <Text style={styles.inputheader}>
                        Add Portfolio
                    </Text>
                    <TouchableWithoutFeedback onPress={PickImage}>
                        <View style={styles.inputfield}>
                            <Text style={{color: '#ffffffa5'}}>
                                Select Artwork
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <ScrollView scrollEnabled={false} contentContainerStyle={{justifyContent: 'center', marginTop: 0, flexDirection: 'row', flexWrap: 'wrap',}} style={{width: Dimensions.get('window').width}}>
                       {imageData.map((item, index) => {

                            // let imageUri = item.imageUri
                            // let imageTitle = item.imageTitle
                            // let imageIndex = index

                           return (
                               <View>
                                   
                                    <TouchableOpacity 
                                        onPress={() => showImageModal({item, index})}
                                        onLongPress={() => {
                                            imageData.splice(index)
                                        }}
                                    >
                                   <Image 
                                        source={{uri: item.imageUri}}
                                        style={{ width: 160, height: 120, marginHorizontal: 5, borderRadius: 8, marginBottom: 10, marginTop: 30}}
                                    />
                                    <Text style={{color: '#fff', marginLeft: 10}}>
                                        {item.imageTitle}
                                    </Text>

                               </TouchableOpacity> 
                               </View>
                               
                               
                                
                           )})
                        } 
                    </ScrollView>
                </View>
                

                <View style={{marginVertical: 40}}>
                    {/* <Text style={styles.inputheader}>
                        Publishing Terms and Conditions
                    </Text>
                    <ScrollView style={{width: '90%', height: 260, borderRadius: 10, alignSelf: 'center', marginTop: 10, backgroundColor: '#363636a5'}}>
                        <Text style={{color: '#ffffffa5', margin: 20}}>
                            i. I agree that as a publisher, I am handing over all rights to Blip. I am their slave and master and will submit to Blip's every command. Blip maintains the right to enforce this servitude indefinitely. This is a binding contract that cannot be ammended. Upon agreeing to terms, the signee will liquidate and forfiet all assets in the signee's name. 
                            i. I agree that as a publisher, I am handing over all rights to Blip. I am their slave and master and will submit to Blip's every command. Blip maintains the right to enforce this servitude indefinitely. This is a binding contract that cannot be ammended. Upon agreeing to terms, the signee will liquidate and forfiet all assets in the signee's name. 
                            i. I agree that as a publisher, I am handing over all rights to Blip. I am their slave and master and will submit to Blip's every command. Blip maintains the right to enforce this servitude indefinitely. This is a binding contract that cannot be ammended. Upon agreeing to terms, the signee will liquidate and forfiet all assets in the signee's name.                        
                        </Text>
                    </ScrollView> */}
                    <TouchableWithoutFeedback onPress={() => setAgree(!agree)}>
                        <View style={{flexDirection: 'row', margin: 40, alignSelf: 'center'}}>
                            <FontAwesome 
                                name={ agree ? 'check-circle' : 'check-circle-o'}
                                size={22} 
                                color={ agree ? 'cyan' : '#ffffffa5'} 
                            />
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#fff', marginLeft: 20, fontSize: 14}}>
                                    I agree to the
                                </Text>
                                <TouchableWithoutFeedback onPress={() => navigation.navigate('Terms')}>
                                    <Text style={{textDecorationLine: 'underline', color: '#fff',fontSize: 14, marginLeft: 5}}>
                                        Publishing Terms
                                    </Text>
                                </TouchableWithoutFeedback>
                                
                            </View>
                            
                    </View>
                    </TouchableWithoutFeedback>

                    <TouchableOpacity onPress={updateAsPublisher}>
                        <View style={styles.button}>
                            {publishing === true ? (
                                <ActivityIndicator size="small" color="cyan"/>
                            ) : (
                                <Text style={styles.buttontext}>
                                    Create Artist Profile
                                </Text>
                            )}
                        </View>
                </TouchableOpacity>
                    
                </View>
                </ScrollView>

        </View>
        </Provider>
    )
};

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
    inputheader: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 10
    },
    textInputTitle: {
        color: '#fff',
        fontWeight: 'normal',
    },
    inputfield: {
        width: '90%',
        height: 40,
        backgroundColor: '#363636',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    button: {
        alignItems: 'center',
        //margin: 40,
     },
     buttontext: {
         backgroundColor: 'cyan',
         borderRadius: 20,
         paddingVertical: 10,
         paddingHorizontal: 20,
 
     },
});

export default ArtistSetup;