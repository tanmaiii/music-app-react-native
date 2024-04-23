import * as React from "react";
import styles from "./style";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Animated,
  Platform,
  ImageBackground,
  Modal,
  Share,
} from "react-native";
import IMAGES from "../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TSong, TUser } from "../../types";
import SongItem from "../../components/SongItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowUpFromBracket,
  faChevronLeft,
  faEllipsis,
  faHeart as faHeartSolid,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import CustomBottomSheet from "../../components/CustomBottomSheet";

import { AddSongToPlaylist, ModalSong } from "../../components/ItemModal";
import { NavigationProp, RootRouteProps } from "../../navigation/TStack";
import apiConfig from "../../apis/apiConfig";
import { songApi, userApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import numeral from "numeral";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

interface SongDetailProps {}

const SongDetail = (props: SongDetailProps) => {
  const navigation = useNavigation();
  const route = useRoute<RootRouteProps<"Song">>();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [isLike, setIsLike] = React.useState<boolean>(false);
  const [heightModal, setHeightModal] = React.useState<number>(50);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [song, setSong] = React.useState<TSong>();
  const songId = route.params.songId;
  const { token } = useAuth();

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

  const checkLike = async () => {
    try {
      const res = await songApi.checkLikedSong(songId, token);
      setIsLike(res.isLiked);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleLike = async () => {
    try {
      if (isLike) {
        setIsLike(false);
        await songApi.unLikeSong(songId, token);
      } else {
        setIsLike(true);
        await songApi.likeSong(songId, token);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getSong = async () => {
    try {
      const res = await songApi.getDetail(songId, token);
      setSong(res);
    } catch (error) {}
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: "React Native | A framework for building native apps using React",
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    checkLike();
    getSong();
  }, [songId]);

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
            <View style={styles.wrapper}>
              <View style={[styles.wrapperImage]}>
                <Animated.Image
                  style={[styles.image, imageAnimation]}
                  source={
                    song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG
                  }
                />
              </View>

              <Text style={[styles.textMain, { fontSize: FONTSIZE.size_24 }]}>
                {song?.title || "Unknown"}
              </Text>

              <Text style={[styles.textMain, { color: COLORS.Primary }]}>
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

                <TouchableOpacity style={styles.button}>
                  <FontAwesomeIcon icon={faPlay} size={26} style={{ color: COLORS.White1 }} />

                  <Text style={styles.textButton}>Play</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonExtra} onPress={() => handleLike()}>
                  <FontAwesomeIcon
                    icon={isLike ? faHeart : faHeartRegular}
                    size={18}
                    color={isLike ? COLORS.Red : COLORS.White1}
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
                <Text style={styles.textExtra}>Released: 2019</Text>
                <Text style={styles.textExtra}>Duration: 4 minutes</Text>
              </View>

              <ScrollView style={styles.listArtist}>
                <Text style={[styles.textMain, { marginBottom: SPACING.space_12 }]}>
                  About artist
                </Text>
                <ItemArtist userId={song?.user_id} />
              </ScrollView>
            </View>
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

const ItemArtist = ({ userId }: { userId: number }) => {
  const [artist, setArtist] = React.useState<TUser>();
  const [followersCount, setFollowersCount] = React.useState<number>(0);
  const navigate = useNavigation<NavigationProp>();

  const getFollower = async () => {
    try {
      const res = await userApi.getCountFollowers(userId);
      setFollowersCount(res);
    } catch (error) {}
  };

  const getArtist = async () => {
    try {
      const res = await userApi.getDetail(userId);
      setArtist(res);
    } catch (error) {}
  };

  React.useEffect(() => {
    userId && getArtist();
    userId && getFollower();
  }, [userId]);

  return (
    artist && (
      <TouchableOpacity
        style={styles.boxArtist}
        onPress={() => navigate.navigate("Artist", { userId: userId })}
      >
        <View style={styles.leftBox}>
          <Image
            style={styles.boxImage}
            source={
              artist?.image_path ? { uri: apiConfig.imageURL(artist.image_path) } : IMAGES.AVATAR
            }
          />
          <View style={styles.boxDesc}>
            <Text style={styles.textMain} numberOfLines={1}>
              {artist?.name}
            </Text>
            <Text style={styles.textExtra}>
              {numeral(followersCount).format("0a").toUpperCase()} follower
            </Text>
          </View>
        </View>
        <View style={styles.rightBox}>
          <TouchableOpacity style={styles.btnFollow}>
            <Text style={styles.textExtra}>Follow</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  );
};

export default SongDetail;
