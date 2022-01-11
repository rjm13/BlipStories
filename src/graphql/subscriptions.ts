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
          narrator
          time
          description
          detailedDescription
          nsfw
          ratingAvg
          createdAt
          updatedAt
          tagStoriesId
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
          narrator
          time
          description
          detailedDescription
          nsfw
          ratingAvg
          createdAt
          updatedAt
          tagStoriesId
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
          narrator
          time
          description
          detailedDescription
          nsfw
          ratingAvg
          createdAt
          updatedAt
          tagStoriesId
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
          narrator
          time
          description
          detailedDescription
          nsfw
          ratingAvg
          createdAt
          updatedAt
          tagStoriesId
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
          narrator
          time
          description
          detailedDescription
          nsfw
          ratingAvg
          createdAt
          updatedAt
          tagStoriesId
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
          narrator
          time
          description
          detailedDescription
          nsfw
          ratingAvg
          createdAt
          updatedAt
          tagStoriesId
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
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        rated {
          id
          storyID
          userID
          rating
          createdAt
          updatedAt
          ratingStoryId
          ratingUserId
          owner
        }
        createdAt
        updatedAt
        tagStoriesId
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
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        rated {
          id
          storyID
          userID
          rating
          createdAt
          updatedAt
          ratingStoryId
          ratingUserId
          owner
        }
        createdAt
        updatedAt
        tagStoriesId
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
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        rated {
          id
          storyID
          userID
          rating
          createdAt
          updatedAt
          ratingStoryId
          ratingUserId
          owner
        }
        createdAt
        updatedAt
        tagStoriesId
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
        createdAt
        updatedAt
        owner
      }
      userID
      author
      narrator
      time
      description
      detailedDescription
      nsfw
      comments {
        items {
          id
          storyID
          content
          createdAt
          updatedAt
          storyCommentsId
          commentStoryId
          owner
        }
        nextToken
      }
      tags {
        items {
          id
          tagName
          createdAt
          updatedAt
          storyTagsId
          owner
        }
        nextToken
      }
      ratingAvg
      rated {
        id
        storyID
        story {
          id
          title
          imageUri
          audioUri
          genre
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          ratingAvg
          createdAt
          updatedAt
          tagStoriesId
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
        ratingStoryId
        ratingUserId
        owner
      }
      createdAt
      updatedAt
      tagStoriesId
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
        createdAt
        updatedAt
        owner
      }
      userID
      author
      narrator
      time
      description
      detailedDescription
      nsfw
      comments {
        items {
          id
          storyID
          content
          createdAt
          updatedAt
          storyCommentsId
          commentStoryId
          owner
        }
        nextToken
      }
      tags {
        items {
          id
          tagName
          createdAt
          updatedAt
          storyTagsId
          owner
        }
        nextToken
      }
      ratingAvg
      rated {
        id
        storyID
        story {
          id
          title
          imageUri
          audioUri
          genre
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          ratingAvg
          createdAt
          updatedAt
          tagStoriesId
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
        ratingStoryId
        ratingUserId
        owner
      }
      createdAt
      updatedAt
      tagStoriesId
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
        createdAt
        updatedAt
        owner
      }
      userID
      author
      narrator
      time
      description
      detailedDescription
      nsfw
      comments {
        items {
          id
          storyID
          content
          createdAt
          updatedAt
          storyCommentsId
          commentStoryId
          owner
        }
        nextToken
      }
      tags {
        items {
          id
          tagName
          createdAt
          updatedAt
          storyTagsId
          owner
        }
        nextToken
      }
      ratingAvg
      rated {
        id
        storyID
        story {
          id
          title
          imageUri
          audioUri
          genre
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          ratingAvg
          createdAt
          updatedAt
          tagStoriesId
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
        ratingStoryId
        ratingUserId
        owner
      }
      createdAt
      updatedAt
      tagStoriesId
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
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        rated {
          id
          storyID
          userID
          rating
          createdAt
          updatedAt
          ratingStoryId
          ratingUserId
          owner
        }
        createdAt
        updatedAt
        tagStoriesId
        owner
      }
      content
      createdAt
      updatedAt
      storyCommentsId
      commentStoryId
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
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        rated {
          id
          storyID
          userID
          rating
          createdAt
          updatedAt
          ratingStoryId
          ratingUserId
          owner
        }
        createdAt
        updatedAt
        tagStoriesId
        owner
      }
      content
      createdAt
      updatedAt
      storyCommentsId
      commentStoryId
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
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        rated {
          id
          storyID
          userID
          rating
          createdAt
          updatedAt
          ratingStoryId
          ratingUserId
          owner
        }
        createdAt
        updatedAt
        tagStoriesId
        owner
      }
      content
      createdAt
      updatedAt
      storyCommentsId
      commentStoryId
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
          title
          imageUri
          audioUri
          genre
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          ratingAvg
          createdAt
          updatedAt
          tagStoriesId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      storyTagsId
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
          title
          imageUri
          audioUri
          genre
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          ratingAvg
          createdAt
          updatedAt
          tagStoriesId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      storyTagsId
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
          title
          imageUri
          audioUri
          genre
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          ratingAvg
          createdAt
          updatedAt
          tagStoriesId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      storyTagsId
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
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        rated {
          id
          storyID
          userID
          rating
          createdAt
          updatedAt
          ratingStoryId
          ratingUserId
          owner
        }
        createdAt
        updatedAt
        tagStoriesId
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
        createdAt
        updatedAt
        owner
      }
      rating
      createdAt
      updatedAt
      ratingStoryId
      ratingUserId
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
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        rated {
          id
          storyID
          userID
          rating
          createdAt
          updatedAt
          ratingStoryId
          ratingUserId
          owner
        }
        createdAt
        updatedAt
        tagStoriesId
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
        createdAt
        updatedAt
        owner
      }
      rating
      createdAt
      updatedAt
      ratingStoryId
      ratingUserId
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
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        rated {
          id
          storyID
          userID
          rating
          createdAt
          updatedAt
          ratingStoryId
          ratingUserId
          owner
        }
        createdAt
        updatedAt
        tagStoriesId
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
        createdAt
        updatedAt
        owner
      }
      rating
      createdAt
      updatedAt
      ratingStoryId
      ratingUserId
      owner
    }
  }
`;
