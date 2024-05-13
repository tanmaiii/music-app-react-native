import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { RootStackParamList } from "./TStack";
import UserAccount from "../screens/UserAccount";
import PlaylistDetail from "../screens/PlaylistDetail";
import SongDetail from "../screens/SongDetail";
import ArtistDetail from "../screens/ArtistDetail";
import ListSongScreen from "../screens/ListSongScreen";
import ListPlaylistScreen from "../screens/ListPlaylistScreen";
import EditProfile from "../screens/UserAccount/EditProfile";
import UpdateItem from "../screens/UserAccount/UpdateItem";
interface UserNavigatorProps {}

const UserNavigator = (props: UserNavigatorProps) => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="User" component={UserAccount} />

      <Stack.Screen name="Artist" component={ArtistDetail} />
      <Stack.Screen name="Song" component={SongDetail} />
      <Stack.Screen name="Playlist" component={PlaylistDetail} />
      <Stack.Screen name="ListSong" component={ListSongScreen} />
      <Stack.Screen name="ListSongLike" component={ListSongScreen} />
      <Stack.Screen name="ListPlaylist" component={ListPlaylistScreen} />
      <Stack.Screen name="UserEditProfile" component={EditProfile} />
      <Stack.Screen name="UpdateItem" component={UpdateItem} />
    </Stack.Navigator>
  );
};

export default UserNavigator;

const styles = StyleSheet.create({
  container: {},
});
