import React, {useEffect, useState} from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity, 
    TouchableWithoutFeedback,
    Dimensions,
    FlatList,
} from 'react-native';

import {Auth, API, graphqlOperation} from 'aws-amplify';
import {listGenres} from '../../src/graphql/queries';
import {updateUser} from '../../src/graphql/mutations';
import { navigationRef } from '../../navigation/RootNavigation';

const SplashCarousel = ({navigation} : any) => {

    const [genres, setGenres] = useState([]);

    const TopThree = [];

    useEffect(() => {

        const fetchGenres = async () => {

            const genreInfo = await API.graphql(graphqlOperation(
                listGenres
            ))
            setGenres(genreInfo.data.listGenres.items);
        }
        fetchGenres();

    }, []);



    const AddRemoveGenre = (id : any) => {

        if (TopThree.includes(id)) {
            TopThree.splice(id);
        } else if (TopThree.length < 2) {
            TopThree.push(id);
        } else if (TopThree.length === 2 ) {
            TopThree.push(id);
        } else {null}
    }

    const UpdateThree = async () => {

        if (TopThree.length === 3) {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();

            const update = await API.graphql(graphqlOperation(
                updateUser, {input: {id: userInfo.attributes.sub, topthree: TopThree}}
            ))
            console.log(update.data.updateUser.topthree)
            navigation.navigate('HomeScreen')
            
            } catch (e) {
                return (e)
            } 
        } else {
            alert ('Please select 3 genres')
        }
    }

    const GenreItem = ({id, genre} : any) => {

        const [isSelected, setIsSelected] = useState(false);

        return (
            <TouchableOpacity onPress={() => {
                if (TopThree.length < 3) {
                    AddRemoveGenre(id); setIsSelected(!isSelected)
                } else if (TopThree.length > 2 && TopThree.includes(id)) {
                    TopThree.splice(id);
                    setIsSelected(!isSelected)
                } else {null}
            }}
            >
                <View style={{margin: 10, paddingVertical: 6, paddingHorizontal: 10, borderWidth: 0.5, borderRadius: 30,
                    borderColor: isSelected ? 'cyan' : '#fff', 
                    backgroundColor: isSelected ? 'cyan' : 'transparent',
                }}>
                    <Text style={{textTransform: 'capitalize', color: isSelected ? '#000' : '#fff'}}>
                        {genre}
                    </Text>
                </View>
            </TouchableOpacity>
            
        )
    }

    const RenderItem = ({item} : any) => {
        return (
            <GenreItem 
                id={item.id}
                genre={item.genre}
            />
        )
    }

    return (
        <View>

            <View style={{margin: 40, alignSelf: 'center'}}>
                <Text style={styles.header}>
                    Welcome to Blip!
                </Text>

                <Text style={{fontSize: 16, marginTop: 20, color: '#fff'}}>
                    Select 3 of your favorite genres
                </Text>

            </View>

            <FlatList 
                data={genres}
                keyExtractor={item => item.id}
                renderItem={RenderItem}
                numColumns={3}
                style={{alignSelf: 'center'}}
            />

            <TouchableWithoutFeedback onPress={UpdateThree}>
                <View style={{alignSelf: 'center', width: 80, paddingVertical: 6, paddingHorizontal: 20, borderRadius: 30, borderWidth: 0.5, margin: 80, 
                    borderColor: 'cyan',
                    backgroundColor: 'cyan',
                }}>
                    <Text style={{textAlign: 'center',
                        fontSize: 16, color: '#000',
                    }}>
                        Next
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginTop: 20,
    },
});

export default SplashCarousel;