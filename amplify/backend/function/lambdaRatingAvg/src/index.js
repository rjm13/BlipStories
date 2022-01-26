
exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};


//in the backend, run a function that calculates the average rating of a story, 
//that updates every time a new rating for that story is created

//user adds rating to a story: createRating(input: userID, storyID, rating)
//this triggers the lambda function: 
// 1. get all of the ratings for a story
// 2. calculate the new average rating for that story
// 3. update the story with the new rating


