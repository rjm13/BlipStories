import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import {graphqlOperation, API} from 'aws-amplify';
import { getStory, listRatings } from '../../src/graphql/queries';
import { createRating, updateRating } from '../../src/graphql/mutations';



const TestScript = () => {

    const [Story, setStory] = useState();

    const userID = 'ff452165-9e68-49f8-abb4-d9421a02a308'

    const [storyID, setStoryID] = useState('96857cb0-2ae4-4954-bebe-0c6b0bbd305f');

    const [isRated, setIsRated] = useState(false);

    const [ratingID, setRatingID] = useState()

    //get the story attributes using the storyID
    useEffect(() => {
        const fetchStory = async () => {
            try {
                const storyData = await API.graphql(graphqlOperation(getStory, {id: storyID}))

                if (storyData) {setStory(storyData.data.getStory);
                }
            } catch (e) {
                console.log(e);
            }}
        fetchStory();
    }, [])

    useEffect(() => {
        const fetchRating = async () => {
            let Rating = await API.graphql(graphqlOperation(
            listRatings, {filter: {
            userID: {
                eq: userID
            },
            storyID: {
                eq: storyID
            }
        }}
    ))
    if (Rating.data.listRatings.items.length === 1) {
        setIsRated(true);
        setRatingID(Rating.data.listRatings.items[0].id)
    } else {     
        setIsRated(false);
    }
        }
        fetchRating();
    },[])
    

    const SubmitRating = async () => {

        if (isRated === true) {
            let Rate = await API.graphql(graphqlOperation(
                updateRating, {input: {
                    id: ratingID,
                    rating: Math.floor(Math.random() * 100) + 1
                }}
            ))
            console.log(Rate)
        } else {
            let Rate = await API.graphql(graphqlOperation(
                createRating, {input: {
                    userID: userID, 
                    storyID: storyID,
                    rating: Math.floor(Math.random() * 10) + 1
                }}
            ))
        console.log(Rate)
        }
    }

    return (
        <View>
            <Text>
                Average Rating: {Story?.ratingAvg}
            </Text>
            <Text>
                Number of Ratings: {Story?.ratingAmt}
            </Text>
            <TouchableOpacity onPress={SubmitRating}>
                <Text>
                    Rate
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default TestScript;