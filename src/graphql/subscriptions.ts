/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
          updatedAt
          numListens
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
          updatedAt
          numListens
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
          updatedAt
          numListens
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
          type
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
          userID
          storyID
          createdAt
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
          userID
          storyID
          createdAt
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
          updatedAt
          numListens
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
          updatedAt
          numListens
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
          updatedAt
          numListens
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
          type
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
          userID
          storyID
          createdAt
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
          userID
          storyID
          createdAt
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
          updatedAt
          numListens
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
          updatedAt
          numListens
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
          updatedAt
          numListens
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
          type
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
          userID
          storyID
          createdAt
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
          userID
          storyID
          createdAt
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
export const onCreateFollowingConn = /* GraphQL */ `
  subscription OnCreateFollowingConn {
    onCreateFollowingConn {
      id
      type
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
export const onUpdateFollowingConn = /* GraphQL */ `
  subscription OnUpdateFollowingConn {
    onUpdateFollowingConn {
      id
      type
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
export const onDeleteFollowingConn = /* GraphQL */ `
  subscription OnDeleteFollowingConn {
    onDeleteFollowingConn {
      id
      type
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
export const onCreatePinnedStory = /* GraphQL */ `
  subscription OnCreatePinnedStory {
    onCreatePinnedStory {
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
        updatedAt
        numListens
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePinnedStory = /* GraphQL */ `
  subscription OnUpdatePinnedStory {
    onUpdatePinnedStory {
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
        updatedAt
        numListens
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePinnedStory = /* GraphQL */ `
  subscription OnDeletePinnedStory {
    onDeletePinnedStory {
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
        updatedAt
        numListens
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFinishedStory = /* GraphQL */ `
  subscription OnCreateFinishedStory {
    onCreateFinishedStory {
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
        updatedAt
        numListens
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFinishedStory = /* GraphQL */ `
  subscription OnUpdateFinishedStory {
    onUpdateFinishedStory {
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
        updatedAt
        numListens
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFinishedStory = /* GraphQL */ `
  subscription OnDeleteFinishedStory {
    onDeleteFinishedStory {
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
        updatedAt
        numListens
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStory = /* GraphQL */ `
  subscription OnCreateStory {
    onCreateStory {
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
      updatedAt
      numListens
    }
  }
`;
export const onUpdateStory = /* GraphQL */ `
  subscription OnUpdateStory {
    onUpdateStory {
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
      updatedAt
      numListens
    }
  }
`;
export const onDeleteStory = /* GraphQL */ `
  subscription OnDeleteStory {
    onDeleteStory {
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
      updatedAt
      numListens
    }
  }
`;
export const onCreateGenre = /* GraphQL */ `
  subscription OnCreateGenre {
    onCreateGenre {
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
export const onUpdateGenre = /* GraphQL */ `
  subscription OnUpdateGenre {
    onUpdateGenre {
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
export const onDeleteGenre = /* GraphQL */ `
  subscription OnDeleteGenre {
    onDeleteGenre {
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
export const onCreateImageAsset = /* GraphQL */ `
  subscription OnCreateImageAsset {
    onCreateImageAsset {
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
export const onUpdateImageAsset = /* GraphQL */ `
  subscription OnUpdateImageAsset {
    onUpdateImageAsset {
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
export const onDeleteImageAsset = /* GraphQL */ `
  subscription OnDeleteImageAsset {
    onDeleteImageAsset {
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
export const onCreateDocumentAsset = /* GraphQL */ `
  subscription OnCreateDocumentAsset {
    onCreateDocumentAsset {
      id
      type
      title
      docUri
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
export const onUpdateDocumentAsset = /* GraphQL */ `
  subscription OnUpdateDocumentAsset {
    onUpdateDocumentAsset {
      id
      type
      title
      docUri
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
export const onDeleteDocumentAsset = /* GraphQL */ `
  subscription OnDeleteDocumentAsset {
    onDeleteDocumentAsset {
      id
      type
      title
      docUri
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
export const onCreateAudioAsset = /* GraphQL */ `
  subscription OnCreateAudioAsset {
    onCreateAudioAsset {
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
export const onUpdateAudioAsset = /* GraphQL */ `
  subscription OnUpdateAudioAsset {
    onUpdateAudioAsset {
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
export const onDeleteAudioAsset = /* GraphQL */ `
  subscription OnDeleteAudioAsset {
    onDeleteAudioAsset {
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
export const onCreateFlag = /* GraphQL */ `
  subscription OnCreateFlag {
    onCreateFlag {
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
        updatedAt
        numListens
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
export const onUpdateFlag = /* GraphQL */ `
  subscription OnUpdateFlag {
    onUpdateFlag {
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
        updatedAt
        numListens
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
export const onDeleteFlag = /* GraphQL */ `
  subscription OnDeleteFlag {
    onDeleteFlag {
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
        updatedAt
        numListens
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
        updatedAt
        numListens
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
        updatedAt
        numListens
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
        updatedAt
        numListens
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
      id
      type
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
      updatedAt
      createdAt
    }
  }
`;
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
      id
      type
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
      updatedAt
      createdAt
    }
  }
`;
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
      id
      type
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
      updatedAt
      createdAt
    }
  }
`;
export const onCreateRating = /* GraphQL */ `
  subscription OnCreateRating {
    onCreateRating {
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
        updatedAt
        numListens
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
export const onUpdateRating = /* GraphQL */ `
  subscription OnUpdateRating {
    onUpdateRating {
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
        updatedAt
        numListens
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
export const onDeleteRating = /* GraphQL */ `
  subscription OnDeleteRating {
    onDeleteRating {
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
        updatedAt
        numListens
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      type
      title
      subtitle
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
      otherUserID
      otherUser {
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
      isReadbyRec
      isReadBySender
      replies {
        items {
          id
          type
          content
          createdAt
          isRead
          messageID
          userID
          updatedAt
        }
        nextToken
      }
      docID
      doc {
        id
        type
        title
        docUri
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
        sharedUserID
        sharedUser {
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
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      type
      title
      subtitle
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
      otherUserID
      otherUser {
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
      isReadbyRec
      isReadBySender
      replies {
        items {
          id
          type
          content
          createdAt
          isRead
          messageID
          userID
          updatedAt
        }
        nextToken
      }
      docID
      doc {
        id
        type
        title
        docUri
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
        sharedUserID
        sharedUser {
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
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      type
      title
      subtitle
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
      otherUserID
      otherUser {
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
      isReadbyRec
      isReadBySender
      replies {
        items {
          id
          type
          content
          createdAt
          isRead
          messageID
          userID
          updatedAt
        }
        nextToken
      }
      docID
      doc {
        id
        type
        title
        docUri
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
        sharedUserID
        sharedUser {
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
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onCreateReply = /* GraphQL */ `
  subscription OnCreateReply {
    onCreateReply {
      id
      type
      content
      createdAt
      isRead
      messageID
      message {
        id
        type
        title
        subtitle
        content
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
        otherUserID
        otherUser {
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
        createdAt
        isReadbyRec
        isReadBySender
        replies {
          nextToken
        }
        docID
        doc {
          id
          type
          title
          docUri
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        updatedAt
      }
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
      updatedAt
    }
  }
`;
export const onUpdateReply = /* GraphQL */ `
  subscription OnUpdateReply {
    onUpdateReply {
      id
      type
      content
      createdAt
      isRead
      messageID
      message {
        id
        type
        title
        subtitle
        content
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
        otherUserID
        otherUser {
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
        createdAt
        isReadbyRec
        isReadBySender
        replies {
          nextToken
        }
        docID
        doc {
          id
          type
          title
          docUri
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        updatedAt
      }
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
      updatedAt
    }
  }
`;
export const onDeleteReply = /* GraphQL */ `
  subscription OnDeleteReply {
    onDeleteReply {
      id
      type
      content
      createdAt
      isRead
      messageID
      message {
        id
        type
        title
        subtitle
        content
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
        otherUserID
        otherUser {
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
        createdAt
        isReadbyRec
        isReadBySender
        replies {
          nextToken
        }
        docID
        doc {
          id
          type
          title
          docUri
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        updatedAt
      }
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
      updatedAt
    }
  }
`;
export const onCreateStoryTag = /* GraphQL */ `
  subscription OnCreateStoryTag {
    onCreateStoryTag {
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
        updatedAt
        numListens
      }
      tag {
        id
        type
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
        updatedAt
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStoryTag = /* GraphQL */ `
  subscription OnUpdateStoryTag {
    onUpdateStoryTag {
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
        updatedAt
        numListens
      }
      tag {
        id
        type
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
        updatedAt
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStoryTag = /* GraphQL */ `
  subscription OnDeleteStoryTag {
    onDeleteStoryTag {
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
        updatedAt
        numListens
      }
      tag {
        id
        type
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
        updatedAt
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
