import React, {useState, useEffect, useContext, useLayoutEffect} from "react";
import { View, Text, ActivityIndicator, Dimensions, TouchableWithoutFeedback } from "react-native";
import { AppContext } from '../../AppContext';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import { StatusBar } from 'expo-status-bar';


const SCREEN_WIDTH = Dimensions.get('window').width

const SCREEN_HEIGHT = Dimensions.get('window').height

const Redirect = ({route, navigation} : any) => {

    const [isLoading, setIsLoading] = useState(false);

    const [tryAgain, setTryAgain] = useState(false);

    const trigger = route.params

    const { userID } = useContext(AppContext);
    const { setUserID } = useContext(AppContext);

    const { nsfwOn } = useContext(AppContext);
    const { setNSFWOn } = useContext(AppContext);

    useEffect(() => {

        const fetchUser = async () => {

            setIsLoading(true);

            const userInfo = await Auth.currentAuthenticatedUser(
            { bypassCache: true }
          )
          .catch(err=>err)
          

          //console.log(userInfo)
          if (userInfo === 'The user is not authenticated') {
                navigation.navigate('SignIn')
          }
          else {

            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const c = new Date(year - 18, month, day).toISOString();
            const bd3 = new Date(userInfo.attributes.birthdate).toISOString()
            
            if (bd3 > c) {
                () => setNSFWOn(false);
            } 
            if (bd3 < c) {
                () => setNSFWOn(true);
            } 

            const userData = await API.graphql(graphqlOperation(getUser,{ id: userInfo.attributes.sub}))
      
                if (userData.data.getUser) {
                 

                    setUserID(userData.data.getUser);
                    navigation.reset({
                        //index: 0,
                        routes: [{ name: 'Root' }],
                    });
                    //navigation.navigate('HomeDrawer')
                    
                } else {
                    setUserID(null);
                    navigation.reset({
                        //index: 0,
                        routes: [{ name: 'SignIn' }],
                    });
                    //navigation.navigate('HomeDrawer')
                }
          }
          setIsLoading(false);
        }
        fetchUser();
        
    }, [trigger, tryAgain])

    // const { userID } = useContext(AppContext);

    // const newUser = () => {
    //     userID === null ? navigation.navigate('SignIn') : navigation.navigate("HomeDrawer")
    //     console.log('this is my user object')
    //     console.log(userID)
    // }

    // useEffect(() => {
    //     newUser();
    // }, [])

    

    // useEffect(() => {
    //     if (userID === null) {
    //         navigation.navigate('SignIn')
    //     } else {
    //         navigation.navigate("HomeDrawer")
    //     }
    // }, [])

    return (
        <View style={{alignContent: 'center', justifyContent: 'center', width: SCREEN_WIDTH, height: SCREEN_HEIGHT + 30, backgroundColor: '#363636'}}>
            {isLoading === true ? (
                <ActivityIndicator size="large" color="cyan" />
            ) : (
                <View>
                    <Text style={{color: '#fff'}}>
                        Error logging in. Please check your internet connection.
                    </Text>
                    <TouchableWithoutFeedback onPress={() => setTryAgain(!tryAgain)}>
                       <View style={{margin: 20, padding: 20}}>
                            <Text style={{fontSize: 14, color: 'cyan'}}>
                                Try Again
                            </Text>
                        </View> 
                    </TouchableWithoutFeedback>
                    
                </View>
            )}
            
            <StatusBar style='light' backgroundColor="transparent"/>
        </View>
        
    );
}

export default Redirect;