import React, {useState, useEffect, useRef} from 'react';
import { 
    StyleSheet, 
    Text, 
    Image, 
    TouchableOpacity, 
    View, 
    TextInput, 
    Platform, 
    ActivityIndicator, 
    TouchableWithoutFeedback, 
    ScrollView, 
    Dimensions,
    FlatList,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';

import { useRoute } from '@react-navigation/native';

import { Modal, Portal, Provider } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import uuid from 'react-native-uuid';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { createStory, updateStory } from '../src/graphql/mutations';
import { getUser, getStory } from '../src/graphql/queries';

import genres  from '../data/dummygenre';


const EditAudio = ({navigation} : any) => {  
    
    //recieve story ID as props

    const route = useRoute();
    const {storyID} = route.params;

    //set the current user
    const [Story, setStory] = useState({})

    //get the user
    useEffect(() => {

        const fetchStory = async () => {
        
        try {
            const storyData = await API.graphql(graphqlOperation(
            getStory, {id: storyID}))
            if (storyData) {
                setStory(storyData.data.getStory);
                
                console.log(Story);
            }
        } catch (e) {
            console.log(e);
        }}

        fetchStory();

    }, [storyID])

//audio object
    const [pendingImageState, setPendingImageState] = useState('');

    //text data input state holders. Will be sent to aws
    const [data, setData] = useState({
        title: '',
        summary: '',
        description: '',
        imageUri: '',
    });

    const [localImageUri, setLocalImageUri] = useState('');

//upload audio and image to s3
    const [isLoading, setIsLoading] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);

    const UploadToS3 = async () => {

        setIsLoading(true);

        if (localImageUri) {
        
                const response = await fetch(localImageUri);
                const blob = await response.blob();
                const filename = uuid.v4().toString();
                const s3ResponseImage = await Storage.put(filename, blob);
                
                const result = await Storage.get(s3ResponseImage.key);
                setPendingImageState(result);          
        }

        setIsLoading(false);
        setIsLoaded(true);
    }

//upload audio object to graphql database
    const [isPublishing, setIsPublishing] = useState(false);

    const [isPublished, setIsPublished] = useState(false);

    const PublishStory = async () => {

        console.log(pendingImageState);

        setIsPublishing(true);
        setData({...data, imageUri: pendingImageState});
        console.log(data);

        try {
            let result = await API.graphql(
                    graphqlOperation(updateStory, { input: 
                        {
                            title: data.title,
                            description: data.description,
                            imageUri: pendingImageState,
                        }
                    }))
                        console.log(result);
                } catch (e) {
                        console.error(e);
        }
        setIsPublishing(false);
        setIsPublished(true);
    }


//request permission to access camera roll
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


//image picker
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
        setLocalImageUri(result.uri);
        }
    };
  


//Toggle Switch
      const [isSwitchOn, setIsSwitchOn] = useState(false);
      const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  
//Modal
      const [visible, setVisible] = useState(false);
  
      const showModal = () => termsAgree === true ? setVisible(true) : null;

      const hideModal = () => setVisible(false);
      const containerStyle = {
          backgroundColor: 'transparent', 
          padding: 20,
      }; 
      
//terms state management
      const [termsAgree, setTermsAgree] = useState(false);

      const handleTerms = () => {
          if (termsAgree === true) {
            setTermsAgree(false)
          }
          if (termsAgree === false) {
              setTermsAgree(true)
          }
      }

