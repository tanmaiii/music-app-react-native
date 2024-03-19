import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import LibraryScreen from "../screens/LibraryScreen";
// import TicketScreen from "../screens/TicketScreen";
// import UserAccountScreen from "../screens/UserAccountScreen";
import { COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING, WIDTH } from "../theme/theme";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black1,
          borderTopWidth: 0,
          // padding: SPACING.space_24,
          height: HEIGHT.navigator,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={[styles.activeBackground]}>
                <Feather
                  name="home"
                  style={[styles.icon, focused ? { color: COLORS.White } : {}]}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={[styles.activeBackground]}>
                <Ionicons
                  name="search-outline"
                  style={[styles.icon, focused ? { color: COLORS.White } : {}]}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={[styles.activeBackground]}>
                <Ionicons
                  name="library-outline"
                  style={[styles.icon, focused ? { color: COLORS.White } : {}]}
                />
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
