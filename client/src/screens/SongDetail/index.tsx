import * as React from "react";
import styles from "./style";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Platform,
  ImageBackground,
  Share,
} from "react-native";
import IMAGES from "../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TSong, TUser } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowUpFromBracket,
  faChevronLeft,
  faEllipsis,
  faHeart as faHeartSolid,
  faLock,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;
import CustomBottomSheet from "../../components/CustomBottomSheet";

import { AddSongToPlaylist, ModalSong } from "../../components/ItemModal";
import { NavigationProp, RootRouteProps } from "../../navigation/TStack";
import apiConfig from "../../configs/axios/apiConfig";
import { songApi, userApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import numeral from "numeral";
import { Skeleton } from "moti/skeleton";
import { usePlaying } from "../../context/PlayingContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ArtistItem from "../../components/ArtistItem";
import moment from "moment";
import SongDetailSkeleton from "./SongDetailSkeleton";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

interface SongDetailProps {}

const SongDetail = (props: SongDetailProps) => {
  const navigation = useNavigation();
  const route = useRoute<RootRouteProps<"Song">>();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [heightModal, setHeightModal] = React.useState<number>(50);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  // const [song, setSong] = React.useState<TSong>();
  // const [loading, setLoading] = React.useState<boolean>(false);
  const songId = route.params.songId;
  const { token } = useAuth();
  const { setOpenBarSong, setSongIdPlaying, songIdPlaying } = usePlaying();
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

  const { data: isLike } = useQuery({
    queryKey: ["like-song", songId],
    queryFn: async () => {
      const res = await songApi.checkLikedSong(songId, token);
      return res.isLiked;
    },
  });

  const mutationLike = useMutation({
    mutationFn: (like: boolean) => {
      if (like) return songApi.unLikeSong(songId, token);
      return songApi.likeSong(songId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["like-song", songId],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs-favorites"],
      });
      queryClient.invalidateQueries({
        queryKey: ["count-songs-favorites"],
      });
    },
  });

  const { data: song, isLoading: loading } = useQuery({
    queryKey: ["song", songId],
    queryFn: async () => {
      const res = await songApi.getDetail(songId, token);
      return res;
    },
  });

  const handleShare = async () => {
    try {
      await Share.share({
        message: "React Native | A framework for building native apps using React",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlay = () => {
    song && setSongIdPlaying(song?.id);
    setOpenBarSong(true);
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : null}
          blurRadius={90}
          style={[{ backgroundColor: COLORS.Primary }]}
        >
          <AnimatedLinearGradient
            colors={["transparent", COLORS.Black1]}
            style={[{ position: "absolute", left: 0, right: 0, top: 0, height: WINDOW_HEIGHT }]}
          ></AnimatedLinearGradient>

          <StatusBar barStyle="light-content" backgroundColor={COLORS.Black2} />

          <SafeAreaView style={{ zIndex: 1 }}>
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
              <Animated.Text style={[styles.titleHeader, headerAnimation]}>
                {song?.title || "Unknown"}
              </Animated.Text>
              <TouchableOpacity
                style={styles.buttonHeader}
                onPress={() => setIsOpenModal(!isOpenModal)}
              >
                <FontAwesomeIcon icon={faEllipsis} size={24} style={{ color: COLORS.White1 }} />
              </TouchableOpacity>
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
            {loading ? (
              <SongDetailSkeleton />
            ) : (
              <View style={styles.wrapper}>
                <Animated.View style={[styles.wrapperImage, imageAnimation]}>
                  <Image
                    style={[styles.image]}
                    source={
                      song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG
                    }
                  />
                </Animated.View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: SPACING.space_4,
                  }}
                >
                  {song?.public === 0 && (
                    <FontAwesomeIcon icon={faLock} size={16} color={COLORS.White1} />
                  )}
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.textMain,
                      {
                        fontSize: FONTSIZE.size_24,
                        textAlign: "center",
                        maxWidth: "80%",
                      },
                    ]}
                  >
                    {song?.title || "Unknown"}
                  </Text>
                </View>

                <Text
                  numberOfLines={1}
                  style={[styles.textMain, { color: COLORS.Primary, textAlign: "center" }]}
                >
                  {song?.author || "Unknown"}
                </Text>

                <View style={styles.groupButton}>
                  <TouchableOpacity style={styles.buttonExtra} onPress={() => handleShare()}>
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

                  <TouchableOpacity style={styles.button} onPress={() => handlePlay()}>
                    <FontAwesomeIcon icon={faPlay} size={26} style={{ color: COLORS.White1 }} />
                    <Text style={styles.textButton}>Play</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonExtra}
                    onPress={() => mutationLike.mutate(isLike)}
                  >
                    <FontAwesomeIcon
                      icon={isLike ? faHeart : faHeartRegular}
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
                </View>

                <View style={styles.info}>
                  <Text style={styles.textExtra}>
                    Released: {moment(song?.created_at).format("YYYY")}
                  </Text>
                  <Text style={styles.textExtra}>Duration: 4 minutes</Text>
                </View>

                <ScrollView style={styles.listArtist}>
                  <Text style={[styles.textMain, { marginBottom: SPACING.space_12 }]}>
                    About artist
                  </Text>
                  <ArtistItem userId={song?.user_id} />
                </ScrollView>
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      </View>

      {isOpenModal && (
        <CustomBottomSheet
          isOpen={true}
          closeModal={() => setIsOpenModal(false)}
          height1={heightModal}
        >
          <View onLayout={(event) => setHeightModal(event.nativeEvent.layout.height)}>
            <ModalSong song={song} setOpenModal={setIsOpenModal} />
          </View>
        </CustomBottomSheet>
      )}
    </>
  );
};

export default SongDetail;
