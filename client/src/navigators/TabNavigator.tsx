import {
  faHouse,
  faMagnifyingGlass,
  faRecordVinyl,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTFAMILY, HEIGHT, SPACING } from "../theme/theme";
import HomeNavigator from "./HomeNavigator";
import LibraryNavigator from "./LibraryNavigator";
import SearchNavigator from "./SearchNavigator";
import { RootStackParamList } from "./TStack";
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
        },
      }}
    >
      <Tab.Screen
        name={"HomeNavigator"}
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
        name={"SearchNavigator"}
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
        name={"LibaryNavigator"}
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
        name={"UserNavigator"}
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
