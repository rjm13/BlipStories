/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
      id
      name
      email
      imageUri
      bio
      following
      authored {
        items {
          id
          title
          imageUri
          audioUri
          genre
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
          title
          imageUri
          audioUri
          genre
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
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      Rated {
        items {
          id
          storyID
          userID
          rating
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
      id
      name
      email
      imageUri
      bio
      following
      authored {
        items {
          id
          title
          imageUri
          audioUri
          genre
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
          title
          imageUri
          audioUri
          genre
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
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      Rated {
        items {
          id
          storyID
          userID
          rating
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
      id
      name
      email
      imageUri
      bio
      following
      authored {
        items {
          id
          title
          imageUri
          audioUri
          genre
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
          title
          imageUri
          audioUri
          genre
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
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      Rated {
        items {
          id
          storyID
          userID
          rating
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
export const onCreateFollowingConn = /* GraphQL */ `
  subscription OnCreateFollowingConn($owner: String) {
    onCreateFollowingConn(owner: $owner) {
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
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
export const onUpdateFollowingConn = /* GraphQL */ `
  subscription OnUpdateFollowingConn($owner: String) {
    onUpdateFollowingConn(owner: $owner) {
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
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
export const onDeleteFollowingConn = /* GraphQL */ `
  subscription OnDeleteFollowingConn($owner: String) {
    onDeleteFollowingConn(owner: $owner) {
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
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
export const onCreatePinnedStory = /* GraphQL */ `
  subscription OnCreatePinnedStory($owner: String) {
    onCreatePinnedStory(owner: $owner) {
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
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
        genre
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
        rated {
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
export const onUpdatePinnedStory = /* GraphQL */ `
  subscription OnUpdatePinnedStory($owner: String) {
    onUpdatePinnedStory(owner: $owner) {
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
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
        genre
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
        rated {
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
export const onDeletePinnedStory = /* GraphQL */ `
  subscription OnDeletePinnedStory($owner: String) {
    onDeletePinnedStory(owner: $owner) {
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
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
        genre
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
        rated {
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
export const onCreateStory = /* GraphQL */ `
  subscription OnCreateStory($owner: String) {
    onCreateStory(owner: $owner) {
      id
      title
      imageUri
      audioUri
      genre
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
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
      rated {
        items {
          id
          storyID
          userID
          rating
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
export const onUpdateStory = /* GraphQL */ `
  subscription OnUpdateStory($owner: String) {
    onUpdateStory(owner: $owner) {
      id
      title
      imageUri
      audioUri
      genre
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
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
      rated {
        items {
          id
          storyID
          userID
          rating
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
export const onDeleteStory = /* GraphQL */ `
  subscription OnDeleteStory($owner: String) {
    onDeleteStory(owner: $owner) {
      id
      title
      imageUri
      audioUri
      genre
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
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
      rated {
        items {
          id
          storyID
          userID
          rating
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($owner: String) {
    onCreateComment(owner: $owner) {
      id
      storyID
      story {
        id
        title
        imageUri
        audioUri
        genre
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
        rated {
          nextToken
        }
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($owner: String) {
    onUpdateComment(owner: $owner) {
      id
      storyID
      story {
        id
        title
        imageUri
        audioUri
        genre
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
        rated {
          nextToken
        }
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($owner: String) {
    onDeleteComment(owner: $owner) {
      id
      storyID
      story {
        id
        title
        imageUri
        audioUri
        genre
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
        rated {
          nextToken
        }
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
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag($owner: String) {
    onCreateTag(owner: $owner) {
      id
      tagName
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag($owner: String) {
    onUpdateTag(owner: $owner) {
      id
      tagName
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag($owner: String) {
    onDeleteTag(owner: $owner) {
      id
      tagName
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
export const onCreateRating = /* GraphQL */ `
  subscription OnCreateRating($owner: String) {
    onCreateRating(owner: $owner) {
      id
      storyID
      story {
        id
        title
        imageUri
        audioUri
        genre
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
        rated {
          nextToken
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
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      rating
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateRating = /* GraphQL */ `
  subscription OnUpdateRating($owner: String) {
    onUpdateRating(owner: $owner) {
      id
      storyID
      story {
        id
        title
        imageUri
        audioUri
        genre
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
        rated {
          nextToken
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
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      rating
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteRating = /* GraphQL */ `
  subscription OnDeleteRating($owner: String) {
    onDeleteRating(owner: $owner) {
      id
      storyID
      story {
        id
        title
        imageUri
        audioUri
        genre
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
        rated {
          nextToken
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
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      rating
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateStoryTag = /* GraphQL */ `
  subscription OnCreateStoryTag($owner: String) {
    onCreateStoryTag(owner: $owner) {
      id
      storyID
      tagID
      story {
        id
        title
        imageUri
        audioUri
        genre
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
        rated {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      tag {
        id
        tagName
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
export const onUpdateStoryTag = /* GraphQL */ `
  subscription OnUpdateStoryTag($owner: String) {
    onUpdateStoryTag(owner: $owner) {
      id
      storyID
      tagID
      story {
        id
        title
        imageUri
        audioUri
        genre
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
        rated {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      tag {
        id
        tagName
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
export const onDeleteStoryTag = /* GraphQL */ `
  subscription OnDeleteStoryTag($owner: String) {
    onDeleteStoryTag(owner: $owner) {
      id
      storyID
      tagID
      story {
        id
        title
        imageUri
        audioUri
        genre
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
        rated {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      tag {
        id
        tagName
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
