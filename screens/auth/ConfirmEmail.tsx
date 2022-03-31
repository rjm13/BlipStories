import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Auth, graphqlOperation, API } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import { createUser } from '../../src/graphql/mutations';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

const ConfirmEmail = ({navigation, route} : {navigation: any, route : any}) => {

    const [loggingIn, setLoggingIn] = useState(false);

    const {username, password} = route.params

    const [data, setData] = useState({
        username: username,
        code: '',
        password: password,
    });

    async function confirmSignUp() {

        const {username, code, password} = data;

        setLoggingIn(true);
        
        try {

            let result = await Auth.confirmSignUp(username, code);

            if (result) {
                let signin = await Auth.signIn (username, password)

                if (signin) {
                    const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true })

                    if (userInfo) {

                        const newUser = {
                            id: userInfo.attributes.sub,
                            type: 'User',
                            name: userInfo.attributes.name,
                            birthdate: userInfo.attributes.birthdate,
                            plan: 'basic'
                        }

                        const createdUser = await API.graphql(
                            graphqlOperation(
                            createUser,
                            { input: newUser }
                            )
                        )
                        if (createdUser) {
                            navigation.navigate('SplashCarousel')
                        }
                    }
                }
            }
        } catch (error) {
            console.log('error confirming sign up', error);
            alert('Error confirming account. Please try again.')
        }
        setLoggingIn(false);
    }

            

            // if (userInfo) {
            //       const userData = await API.graphql(
            //         graphqlOperation(
            //           getUser, 
            //           { id: userInfo.attributes.sub,
            //           }
            //         )
            //       )
          
          
                // if (userData.data.getUser) {
                // console.log("User is already registered in database");
                // navigation.navigate('Redirect', {trigger: Math.random()}) 
                // return;
                // };
        
    //             const newUser = {
    //                 id: userInfo.attributes.sub,
    //                 type: 'User',
    //                 //createdAt: new Date(),
    //                 name: userInfo.attributes.name,
    //                 birthdate: userInfo.attributes.birthdate,
    //             }
          
    //             //if there is no user in DB with the id, then create one
    //             const createdUser = await API.graphql(
    //                 graphqlOperation(
    //                 createUser,
    //                 { input: newUser }
    //                 )
    //             )
    //             if (createdUser) {
    //                 navigation.navigate('SplashCarousel')
    //                 //navigation.navigate('Redirect', {trigger: Math.random()}) 
    //             }
    //         } 
    //     }
    // }
            // On failure, display error in console      
        // catch (error) {
        //     console.log('error confirming sign up', error);
        //     alert('Error confirming account. Please try again.')
        // }
        // setLoggingIn(false);
    //}

    async function resendConfirmationCode() {
        //const {username} = username;
        try {
            await Auth.resendSignUp(username);
            alert('Confirmation code resent. Please check your email.');
        } catch (err) {
            console.log('error resending code: ', err);
            alert('Error sending code.')
        }
    }

    const handleCode = (val : any) => {
        setData({
            ... data,
            code: val
        });
    }


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#00ffffa5','#000', '#000']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                
                <View style={{ margin: 20}}>
                    <View>
                        <Text style={styles.header}>
                            Confirmation Code
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='Check email for code'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={30}
                                onChangeText={(val) => handleCode(val)}
                                autoCapitalize='none'
                                
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={confirmSignUp}>
                    <View style={styles.button}>
                        {loggingIn === true ? (
                            <ActivityIndicator size='small' color='cyan'/>
                        ) : (
                            <Text style={styles.buttontext}>
                                Confirm Account
                            </Text> 
                            )}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={resendConfirmationCode}>
                    <Text style={{ fontSize: 14, color: '#fff', alignSelf: 'center', marginTop: 40}}>
                        Resend code
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{ fontSize: 14, color: '#fff', alignSelf: 'center', margin: 20}}>
                        Go Back
                    </Text>
                </TouchableOpacity>

            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        //alignItems: 'center',
        flex: 1,
        width: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10,
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
       margin: 20,
    },
    buttontext: {
        backgroundColor: 'cyan',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,

    },
});

export default ConfirmEmail;