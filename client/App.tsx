import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import PlayingCard from "@/components/PlayingCard";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { COLORS, FONTFAMILY } from "@/theme/theme";

import { AudioContextProvider } from "@/context/AudioContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { BarSongContextProvider } from "@/context/BarSongContext";
import { ToastContextProvider } from "@/context/ToastContext";
import AppRouter from "@/navigators/AppRouter";
import SplashScreen from "@/screens/SplashScreen";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@/utils";

const client = new QueryClient();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  let [fontsLoaded] = useFonts({
    "Roboto-Black": require("@/assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("@/assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("@/assets/fonts/Roboto-Thin.ttf"),
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
            <BarSongContextProvider>
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
            </BarSongContextProvider>
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
