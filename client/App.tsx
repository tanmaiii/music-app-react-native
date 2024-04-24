import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useLinkTo } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator, { StackAuth } from "./src/navigation";
import { Skeleton } from "moti/skeleton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider, WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";

import PlayingCard from "./src/components/PlayingCard";

import { useFonts } from "expo-font";
import { COLORS, FONTFAMILY, HEIGHT, SPACING } from "./src/theme/theme";
import { PlayingContextProvider } from "./src/context/PlayingContext";
import { AuthContextProvider, useAuth } from "./src/context/AuthContext";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { RootStackParamList } from "./src/navigation/TStack";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Tạo một instance của QueryClient
const client = new QueryClient();

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
    return (
      <View
        style={{
          backgroundColor: COLORS.Black1,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          source={require("./src/assets/images/Animation.json")}
          style={{ width: "60%", height: "60%" }}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        <AuthContextProvider>
          <PlayingContextProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <View style={styles.container}>
                  <PlayingCard />
                  <Layout />
                </View>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </PlayingContextProvider>
        </AuthContextProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export const Layout = () => {
  const { currentUser, loadingAuth } = useAuth();

  useEffect(() => {
    console.log("loadingAuth", loadingAuth);
  }, [loadingAuth]);

  loadingAuth && (
    <View
      style={{
        backgroundColor: COLORS.Black1,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        source={require("./src/assets/images/Animation.json")}
        style={{ width: "60%", height: "60%" }}
        autoPlay
        loop
      />
    </View>
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {currentUser ? (
        <Stack.Screen name="Home" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={StackAuth} />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: FONTFAMILY.medium,
    backgroundColor: COLORS.Black1,
    position: "relative",
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
  },
  playingCard: {
    position: "absolute",
    left: 0,
    bottom: HEIGHT.navigator + SPACING.space_4,
    zIndex: 1,
  },
});
