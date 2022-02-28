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
          approved
          hidden
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
          approved
          hidden
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
          approved
          hidden
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
          approved
          hidden
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
export const finishedStoriesByDate = /* GraphQL */ `
  query FinishedStoriesByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFinishedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    finishedStoriesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
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
          isNarrator
          isArtist
          topthree
          createdAt
          updatedAt
          owner
        }
        storyID
        story {
          id
          type
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
          ratingAmt
          genreID
          genre {
            id
            genre
            icon
            PrimaryColor
            SecondaryColor
            imageUri
            createdAt
            updatedAt
            owner
          }
          hidden
          approved
          createdAt
          numListens
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
export const listStories = /* GraphQL */ `
  query ListStories(
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        title
        imageUri
        audioUri
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
          isNarrator
          isArtist
          topthree
          createdAt
          updatedAt
          owner
        }
        userID
        author
        authorID
        narrator
        narratorID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
          owner
        }
        hidden
        approved
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listAudioAssets = /* GraphQL */ `
  query ListAudioAssets(
    $filter: ModelAudioAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAudioAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        title
        audioUri
        time
        isSample
        user {
          id
          name
          email
          imageUri
          bio
          following
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          createdAt
          updatedAt
          owner
        }
        userID
        sharedUserID
        sharedUser {
          id
          name
          email
          imageUri
          bio
          following
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
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
