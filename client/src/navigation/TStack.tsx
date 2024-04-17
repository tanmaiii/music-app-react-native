import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Tab: undefined;
  Auth: undefined;

  Home: undefined;
  Search: undefined;
  Library: undefined;
  User: undefined;

  UserEditAccount: undefined;

  Song: { songId: number };
  Playlist: { playlistId: number };
  Artist: { userId: number };

  ListSong: { userId: number };
  ListPlaylist: { userId: number };
  ListSongLike: { userId: number };

  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
  Verify: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;

// export {
//   PlaylistNavigationProp,
//   ArtistNavigationProp,
//   SongListNavigationProp,
//   UserEditAccountNavigationProp,
// };
