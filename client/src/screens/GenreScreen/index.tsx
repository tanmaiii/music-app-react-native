import { Animated, Platform, SafeAreaView, Share, Text, View } from "react-native";
import { genreApi } from "@/apis";
import CategoryHeader from "@/components/CategoryHeader";
import GenreCard from "@/components/GenreCard";
import PlaylistCard from "@/components/PlaylistCard";
import SectionCard from "@/components/SectionCard";
import SongCard from "@/components/SongCard";
import { NavigationProp, RootRouteProps } from "@/navigators/TStack";
import { COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "@/theme/theme";
import { TGenre } from "@/types/genre.type";
import { faArrowUpFromBracket, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import styles from "./style";
import { WINDOW_WIDTH } from "@/utils";
const statusBarHeight = Constants.statusBarHeight;

interface GenreScreenProps {}
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const GenreScreen = (props: GenreScreenProps) => {
  const route = useRoute<RootRouteProps<"Genre">>();
  const genreId = route.params.genreId;
  const [genres, setGenres] = React.useState<TGenre[]>(null);
  const queryClient = useQueryClient();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp>();

  const { data: genre, isLoading } = useQuery({
    queryKey: ["genre", genreId],
    queryFn: async () => {
      const res = await genreApi.getDetail(genreId);
      return res;
    },
  });

  const opacityHideAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

  const heightLinearGradientAnimation = {
    height: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [200, 120],
      extrapolate: "clamp",
    }),
  };

  const {
    data: songsPopular,
    isLoading: loadingSongs,
    refetch: refetchSongs,
  } = useQuery({
    queryKey: ["genre-songs-popular", genreId],
    queryFn: async () => {
      const res = await genreApi.getSongs(genre.id, 1, 10, undefined, "count");
      return res.data;
    },
  });

  const { data: songsNew, isLoading: loadingSongsNew } = useQuery({
    queryKey: ["genre-songs-new", genreId],
    queryFn: async () => {
      const res = await genreApi.getSongs(genre.id, 1, 10, undefined, "new");
      return res.data;
    },
  });

  const { data: playlistsPopular, isLoading: loadingPlaylistsPopular } = useQuery({
    queryKey: ["genre-playlists-popular", genreId],
    queryFn: async () => {
      const res = await genreApi.getPlaylists(genre.id, 1, 10, undefined, "count");
      return res.data;
    },
  });

  const { data: playlistsNew, isLoading: loadingPlaylistsNew } = useQuery({
    queryKey: ["genre-playlists-new", genreId],
    queryFn: async () => {
      const res = await genreApi.getPlaylists(genre.id, 1, 10, undefined, "new");
      return res.data;
    },
  });

  React.useEffect(() => {
    const getGenres = async () => {
      const res = await genreApi.getAll(1, 7);
      const filtered = res.data?.filter((genre) => genre.id !== genreId) || [];
      setGenres(filtered.slice(0, 6));
    };
    getGenres();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: "React Native | A framework for building native apps using React",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <AnimatedLinearGradient
          colors={[genre?.color || COLORS.Primary, "transparent"]}
          style={[
            { height: 200, position: "absolute", top: 0, width: "100%" },
            heightLinearGradientAnimation,
          ]}
        ></AnimatedLinearGradient>
        <View
          style={[
            styles.header,
            Platform.OS === "ios" && {
              marginTop: -statusBarHeight,
              paddingTop: statusBarHeight + SPACING.space_12,
            },
          ]}
        >
          <View style={[styles.headerTop]}>
            <TouchableHighlight
              underlayColor={COLORS.BlackRGB10}
              style={[styles.buttonHeader]}
              onPress={() => navigation.goBack()}
            >
              <FontAwesomeIcon icon={faChevronLeft} size={18} style={styles.icon} />
            </TouchableHighlight>

            <Animated.Text numberOfLines={1} style={[styles.title, opacityHideAnimation]}>
              {genre?.title}
            </Animated.Text>

            <TouchableHighlight
              underlayColor={COLORS.BlackRGB10}
              style={[styles.buttonHeader]}
              onPress={() => handleShare()}
            >
              <FontAwesomeIcon icon={faArrowUpFromBracket} size={18} style={styles.icon} />
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          animatedValue.setValue(offsetY);
        }}
      >
        <View style={{ paddingBottom: HEIGHT.navigator + HEIGHT.playingCard }}>
          <View style={[styles.headerBottom]}>
            <Text style={styles.titleHeaderBottom}>{genre?.title}</Text>
          </View>

          {loadingPlaylistsNew || loadingPlaylistsPopular || loadingSongs ? (
            <>
              <SectionCard title="" loading={true} data={null} />
              <SectionCard title="" loading={true} data={null} />
              <SectionCard title="" loading={true} data={null} />
              <SectionCard title="" loading={true} data={null} />
            </>
          ) : (
            <>
              <SectionCard
                title="Song popular"
                loading={loadingSongs}
                data={songsPopular}
                renderItem={({ item, index }) => (
                  <View
                    key={index}
                    style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}
                  >
                    <SongCard song={item} loading={false} />
                  </View>
                )}
              />
              <SectionCard
                title="Song new"
                loading={loadingSongs}
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
              <SectionCard
                title="Song popular"
                loading={loadingSongs}
                data={playlistsPopular}
                renderItem={({ item, index }) => (
                  <View
                    key={index}
                    style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}
                  >
                    <PlaylistCard playlist={item} loading={false} />
                  </View>
                )}
              />
              <SectionCard
                title="Song popular"
                loading={loadingSongs}
                data={playlistsNew}
                renderItem={({ item, index }) => (
                  <View
                    key={index}
                    style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}
                  >
                    <PlaylistCard playlist={item} loading={false} />
                  </View>
                )}
              />
            </>
          )}

          <View>
            {songsPopular?.length <= 0 &&
              songsNew?.length <= 0 &&
              playlistsNew?.length <= 0 &&
              playlistsPopular?.length <= 0 && (
                <View
                  style={{
                    paddingVertical: SPACING.space_12,
                    width: WINDOW_WIDTH,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      {
                        color: COLORS.White2,
                        fontSize: FONTSIZE.size_14,
                        fontFamily: FONTFAMILY.regular,
                      },
                    ]}
                  >
                    Sorry, there are no matching results
                  </Text>
                </View>
              )}
          </View>

          <View>
            <View style={{ paddingHorizontal: SPACING.space_10, marginTop: SPACING.space_24 }}>
              <CategoryHeader title={"Genre other"} loading={false} />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {genres?.map((item) => {
                return (
                  <View
                    key={item.id}
                    style={{
                      width: WINDOW_WIDTH / 2,
                      padding: SPACING.space_10,
                    }}
                  >
                    <GenreCard genre={item} />
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GenreScreen;
