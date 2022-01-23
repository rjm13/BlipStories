/* tslint:disable */
/* eslint-disable */

export const listFinishedStories = /* GraphQL */ `
  query ListFinishedStories(
    $filter: ModelFinishedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFinishedStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        user {
          id
          name
          email
          imageUri
          bio
          following
          numAuthored
          pseudonym
          birthdate
          isPublisher
          createdAt
          updatedAt
          owner
        }
        storyID
        story {
          id
          title
          imageUri
          audioUri
          userID
          author
          authorID
          narrator
          narratorID
          time
          summary
          description
          nsfw
          ratingAvg
          genreID
          genre {
            id
            genre
            icon
            PrimaryColor
          }
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

export const listPinnedStories = /* GraphQL */ `
  query ListPinnedStories(
    $filter: ModelPinnedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPinnedStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        user {
          id
          name
          email
          imageUri
          bio
          following
          numAuthored
          pseudonym
          birthdate
          isPublisher
          createdAt
          updatedAt
          owner
        }
        storyID
        story {
          id
          title
          imageUri
          audioUri
          userID
          author
          authorID
          narrator
          narratorID
          time
          summary
          description
          nsfw
          ratingAvg
          genre {
            id
            genre
            icon
            PrimaryColor
          }
          genreID
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

export const listRatings = /* GraphQL */ `
  query ListRatings(
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRatings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        storyID
        story {
          id
          title
          imageUri
          audioUri
          userID
          author
          authorID
          narrator
          narratorID
          time
          summary
          description
          nsfw
          ratingAvg
          genreID
          genre {
            id
            genre
            icon
            PrimaryColor
          }
          createdAt
          updatedAt
          owner
        }
        userID
        user {
          id
          name
          email
          imageUri
          bio
          following
          numAuthored
          pseudonym
          birthdate
          isPublisher
          createdAt
          updatedAt
          owner
        }
        rating
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

export const listStoryTags = /* GraphQL */ `
  query ListStoryTags(
    $filter: ModelStoryTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStoryTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        storyID
        tagID
        story {
          id
          title
          imageUri
          audioUri
          userID
          author
          authorID
          narrator
          narratorID
          time
          summary
          description
          nsfw
          ratingAvg
          genreID
          genre {
            id
            genre
            icon
            PrimaryColor
          }
          createdAt
          updatedAt
          owner
        }
        tag {
          id
          tagName
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;