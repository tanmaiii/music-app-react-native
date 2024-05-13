import * as React from "react";
import {
  faHouse,
  faMagnifyingGlass,
  faRecordVinyl,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import LibraryScreen from "../screens/LibraryScreen";
import SearchScreen from "../screens/SearchScreen";
import { COLORS, FONTFAMILY, HEIGHT, SPACING } from "../theme/theme";
import { RootStackParamList } from "./TStack";
import UserAccount from "../screens/UserAccount";
import { WINDOW_WIDTH } from "../utils";
import HomeNavigator from "./HomeNavigator";
import SearchNavigator from "./SearchNavigator";
import LibraryNavigator from "./LibraryNavigator";
import UserNavigator from "./UserNavigator";

interface TabNavigatorProps {}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigator = (props: TabNavigatorProps) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black2,
          height: HEIGHT.navigator,
          borderTopWidth: 0,
          borderTopColor: COLORS.Black1,
          zIndex: 9999,
          position: "absolute",
          bottom: 0,
          left: 0,
          width: WINDOW_WIDTH,
        },
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={HomeNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.activeBackground}>
              <FontAwesomeIcon
                icon={faHouse}
                size={20}
                color={focused ? COLORS.Primary : COLORS.White2}
              />
              <Text
                style={[
                  styles.title,
                  focused ? { color: COLORS.Primary } : { color: COLORS.White2 },
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
        component={SearchNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.activeBackground}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size={20}
                color={focused ? COLORS.Primary : COLORS.White2}
              />
              <Text
                style={[
                  styles.title,
                  focused ? { color: COLORS.Primary } : { color: COLORS.White2 },
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
        component={LibraryNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.activeBackground}>
              <FontAwesomeIcon
                icon={faRecordVinyl}
                size={20}
                color={focused ? COLORS.Primary : COLORS.White2}
              />
              <Text
                style={[
                  styles.title,
                  focused ? { color: COLORS.Primary } : { color: COLORS.White2 },
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
        component={UserNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.activeBackground}>
              <FontAwesomeIcon
                icon={faUser}
                size={20}
                color={focused ? COLORS.Primary : COLORS.White2}
              />
              <Text
                style={[
                  styles.title,
                  focused ? { color: COLORS.Primary } : { color: COLORS.White2 },
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

export default TabNavigator;

const styles = StyleSheet.create({
  activeBackground: {
    flexDirection: "column",
    alignItems: "center",
    gap: SPACING.space_4,
  },
  title: {
    fontSize: 11,
    fontFamily: FONTFAMILY.regular,
  },
});
