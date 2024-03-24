import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/navigators/TabNavigator";
import { Skeleton } from "moti/skeleton";

import Home from "./src/screens/HomeScreen";
import Search from "./src/screens/SearchScreen";
import Library from "./src/screens/LibraryScreen";
import ArtistDetail from "./src/screens/ArtistDetail";
import SongDetail from "./src/screens/SongDetail";
import PlayingCard from "./src/components/PlayingCard";
import ModalPlaying from "./src/components/ModalPlaying";

import { useFonts } from "expo-font";
import { COLORS, FONTFAMILY, HEIGHT, SPACING } from "./src/theme/theme";
import { ModalPortal } from "react-native-modals";
import { PlayingContextProvider } from "./src/context/playingContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
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
      <PlayingContextProvider>
        <NavigationContainer>
          <View style={styles.playingCard}>
            <PlayingCard />
            <ModalPlaying />
          </View>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tab" component={TabNavigator} />
            <Stack.Screen name="SongDetail" component={SongDetail} />
            <Stack.Screen name="ArtistDetail" component={ArtistDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </PlayingContextProvider>
      <ModalPortal />
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
