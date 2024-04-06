import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Animated,
} from "react-native";
import styles from "./style";
import IMAGES from "../../constants/images";
import { TSong } from "../../types/song.type";
import { COLORS, SPACING } from "../../theme/theme";
import SongCard from "../../components/SongCard";
import CategoryHeader from "../../components/CategoryHeader";
import HomeTop from "../../components/HomeTop";

import { Ionicons } from "@expo/vector-icons";
import { useLinkTo } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import apiConfig from "../../apis/apiConfig";
import ArtistCard from "../../components/ArtistCard";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import PlaylistCard from "../../components/PlaylistCard";

interface HomeScreenProps {}

const songs: TSong[] = [
  {
    id: 1,
    title: "Despacito, Despacito ,Despacito, Despacito",
    image_path: "despacito.jpg",
    author: "Luis Fonsi",
  },
  { id: 2, title: "Shape of You", image_path: "shape_of_you.jpg", author: "Ed Sheeran" },
  {
    id: 3,
    title: "Uptown Funk",
    image_path: "uptown_funk.jpg",
    author: "Mark Ronson ft. Bruno Mars",
  },
  { id: 4, title: "Closer", image_path: "closer.jpg", author: "The Chainsmokers ft. Halsey" },
  {
    id: 5,
    title: "See You Again",
    image_path: "see_you_again.jpg",
    author: "Wiz Khalifa ft. Charlie Puth",
  },
  { id: 6, title: "God's Plan", image_path: "gods_plan.jpg", author: "Drake" },
  {
    id: 7,
    title: "Old Town Road",
    image_path: "old_town_road.jpg",
    author: "Lil Nas X ft. Billy Ray Cyrus",
  },
  { id: 8, title: "Shape of My Heart", image_path: "shape_of_my_heart.jpg", author: "Sting" },
  { id: 9, title: "Someone Like You", image_path: "someone_like_you.jpg", author: "Adele" },
  { id: 10, title: "Bohemian Rhapsody", image_path: "bohemian_rhapsody.jpg", author: "Queen" },
];

//Chiều cao, rộng của màn hình

const HomeScreen = ({ navigation }: any) => {
  const [greeting, setGreeting] = React.useState("");
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const linkTo = useLinkTo();
  const { currentUser, setCurrentUser, logout } = useAuth();

  useEffect(() => {
    const date = new Date();
    const currentHour = date.getHours();

    if (currentHour >= 6 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const headerAnimation = {
    height: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [90, 60],
      extrapolate: "clamp",
    }),
  };

  useEffect(() => {
    if (!currentUser) return linkTo("/Login");
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.Black1} />

      <SafeAreaView>
        <Animated.View style={[styles.HomeHeader, headerAnimation]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity>
              <Image source={IMAGES.LOGO} style={styles.HomeHeaderImage} />
            </TouchableOpacity>
            <Text style={styles.titleHello}>{`${greeting}, Mãi !`}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <Ionicons name="add-outline" size={24} color="black" style={styles.HomeHeaderIcon} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          animatedValue.setValue(offsetY);
        }}
        scrollEventThrottle={16}
      >
        <View style={styles.scroll}>
          <HomeTop />

          <View style={{ paddingHorizontal: SPACING.space_10 }}>
            <CategoryHeader title={"Song popular"} />
            <FlatList
              data={songs}
              keyExtractor={(item: any) => item.id}
              bounces={false}
              snapToInterval={WINDOW_WIDTH / 2.4 + SPACING.space_12}
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              style={{ gap: SPACING.space_12 }}
              renderItem={({ item, index }) => (
                <SongCard navigation={navigation} cardWidth={WINDOW_WIDTH / 2.4} song={item} />
              )}
            />
          </View>

          <View style={{ paddingHorizontal: SPACING.space_10 }}>
            <CategoryHeader title={"Playlist popular"} />
            <FlatList
              data={songs}
              keyExtractor={(item: any) => item.id}
              bounces={false}
              snapToInterval={WINDOW_WIDTH / 2.4 + SPACING.space_12}
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              style={{ gap: SPACING.space_12 }}
              renderItem={({ item, index }) => (
                <PlaylistCard
                  cardWidth={WINDOW_WIDTH / 2.4}
                  playlist={item}
                />
              )}
            />
          </View>

          <View style={{ paddingHorizontal: SPACING.space_10 }}>
            <CategoryHeader title={"Artist song"} />
            <FlatList
              data={songs}
              keyExtractor={(item: any) => item.id}
              bounces={false}
              snapToInterval={WINDOW_WIDTH / 3 + SPACING.space_12}
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              style={{ gap: SPACING.space_12 }}
              renderItem={({ item, index }) => (
                <ArtistCard cardWidth={WINDOW_WIDTH / 3} artist={item} />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
