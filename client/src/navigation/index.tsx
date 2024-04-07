import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faRecordVinyl,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../theme/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SongDetail from "../screens/SongDetail";
import ArtistDetail from "../screens/ArtistDetail";
import PlaylistDetail from "../screens/PlaylistDetail";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import LibraryScreen from "../screens/LibraryScreen";
import UserAccount from "../screens/UserAccount";
import Account from "../screens/UserAccount/Account";
import ListSongScreen from "../screens/ListSongScreen";
import ListPlaylistScreen from "../screens/ListPlaylistScreen";
import ListSongLikeScreen from "../screens/ListSongLikeScreen";
import { RootStackParamList } from "./TStack";

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigatorHome = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"Home"} component={HomeScreen} />
      <Stack.Screen name={"Song"} component={SongDetail} />
      <Stack.Screen name={"Artist"} component={ArtistDetail} />
      <Stack.Screen name={"Playlist"} component={PlaylistDetail} />
      <Stack.Screen name={"ListSong"} component={ListSongScreen} />
      <Stack.Screen name={"ListPlaylist"} component={ListPlaylistScreen} />
    </Stack.Navigator>
  );
};

const StackNavigatorLibrary = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"Library"} component={LibraryScreen} />
      <Stack.Screen name={"Song"} component={SongDetail} />
      <Stack.Screen name={"Artist"} component={ArtistDetail} />
      <Stack.Screen name={"Playlist"} component={PlaylistDetail} />
      <Stack.Screen name={"ListSong"} component={ListSongScreen} />
      <Stack.Screen name={"ListPlaylist"} component={ListPlaylistScreen} />
      <Stack.Screen name={"ListSongLike"} component={ListSongLikeScreen} />
    </Stack.Navigator>
  );
};

const StackNavigatorSearch = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"Search"} component={SearchScreen} />
      <Stack.Screen name={"Song"} component={SongDetail} />
      <Stack.Screen name={"Artist"} component={ArtistDetail} />
      <Stack.Screen name={"Playlist"} component={PlaylistDetail} />
      <Stack.Screen name={"ListSong"} component={ListSongScreen} />
      <Stack.Screen name={"ListPlaylist"} component={ListPlaylistScreen} />
    </Stack.Navigator>
  );
};

const StackNavigatorUserAccount = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="User" component={UserAccount} />
      <Stack.Screen name="UserEditAccount" component={Account} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black1,
          borderTopWidth: 0,
          height: HEIGHT.navigator,
        },
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={StackNavigatorHome}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.activeBackground}>
              <FontAwesomeIcon
                icon={faHouse}
                size={20}
                color={focused ? COLORS.White1 : COLORS.White2}
              />
              <Text
                style={[
                  styles.title,
                  focused ? { color: COLORS.White1 } : { color: COLORS.White2 },
                ]}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={"Search"}
        component={StackNavigatorSearch}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.activeBackground}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size={20}
                color={focused ? COLORS.White1 : COLORS.White2}
              />
              <Text
                style={[
                  styles.title,
                  focused ? { color: COLORS.White1 } : { color: COLORS.White2 },
                ]}
              >
                Search
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={"Library"}
        component={StackNavigatorLibrary}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.activeBackground}>
              <FontAwesomeIcon
                icon={faRecordVinyl}
                size={20}
                color={focused ? COLORS.White1 : COLORS.White2}
              />
              <Text
                style={[
                  styles.title,
                  focused ? { color: COLORS.White1 } : { color: COLORS.White2 },
                ]}
              >
                Library
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={"User"}
        component={StackNavigatorUserAccount}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.activeBackground}>
              <FontAwesomeIcon
                icon={faUser}
                size={20}
                color={focused ? COLORS.White1 : COLORS.White2}
              />
              <Text
                style={[
                  styles.title,
                  focused ? { color: COLORS.White1 } : { color: COLORS.White2 },
                ]}
              >
                User
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeBackground: {
    flexDirection: "column",
    alignItems: "center",
    gap: SPACING.space_4,
  },
  title: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.regular,
  },
});

export default TabNavigator;
