/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      imageUri
      bio
      following
      authored {
        items {
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
          hidden
          approved
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      numAuthored
      pseudonym
      birthdate
      isPublisher
      isNarrator
      isArtist
      topthree
      followers {
        items {
          id
          followerID
          authorID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      Pinned {
        items {
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
          hidden
          approved
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      Rated {
        items {
          id
          type
          storyID
          userID
          rating
          genreID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      Finished {
        items {
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
          hidden
          approved
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getFollowingConn = /* GraphQL */ `
  query GetFollowingConn($id: ID!) {
    getFollowingConn(id: $id) {
      id
      followerID
      authorID
      author {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      follower {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listFollowingConns = /* GraphQL */ `
  query ListFollowingConns(
    $filter: ModelFollowingConnFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowingConns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        followerID
        authorID
        author {
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
        follower {
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getPinnedStory = /* GraphQL */ `
  query GetPinnedStory($id: ID!) {
    getPinnedStory(id: $id) {
      id
      userID
      user {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
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
      createdAt
      updatedAt
      owner
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
          hidden
          approved
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
export const getFinishedStory = /* GraphQL */ `
  query GetFinishedStory($id: ID!) {
    getFinishedStory(id: $id) {
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
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listFinishedStories = /* GraphQL */ `
  query ListFinishedStories(
    $filter: ModelFinishedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFinishedStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          hidden
          approved
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
export const getStory = /* GraphQL */ `
  query GetStory($id: ID!) {
    getStory(id: $id) {
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
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
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
        items {
          id
          type
          storyID
          content
          userID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      tags {
        items {
          id
          storyID
          tagID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      ratingAvg
      ratingAmt
      rated {
        items {
          id
          type
          storyID
          userID
          rating
          genreID
          createdAt
          updatedAt
          owner
        }
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
export const getGenre = /* GraphQL */ `
  query GetGenre($id: ID!) {
    getGenre(id: $id) {
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
  }
`;
export const listGenres = /* GraphQL */ `
  query ListGenres(
    $filter: ModelGenreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGenres(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getFlag = /* GraphQL */ `
  query GetFlag($id: ID!) {
    getFlag(id: $id) {
      id
      storyID
      story {
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
      flagTypes
      user {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      userID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listFlags = /* GraphQL */ `
  query ListFlags(
    $filter: ModelFlagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFlags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
          hidden
          approved
          createdAt
          updatedAt
          owner
        }
        flagTypes
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      type
      storyID
      story {
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
      content
      user {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      userID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
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
          hidden
          approved
          createdAt
          updatedAt
          owner
        }
        content
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      tagName
      nsfw
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
      stories {
        items {
          id
          storyID
          tagID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tagName
        nsfw
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
        stories {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getRating = /* GraphQL */ `
  query GetRating($id: ID!) {
    getRating(id: $id) {
      id
      type
      storyID
      story {
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
      userID
      user {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      rating
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
      createdAt
      updatedAt
      owner
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
        type
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
          hidden
          approved
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
          isNarrator
          isArtist
          topthree
          createdAt
          updatedAt
          owner
        }
        rating
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getStoryTag = /* GraphQL */ `
  query GetStoryTag($id: ID!) {
    getStoryTag(id: $id) {
      id
      storyID
      tagID
      story {
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
      tag {
        id
        tagName
        nsfw
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
        stories {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
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
          hidden
          approved
          createdAt
          updatedAt
          owner
        }
        tag {
          id
          tagName
          nsfw
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
          hidden
          approved
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
export const storiesByDate = /* GraphQL */ `
  query StoriesByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByDate(
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
export const commentsByDate = /* GraphQL */ `
  query CommentsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByDate(
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
          hidden
          approved
          createdAt
          updatedAt
          owner
        }
        content
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const ratingsByDate = /* GraphQL */ `
  query RatingsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ratingsByDate(
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
          hidden
          approved
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
          isNarrator
          isArtist
          topthree
          createdAt
          updatedAt
          owner
        }
        rating
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
