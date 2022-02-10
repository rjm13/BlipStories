export type RootStackParamList = {
  Root: undefined;
  StoryScreen: undefined;
  AudioPlayerTest: undefined;
  UserScreen: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  ForgotPasswordCon: undefined;
  ConfirmEmail: undefined;
  ModalNavigator: undefined;
  Drawer: undefined;
  Redirect: undefined;
  SimpleAudioPlayer: undefined;
  TagSearchScreen: undefined;

  
};

export type BottomTabParamList = {
  Home: undefined;
  Stories: undefined;
  Playlist: undefined;
};

export type TabOneParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  NotificationSetting: undefined;
  Narrations: undefined;
  History: undefined;
  Following: undefined;
  AboutScreen: undefined;
  PlanScreen: undefined;
  Publishing: undefined;
  PublisherSetup: undefined;
  Publisher: undefined;
  Recordings: undefined;
  MyStories: undefined;
  Terms: undefined;
  EditAudioStory: undefined;
  UploadAudio: undefined;
  RecordAudio: undefined;
  GenreHome: undefined;
  BrowseGenre: undefined;
};

export type TabTwoParamList = {
  StoriesScreen: undefined;
  BrowseAuthor: undefined;
  BrowseNarrator: undefined;
  GenreHome: undefined;
  SearchScreen: undefined;
  TagSearchStack: undefined;
  UserScreenStack: undefined;
  BrowseGenre: undefined;
};

export type TabThreeParamList = {
  PlaylistScreen: undefined;
  StoriesScreen: undefined;
};


export type ItemParamList = {
  //title: string;

};

export type User = {
  id: String;
  name: String;
  imageUri: String;
  bio: String;
  email: String;
}

declare const awsmobile: {};
export default awsmobile;
