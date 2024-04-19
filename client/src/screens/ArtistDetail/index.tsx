import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
  FlatList,
  Platform,
  Share,
  Pressable,
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
  faPlus,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";
const statusBarHeight = Constants.statusBarHeight;
import { playlistApi, songApi, userApi } from "../../apis";
import apiConfig from "../../apis/apiConfig";
import numeral from "numeral";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import { usePlaying } from "../../context/PlayingContext";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const HEIGHT_AVATAR = 400;

// const songs: TSong[] = [
//   {
//     id: 1,
//     title: "Despacito, Despacito ,Despacito, Despacito",
//     image_path: "despacito.jpg",
//     author: "Luis Fonsi",
//   },
//   { id: 2, title: "Shape of You", image_path: "shape_of_you.jpg", author: "Ed Sheeran" },
//   {
//     id: 3,
//     title: "Uptown Funk",
//     image_path: "uptown_funk.jpg",
//     author: "Mark Ronson ft. Bruno Mars",
//   },
//   { id: 4, title: "Closer", image_path: "closer.jpg", author: "The Chainsmokers ft. Halsey" },
//   {
//     id: 5,
//     title: "See You Again",
//     image_path: "see_you_again.jpg",
//     author: "Wiz Khalifa ft. Charlie Puth",
//   },
//   { id: 6, title: "God's Plan", image_path: "gods_plan.jpg", author: "Drake" },
//   {
//     id: 7,
//     title: "Old Town Road",
//     image_path: "old_town_road.jpg",
//     author: "Lil Nas X ft. Billy Ray Cyrus",
//   },
//   { id: 8, title: "Shape of My Heart", image_path: "shape_of_my_heart.jpg", author: "Sting" },
//   { id: 9, title: "Someone Like You", image_path: "someone_like_you.jpg", author: "Adele" },
//   { id: 10, title: "Bohemian Rhapsody", image_path: "bohemian_rhapsody.jpg", author: "Queen" },
// ];

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
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RootRouteProps<"Artist">>();
  const userId = route.params.userId;
  const { currentUser, token } = useAuth();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [random, setRandom] = React.useState(false);
  const [follow, setFollow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isOpenModal, setIsOpenMoal] = React.useState<boolean>(false);
  const [heightModal, setHeightModal] = React.useState<number>(100);
  const [artist, setArtist] = React.useState<TUser>(null);
  const [countFollowing, setCountFollowing] = React.useState<number>(0);
  const [songs, setSongs] = React.useState<TSong[]>(null);
  const [playlists, setPlaylists] = React.useState<TPlaylist[]>(null);
  const groupedSongs = songs && renderGroupOfSongs(songs);

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

  const checkFollowing = async () => {
    try {
      const res = userId && (await userApi.checkFollowing(userId, token));
      setFollow(res.isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  const getCountFollowing = async () => {
    try {
      const res = await userApi.getCountFollowers(userId);
      setCountFollowing(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async () => {
    try {
      if (follow) {
        await userApi.unFollow(userId, token);
        countFollowing !== 0 ? setCountFollowing(countFollowing - 1) : setCountFollowing(0);
      } else {
        await userApi.follow(userId, token);
        setCountFollowing(countFollowing + 1);
      }
      checkFollowing();
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await userApi.getDetail(userId);
      setLoading(false);
      setArtist(res);
    } catch (error) {}
    setLoading(false);
  };

  const getSongs = async () => {
    setLoading(true);
    try {
      const res = await songApi.getAllByUserId(userId, 11, 1);
      setSongs(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getPlaylists = async () => {
    setLoading(true);
    try {
      const res = await playlistApi.getAllByUserId(userId, 10, 1);
      setPlaylists(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    console.log("userId: ", userId);

    userId && getUser();
    userId && getCountFollowing();
    userId && getSongs();
    userId && getPlaylists();
    currentUser.id !== userId && checkFollowing();
  }, [route, userId]);

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
              onPress={() => setIsOpenMoal(true)}
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
                  {numeral(countFollowing).format("0a").toUpperCase()} following
                </Text>
              </View>

              <View style={styles.bodyTop}>
                {currentUser.id !== userId ? (
                  <TouchableOpacity
                    style={[styles.buttonFollow, follow && { borderColor: COLORS.White1 }]}
                    onPress={() => handleFollow()}
                  >
                    <Text style={{ fontSize: FONTSIZE.size_16, color: COLORS.White1 }}>
                      {follow ? "Unfollow" : "Follow"}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.buttonFollow}>
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
                      playlists?.length > 5
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
                      <PlaylistCard cardWidth={WINDOW_WIDTH / 2.4} playlist={item} />
                    )}
                  />
                </View>
              )}

              <View style={styles.bodyBottom}>
                <View style={{ paddingHorizontal: SPACING.space_10 }}>
                  <CategoryHeader title={"Related artists"} />
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
                      <ArtistCard loading={loading} cardWidth={WINDOW_WIDTH / 3} artist={item} />
                    )}
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
            <ModalArtist artist={artist} countFollowing={countFollowing} />
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
  const { setOpenBarSong, setSongPlaying, songPlaying } = usePlaying();

  const handlePress = () => {
    setSongPlaying(song.id);
    setOpenBarSong(true);
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
              <TouchableOpacity style={styles.songTopLike}>
                <FontAwesomeIcon icon={faHeart} size={18} color={COLORS.Red} />
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