//Tags flatlist, data, and functions

    const clear = useRef()

    const [TagsArray, setTagsArray] = useState([])

    const [tagText, setTagText] = useState('')

    const AddToTagArray = () => {

        let Tags = []

        if (tagText.includes('#') || tagText === '') {
            return;
        } else {
            Tags.push(...TagsArray, {id: TagsArray.length + 1, name: tagText});
            setTagsArray(Tags)
            clear.current.clear()
            
        }
    }

    //confirm state
    const [confirmUpdate, setConfirmUpdate] = useState(false)


  return (
    <Provider>
        <ScrollView>
            <View style={styles.container}>

            <Portal>
                <Modal visible={visible} onDismiss={() => {hideModal(); setConfirmUpdate(false)}} contentContainerStyle={containerStyle}>
                    <ScrollView style={{ height: 600, paddingHorizontal: 10,  backgroundColor: '#363636', borderRadius: 15,}}>
                        <View style={{marginVertical: 40}}>

                    {data.title !== '' ? (
                        <View style={{marginBottom: 20,}}>
                            <Text style={styles.inputheadermodal}>
                                Title
                            </Text>
                            <Text style={{marginHorizontal: 20, color: '#ffffff', fontWeight: 'bold', textTransform: 'capitalize'}}>
                            {data.title}
                            </Text>   
                        </View>
                    ) : null}

                    {data.summary !== '' ? (
                        <View style={{marginBottom: 20}}>
                            <Text style={styles.inputheadermodal}>
                                Summary
                            </Text>
                            <Text style={{marginHorizontal: 20, color: '#ffffff'}}>
                            {data.summary}
                            </Text>   
                        </View>
                    ) : null}
                    

                    {data.description !== '' ? (
                        <View style={{marginBottom: 20}}>
                            <Text style={styles.inputheadermodal}>
                                Description
                            </Text>
                            <Text style={{marginHorizontal: 20, color: '#ffffff'}}>
                                {data.description}
                            </Text>   
                        </View>
                    ) : null}

                    {TagsArray.length > 0 ? (
                    <View style={{marginBottom: 20}}>
                        <Text style={styles.inputheadermodal}>
                            Tags
                        </Text>

                        <ScrollView style={{width: Dimensions.get('window').width - 40, marginHorizontal: 20, marginBottom: 20}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {TagsArray.map(({ index, name } : any) => (
                                <View key={index} style={{marginTop: 10, marginRight: 10}}>
                                    <TouchableOpacity>
                                        <View style={{}}>
                                            <Text style={styles.tagtext}>
                                                #{name}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    ) : null}

                    {localImageUri !== '' ? (
                        <View style={{marginBottom: 20}}>
                            <Text style={styles.inputheadermodal}>
                                Cover Art
                            </Text>
                            <Image 
                                source={{ uri: localImageUri}}
                                resizeMode='contain'
                                style={{ 
                                    marginVertical: 10,
                                    height: 120,
                                    borderRadius: 15,
                                }} 
                                />
                        </View>
                    ) : null}
                    
                    
                    
                        <View style={{ width: '100%', alignItems: 'center'}}>
                            {!isLoading && !isLoaded? (
                                <TouchableOpacity
                                        style={{marginBottom: 20,}}
                                        onPress={() => setConfirmUpdate(true)}
                                        onLongPress={() => {confirmUpdate === true ? UploadToS3 : null}}
                                        >
                                        <View
                                            style={{ 
                                                paddingHorizontal: 20,
                                                paddingVertical: 10,
                                                borderRadius: 20,
                                                backgroundColor: confirmUpdate === true ? 'gold' : 'transparent',
                                                borderWidth: 1,
                                                borderColor: confirmUpdate === true ? 'gold' : 'cyan'
                                                }} >
                                            <Text style={{ color: confirmUpdate === true ? '#000' : 'cyan', fontSize: 16, textAlign: 'center'}}>{confirmUpdate === true ? 'Hold to Confirm' : 'Update Story'}</Text>
                                        </View>
                                    </TouchableOpacity>
                            ) : null }

                            {isLoading ? (<ActivityIndicator size="large" color="#ffffff"/>) : null }

                            {isLoaded && !isPublishing && !isPublished && !isLoading ? (
                                <TouchableOpacity
                                    style={{ 
                                        marginBottom: 20,
                                    }}
                                    onPress={PublishStory}>
                                    <LinearGradient
                                        colors={['cyan', 'cyan']}
                                        style={{ 
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            borderRadius: 20,
                                            width: 100,
                                            }} >
                                        <Text style={{ color: 'black', fontSize: 16, textAlign: 'center'}}>Publish</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ) : null }
                            
                            {isLoaded && isPublishing ? (<ActivityIndicator size="large" color="#ffffff"/>) : null}
                            
                            {isPublished ? (
                                <TouchableOpacity
                                style={{ 
                                    marginBottom: 20,
                                }}
                                onPress={() => navigation.navigate('Root', { screen: 'HomeScreen'})}
                                >
                                <LinearGradient
                                    colors={['cyan', 'cyan']}
                                    style={{ 
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 20,
                                        width: 120,
                                        alignItems: 'center'
                                        }} >
                                    <FontAwesome5 
                                        name='check'
                                        color='#363636'
                                        size={20}
                                    />
                                </LinearGradient>
                            </TouchableOpacity>
                            ) : null}

                        </View>
                        </View>
                    </ScrollView>
                </Modal>
            </Portal>

            <TouchableWithoutFeedback onPress={ () => navigation.goBack()}>
                <View style={{padding: 30, margin: -30 }}>
                    <AntDesign 
                            name='close'
                            size={25}
                            color='#fff'
                            style={{marginTop: 50, marginLeft: 20}} 
                        /> 
                </View>
            </TouchableWithoutFeedback>
                
                <View style={{ alignItems: 'center'}}> 
                    <Text style={[styles.title, {marginBottom: 50}]}>
                        Edit Story
                    </Text>

                    <Text style={styles.inputheader}>
                        Title
                    </Text>
                    <View style={[styles.inputfield, {height: 60}]}>
                        
                        <TextInput
                            defaultValue={Story?.title}
                            style={styles.textInputTitle}
                            maxLength={50}
                            multiline={true}
                            numberOfLines={2}
                            onChangeText={val => setData({...data, title: val})}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={data.title !== '' ? 'cyan' : '#363636'}
                            size={20}
                        />
                    </View>

                    <View style={{alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 20, marginBottom: 10, alignSelf: 'flex-start'}}>
                            Summary
                        </Text>
                        <Text style={{marginBottom: 10, fontSize: 12, alignSelf: 'flex-end', color: '#ffffffa5', marginLeft: 10,}}>
                           (100 max characters)
                        </Text>
                    </View>
                    
                    <View style={styles.inputfield}>
                        <TextInput
                            style={[styles.textInput, { height: 80 }]}
                            maxLength={300}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={val => setData({...data, summary: val})}
                            defaultValue={Story?.summary}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={data.summary !== '' ? 'cyan' : '#363636'}
                            size={20}
                        />
                    </View>

                    <View style={{alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 20, marginBottom: 10, alignSelf: 'flex-start'}}>
                            Description
                        </Text>
                        <Text style={{marginBottom: 10, fontSize: 12, alignSelf: 'flex-end', color: '#ffffffa5', marginLeft: 10,}}>
                           (1200 max characters)
                        </Text>
                    </View>
                    
                    <View style={styles.inputfield}>
                        <TextInput
                            //placeholder={Story?.description}
                            placeholderTextColor='#ffffffa5'
                            style={[styles.textInput, { height: 80 }]}
                            maxLength={300}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={val => setData({...data, description: val})}
                            defaultValue={Story?.description}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={data.description !== '' ? 'cyan' : '#363636'}
                            size={20}
                        />
                    </View>

                    {/* <Text style={styles.inputheader}>
                        Genre *
                    </Text>
                    <View style={{ 
                            width: '90%', 
                            marginBottom: 20, 
                            backgroundColor: '#363636a5',
                            marginHorizontal: 20,
                            paddingVertical: 20,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            }}>
                        <ModalDropdown 
                        options={Genre}
                        defaultValue='Select Genre...'
                        defaultTextStyle={{ color: '#ffffffa5'}}
                        onSelect={(val) => ConvertToString(val)}
                        style={{ 
                        }}
                        textStyle={{ color: 'cyan', fontSize: 14, textTransform: 'capitalize',}}
                        dropdownStyle={{ 
                            backgroundColor: '#363636', 
                            width: '80%', 
                            borderWidth: 0,
                            borderRadius: 15,
                            height: 280,
                            marginTop: 10
                        }}
                        dropdownTextStyle={{ 
                            backgroundColor: 'transparent',
                            color: '#fff',
                            fontSize: 14,
                            paddingHorizontal: 20,
                            paddingVertical: 15,
                            textTransform: 'capitalize',
                            
                        }}
                        dropdownTextHighlightStyle={{
                            color: 'cyan'
                        }}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={data.genre !== '' ? 'cyan' : '#363636'}
                            size={20}
                        /> */}

                    {/* </View> */}

                    {/* <Text style={styles.inputheader}>
                        Author *
                    </Text>
                    <View style={[styles.inputfield, {height: 60}]}>
                        <TextInput
                            //placeholder={Story?.title}
                            placeholderTextColor='#ffffffa5'
                            style={styles.textInputTitle}
                            maxLength={50}
                            multiline={true}
                            numberOfLines={2}
                            onChangeText={val => setData({...data, writer: val})}
                            //defaultValue={!!user ? user?.pseudonym : 'Annonymous'}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={data.writer !== '' ? 'cyan' : '#363636'}
                            size={20}
                        />
                    </View> */}

                    {/* <Text style={styles.inputheader}>
                        Narrator *
                    </Text>
                    <View style={[styles.inputfield, {height: 60}]}>
                        <TextInput
                            placeholder='....'
                                placeholderTextColor='#ffffffa5'
                            style={styles.textInputTitle}
                            maxLength={50}
                            multiline={true}
                            numberOfLines={2}
                            onChangeText={val => setData({...data, narrator: val})}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={data.narrator !== '' ? 'cyan' : '#363636'}
                            size={20}
                        />
                    </View> */}

                    <Text style={styles.inputheader}>
                        Tags
                    </Text>

                    <ScrollView style={{width: Dimensions.get('window').width - 40, marginHorizontal: 20, marginBottom: 20}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {TagsArray.map(({ index, name } : any) => (
                            <View key={index} style={{marginTop: 10, marginRight: 10}}>
                                <TouchableOpacity>
                                    <View style={{}}>
                                        <Text style={styles.tagtext}>
                                            #{name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginBottom: 20, marginTop: 0, }}>
                        <TouchableOpacity>
                            <View style={{ width: Dimensions.get('window').width - 140, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                <TextInput
                                    placeholder='#'
                                    placeholderTextColor='#ffffffa5'
                                    style={styles.textInputTitle}
                                    maxLength={20}
                                    multiline={false}
                                    numberOfLines={1}
                                    ref={clear}
                                    onChangeText={val => setTagText(val)}
                                    //defaultValue={!!user ? user?.pseudonym : 'Annonymous'}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={AddToTagArray}>
                            <View style={{ marginHorizontal: 20, padding: 10}}>
                                <FontAwesome5
                                    name='chevron-up'
                                    size={20}
                                    color='#fff'
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Image 
                        source={{uri: Story?.imageUri}}
                        style={{marginVertical: 20, borderRadius: 15, width: Dimensions.get('window').width - 40, height: 200}}
                    />

                    <Text style={styles.inputheader}>
                        Cover Art
                    </Text>

                    <View style={{ width: '100%', marginBottom: 20, marginTop: 0, }}>
                        <TouchableOpacity onPress={pickImage}>
                            <View style={{ marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                <Text style={{ color: '#ffffffa5'}}>
                                    {localImageUri !== '' ? localImageUri : 'Select artwork'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ margin: 40, flexDirection: 'row'}}>
                        <FontAwesome5 
                            name='check-circle'
                            color={termsAgree === true ? 'cyan' : '#363636'}
                            size={20}
                            onPress={handleTerms}
                        />
                        <Text style={{ color: '#ffffffa5', fontSize: 12, marginRight: 4, marginLeft: 20, textAlign: 'left'}}>
                            I agree to the
                        </Text>
                        <TouchableWithoutFeedback>
                            <Text style={{ color: '#ffffffa5', fontSize: 12, textAlign: 'left', textDecorationLine: 'underline'}}>
                                Publishing Terms and Conditions.
                            </Text>
                        </TouchableWithoutFeedback>
                        
                        
                    </View>

                        <TouchableOpacity onPress={showModal}>
                            <View style={[styles.uploadbutton, {
                                backgroundColor: 
                                    termsAgree === true 
                                    ? 'cyan' : 'transparent'
                            }]}>
                                <Text style={{ fontSize: 16, color: 
                                    termsAgree === true 
                                    ? '#000' : '#00ffff'
                                }}>
                                    Update Story
                                </Text>
                            </View>   
                        </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    </Provider>
);
}

const styles = StyleSheet.create({
container: {
    //alignItems: 'center',
},
title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 0,
},
inputheader: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    alignSelf: 'flex-start'
},
inputheadermodal: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    alignSelf: 'flex-start'
},
inputfield: {
    width: '90%',
    backgroundColor: '#363636a5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row', 
    justifyContent: 'space-between'
    
},
textInputTitle: {
    color: '#fff',
    fontWeight: 'bold',
    width: '90%'
},
textInput: {
    color: '#fff',
    width: '92%'
},
userId: {
    fontSize: 12,
    color: '#ffffffa5',
    marginRight: 15,
    marginLeft: 5,
},
uploadbutton: {
    paddingHorizontal: 20, 
    paddingVertical: 10,
    marginBottom: 60, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: '#00ffff',
    borderWidth: 0.5,
},
timer: {
    color: '#ffffff',
    fontSize: 16,
},
tagbox: {
    marginRight: 10   
  },
  tagtext: {
    color: 'cyan',
    fontSize: 14,
    backgroundColor: '#1A4851a5',
    borderColor: '#00ffffa5',
    borderWidth: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20
},
});

export default EditAudio;