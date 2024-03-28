import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useLinkTo } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/navigators/TabNavigator";
import { Skeleton } from "moti/skeleton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import Home from "./src/screens/HomeScreen";
import Search from "./src/screens/SearchScreen";
import Library from "./src/screens/LibraryScreen";
import ArtistDetail from "./src/screens/ArtistDetail";
import SongDetail from "./src/screens/SongDetail";
import PlayingCard from "./src/components/PlayingCard";
import ModalPlaying from "./src/components/ModalPlaying";
import Login from "./src/screens/AuthScreen/Login";
import Signup from "./src/screens/AuthScreen/Signup";

import { useFonts } from "expo-font";
import { COLORS, FONTFAMILY, HEIGHT, SPACING } from "./src/theme/theme";
import { PlayingContextProvider } from "./src/context/PlayingContext";
import { AuthContextProvider, useAuth } from "./src/context/AuthContext";
import React from "react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const linkTo = useLinkTo();
  let [fontLoaded] = useFonts({
    "Roboto-Black": require("./src/assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("./src/assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./src/assets/fonts/Roboto-Thin.ttf"),
  });

  if (!fontLoaded) {
    return <Text>Loading....</Text>;
  }

  return (
    <View style={styles.container}>
      <AuthContextProvider>
        <PlayingContextProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <ModalPlaying />
              <View style={styles.playingCard}>
                <PlayingCard />
              </View>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Tab" component={TabNavigator} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Signup" component={Signup} />
                </Stack.Navigator>
              </NavigationContainer>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </PlayingContextProvider>
      </AuthContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: FONTFAMILY.medium,
    backgroundColor: COLORS.Black1,
    position: "relative",
  },
  playingCard: {
    position: "absolute",
    left: 0,
    bottom: HEIGHT.navigator + SPACING.space_4,
    zIndex: 100,
  },
});
