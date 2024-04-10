import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Tab: undefined;
  Home: undefined;
  Search: undefined;
  Library: undefined;
  User: undefined;

  UserEditAccount: undefined;

  Song: { id: number };
  Playlist: { id: number };
  Artist: { id: number };

  ListSong: { id: number };
  ListPlaylist: { id: number };
  ListSongLike: { id: number };

  Login: undefined;
  Signup: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;

// export {
//   PlaylistNavigationProp,
//   ArtistNavigationProp,
//   SongListNavigationProp,
//   UserEditAccountNavigationProp,
// };
