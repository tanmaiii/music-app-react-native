import * as React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  Animated,
  FlatList,
  Platform,
  RefreshControl,
} from "react-native";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import IMAGES from "../../constants/images";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils";
import styles from "./style";
import CategoryHeader from "../../components/CategoryHeader";
import SongItem from "../../components/SongItem";
import { TSong, TUser, TPlaylist } from "../../types";
import { Skeleton } from "moti/skeleton";
import ArtistCard from "../../components/ArtistCard";
import PlaylistCard from "../../components/PlaylistCard";
import { NavigationProp, RootRouteProps } from "../../navigation/TStack";
import { StackNavigationProp } from "@react-navigation/stack";
import Constants from "expo-constants";
import CustomBottomSheet from "../../components/CustomBottomSheet";
import { ModalArtist } from "../../components/ItemModal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faEllipsis,
  faPlay,
  faRandom,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
const statusBarHeight = Constants.statusBarHeight;
import { playlistApi, songApi, userApi } from "../../apis";
import apiConfig from "../../configs/axios/apiConfig";
import numeral from "numeral";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import { usePlaying } from "../../context/PlayingContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const HEIGHT_AVATAR = 400;

interface ArtistDetailProps {}

const renderGroupOfSongs = (songs) => {
  const chunkedSongs = [];
  const chunkSize = 5;
  for (let i = 1; i < songs.length; i += chunkSize) {
    chunkedSongs.push(songs.slice(i, i + chunkSize));
  }
  return chunkedSongs;
};

const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

