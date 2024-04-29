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
  RefreshControl,
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
import apiConfig from "../../configs/axios/apiConfig";
import ArtistCard from "../../components/ArtistCard";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import PlaylistCard from "../../components/PlaylistCard";
import { TPlaylist, TUser } from "../../types";
import { favouriteApi, playlistApi, songApi, userApi } from "../../apis";
import Slider from "../../components/Slider";
import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosClient } from "../../configs";

interface HomeScreenProps {}

const HomeScreen = ({ navigation }: any) => {
  const [greeting, setGreeting] = React.useState("");
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const linkTo = useLinkTo();
  const { currentUser, setCurrentUser, logout, token } = useAuth();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const queryClient = new QueryClient();

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

  const handleGetToken = async () => {
    console.log("token", token);
  };

  useEffect(() => {
    if (!currentUser) return linkTo("/Login");
  });

  const { data: playlists } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const res = await playlistApi.getAll(1, 10);
      return res.data;
    },
  });

  const { data: artists } = useQuery({
    queryKey: ["artists"],
    queryFn: async () => {
      const res = await userApi.getAll(1, 10);
      console.log(res.data);

      return res.data;
    },
  });

  const { data: songs } = useQuery({
    queryKey: ["songs"],
    queryFn: async () => {
      const res = await songApi.getAll(1, 10);
      return res.data;
    },
  });

  const { data: playlistFavourite, isLoading: loadingPlaylistFavourite } = useQuery({
    queryKey: ["top-favorites"],
    queryFn: async () => {
      const res = await favouriteApi.getAll(token, 1, 10);
      return res.data;
    },
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log("Reload");
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["artists"] });
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      queryClient.invalidateQueries({ queryKey: ["top-favorites"] });
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.Black1} />

        <SafeAreaView>
          <Animated.View style={[styles.HomeHeader, headerAnimation]}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => handleGetToken()}>
                <Image source={IMAGES.LOGO} style={styles.HomeHeaderImage} />
              </TouchableOpacity>
              <Text style={styles.titleHello}>{`${greeting}, Mãi !`}</Text>
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
          refreshControl={
            <RefreshControl
              tintColor={COLORS.White1}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          scrollEventThrottle={16}
        >
          <View style={styles.scroll}>
            <Slider />

            <HomeTop data={playlistFavourite} loading={loadingPlaylistFavourite} />

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
                  <View style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}>
                    <SongCard song={item} />
                  </View>
                )}
              />
            </View>

            <View style={{ paddingHorizontal: SPACING.space_10 }}>
              <CategoryHeader title={"Playlist popular"} />
              <FlatList
                data={playlists}
                keyExtractor={(item: any) => item.id}
                bounces={false}
                snapToInterval={WINDOW_WIDTH / 2.4 + SPACING.space_12}
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                style={{ gap: SPACING.space_12 }}
                renderItem={({ item, index }) => (
                  <View style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}>
                    <PlaylistCard playlist={item} />
                  </View>
                )}
              />
            </View>

            <View style={{ paddingHorizontal: SPACING.space_10 }}>
              <CategoryHeader title={"Artist song"} />
              <FlatList
                data={artists}
                keyExtractor={(item: any) => item.id}
                bounces={false}
                snapToInterval={WINDOW_WIDTH / 3 + SPACING.space_12}
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                style={{ gap: SPACING.space_12 }}
                renderItem={({ item, index }) => {
                  if (item.id === currentUser.id) return;
                  return (
                    <View style={{ width: WINDOW_WIDTH / 3, marginRight: SPACING.space_12 }}>
                      <ArtistCard artist={item} />
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;
