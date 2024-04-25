import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Animated,
  Platform,
} from "react-native";
import IMAGES from "../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TPlaylist, TSong } from "../../types";
import SongItem from "../../components/SongItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowUpFromBracket,
  faChevronLeft,
  faCirclePlus,
  faEllipsis,
  faHeart as faHeartSolid,
  faPlay,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import CustomBottomSheet from "../../components/CustomBottomSheet";
import { AddPlaylist, AddSong, ModalPlaylist, EditPlaylist } from "../../components/ItemModal";
import { RootRouteProps } from "../../navigation/TStack";
import { playlistApi, songApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import apiConfig from "../../configs/axios/apiConfig";
import { FlatList } from "react-native-gesture-handler";
import CategoryHeader from "../../components/CategoryHeader";
import PlaylistCard from "../../components/PlaylistCard";
const statusBarHeight = Constants.statusBarHeight;
import { Skeleton } from "moti/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface PlaylistDetailProps {}

const PlaylistDetail = (props: PlaylistDetailProps) => {
  const navigation = useNavigation();
  const route = useRoute<RootRouteProps<"Playlist">>();
  const flatListRef = React.useRef<FlatList>();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  // const [isLike, setIsLike] = React.useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [isOpenModalAddSong, setIsOpenModalAddSong] = React.useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState<boolean>(false);
  const [heightModal, setHeightModal] = React.useState<number>(400);
  const [playlist, setPlaylist] = React.useState<TPlaylist>(null);
  const [playlists, setPlaylists] = React.useState<TPlaylist[]>(null);
  const [songs, setSongs] = React.useState<TSong[]>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const playlistId = route.params.playlistId;
  const { token, currentUser } = useAuth();
  const queryClient = useQueryClient();

  const headerAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 400],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 100],
          outputRange: [20, 0],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const backgroundColorAnimation = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: ["transparent", COLORS.Black2],
      extrapolate: "clamp",
    }),
  };

  const imageAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 400],
          outputRange: [1, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  const heightAnimation = {
    height: animatedValue.interpolate({
      inputRange: [0, 200],
      outputRange: [400, 0],
      extrapolate: "clamp",
    }),
    opacity: animatedValue.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  const { data: isLike } = useQuery({
    queryKey: ["like-playlist", playlistId],
    queryFn: async () => {
      const res = await playlistApi.checkLikedPlaylist(playlistId, token);
      return res.isLiked;
    },
  });

  const mutationLike = useMutation({
    mutationFn: (like: boolean) => {
      if (like) return playlistApi.unLikePlaylist(playlistId, token);
      return playlistApi.likePlaylist(playlistId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["like-playlist", playlistId],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlists-favorites"],
      });
    },
  });

  const getPlaylist = async () => {
    setLoading(true);
    try {
      const res = await playlistApi.getDetail(playlistId, token);
      const resSongs = await songApi.getAllByPlaylistId(playlistId, 1, 10);
      const resPlaylists = await playlistApi.getAll(1, 6);
      setPlaylist(res);
      setSongs(resSongs.data);
      setTotalCount(resSongs.pagination.totalCount);
      setPlaylists(resPlaylists.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    flatListRef.current && flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
    playlistId && getPlaylist();
  }, [playlistId]);

  return (
    <View style={styles.container}>
      <View>
        <AnimatedLinearGradient
          colors={[COLORS.Primary, "transparent"]}
          style={[{ position: "absolute", left: 0, right: 0, top: 0 }, heightAnimation]}
        ></AnimatedLinearGradient>

        <StatusBar barStyle="light-content" backgroundColor={COLORS.Black2} />

        <SafeAreaView style={{ zIndex: 999 }}>
          <Animated.View
            style={[
              styles.header,
              backgroundColorAnimation,
              Platform.OS === "ios" && { paddingTop: statusBarHeight + SPACING.space_8 },
            ]}
          >
            <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faChevronLeft} size={20} style={{ color: COLORS.White1 }} />
            </TouchableOpacity>
            <Animated.Text numberOfLines={1} style={[styles.titleHeader, headerAnimation]}>
              {playlist?.title || "Unknown"}
            </Animated.Text>
            <TouchableOpacity
              style={[styles.buttonHeader]}
              onPress={() => setIsOpenModal(!isOpenModal)}
            >
              <FontAwesomeIcon icon={faEllipsis} size={24} style={{ color: COLORS.White1 }} />
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>

        <View style={styles.wrapper}>
          <FlatList
            ref={flatListRef}
            onScroll={(e) => {
              const offsetY = e.nativeEvent.contentOffset.y;
              animatedValue.setValue(offsetY);
            }}
            scrollEventThrottle={16}
            ListHeaderComponent={
              <View style={[styles.wrapperHeader]}>
                <Animated.View style={[styles.wrapperImage, imageAnimation]}>
                  <Skeleton {...SkeletonCommonProps} width={300} height={300}>
                    {loading ? null : (
                      <Animated.Image
                        style={[styles.image]}
                        source={
                          playlist?.image_path
                            ? { uri: apiConfig.imageURL(playlist.image_path) }
                            : IMAGES.PLAYLIST
                        }
                      />
                    )}
                  </Skeleton>
                </Animated.View>

                <Skeleton {...SkeletonCommonProps} width={"80%"}>
                  {loading ? null : (
                    <Text
                      numberOfLines={2}
                      style={[styles.textMain, { fontSize: FONTSIZE.size_24, maxWidth: "80%" }]}
                    >
                      {playlist?.title || "Unknown"}
                    </Text>
                  )}
                </Skeleton>
                <Skeleton {...SkeletonCommonProps} width={100} height={18}>
                  {loading ? null : (
                    <Text
                      numberOfLines={1}
                      style={{
                        textAlign: "center",
                        fontSize: FONTSIZE.size_16,
                        color: COLORS.Primary,
                        fontFamily: FONTFAMILY.regular,
                      }}
                    >
                      {playlist?.author || "Unknown"}
                    </Text>
                  )}
                </Skeleton>

                <Text style={styles.textExtra}>{totalCount} Songs</Text>

                <View style={styles.groupButton}>
                  <TouchableOpacity style={styles.buttonExtra}>
                    <FontAwesomeIcon
                      icon={faArrowUpFromBracket}
                      size={18}
                      style={{ color: COLORS.White2 }}
                    />

                    <Text
                      style={{
                        fontSize: FONTSIZE.size_12,
                        color: COLORS.White2,
                        fontFamily: FONTFAMILY.regular,
                      }}
                    >
                      Share
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button}>
                    <FontAwesomeIcon icon={faPlay} size={26} style={{ color: COLORS.White1 }} />

                    <Text style={styles.textButton}>Play</Text>
                  </TouchableOpacity>

                  {currentUser?.id == playlist?.user_id ? (
                    <TouchableOpacity
                      style={styles.buttonExtra}
                      onPress={() => console.log("asdas")}
                    >
                      <FontAwesomeIcon icon={faPlus} size={18} color={COLORS.White2} />
                      <Text
                        style={{
                          fontSize: FONTSIZE.size_12,
                          color: COLORS.White2,
                          fontFamily: FONTFAMILY.regular,
                        }}
                      >
                        Add
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.buttonExtra}
                      onPress={() => mutationLike.mutate(isLike)}
                    >
                      <FontAwesomeIcon
                        icon={isLike ? faHeartSolid : faHeart}
                        size={18}
                        color={isLike ? COLORS.Red : COLORS.White2}
                      />
                      <Text
                        style={{
                          fontSize: FONTSIZE.size_12,
                          color: COLORS.White2,
                          fontFamily: FONTFAMILY.regular,
                        }}
                      >
                        Like
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={styles.textDesc}>{playlist?.desc}</Text>
              </View>
            }
            contentContainerStyle={{
              paddingBottom: HEIGHT.playingCard + 50,
            }}
            style={{ width: "100%" }}
            data={songs}
            renderItem={({ item, index }) => <SongItem song={item} inPlaylist={true} />}
            ListFooterComponent={
              <View style={styles.wrapperFooter}>
                <CategoryHeader
                  title={"Related playlists"}
                  style={{ paddingHorizontal: SPACING.space_10 }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    paddingHorizontal: SPACING.space_8,
                  }}
                >
                  {playlists?.map((playlist, index) => {
                    if (playlist.id === playlistId) return <></>;

                    return (
                      <View
                        style={{
                          width: WINDOW_WIDTH / 2 - SPACING.space_8,
                          padding: SPACING.space_8,
                          // backgroundColor: "pink",
                        }}
                      >
                        <PlaylistCard playlist={playlist} />
                      </View>
                    );
                  })}
                </View>
              </View>
            }
          />
        </View>
      </View>

      {isOpenModal && (
        <CustomBottomSheet
          isOpen={true}
          closeModal={() => setIsOpenModal(false)}
          height1={heightModal}
        >
          <View onLayout={(e) => setHeightModal(e.nativeEvent.layout.height)}>
            <ModalPlaylist
              setOpenModal={setIsOpenModal}
              playlist={playlist}
              // setIsOpenAddSong={setIsOpenModalAddSong}
              setIsOpenEdit={setIsOpenModalEdit}
            />
          </View>
        </CustomBottomSheet>
      )}

      {/* {isOpenModalAddSong && (
        <CustomBottomSheet
          isOpen={true}
          closeModal={() => setIsOpenModalAddSong(false)}
          height1={"100%"}
          border={false}
          enableClose={false}
        >
          <AddSong setIsOpen={setIsOpenModalAddSong} />
        </CustomBottomSheet>
      )} */}

      {isOpenModalEdit && (
        <CustomBottomSheet
          isOpen={true}
          closeModal={() => setIsOpenModalEdit(false)}
          height1={"100%"}
          border={false}
          enableClose={false}
        >
          <EditPlaylist setIsOpen={setIsOpenModalEdit} />
        </CustomBottomSheet>
      )}
    </View>
  );
};

