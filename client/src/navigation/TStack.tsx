import { StackNavigationProp } from "@react-navigation/stack";
import { PATH } from "../constants/path";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
  User: undefined;

  UserEditAccount: undefined;

  Song: undefined;
  ListSong: { id: number };
  ListPlaylist: { id: number };

  Playlist: { id: number };
  Artist: { id: number };

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
