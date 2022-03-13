import * as Linking from 'expo-linking';


export default {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'one',
              ProfileScreen: 'Profile',
              EditProfileScreen: 'EditProfile'
            },
          },
          Stories: {
            screens: {
              StoriesScreen: 'two',
              BrowseAuthor: 'BrowseAuthor',
              BrowseNarrator: 'BrowseNarrator',
              GenreHome: 'GenreHome',
              SearchScreen: 'SearchScreen',
            },
          },
          Playlist: {
            screens: {
              PlaylistScreen: 'three',
            },
          },
          
        },
      },
      RecordAudio: '*',
      AudioPlayer: '*',
      UserScreen: '*',
      SignUp: '*',
      SignIn: '*',
      ForgotPassword: '*',
      ForgotPasswordCon: '*',
      ConfirmEmail: '*',
      UploadAudio: '*',
      StoryScreen: {
        path: 'storyscreen/:id?',
        parse: {
          id: (id: String) => `${id}`,
        },
    },
  },
}};
