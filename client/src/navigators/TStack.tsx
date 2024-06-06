import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  HomeNavigator: undefined;
  SearchNavigator: undefined;
  LibaryNavigator: undefined;
  UserNavigator: undefined;

  Main: undefined;

  Auth: undefined;

  Home: undefined;
  Library: undefined;
  User: undefined;

  Search: undefined;
  Genre: { genreId: string };

  UserEditProfile: undefined;
  UpdateItem: { type: string };

  Song: { songId: string };
  Playlist: { playlistId: string };
  Artist: { userId: string };

  ListSong: { userId: string };
  ListPlaylist: { userId: string };
  ListSongLike: null;

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
