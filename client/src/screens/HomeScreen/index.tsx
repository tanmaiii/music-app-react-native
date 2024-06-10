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
import HomeTop from "@/components/HomeTop";
import SongCard from "@/components/SongCard";
import IMAGES from "@/constants/images";
import { COLORS, SPACING } from "@/theme/theme";
import styles from "./style";

import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { useLinkTo } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { favouriteApi, playlistApi, searchApi, songApi, userApi } from "@/apis";
import ArtistCard from "@/components/ArtistCard";
import PlaylistCard from "@/components/PlaylistCard";
import SectionCard from "@/components/SectionCard";
import Slider from "@/components/Slider";
import { useAuth } from "@/context/AuthContext";
import CategoryHeader from "@/components/CategoryHeader";
import playApi from "@/apis/play/playApi";
import SlideSong from "@/components/SlideSong";

interface HomeScreenProps {}

const HomeScreen = ({ navigation }: any) => {
  const [greeting, setGreeting] = React.useState("");
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const linkTo = useLinkTo();
  const { currentUser, setCurrentUser, logout, token } = useAuth();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const queryClient = useQueryClient();

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
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
  };

  useEffect(() => {
    if (!currentUser) return linkTo("/Login");
  });

  const {
    data: playlists,
    isLoading: loadingPlaylists,
    refetch: refetchPlaylists,
  } = useQuery({
    queryKey: ["playlists-popular"],
    queryFn: async () => {
      const res = await searchApi.getPlaylists(token, 1, 10, undefined, "count");
      return res.data;
    },
  });

  const { data: playlistsNew, refetch: refetchPlaylistNew } = useQuery({
    queryKey: ["playlists-new"],
    queryFn: async () => {
      const res = await searchApi.getPlaylists(token, 1, 10, undefined, "new");
      return res.data;
    },
  });

  const {
    data: songsNew,
    isLoading: loadingSongsNew,
    refetch: refetchSongsNew,
  } = useQuery({
    queryKey: ["songs-new"],
    queryFn: async () => {
      const res = await searchApi.getSongs(token, 1, 10, undefined, "new");
      return res.data;
    },
  });

  const {
    data: songs,
    isLoading: loadingSongs,
    refetch: refetchSongs,
  } = useQuery({
    queryKey: ["favorite-songs"],
    queryFn: async () => {
      const res = await searchApi.getSongs(token, 1, 10, undefined, "count");
      return res.data;
    },
  });

  const {
    data: songPopular,
    isLoading: loadingSongPopular,
    refetch: refetchSongPopular,
  } = useQuery({
    queryKey: ["songs-popular"],
    queryFn: async () => {
      const res = await searchApi.getPopular(token, 1, 10, null, "new");
      console.log("popular", res.data);

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
      const res = await searchApi.getArtists(token, 1, 10, undefined, "count");

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
        refetchPlaylistNew(),
        refetchSongPopular(),
        setRefreshing(false);
    }, 2000);
  }, []);

  const LoadingView = () => {
    return (
      <>
        <SectionCard title="" loading={true} data={null} />
        <SectionCard title="" loading={true} data={null} />
        <SectionCard title="" loading={true} data={null} />
        <SectionCard title="" loading={true} data={null} />
      </>
    );
  };

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
            <Slider loading={loadingSongs} refetch={refreshing} />

            <HomeTop data={playlistFavourite} loading={loadingPlaylistFavourite} />

            {loadingSongs || loadingPlaylists || loadingArtists ? (
              <LoadingView />
            ) : (
              <>
                {songPopular && <SlideSong title={"Ranked in the last 30 days"} songs={songPopular} />}

                {songsNew && (
                  <SectionCard
                    title="New songs released"
                    loading={loadingSongsNew}
                    data={songsNew}
                    renderItem={({ item, index }) => (
                      <View
                        key={index}
                        style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}
                      >
                        <SongCard song={item} loading={false} />
                      </View>
                    )}
                  />
                )}

                {songs && (
                  <SectionCard
                    title="Favorite songs"
                    loading={loadingSongs}
                    data={songs}
                    renderItem={({ item, index }) => (
                      <View
                        key={index}
                        style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}
                      >
                        <SongCard song={item} loading={false} />
                      </View>
                    )}
                  />
                )}

                {playlistsNew && (
                  <SectionCard
                    title="New playlist released"
                    data={playlistsNew}
                    renderItem={({ item, index }) => (
                      <View
                        key={index}
                        style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}
                      >
                        <PlaylistCard playlist={item} />
                      </View>
                    )}
                  />
                )}

                {playlists && (
                  <SectionCard
                    title="Playlist popular"
                    loading={loadingPlaylists}
                    data={playlists}
                    renderItem={({ item, index }) => (
                      <View
                        key={index}
                        style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}
                      >
                        <PlaylistCard playlist={item} />
                      </View>
                    )}
                  />
                )}

                {artists && (
                  <SectionCard
                    title="Famous artists"
                    loading={loadingArtists}
                    data={artists}
                    numItem={3}
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
                )}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;
