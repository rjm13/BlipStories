/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name?: string | null,
  email: string,
  imageUri?: string | null,
  bio?: string | null,
  following?: Array< string | null > | null,
  numAuthored?: number | null,
  pseudonym?: string | null,
  birthdate?: string | null,
  isPublisher?: boolean | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  following?: ModelIDInput | null,
  numAuthored?: ModelIntInput | null,
  pseudonym?: ModelStringInput | null,
  birthdate?: ModelStringInput | null,
  isPublisher?: ModelBooleanInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  name?: string | null,
  email: string,
  imageUri?: string | null,
  bio?: string | null,
  following?: Array< string | null > | null,
  authored?: ModelStoryConnection | null,
  numAuthored?: number | null,
  pseudonym?: string | null,
  birthdate?: string | null,
  isPublisher?: boolean | null,
  followers?: ModelFollowingConnConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelStoryConnection = {
  __typename: "ModelStoryConnection",
  items:  Array<Story | null >,
  nextToken?: string | null,
};

export type Story = {
  __typename: "Story",
  id: string,
  title: string,
  imageUri?: string | null,
  audioUri: string,
  genre?: string | null,
  user?: User | null,
  userID?: string | null,
  author?: string | null,
  narrator?: string | null,
  time?: number | null,
  description?: string | null,
  detailedDescription?: Array< string | null > | null,
  nsfw?: boolean | null,
  comments?: ModelCommentConnection | null,
  tags?: ModelTagConnection | null,
  createdAt: string,
  updatedAt: string,
  tagStoriesId?: string | null,
  owner?: string | null,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items:  Array<Comment | null >,
  nextToken?: string | null,
};

export type Comment = {
  __typename: "Comment",
  id: string,
  storyID: string,
  story?: Story | null,
  content: string,
  createdAt: string,
  updatedAt: string,
  storyCommentsId?: string | null,
  commentStoryId?: string | null,
  owner?: string | null,
};

export type ModelTagConnection = {
  __typename: "ModelTagConnection",
  items:  Array<Tag | null >,
  nextToken?: string | null,
};

export type Tag = {
  __typename: "Tag",
  id: string,
  tagName: string,
  stories?: ModelStoryConnection | null,
  createdAt: string,
  updatedAt: string,
  storyTagsId?: string | null,
  owner?: string | null,
};

export type ModelFollowingConnConnection = {
  __typename: "ModelFollowingConnConnection",
  items:  Array<FollowingConn | null >,
  nextToken?: string | null,
};

