/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      type
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
          artistName
          artistID
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
          numListens
          updatedAt
        }
        nextToken
      }
      narrated {
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
          artistName
          artistID
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
          numListens
          updatedAt
        }
        nextToken
      }
      sharedAssets {
        items {
          id
          type
          title
          audioUri
          time
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      art {
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
          artistName
          artistID
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
          numListens
          updatedAt
        }
        nextToken
      }
      numAuthored
      pseudonym
      narratorPseudo
      artistPseudo
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
          artistName
          artistID
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
          numListens
          updatedAt
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
          artistName
          artistID
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
          numListens
          updatedAt
        }
        nextToken
      }
      sampleUri
      narratorText
      accents
      voice
      artistText
      artStyles
      narratorActiveAt
      artistActiveAt
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      type
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
          artistName
          artistID
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
          numListens
          updatedAt
        }
        nextToken
      }
      narrated {
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
          artistName
          artistID
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
          numListens
          updatedAt
        }
        nextToken
      }
      sharedAssets {
        items {
          id
          type
          title
          audioUri
          time
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      art {
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
          artistName
          artistID
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
          numListens
          updatedAt
        }
        nextToken
      }
      numAuthored
      pseudonym
      narratorPseudo
      artistPseudo
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
          artistName
          artistID
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
          numListens
          updatedAt
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
          artistName
          artistID
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
          numListens
          updatedAt
        }
        nextToken
      }
      sampleUri
      narratorText
      accents
      voice
      artistText
      artStyles
      narratorActiveAt
      artistActiveAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      type
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
          artistName
          artistID
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
          numListens
          updatedAt
        }
        nextToken
      }
      narrated {
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
          artistName
          artistID
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
          numListens
          updatedAt
        }
        nextToken
      }
      sharedAssets {
        items {
          id
          type
          title
          audioUri
          time
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      art {
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
          artistName
          artistID
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
          numListens
          updatedAt
        }
        nextToken
      }
      numAuthored
      pseudonym
      narratorPseudo
      artistPseudo
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
          artistName
          artistID
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
          numListens
          updatedAt
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
          artistName
          artistID
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
          numListens
          updatedAt
        }
        nextToken
      }
      sampleUri
      narratorText
      accents
      voice
      artistText
      artStyles
      narratorActiveAt
      artistActiveAt
      createdAt
      updatedAt
    }
  }