export default PlaylistDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    textAlign: "center",
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "none",
  },
  buttonHeader: {
    // backgroundColor: COLORS.Black2,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    borderRadius: 25,
  },
  iconButtonHeader: {
    color: COLORS.White1,
    fontSize: FONTSIZE.size_24,
  },
  titleHeader: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    textAlign: "center",
    color: COLORS.White1,
    transform: [{ translateY: 20 }],
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.space_12,
    gap: SPACING.space_8,
    // paddingBottom: HEIGHT.navigator + HEIGHT.playingCard,
  },
  wrapperHeader: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.space_12,
    gap: SPACING.space_8,
    marginTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
  },
  wrapperImage: {
    width: 300,
    height: 300,
    overflow: "hidden",
    borderRadius: BORDERRADIUS.radius_8,
  },
  image: {
    width: 300,
    height: 300,
    aspectRatio: 1,
    objectFit: "cover",
    transformOrigin: "bottom",
    backgroundColor: COLORS.Black2,
  },
  groupButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.space_24,
  },
  button: {
    width: 160,
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.Primary,
    paddingHorizontal: SPACING.space_14,
    paddingVertical: SPACING.space_8,
    borderRadius: 25,
    gap: SPACING.space_8,
  },
  buttonExtra: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    width: 40,
  },
  textButton: {
    color: COLORS.White1,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
  },
  textDesc: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    paddingHorizontal: SPACING.space_12,
    color: COLORS.White2,
    width: "100%",
    marginBottom: SPACING.space_12,
  },
  wrapperFooter: {
    // paddingHorizontal: SPACING.space_10,
  },
});
