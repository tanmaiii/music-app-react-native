import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import LibraryScreen from "../screens/LibraryScreen";
import SongDetail from "../screens/SongDetail";
import PlaylistDetail from "../screens/PlaylistDetail";
import UserAccount from "../screens/UserAccount";
import { COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING, WIDTH } from "../theme/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import ArtistDetail from "../screens/ArtistDetail";
import ICONS from "../constants/icons";
import Account from "../screens/UserAccount/Account";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigatorHome = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SongDetail" component={SongDetail} />
      <Stack.Screen name="ArtistDetail" component={ArtistDetail} />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetail} />
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
      <Stack.Screen name="Library" component={LibraryScreen} />
      <Stack.Screen name="SongDetail" component={SongDetail} />
      <Stack.Screen name="ArtistDetail" component={ArtistDetail} />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetail} />
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
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SongDetail" component={SongDetail} />
      <Stack.Screen name="ArtistDetail" component={ArtistDetail} />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetail} />
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
      <Stack.Screen name="UserAccount" component={UserAccount} />
      <Stack.Screen name="EditAccount" component={Account} />
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
        name="Home"
        component={StackNavigatorHome}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={[styles.activeBackground]}>
                {focused ? (
                  <Image source={ICONS.HOME_BOLD} style={{ width: 26, height: 26 }} />
                ) : (
                  <Image source={ICONS.HOME_LIGHT} style={{ width: 26, height: 26 }} />
                )}
                {/* <Feather
                  name="home"
                  style={[styles.icon, focused ? { color: COLORS.White } : {}]}
                /> */}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={StackNavigatorSearch}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={[styles.activeBackground]}>
                {focused ? (
                  <Image source={ICONS.SEARCH_BOLD} style={{ width: 26, height: 26 }} />
                ) : (
                  <Image source={ICONS.SEARCH_lIGHT} style={{ width: 26, height: 26 }} />
                )}
                {/* <Ionicons
                  name="search-outline"
                  style={[styles.icon, focused ? { color: COLORS.White } : {}]}
                /> */}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Library"
        component={StackNavigatorLibrary}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={[styles.activeBackground]}>
                {focused ? (
                  <Image source={ICONS.LIBRARY_BOLD} style={{ width: 30, height: 30 }} />
                ) : (
                  <Image source={ICONS.LIBRARY_lIGHT} style={{ width: 30, height: 30 }} />
                )}
                {/* <Ionicons
                  name="library-outline"
                  style={[styles.icon, focused ? { color: COLORS.White } : {}]}
                /> */}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={StackNavigatorUserAccount}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={[styles.activeBackground]}>
                {focused ? (
                  <Image source={ICONS.USER_BOLD} style={{ width: 26, height: 26 }} />
                ) : (
                  <Image source={ICONS.USER_lIGHT} style={{ width: 26, height: 26 }} />
                )}
                {/* <AntDesign
                  name="user"
                  size={24}
                  color="black"
                  style={[styles.icon, focused ? { color: COLORS.White } : {}]}
                /> */}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeBackground: {},
  icon: {
    textAlign: "center",
    color: COLORS.White2,
    fontSize: FONTSIZE.size_24,
  },
  title: {
    alignSelf: "stretch",
    marginTop: SPACING.space_4,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White2,
    fontFamily: "Roboto-Bold",
    textAlign: "center",
  },
});

export default TabNavigator;
