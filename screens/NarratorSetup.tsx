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
    FlatList
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { updateUser } from '../src/graphql/mutations';
import { getUser } from '../src/graphql/queries';

import { Modal, Portal, Provider } from 'react-native-paper';

const NarratorSetup = ({navigation} : any) => {

    //const [userID, setUserID] = useState({})

    const route = useRoute();
    const {User} = route.params

    const [agree, setAgree] = useState(false);

    const [publishing, setPublishing] = useState(false);

    const [data, setData] = useState({
        narratorPseudo: '',
        isNarrator: false,
        accents: [],
        voice: '',
        narratorText: ''

    });

    //accent modal
    const [visible, setVisible] = useState(false);
    const showAccentModal = () => setVisible(true);
    const hideAccentModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

//function for the text input
    const textInputChange = (val : any) => {
        if( val.length !== 0 ) {
            setData({
                ... data,
                narratorPseudo: val,
            });
        } else {
            setData({
                ... data,
                narratorPseudo: val,
            });
        }
    }

    //function for the text input
    const aboutInputChange = (val : any) => {
        if( val.length !== 0 ) {
            setData({
                ... data,
                narratorText: val,
            });
        } else {
            setData({
                ... data,
                narratorText: val,
            });
        }
    }

    const handleUpdateAttributes = async () => {

        if ( data.narratorPseudo.length !== 0 ) {
          const userInfo = await Auth.currentAuthenticatedUser();
  
            const updatedUser = { 
                id: userInfo.attributes.sub, 
                narratorPseudo: data.narratorPseudo, 
                isNarrator: true,
                narratorText: data.narratorText,
                accents: data.accents,
                voice: data.voice
            }
  
          if (userInfo) {
            let result = await API.graphql(
                graphqlOperation(updateUser, { input: updatedUser }
            ))
            
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

    //accent list
    const accents = [
        {id: 0, accent: 'Other'},
        {id: 1, accent: 'British'},
        {id: 2, accent: 'Southern Twang'},
        {id: 3, accent: 'Minnesota'},
        {id: 4, accent: 'Boston'},
        {id: 5, accent: 'New York'},
        {id: 6, accent: 'Irish'},
        {id: 7, accent: 'Scottish'},
        {id: 8, accent: 'African'},
        {id: 9, accent: 'Russian'},
        {id: 10, accent: 'British'},
    ];

    const textRef = useRef();

    const FocusInput = () => { textRef.current.focus();}



    return(
        <Provider>
        <View>
            <Portal>
                <Modal visible={visible} onDismiss={hideAccentModal} contentContainerStyle={containerStyle}>
                    <View style={{height: 500}}>
                        <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>
                            Select Proficient Accents
                        </Text>
                        <ScrollView style={{marginTop: 40}} showsVerticalScrollIndicator={false}>
                            {accents.map(item => {

                                const [isChecked, setIsChecked] = useState(false);

                                const AddAccent = ({accent} : any) => {

                                    setIsChecked(!isChecked);
                        
                                    if (data.accents.includes(accent)) {
                                        setData({...data, accents: data.accents.filter(item => item !== accent)})
                                     
                                    } else {
                                        setData({...data, accents: [...data.accents, accent]})
                                    }
                                }

                                return (
                                    <TouchableWithoutFeedback onPress={() => AddAccent({accent: item.accent})}>
                                        <View style={{flexDirection: 'row', paddingVertical: 15, alignItems: 'center'}}>
                                            <FontAwesome5 
                                                name={isChecked === true ? 'check-square' : 'square'}
                                                size={17}
                                                color={isChecked === true ? 'cyan' : 'gray'}
                                                style={{paddingRight: 30}}
                                            />
                                            <Text style={{color: 'white'}}>
                                                {item.accent}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }
                            )
                        }
                        </ScrollView>
                        <TouchableWithoutFeedback onPress={hideAccentModal}>
                            <View style={{marginTop: 10, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 20, alignSelf: 'center', backgroundColor: 'cyan'}}>
                                <Text style={{color: '#000'}}>
                                    Done
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        
                    </View>
                </Modal>
            </Portal>

            <ScrollView>
            <View style={{marginHorizontal: 20, marginTop: 50}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
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
                            Narrator Setup
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
                        Accents
                    </Text>
                    <TouchableWithoutFeedback onPress={showAccentModal}>
                        <View style={styles.inputfield}>
                            <Text style={{color: '#ffffffa5'}}>
                                Select accents
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <ScrollView horizontal={true} scrollEnabled={false} contentContainerStyle={{flex: 1, flexDirection: "row", flexWrap: "wrap"}} style={{width: Dimensions.get('window').width}}>
                       {data.accents.map(item => {
                           return (
                                <Text style={{textTransform: 'capitalize', marginHorizontal: 20, marginTop: 20, color: '#00ffffa5', marginRight: 10}}>
                                    {item}
                                </Text>
                           )})
                        } 
                    </ScrollView>
                    
                </View>
                
                <TouchableWithoutFeedback onPress={showAccentModal}>
                    <View style={{marginTop: 40}}>
                        <Text style={styles.inputheader}>
                            Voice Type
                        </Text>
                        <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                            <TouchableWithoutFeedback onPress={() => setData({...data, voice: 'masculine'})}>
                                <View style={{borderRadius: 8, justifyContent: 'center', marginHorizontal: 20, width: 120, height: 40, borderWidth: 0.5, borderColor: 'cyan', alignItems: 'center',
                                    backgroundColor: data.voice === 'masculine' ? 'cyan' : '#000'
                                }}>
                                    <Text style={{
                                        color: data.voice === 'masculine' ? '#000' : 'cyan'
                                        }}>
                                        Masculine
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            
                            <TouchableWithoutFeedback onPress={() => setData({...data, voice: 'feminine'})}>
                                <View style={{borderRadius: 8, justifyContent: 'center', marginHorizontal: 20, width: 120, height: 40,  borderWidth: 0.5, borderColor: 'cyan', alignItems: 'center',
                                    backgroundColor: data.voice === 'feminine' ? 'cyan' : '#000'
                            }}>
                                    <Text style={{
                                        color: data.voice === 'feminine' ? '#000' : 'cyan'
                                    }}>
                                        Feminine
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>                

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
                                    Create Narrator Profile
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

export default NarratorSetup;