import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Main: undefined;

  Auth: undefined;

  Home: undefined;
  Search: undefined;
  Library: undefined;
  User: undefined;

  UserEditProfile: undefined;
  UpdateItem: { type: string };

  Song: { songId: string };
  Playlist: { playlistId: string };
  Artist: { userId: string };

  ListSong: { userId: string };
  ListPlaylist: { userId: string };
  ListSongLike: { userId: string };

  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
  Verify: undefined;
  ForgetPassword: undefined;
  ResetPassword: { token: string };
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
