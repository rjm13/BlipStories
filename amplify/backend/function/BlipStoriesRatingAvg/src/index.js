const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const { updateStory } = require("./graph/mutations.js");
const { listRatings } = require("./graph/queries.js");

exports.handler = event => {
  event.Records.forEach(record => {
    if (record.eventName == 'INSERT' || record.eventName == 'UPDATE') {
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
    }
  });

  return Promise.resolve('Successfully processed DynamoDB record');
};
