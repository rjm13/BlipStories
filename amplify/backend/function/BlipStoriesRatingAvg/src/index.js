const AWS = require('aws-sdk');
const { updateStory } = require("./graph/mutations.js");
const { listRatings } = require("./graph/queries.js");
const docClient = new AWS.DynamoDB.DocumentClient();

const STORY_TABLE = process.env.STORY_TABLE;
const RATING_TABLE = process.env.RATING_TABLE;

exports.handler = event => {
  event.Records.forEach(async (record) => {
    if (record.eventName == 'INSERT' || record.eventName == 'MODIFY') {
        await processRating(record.dynamodb.NewImage.storyID.S);
    }

    // Calculate the average rating
    async function processRating(id){
      var ratings = await getStoryRatings(id);
      console.log(ratings);
      var len = ratings.items.length;
      var average = [];
      if(len){
        for (let i = 0; i < len; i++) {
          average.push(ratings.items[i].rating) ;
        }
        average = Math.floor(((average.reduce((a, b) => {return a + b}))/(len))*10);
        console.log(average);
        await updateRating(id, average, len);
      }
    }

    // Get the all the ratings of a story by ID
    async function getStoryRatings(id) {
      var params = {
        TableName: RATING_TABLE,
        IndexName: "byStory",
        KeyConditionExpression: "storyID = :storyId",
        ExpressionAttributeValues: {
           ":storyId": id
        },
      };
      try {
        const data = await docClient.query(params).promise();
        console.log(data);
        return data;
      } catch (err) {
        return err;
      }
    }

    // Update the story average and total ratings
    async function updateRating(id, average, length){
      var params = {
        TableName: STORY_TABLE,
        Key: { id },
        UpdateExpression: "set #col1 = :avg, #col2 = :amt",
        ExpressionAttributeNames: {
          "#col1": "RatingAvg",
          '#col2': "RatingAmt"
        },
        ExpressionAttributeValues: {
            ":avg": average,
            ":amt": length
        }
      };
      try {
        const data = await docClient.update(params).promise();
        console.log(data);
        const response = data.Attributes;
        return response;
      } catch (err) {
        return err;
      }
    }

  });

  return Promise.resolve('Successfully processed DynamoDB record');
};


/**
 * 
 *   
let average = [];
  
const listTheRatings = await API.graphql(graphqlOperation(listRatings));

for (let i = 0; i < listTheRatings.data.listRatings.items.length; i++) {
        average.push(listTheRatings.data.listRatings.items[i].rating) ;
}
        
const Avg = Math.floor(((average.reduce((a, b) => {return a + b}))/(listTheRatings.data.listRatings.items.length))*10);

const updateTheStory = await API.graphql(graphqlOperation(updateStory, {id: event, ratingAvg: Avg}));

* 
*/