import * as React from "react";
import { useEffect } from "react";
import {
  Animated,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryHeader from "../../components/CategoryHeader";
import HomeTop from "../../components/HomeTop";
import SongCard from "../../components/SongCard";
import IMAGES from "../../constants/images";
import { COLORS, HEIGHT, SPACING } from "../../theme/theme";
import styles from "./style";

import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { useLinkTo } from "@react-navigation/native";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { favouriteApi, playlistApi, songApi, userApi } from "../../apis";
import ArtistCard from "../../components/ArtistCard";
import PlaylistCard from "../../components/PlaylistCard";
import Slider from "../../components/Slider";
import { useAuth } from "../../context/AuthContext";

interface HomeScreenProps {}

const HomeScreen = ({ navigation }: any) => {
  const [greeting, setGreeting] = React.useState("");
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const linkTo = useLinkTo();
  const { currentUser, setCurrentUser, logout, token } = useAuth();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

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

  const {
    data: playlists,
    isLoading: loadingPlaylists,
    refetch: refetchPlaylists,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const res = await playlistApi.getAll(1, 10);
      return res.data;
    },
  });

  const {
    data: artists,
    isLoading: loadingArtists,
    refetch: refetchArtist,
  } = useQuery({
    queryKey: ["artists"],
    queryFn: async () => {
      const res = await userApi.getAll(1, 10);
      console.log(res.data);

      return res.data;
    },
  });

  const {
    data: songs,
    isLoading: loadingSongs,
    refetch: refetchSongs,
  } = useQuery({
    queryKey: ["songs"],
    queryFn: async () => {
      const res = await songApi.getAll(1, 10);
      console.log("Reload");
      return res.data;
    },
  });

  const {
    data: playlistFavourite,
    isLoading: loadingPlaylistFavourite,
    refetch: refetchPlaylistsFavourite,
  } = useQuery({
    queryKey: ["top-favorites"],
    queryFn: async () => {
      const res = await favouriteApi.getAll(token, 1, 10);
      return res.data;
    },
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refetchPlaylistsFavourite(),
        refetchArtist(),
        refetchPlaylists(),
        refetchSongs(),
        setRefreshing(false);
    }, 2000);
  }, []);

  const LoadingView = [];

  for (let i = 0; i < 3; i++) {
    LoadingView.push(
      <View style={{ paddingHorizontal: SPACING.space_10 }}>
        <CategoryHeader title={"test"} loading={true} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}>
            <SongCard song={null} loading={true} />
          </View>
          <View style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}>
            <SongCard song={null} loading={true} />
          </View>
          <View style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}>
            <SongCard song={null} loading={true} />
          </View>
        </ScrollView>
      </View>
    );
  }

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
          // style={{ paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 40 }}
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
            <Slider data={songs} loading={loadingSongs} />

            <HomeTop data={playlistFavourite} loading={loadingPlaylistFavourite} />

            {(loadingSongs || loadingPlaylists || loadingArtists) && LoadingView}

            {songs && (
              <View style={{ paddingHorizontal: SPACING.space_10 }}>
                <CategoryHeader title={"Song popular"} loading={loadingSongs} />
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
                    <View
                      key={index}
                      style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}
                    >
                      <SongCard song={item} loading={loadingSongs} />
                    </View>
                  )}
                />
              </View>
            )}

            {playlists && (
              <View style={{ paddingHorizontal: SPACING.space_10 }}>
                <CategoryHeader title={"Playlist popular"} loading={loadingPlaylists} />
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
                    <View
                      key={index}
                      style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}
                    >
                      <PlaylistCard playlist={item} />
                    </View>
                  )}
                />
              </View>
            )}

            {artists && (
              <View style={{ paddingHorizontal: SPACING.space_10 }}>
                <CategoryHeader title={"Artist song"} loading={loadingArtists} />
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
                      <View
                        key={index}
                        style={{ width: WINDOW_WIDTH / 3, marginRight: SPACING.space_12 }}
                      >
                        <ArtistCard artist={item} />
                      </View>
                    );
                  }}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;
