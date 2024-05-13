import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import PlayingCard from "./src/components/PlayingCard";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { COLORS, FONTFAMILY } from "./src/theme/theme";

import { AudioContextProvider } from "./src/context/AudioContext";
import { AuthContextProvider } from "./src/context/AuthContext";
import { PlayingContextProvider } from "./src/context/PlayingContext";
import { ToastContextProvider } from "./src/context/ToastContext";
import AppRouter from "./src/navigators/AppRouter";
import SplashScreen from "./src/screens/SplashScreen";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./src/utils";


const client = new QueryClient();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  let [fontsLoaded] = useFonts({
    "Roboto-Black": require("./src/assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("./src/assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./src/assets/fonts/Roboto-Thin.ttf"),
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFontLoaded(fontsLoaded);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [fontsLoaded]);

  if (!fontLoaded) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={client}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <ToastContextProvider>
          <AuthContextProvider>
            <PlayingContextProvider>
              <AudioContextProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <BottomSheetModalProvider>
                    <View style={styles.container}>
                      <PlayingCard />
                      <AppRouter />
                    </View>
                  </BottomSheetModalProvider>
                </GestureHandlerRootView>
              </AudioContextProvider>
            </PlayingContextProvider>
          </AuthContextProvider>
        </ToastContextProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: FONTFAMILY.medium,
    backgroundColor: COLORS.Black1,
    position: "relative",
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
  },
});