export type FollowingConn = {
  __typename: "FollowingConn",
  id: string,
  followerID?: string | null,
  authorID?: string | null,
  author?: User | null,
  follower?: User | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  imageUri?: string | null,
  bio?: string | null,
  following?: Array< string | null > | null,
  numAuthored?: number | null,
  pseudonym?: string | null,
  birthdate?: string | null,
  isPublisher?: boolean | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateFollowingConnInput = {
  id?: string | null,
  followerID?: string | null,
  authorID?: string | null,
};

export type ModelFollowingConnConditionInput = {
  followerID?: ModelIDInput | null,
  authorID?: ModelIDInput | null,
  and?: Array< ModelFollowingConnConditionInput | null > | null,
  or?: Array< ModelFollowingConnConditionInput | null > | null,
  not?: ModelFollowingConnConditionInput | null,
};

export type UpdateFollowingConnInput = {
  id: string,
  followerID?: string | null,
  authorID?: string | null,
};

export type DeleteFollowingConnInput = {
  id: string,
};

export type CreateStoryInput = {
  id?: string | null,
  title: string,
  imageUri?: string | null,
  audioUri: string,
  genre?: string | null,
  userID?: string | null,
  author?: string | null,
  narrator?: string | null,
  time?: number | null,
  description?: string | null,
  detailedDescription?: Array< string | null > | null,
  nsfw?: boolean | null,
  tagStoriesId?: string | null,
};

export type ModelStoryConditionInput = {
  title?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  audioUri?: ModelStringInput | null,
  genre?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  author?: ModelStringInput | null,
  narrator?: ModelStringInput | null,
  time?: ModelIntInput | null,
  description?: ModelStringInput | null,
  detailedDescription?: ModelStringInput | null,
  nsfw?: ModelBooleanInput | null,
  and?: Array< ModelStoryConditionInput | null > | null,
  or?: Array< ModelStoryConditionInput | null > | null,
  not?: ModelStoryConditionInput | null,
  tagStoriesId?: ModelIDInput | null,
};

export type UpdateStoryInput = {
  id: string,
  title?: string | null,
  imageUri?: string | null,
  audioUri?: string | null,
  genre?: string | null,
  userID?: string | null,
  author?: string | null,
  narrator?: string | null,
  time?: number | null,
  description?: string | null,
  detailedDescription?: Array< string | null > | null,
  nsfw?: boolean | null,
  tagStoriesId?: string | null,
};

export type DeleteStoryInput = {
  id: string,
};

export type CreateCommentInput = {
  id?: string | null,
  storyID: string,
  content: string,
  storyCommentsId?: string | null,
  commentStoryId?: string | null,
};

export type ModelCommentConditionInput = {
  storyID?: ModelIDInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
  storyCommentsId?: ModelIDInput | null,
  commentStoryId?: ModelIDInput | null,
};

export type UpdateCommentInput = {
  id: string,
  storyID?: string | null,
  content?: string | null,
  storyCommentsId?: string | null,
  commentStoryId?: string | null,
};

export type DeleteCommentInput = {
  id: string,
};

export type CreateTagInput = {
  id?: string | null,
  tagName: string,
  storyTagsId?: string | null,
};

export type ModelTagConditionInput = {
  tagName?: ModelStringInput | null,
  and?: Array< ModelTagConditionInput | null > | null,
  or?: Array< ModelTagConditionInput | null > | null,
  not?: ModelTagConditionInput | null,
  storyTagsId?: ModelIDInput | null,
};

export type UpdateTagInput = {
  id: string,
  tagName?: string | null,
  storyTagsId?: string | null,
};

export type DeleteTagInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  following?: ModelIDInput | null,
  numAuthored?: ModelIntInput | null,
  pseudonym?: ModelStringInput | null,
  birthdate?: ModelStringInput | null,
  isPublisher?: ModelBooleanInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelFollowingConnFilterInput = {
  id?: ModelIDInput | null,
  followerID?: ModelIDInput | null,
  authorID?: ModelIDInput | null,
  and?: Array< ModelFollowingConnFilterInput | null > | null,
  or?: Array< ModelFollowingConnFilterInput | null > | null,
  not?: ModelFollowingConnFilterInput | null,
};

export type ModelStoryFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  audioUri?: ModelStringInput | null,
  genre?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  author?: ModelStringInput | null,
  narrator?: ModelStringInput | null,
  time?: ModelIntInput | null,
  description?: ModelStringInput | null,
  detailedDescription?: ModelStringInput | null,
  nsfw?: ModelBooleanInput | null,
  and?: Array< ModelStoryFilterInput | null > | null,
  or?: Array< ModelStoryFilterInput | null > | null,
  not?: ModelStoryFilterInput | null,
  tagStoriesId?: ModelIDInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  storyID?: ModelIDInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
  storyCommentsId?: ModelIDInput | null,
  commentStoryId?: ModelIDInput | null,
};