const ArtistDetail = (props: ArtistDetailProps) => {
  const scrollViewRef = React.useRef<ScrollView>();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RootRouteProps<"Artist">>();
  const userId = route.params.userId;
  const { currentUser, token } = useAuth();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [random, setRandom] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isOpenModal, setIsOpenMoal] = React.useState<boolean>(false);
  const [heightModal, setHeightModal] = React.useState<number>(100);
  const [countFollower, setCountFollower] = React.useState<number>(0);

  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const queryClient = useQueryClient();

  const opacityAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [-500, 0, 200],
          outputRange: [1.8, 1.2, 1],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const opacityHideAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

  const backgroundColorAnimation = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ["rgba(0,0,0,0)", COLORS.Black2],
      extrapolate: "clamp",
    }),
  };

  const buttonHeaderAnimation = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 100], // Phạm vi scroll
      outputRange: [COLORS.button, "rgba(0,0,0,0)"], // Màu nền tương ứng
      extrapolate: "clamp", // Giữ giá trị nằm trong phạm vi inputRange
    }),
  };

  const { data: follow, isLoading: loadingFollow } = useQuery({
    queryKey: ["follow", userId],
    queryFn: async () => {
      const res = await userApi.checkFollowing(userId, token);
      return res.isFollowing;
    },
  });

  const { data: followers, isLoading: loadingFollower } = useQuery({
    queryKey: ["followers", userId],
    queryFn: async () => {
      const res = await userApi.getCountFollowers(userId);
      return res;
    },
  });

  const mutationFollow = useMutation({
    mutationFn: async (follow: boolean) => {
      try {
        console.log("follow");
        if (follow) return await userApi.unFollow(userId, token);
        return await userApi.follow(userId, token);
      } catch (err) {
        console.log(err.response.data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["follow", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["all-favorites"],
      });
      queryClient.invalidateQueries({
        queryKey: ["followers", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["artists-follow"],
      });
    },
  });

  const { data: artist } = useQuery({
    queryKey: ["artist", userId],
    queryFn: async () => {
      const res = await userApi.getDetail(userId);
      return res;
    },
  });

  const { data: playlists } = useQuery({
    queryKey: ["playlists", userId],
    queryFn: async () => {
      const res = await playlistApi.getAllByUserId(userId, 1, 10);
      return res.data;
    },
  });

  const { data: songs } = useQuery({
    queryKey: ["songs", userId],
    queryFn: async () => {
      const res = await songApi.getAllByUserId(token, userId, 1, 11);
      return res.data;
    },
  });

  const { data: artists } = useQuery({
    queryKey: ["artists"],
    queryFn: async () => {
      const res = await userApi.getAll(1, 10);
      return res.data;
    },
  });

  const groupedSongs = songs && renderGroupOfSongs(songs);

  React.useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [route, userId]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["artists"] });
      queryClient.invalidateQueries({ queryKey: ["artist"] });
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      queryClient.invalidateQueries({ queryKey: ["followers", userId] });
      setRefreshing(false);
    }, 2000);
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={{ zIndex: 99 }}>
          <Animated.View
            style={[
              styles.header,
              backgroundColorAnimation,
              Platform.OS === "ios" && { paddingTop: statusBarHeight + SPACING.space_8 },
            ]}
          >
            <AnimatedTouchableHighlight
              underlayColor={COLORS.Black2}
              style={[styles.buttonHeader, buttonHeaderAnimation]}
              onPress={() => navigation.goBack()}
            >
              <FontAwesomeIcon icon={faChevronLeft} size={18} style={styles.icon} />
            </AnimatedTouchableHighlight>

            <Animated.Text numberOfLines={1} style={[styles.title, opacityHideAnimation]}>
              {artist?.name}
            </Animated.Text>

            <AnimatedTouchableHighlight
              underlayColor={COLORS.Black2}
              style={[styles.buttonHeader, buttonHeaderAnimation]}
              onPress={() => setIsOpenMoal(!isOpenModal)}
            >
              <FontAwesomeIcon icon={faEllipsis} size={18} style={styles.icon} />
            </AnimatedTouchableHighlight>
          </Animated.View>
        </SafeAreaView>

        <View>
          <Animated.View style={[styles.avatar, { height: HEIGHT_AVATAR }, opacityAnimation]}>
            <Skeleton
              height={"100%"}
              width={"100%"}
              colorMode="dark"
              backgroundColor={COLORS.Black2}
            >
              {loading ? null : (
                <Image
                  style={styles.imageAvatar}
                  source={
                    artist?.image_path
                      ? { uri: apiConfig.imageURL(artist.image_path) }
                      : IMAGES.AVATAR
                  }
                />
              )}
            </Skeleton>
          </Animated.View>

          <ScrollView
            refreshControl={
              <RefreshControl
                tintColor={COLORS.White1}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            ref={scrollViewRef}
            onScroll={(e) => {
              const offsetY = e.nativeEvent.contentOffset.y;
              animatedValue.setValue(offsetY);
            }}
            scrollEventThrottle={16}
            style={{}}
          >
            <View style={[{ height: HEIGHT_AVATAR }]}>
              <Text numberOfLines={1} style={styles.avatarTitle}>
                {artist?.name}
              </Text>
            </View>

            <View style={[styles.body]}>
              <View>
                <Text style={styles.countFollow}>
                  {numeral(followers).format("0a").toUpperCase()} followers
                </Text>
              </View>

              <View style={styles.bodyTop}>
                {currentUser.id !== userId ? (
                  loadingFollow ? null : (
                    <TouchableOpacity
                      style={[styles.buttonFollow, follow && { borderColor: COLORS.White1 }]}
                      onPress={() => mutationFollow.mutate(follow)}
                    >
                      <Text style={{ fontSize: FONTSIZE.size_16, color: COLORS.White1 }}>
                        {follow ? "Following" : "Follow"}
                      </Text>
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity
                    style={styles.buttonFollow}
                    onPress={() => navigation.navigate("UserEditProfile")}
                  >
                    <Text style={{ fontSize: FONTSIZE.size_16, color: COLORS.White1 }}>
                      Edit profile
                    </Text>
                  </TouchableOpacity>
                )}

                <View style={styles.bodyTopRight}>
                  <TouchableOpacity
                    style={styles.buttonSort}
                    onPress={() => setRandom((random) => !random)}
                  >
                    <FontAwesomeIcon
                      icon={faRandom}
                      size={24}
                      color={random ? COLORS.Primary : COLORS.White1}
                    />
                    {random && (
                      <View
                        style={[
                          {
                            position: "absolute",
                            bottom: 8,
                            width: 4,
                            height: 4,
                            borderRadius: 50,
                            backgroundColor: COLORS.Primary,
                          },
                        ]}
                      ></View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.buttonPlay]}>
                    <FontAwesomeIcon icon={faPlay} size={24} color={COLORS.White1} />
                  </TouchableOpacity>
                </View>
              </View>

              <SongTop song={songs?.length > 1 && songs[0]} />

              {songs?.length > 1 && (
                <View style={styles.SlideSong}>
                  <CategoryHeader
                    title={"Songs"}
                    PropFunction={
                      songs?.length > 5
                        ? () => navigation.navigate("ListSong", { userId: artist?.id })
                        : null
                    }
                  />
                  <FlatList
                    data={groupedSongs}
                    snapToInterval={WINDOW_WIDTH - 20}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    renderItem={({ item }) => (
                      <View style={{ width: WINDOW_WIDTH - 20 }}>
                        {item.map((song) => (
                          <SongItem song={song} />
                        ))}
                      </View>
                    )}
                  />
                </View>
              )}

              {playlists?.length > 0 && (
                <View
                  style={{ paddingHorizontal: SPACING.space_10, marginBottom: SPACING.space_24 }}
                >
                  <CategoryHeader
                    title={"Playlist popular"}
                    PropFunction={
                      playlists?.length > 1
                        ? () => navigation.navigate("ListPlaylist", { userId: artist?.id })
                        : null
                    }
                  />
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
              )}

              <View style={styles.bodyBottom}>
                <View style={{ paddingHorizontal: SPACING.space_10 }}>
                  <CategoryHeader title={"Related artists"} />
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
                      if (item.id === userId) return;
                      if (item.id === currentUser.id) return;
                      return (
                        <View style={{ width: WINDOW_WIDTH / 3, marginRight: SPACING.space_12 }}>
                          <ArtistCard loading={loading} artist={item} />
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      {isOpenModal && (
        <CustomBottomSheet
          isOpen={isOpenModal}
          closeModal={() => setIsOpenMoal(false)}
          height1={heightModal}
        >
          <View onLayout={(e) => setHeightModal(e.nativeEvent.layout.height)}>
            <ModalArtist artist={artist} />
          </View>
        </CustomBottomSheet>
      )}
    </>
  );
};

type TSongTop = {
  song: TSong;
};

export const SongTop = ({ song }: TSongTop) => {
  const { setOpenBarSong, setSongIdPlaying, songIdPlaying } = usePlaying();
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationProp>();

  const { data: isLike } = useQuery({
    queryKey: ["like-song", song.id],

    queryFn: async () => {
      const res = await songApi.checkLikedSong(song.id, token);
      return res.isLiked;
    },
  });

  const mutationLike = useMutation({
    mutationFn: (like: boolean) => {
      if (like) return songApi.unLikeSong(song.id, token);
      return songApi.likeSong(song.id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["like-song", song.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs-favorites"],
      });
      queryClient.invalidateQueries({
        queryKey: ["count-songs-favorites"],
      });
    },
  });

  const handlePress = () => {
    navigation.navigate("Song", { songId: song.id });
  };

  return (
    song && (
      <TouchableHighlight underlayColor={COLORS.Black2} onPress={() => handlePress()}>
        <View style={styles.SongTop}>
          <View style={styles.SongTopLeft}>
            <Image
              style={styles.SongTopImage}
              source={song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG}
            />
          </View>
          <View style={styles.SongTopRight}>
            <View>
              <Text numberOfLines={1} style={styles.textExtra}>
                {moment(song?.created_at).format("LL")}
              </Text>
              <Text numberOfLines={1} style={styles.textMain}>
                {song?.title}
              </Text>
              <Text numberOfLines={1} style={styles.textExtra}>
                {song?.author}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.songTopLike}
                onPress={() => song && mutationLike.mutate(isLike)}
              >
                <FontAwesomeIcon
                  icon={isLike ? faHeartSolid : faHeart}
                  size={18}
                  color={COLORS.Red}
                />
                <Text
                  style={[
                    {
                      color: COLORS.Red,
                      fontSize: FONTSIZE.size_18,
                      fontFamily: FONTFAMILY.regular,
                    },
                  ]}
                >
                  Like
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  );
};

export default ArtistDetail;
