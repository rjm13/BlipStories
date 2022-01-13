/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
          authorID
          narrator
          narratorID
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
          authorID
          narrator
          narratorID
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
          authorID
          narrator
          narratorID
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
export const createPinnedStory = /* GraphQL */ `
  mutation CreatePinnedStory(
    $input: CreatePinnedStoryInput!
    $condition: ModelPinnedStoryConditionInput
  ) {
    createPinnedStory(input: $input, condition: $condition) {
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
        authorID
        narrator
        narratorID
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
export const updatePinnedStory = /* GraphQL */ `
  mutation UpdatePinnedStory(
    $input: UpdatePinnedStoryInput!
    $condition: ModelPinnedStoryConditionInput
  ) {
    updatePinnedStory(input: $input, condition: $condition) {
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
        authorID
        narrator
        narratorID
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
export const deletePinnedStory = /* GraphQL */ `
  mutation DeletePinnedStory(
    $input: DeletePinnedStoryInput!
    $condition: ModelPinnedStoryConditionInput
  ) {
    deletePinnedStory(input: $input, condition: $condition) {
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
        authorID
        narrator
        narratorID
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
export const createStory = /* GraphQL */ `
  mutation CreateStory(
    $input: CreateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    createStory(input: $input, condition: $condition) {
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
      authorID
      narrator
      narratorID
      time
      description
      detailedDescription
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
          authorID
          narrator
          narratorID
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
export const updateStory = /* GraphQL */ `
  mutation UpdateStory(
    $input: UpdateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    updateStory(input: $input, condition: $condition) {
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
      authorID
      narrator
      narratorID
      time
      description
      detailedDescription
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
          authorID
          narrator
          narratorID
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
export const deleteStory = /* GraphQL */ `
  mutation DeleteStory(
    $input: DeleteStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    deleteStory(input: $input, condition: $condition) {
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
      authorID
      narrator
      narratorID
      time
      description
      detailedDescription
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
          authorID
          narrator
          narratorID
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      stories {
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
          authorID
          narrator
          narratorID
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
          authorID
          narrator
          narratorID
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
export const createRating = /* GraphQL */ `
  mutation CreateRating(
    $input: CreateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    createRating(input: $input, condition: $condition) {
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
export const updateRating = /* GraphQL */ `
  mutation UpdateRating(
    $input: UpdateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    updateRating(input: $input, condition: $condition) {
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
export const deleteRating = /* GraphQL */ `
  mutation DeleteRating(
    $input: DeleteRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    deleteRating(input: $input, condition: $condition) {
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