export type ModelTagFilterInput = {
  id?: ModelIDInput | null,
  tagName?: ModelStringInput | null,
  and?: Array< ModelTagFilterInput | null > | null,
  or?: Array< ModelTagFilterInput | null > | null,
  not?: ModelTagFilterInput | null,
  storyTagsId?: ModelIDInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?: Array< string | null > | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAuthored?: number | null,
    pseudonym?: string | null,
    birthdate?: string | null,
    isPublisher?: boolean | null,
    followers?:  {
      __typename: "ModelFollowingConnConnection",
      items:  Array< {
        __typename: "FollowingConn",
        id: string,
        followerID?: string | null,
        authorID?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?: Array< string | null > | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAuthored?: number | null,
    pseudonym?: string | null,
    birthdate?: string | null,
    isPublisher?: boolean | null,
    followers?:  {
      __typename: "ModelFollowingConnConnection",
      items:  Array< {
        __typename: "FollowingConn",
        id: string,
        followerID?: string | null,
        authorID?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?: Array< string | null > | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAuthored?: number | null,
    pseudonym?: string | null,
    birthdate?: string | null,
    isPublisher?: boolean | null,
    followers?:  {
      __typename: "ModelFollowingConnConnection",
      items:  Array< {
        __typename: "FollowingConn",
        id: string,
        followerID?: string | null,
        authorID?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateFollowingConnMutationVariables = {
  input: CreateFollowingConnInput,
  condition?: ModelFollowingConnConditionInput | null,
};

export type CreateFollowingConnMutation = {
  createFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    followerID?: string | null,
    authorID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateFollowingConnMutationVariables = {
  input: UpdateFollowingConnInput,
  condition?: ModelFollowingConnConditionInput | null,
};

export type UpdateFollowingConnMutation = {
  updateFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    followerID?: string | null,
    authorID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteFollowingConnMutationVariables = {
  input: DeleteFollowingConnInput,
  condition?: ModelFollowingConnConditionInput | null,
};

export type DeleteFollowingConnMutation = {
  deleteFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    followerID?: string | null,
    authorID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateStoryMutationVariables = {
  input: CreateStoryInput,
  condition?: ModelStoryConditionInput | null,
};

export type CreateStoryMutation = {
  createStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID?: string | null,
    author?: string | null,
    narrator?: string | null,
    time?: number | null,
    description?: string | null,
    detailedDescription?: Array< string | null > | null,
    nsfw?: boolean | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        storyCommentsId?: string | null,
        commentStoryId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        tagName: string,
        createdAt: string,
        updatedAt: string,
        storyTagsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    tagStoriesId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateStoryMutationVariables = {
  input: UpdateStoryInput,
  condition?: ModelStoryConditionInput | null,
};

export type UpdateStoryMutation = {
  updateStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID?: string | null,
    author?: string | null,
    narrator?: string | null,
    time?: number | null,
    description?: string | null,
    detailedDescription?: Array< string | null > | null,
    nsfw?: boolean | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        storyCommentsId?: string | null,
        commentStoryId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        tagName: string,
        createdAt: string,
        updatedAt: string,
        storyTagsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    tagStoriesId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteStoryMutationVariables = {
  input: DeleteStoryInput,
  condition?: ModelStoryConditionInput | null,
};

export type DeleteStoryMutation = {
  deleteStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID?: string | null,
    author?: string | null,
    narrator?: string | null,
    time?: number | null,
    description?: string | null,
    detailedDescription?: Array< string | null > | null,
    nsfw?: boolean | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        storyCommentsId?: string | null,
        commentStoryId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        tagName: string,
        createdAt: string,
        updatedAt: string,
        storyTagsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    tagStoriesId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre?: string | null,
      user?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        following?: Array< string | null > | null,
        numAuthored?: number | null,
        pseudonym?: string | null,
        birthdate?: string | null,
        isPublisher?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      userID?: string | null,
      author?: string | null,
      narrator?: string | null,
      time?: number | null,
      description?: string | null,
      detailedDescription?: Array< string | null > | null,
      nsfw?: boolean | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      tags?:  {
        __typename: "ModelTagConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      tagStoriesId?: string | null,
      owner?: string | null,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    storyCommentsId?: string | null,
    commentStoryId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre?: string | null,
      user?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        following?: Array< string | null > | null,
        numAuthored?: number | null,
        pseudonym?: string | null,
        birthdate?: string | null,
        isPublisher?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      userID?: string | null,
      author?: string | null,
      narrator?: string | null,
      time?: number | null,
      description?: string | null,
      detailedDescription?: Array< string | null > | null,
      nsfw?: boolean | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      tags?:  {
        __typename: "ModelTagConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      tagStoriesId?: string | null,
      owner?: string | null,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    storyCommentsId?: string | null,
    commentStoryId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre?: string | null,
      user?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        following?: Array< string | null > | null,
        numAuthored?: number | null,
        pseudonym?: string | null,
        birthdate?: string | null,
        isPublisher?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      userID?: string | null,
      author?: string | null,
      narrator?: string | null,
      time?: number | null,
      description?: string | null,
      detailedDescription?: Array< string | null > | null,
      nsfw?: boolean | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      tags?:  {
        __typename: "ModelTagConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      tagStoriesId?: string | null,
      owner?: string | null,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    storyCommentsId?: string | null,
    commentStoryId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateTagMutationVariables = {
  input: CreateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type CreateTagMutation = {
  createTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    stories?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    storyTagsId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateTagMutationVariables = {
  input: UpdateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type UpdateTagMutation = {
  updateTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    stories?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    storyTagsId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteTagMutationVariables = {
  input: DeleteTagInput,
  condition?: ModelTagConditionInput | null,
};

export type DeleteTagMutation = {
  deleteTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    stories?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    storyTagsId?: string | null,
    owner?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?: Array< string | null > | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAuthored?: number | null,
    pseudonym?: string | null,
    birthdate?: string | null,
    isPublisher?: boolean | null,
    followers?:  {
      __typename: "ModelFollowingConnConnection",
      items:  Array< {
        __typename: "FollowingConn",
        id: string,
        followerID?: string | null,
        authorID?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetFollowingConnQueryVariables = {
  id: string,
};

export type GetFollowingConnQuery = {
  getFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    followerID?: string | null,
    authorID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListFollowingConnsQueryVariables = {
  filter?: ModelFollowingConnFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFollowingConnsQuery = {
  listFollowingConns?:  {
    __typename: "ModelFollowingConnConnection",
    items:  Array< {
      __typename: "FollowingConn",
      id: string,
      followerID?: string | null,
      authorID?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        following?: Array< string | null > | null,
        numAuthored?: number | null,
        pseudonym?: string | null,
        birthdate?: string | null,
        isPublisher?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      follower?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        following?: Array< string | null > | null,
        numAuthored?: number | null,
        pseudonym?: string | null,
        birthdate?: string | null,
        isPublisher?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetStoryQueryVariables = {
  id: string,
};

export type GetStoryQuery = {
  getStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID?: string | null,
    author?: string | null,
    narrator?: string | null,
    time?: number | null,
    description?: string | null,
    detailedDescription?: Array< string | null > | null,
    nsfw?: boolean | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        storyCommentsId?: string | null,
        commentStoryId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        tagName: string,
        createdAt: string,
        updatedAt: string,
        storyTagsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    tagStoriesId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListStoriesQueryVariables = {
  filter?: ModelStoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStoriesQuery = {
  listStories?:  {
    __typename: "ModelStoryConnection",
    items:  Array< {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre?: string | null,
      user?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        following?: Array< string | null > | null,
        numAuthored?: number | null,
        pseudonym?: string | null,
        birthdate?: string | null,
        isPublisher?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      userID?: string | null,
      author?: string | null,
      narrator?: string | null,
      time?: number | null,
      description?: string | null,
      detailedDescription?: Array< string | null > | null,
      nsfw?: boolean | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      tags?:  {
        __typename: "ModelTagConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      tagStoriesId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre?: string | null,
      user?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        following?: Array< string | null > | null,
        numAuthored?: number | null,
        pseudonym?: string | null,
        birthdate?: string | null,
        isPublisher?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      userID?: string | null,
      author?: string | null,
      narrator?: string | null,
      time?: number | null,
      description?: string | null,
      detailedDescription?: Array< string | null > | null,
      nsfw?: boolean | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      tags?:  {
        __typename: "ModelTagConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      tagStoriesId?: string | null,
      owner?: string | null,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    storyCommentsId?: string | null,
    commentStoryId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      storyID: string,
      story?:  {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null,
      content: string,
      createdAt: string,
      updatedAt: string,
      storyCommentsId?: string | null,
      commentStoryId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTagQueryVariables = {
  id: string,
};

export type GetTagQuery = {
  getTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    stories?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    storyTagsId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListTagsQueryVariables = {
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagsQuery = {
  listTags?:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      id: string,
      tagName: string,
      stories?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      storyTagsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?: Array< string | null > | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAuthored?: number | null,
    pseudonym?: string | null,
    birthdate?: string | null,
    isPublisher?: boolean | null,
    followers?:  {
      __typename: "ModelFollowingConnConnection",
      items:  Array< {
        __typename: "FollowingConn",
        id: string,
        followerID?: string | null,
        authorID?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?: Array< string | null > | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAuthored?: number | null,
    pseudonym?: string | null,
    birthdate?: string | null,
    isPublisher?: boolean | null,
    followers?:  {
      __typename: "ModelFollowingConnConnection",
      items:  Array< {
        __typename: "FollowingConn",
        id: string,
        followerID?: string | null,
        authorID?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?: Array< string | null > | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    numAuthored?: number | null,
    pseudonym?: string | null,
    birthdate?: string | null,
    isPublisher?: boolean | null,
    followers?:  {
      __typename: "ModelFollowingConnConnection",
      items:  Array< {
        __typename: "FollowingConn",
        id: string,
        followerID?: string | null,
        authorID?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateFollowingConnSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateFollowingConnSubscription = {
  onCreateFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    followerID?: string | null,
    authorID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateFollowingConnSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateFollowingConnSubscription = {
  onUpdateFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    followerID?: string | null,
    authorID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteFollowingConnSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteFollowingConnSubscription = {
  onDeleteFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    followerID?: string | null,
    authorID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateStorySubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateStorySubscription = {
  onCreateStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID?: string | null,
    author?: string | null,
    narrator?: string | null,
    time?: number | null,
    description?: string | null,
    detailedDescription?: Array< string | null > | null,
    nsfw?: boolean | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        storyCommentsId?: string | null,
        commentStoryId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        tagName: string,
        createdAt: string,
        updatedAt: string,
        storyTagsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    tagStoriesId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateStorySubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateStorySubscription = {
  onUpdateStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID?: string | null,
    author?: string | null,
    narrator?: string | null,
    time?: number | null,
    description?: string | null,
    detailedDescription?: Array< string | null > | null,
    nsfw?: boolean | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        storyCommentsId?: string | null,
        commentStoryId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        tagName: string,
        createdAt: string,
        updatedAt: string,
        storyTagsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    tagStoriesId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteStorySubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteStorySubscription = {
  onDeleteStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?: Array< string | null > | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      numAuthored?: number | null,
      pseudonym?: string | null,
      birthdate?: string | null,
      isPublisher?: boolean | null,
      followers?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID?: string | null,
    author?: string | null,
    narrator?: string | null,
    time?: number | null,
    description?: string | null,
    detailedDescription?: Array< string | null > | null,
    nsfw?: boolean | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        storyCommentsId?: string | null,
        commentStoryId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        tagName: string,
        createdAt: string,
        updatedAt: string,
        storyTagsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    tagStoriesId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateCommentSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre?: string | null,
      user?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        following?: Array< string | null > | null,
        numAuthored?: number | null,
        pseudonym?: string | null,
        birthdate?: string | null,
        isPublisher?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      userID?: string | null,
      author?: string | null,
      narrator?: string | null,
      time?: number | null,
      description?: string | null,
      detailedDescription?: Array< string | null > | null,
      nsfw?: boolean | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      tags?:  {
        __typename: "ModelTagConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      tagStoriesId?: string | null,
      owner?: string | null,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    storyCommentsId?: string | null,
    commentStoryId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateCommentSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre?: string | null,
      user?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        following?: Array< string | null > | null,
        numAuthored?: number | null,
        pseudonym?: string | null,
        birthdate?: string | null,
        isPublisher?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      userID?: string | null,
      author?: string | null,
      narrator?: string | null,
      time?: number | null,
      description?: string | null,
      detailedDescription?: Array< string | null > | null,
      nsfw?: boolean | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      tags?:  {
        __typename: "ModelTagConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      tagStoriesId?: string | null,
      owner?: string | null,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    storyCommentsId?: string | null,
    commentStoryId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteCommentSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre?: string | null,
      user?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        following?: Array< string | null > | null,
        numAuthored?: number | null,
        pseudonym?: string | null,
        birthdate?: string | null,
        isPublisher?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      userID?: string | null,
      author?: string | null,
      narrator?: string | null,
      time?: number | null,
      description?: string | null,
      detailedDescription?: Array< string | null > | null,
      nsfw?: boolean | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      tags?:  {
        __typename: "ModelTagConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      tagStoriesId?: string | null,
      owner?: string | null,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    storyCommentsId?: string | null,
    commentStoryId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateTagSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateTagSubscription = {
  onCreateTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    stories?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    storyTagsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateTagSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateTagSubscription = {
  onUpdateTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    stories?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    storyTagsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteTagSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteTagSubscription = {
  onDeleteTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    stories?:  {
      __typename: "ModelStoryConnection",
      items:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre?: string | null,
        userID?: string | null,
        author?: string | null,
        narrator?: string | null,
        time?: number | null,
        description?: string | null,
        detailedDescription?: Array< string | null > | null,
        nsfw?: boolean | null,
        createdAt: string,
        updatedAt: string,
        tagStoriesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    storyTagsId?: string | null,
    owner?: string | null,
  } | null,
};
