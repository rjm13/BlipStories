import React, {useState, useEffect} from 'react';
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
        pseudonym: '',
        isNarrator: false,
        accents: [],
        gender: '',
        pitch: '',
        voices: false
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
                pseudonym: val,
            });
        } else {
            setData({
                ... data,
                pseudonym: val,
            });
        }
    }

    const handleUpdateAttributes = async () => {

        if ( data.pseudonym.length !== 0 ) {
          const userInfo = await Auth.currentAuthenticatedUser();
  
            const updatedUser = { id: userInfo.attributes.sub, pseudonym: data.pseudonym, isPublisher: true }
  
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

    useEffect(() => {
        console.log(data.accents)
    }, [data])

    return(
        <Provider>
        <View>
            <Portal>
                <Modal visible={visible} onDismiss={hideAccentModal} contentContainerStyle={containerStyle}>
                    <View style={{height: 500}}>
                        <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>
                            Select Proficient Accents
                        </Text>
                        <View style={{marginVertical: 40}}>
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

                            
                            {/* <FlatList 
                                data={accents}
                                renderItem={renderAccentItem}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                            /> */}
                        </View>
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

                <TouchableWithoutFeedback onPress={showAccentModal}>
                    <View style={{marginTop: 20}}>
                        <Text style={styles.inputheader}>
                            Accents
                        </Text>
                        <View style={styles.inputfield}>
                            <Text>

                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={showAccentModal}>
                    <View style={{marginTop: 20}}>
                        <Text style={styles.inputheader}>
                            Gender
                        </Text>
                        <View style={styles.inputfield}>
                            <Text>

                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={showAccentModal}>
                    <View style={{marginTop: 20}}>
                        <Text style={styles.inputheader}>
                            Pitch
                        </Text>
                        <View style={styles.inputfield}>
                            <Text>

                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={showAccentModal}>
                    <View style={{marginTop: 20}}>
                        <Text style={styles.inputheader}>
                            Character Voices
                        </Text>
                        <View style={styles.inputfield}>
                            <Text>

                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                

                <View style={{marginTop: 40}}>
                    <Text style={styles.inputheader}>
                        Publishing Terms and Conditions
                    </Text>
                    <ScrollView style={{width: '90%', height: 260, borderRadius: 10, alignSelf: 'center', marginTop: 10, backgroundColor: '#363636a5'}}>
                        <Text style={{color: '#ffffffa5', margin: 20}}>
                            i. I agree that as a publisher, I am handing over all rights to Blip. I am their slave and master and will submit to Blip's every command. Blip maintains the right to enforce this servitude indefinitely. This is a binding contract that cannot be ammended. Upon agreeing to terms, the signee will liquidate and forfiet all assets in the signee's name. 
                            i. I agree that as a publisher, I am handing over all rights to Blip. I am their slave and master and will submit to Blip's every command. Blip maintains the right to enforce this servitude indefinitely. This is a binding contract that cannot be ammended. Upon agreeing to terms, the signee will liquidate and forfiet all assets in the signee's name. 
                            i. I agree that as a publisher, I am handing over all rights to Blip. I am their slave and master and will submit to Blip's every command. Blip maintains the right to enforce this servitude indefinitely. This is a binding contract that cannot be ammended. Upon agreeing to terms, the signee will liquidate and forfiet all assets in the signee's name.                        
                        </Text>
                    </ScrollView>
                    <TouchableWithoutFeedback onPress={() => setAgree(!agree)}>
                        <View style={{flexDirection: 'row', marginTop: 20, alignSelf: 'center'}}>
                            <FontAwesome 
                                name={ agree ? 'check-circle' : 'check-circle-o'}
                                size={20} 
                                color={ agree ? 'cyan' : '#ffffffa5'} 
                            />
                            <Text style={{color: '#fff', marginLeft: 10, fontSize: 12}}>
                                I agree to the Publishing Terms and Conditions
                            </Text>
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
        margin: 40,
     },
     buttontext: {
         backgroundColor: 'cyan',
         borderRadius: 20,
         paddingVertical: 10,
         paddingHorizontal: 20,
 
     },
});

export default NarratorSetup;