`;
export const createFollowingConn = /* GraphQL */ `
  mutation CreateFollowingConn(
    $input: CreateFollowingConnInput!
    $condition: ModelFollowingConnConditionInput
  ) {
    createFollowingConn(input: $input, condition: $condition) {
      id
      followerID
      authorID
      author {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      follower {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateFollowingConn = /* GraphQL */ `
  mutation UpdateFollowingConn(
    $input: UpdateFollowingConnInput!
    $condition: ModelFollowingConnConditionInput
  ) {
    updateFollowingConn(input: $input, condition: $condition) {
      id
      followerID
      authorID
      author {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      follower {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteFollowingConn = /* GraphQL */ `
  mutation DeleteFollowingConn(
    $input: DeleteFollowingConnInput!
    $condition: ModelFollowingConnConditionInput
  ) {
    deleteFollowingConn(input: $input, condition: $condition) {
      id
      followerID
      authorID
      author {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      follower {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPinnedStory = /* GraphQL */ `
  mutation CreatePinnedStory(
    $input: CreatePinnedStoryInput!
    $condition: ModelPinnedStoryConditionInput
  ) {
    createPinnedStory(input: $input, condition: $condition) {
      id
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePinnedStory = /* GraphQL */ `
  mutation UpdatePinnedStory(
    $input: UpdatePinnedStoryInput!
    $condition: ModelPinnedStoryConditionInput
  ) {
    updatePinnedStory(input: $input, condition: $condition) {
      id
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePinnedStory = /* GraphQL */ `
  mutation DeletePinnedStory(
    $input: DeletePinnedStoryInput!
    $condition: ModelPinnedStoryConditionInput
  ) {
    deletePinnedStory(input: $input, condition: $condition) {
      id
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFinishedStory = /* GraphQL */ `
  mutation CreateFinishedStory(
    $input: CreateFinishedStoryInput!
    $condition: ModelFinishedStoryConditionInput
  ) {
    createFinishedStory(input: $input, condition: $condition) {
      id
      type
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateFinishedStory = /* GraphQL */ `
  mutation UpdateFinishedStory(
    $input: UpdateFinishedStoryInput!
    $condition: ModelFinishedStoryConditionInput
  ) {
    updateFinishedStory(input: $input, condition: $condition) {
      id
      type
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteFinishedStory = /* GraphQL */ `
  mutation DeleteFinishedStory(
    $input: DeleteFinishedStoryInput!
    $condition: ModelFinishedStoryConditionInput
  ) {
    deleteFinishedStory(input: $input, condition: $condition) {
      id
      type
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createStory = /* GraphQL */ `
  mutation CreateStory(
    $input: CreateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    createStory(input: $input, condition: $condition) {
      id
      type
      title
      imageUri
      audioUri
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      author
      authorID
      narrator
      narratorUser {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      narratorID
      artistName
      artist {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      artistID
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
      }
      hidden
      approved
      createdAt
      numListens
      updatedAt
    }
  }
`;
export const updateStory = /* GraphQL */ `
  mutation UpdateStory(
    $input: UpdateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    updateStory(input: $input, condition: $condition) {
      id
      type
      title
      imageUri
      audioUri
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      author
      authorID
      narrator
      narratorUser {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      narratorID
      artistName
      artist {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      artistID
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
      }
      hidden
      approved
      createdAt
      numListens
      updatedAt
    }
  }
`;
export const deleteStory = /* GraphQL */ `
  mutation DeleteStory(
    $input: DeleteStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    deleteStory(input: $input, condition: $condition) {
      id
      type
      title
      imageUri
      audioUri
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      author
      authorID
      narrator
      narratorUser {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      narratorID
      artistName
      artist {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      artistID
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
      }
      hidden
      approved
      createdAt
      numListens
      updatedAt
    }
  }
`;
export const createGenre = /* GraphQL */ `
  mutation CreateGenre(
    $input: CreateGenreInput!
    $condition: ModelGenreConditionInput
  ) {
    createGenre(input: $input, condition: $condition) {
      id
      genre
      icon
      PrimaryColor
      SecondaryColor
      imageUri
      createdAt
      updatedAt
    }
  }
`;
export const updateGenre = /* GraphQL */ `
  mutation UpdateGenre(
    $input: UpdateGenreInput!
    $condition: ModelGenreConditionInput
  ) {
    updateGenre(input: $input, condition: $condition) {
      id
      genre
      icon
      PrimaryColor
      SecondaryColor
      imageUri
      createdAt
      updatedAt
    }
  }
`;
export const deleteGenre = /* GraphQL */ `
  mutation DeleteGenre(
    $input: DeleteGenreInput!
    $condition: ModelGenreConditionInput
  ) {
    deleteGenre(input: $input, condition: $condition) {
      id
      genre
      icon
      PrimaryColor
      SecondaryColor
      imageUri
      createdAt
      updatedAt
    }
  }
`;
export const createImageAsset = /* GraphQL */ `
  mutation CreateImageAsset(
    $input: CreateImageAssetInput!
    $condition: ModelImageAssetConditionInput
  ) {
    createImageAsset(input: $input, condition: $condition) {
      id
      type
      title
      imageUri
      isSample
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      sharedUserID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateImageAsset = /* GraphQL */ `
  mutation UpdateImageAsset(
    $input: UpdateImageAssetInput!
    $condition: ModelImageAssetConditionInput
  ) {
    updateImageAsset(input: $input, condition: $condition) {
      id
      type
      title
      imageUri
      isSample
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      sharedUserID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteImageAsset = /* GraphQL */ `
  mutation DeleteImageAsset(
    $input: DeleteImageAssetInput!
    $condition: ModelImageAssetConditionInput
  ) {
    deleteImageAsset(input: $input, condition: $condition) {
      id
      type
      title
      imageUri
      isSample
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      sharedUserID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createAudioAsset = /* GraphQL */ `
  mutation CreateAudioAsset(
    $input: CreateAudioAssetInput!
    $condition: ModelAudioAssetConditionInput
  ) {
    createAudioAsset(input: $input, condition: $condition) {
      id
      type
      title
      audioUri
      time
      isSample
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      sharedUserID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateAudioAsset = /* GraphQL */ `
  mutation UpdateAudioAsset(
    $input: UpdateAudioAssetInput!
    $condition: ModelAudioAssetConditionInput
  ) {
    updateAudioAsset(input: $input, condition: $condition) {
      id
      type
      title
      audioUri
      time
      isSample
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      sharedUserID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteAudioAsset = /* GraphQL */ `
  mutation DeleteAudioAsset(
    $input: DeleteAudioAssetInput!
    $condition: ModelAudioAssetConditionInput
  ) {
    deleteAudioAsset(input: $input, condition: $condition) {
      id
      type
      title
      audioUri
      time
      isSample
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      sharedUserID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFlag = /* GraphQL */ `
  mutation CreateFlag(
    $input: CreateFlagInput!
    $condition: ModelFlagConditionInput
  ) {
    createFlag(input: $input, condition: $condition) {
      id
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      flagTypes
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
    }
  }
`;
export const updateFlag = /* GraphQL */ `
  mutation UpdateFlag(
    $input: UpdateFlagInput!
    $condition: ModelFlagConditionInput
  ) {
    updateFlag(input: $input, condition: $condition) {
      id
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      flagTypes
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
    }
  }
`;
export const deleteFlag = /* GraphQL */ `
  mutation DeleteFlag(
    $input: DeleteFlagInput!
    $condition: ModelFlagConditionInput
  ) {
    deleteFlag(input: $input, condition: $condition) {
      id
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      flagTypes
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      content
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      content
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      content
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
      }
      userID
      createdAt
      updatedAt
    }
  }
`;
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
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
      }
      stories {
        items {
          id
          storyID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
      }
      stories {
        items {
          id
          storyID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
      }
      stories {
        items {
          id
          storyID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createRating = /* GraphQL */ `
  mutation CreateRating(
    $input: CreateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    createRating(input: $input, condition: $condition) {
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
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
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
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateRating = /* GraphQL */ `
  mutation UpdateRating(
    $input: UpdateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    updateRating(input: $input, condition: $condition) {
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
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
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
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteRating = /* GraphQL */ `
  mutation DeleteRating(
    $input: DeleteRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    deleteRating(input: $input, condition: $condition) {
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
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
      }
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
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
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        createdAt
        updatedAt
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
      }
      createdAt
      updatedAt
    }
  }
`;
export const createStoryTag = /* GraphQL */ `
  mutation CreateStoryTag(
    $input: CreateStoryTagInput!
    $condition: ModelStoryTagConditionInput
  ) {
    createStoryTag(input: $input, condition: $condition) {
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
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
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
        }
        stories {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateStoryTag = /* GraphQL */ `
  mutation UpdateStoryTag(
    $input: UpdateStoryTagInput!
    $condition: ModelStoryTagConditionInput
  ) {
    updateStoryTag(input: $input, condition: $condition) {
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
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
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
        }
        stories {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteStoryTag = /* GraphQL */ `
  mutation DeleteStoryTag(
    $input: DeleteStoryTagInput!
    $condition: ModelStoryTagConditionInput
  ) {
    deleteStoryTag(input: $input, condition: $condition) {
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
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
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
          narratorActiveAt
          artistActiveAt
          createdAt
          updatedAt
        }
        artistID
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
        }
        hidden
        approved
        createdAt
        numListens
        updatedAt
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
        }
        stories {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
