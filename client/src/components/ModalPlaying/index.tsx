import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import IMAGES from "../../constants/images";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import TouchableScale from "../../components/TouchableScale";
import { songApi } from "../../apis";
import { TSong } from "../../types";
import { useAuth } from "../../context/AuthContext";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import apiConfig from "../../apis/apiConfig";
import TrackPlayer, { State } from "react-native-track-player";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowUpFromBracket,
  faBars,
  faEllipsis,
  faForwardFast,
  faForwardStep,
  faHeart,
  faPause,
  faPlay,
  faShuffle,
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { LinearGradient } from "expo-linear-gradient";

import { BlurView } from "expo-blur";

interface ModalPlayingProps {}

const ModalPlaying = (props: ModalPlayingProps) => {
  const [play, setPlay] = useState(false);
  const [like, setLike] = useState(false);
  const [songs, setSongs] = useState<TSong | null>(null);
  const { token } = useAuth();
  const [sound, setSound] = useState(null);
  const [durationMillis, setDurationMillis] = useState(null);

  const loadSound = async () => {
    const { sound, status: any } = await Audio.Sound.createAsync(
      require("../../assets/mp3/song1.mp3")
    );
    setSound(sound);
  };

  const getSongs = async () => {
    try {
      const res = await songApi.getDetail(19, token);
      setSongs(res);
    } catch (err) {
      console.log(err.response.data.conflictError);
    }
  };

  React.useEffect(() => {
    loadSound();
  }, []);

  const handleClickPlay = () => {
    setPlay((play) => !play);
    play ? sound.playAsync() : sound.pauseAsync();
  };

  return (
    <ImageBackground source={IMAGES.POSTER} style={styles.container} blurRadius={80}>
      <LinearGradient
        colors={["transparent" , COLORS.Black1, COLORS.Black1 ]}
        style={[{ position: "absolute", left: 0, right: 0, top: 0, height: WINDOW_HEIGHT }]}
      ></LinearGradient>

      <StatusBar barStyle="light-content" />

      <View style={styles.wrapper}>
        <View
          style={{
            width: 48,
            height: 6,
            backgroundColor: COLORS.WhiteRGBA50,
            borderRadius: BORDERRADIUS.radius_14,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: SPACING.space_36,
          }}
        ></View>

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={styles.wrapperImage}>
            <Image style={[styles.image, { zIndex: 99 }]} source={IMAGES.POSTER} />
          </View>
        </View>

        <View style={styles.playerControlsTop}>
          <Text numberOfLines={1} style={styles.textMain}>
            Chúng ta của hiện tại
          </Text>
          <Text numberOfLines={1} style={styles.textExtra}>
            Sơn tùng & Hải Tú
          </Text>
        </View>

        <View style={styles.playerControlsBar}>
          <View style={styles.scrollBar}>
            <View style={styles.slider}>
              <View
                style={{
                  width: "100%",
                  marginTop: 10,
                  height: 6,
                  backgroundColor: COLORS.WhiteRGBA50,
                  borderRadius: 5,
                }}
              >
                <View
                  style={[
                    {
                      width: `${0.1 * 100}%`,
                      height: "100%",
                      backgroundColor: COLORS.Primary,
                      borderRadius: 5,
                    },
                  ]}
                />
                <View
                  style={[
                    {
                      position: "absolute",
                      top: -5,
                      width: 16,
                      height: 16,
                      borderRadius: 16 / 2,
                      backgroundColor: COLORS.Primary,
                    },
                    {
                      left: `${0.1 * 100}%`,
                      marginLeft: -16 / 2,
                    },
                  ]}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.textExtra}>0:38 </Text>
              <Text style={styles.textExtra}>{durationMillis}</Text>
            </View>
          </View>

          <View style={styles.action}>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesomeIcon icon={faStepBackward} size={28} color={COLORS.Primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonStart} onPress={handleClickPlay}>
              {!play ? (
                <FontAwesomeIcon icon={faPause} size={28} color={COLORS.White1} />
              ) : (
                <FontAwesomeIcon icon={faPlay} size={28} color={COLORS.White1} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesomeIcon icon={faForwardStep} size={28} color={COLORS.Primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.playerControlsBottom}>
          <TouchableOpacity style={styles.BottomButton} onPress={() => setLike((like) => !like)}>
            {like ? (
              <FontAwesomeIcon icon={faHeart} size={20} color={COLORS.Red} />
            ) : (
              <FontAwesomeIcon icon={faHeartRegular} size={20} color={COLORS.WhiteRGBA50} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomButton}>
            <FontAwesomeIcon icon={faShuffle} size={20} color={COLORS.WhiteRGBA50} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomButton}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size={20} color={COLORS.WhiteRGBA50} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomButton}>
            <FontAwesomeIcon icon={faBars} size={20} color={COLORS.WhiteRGBA50} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ModalPlaying;

const imageSize = WINDOW_WIDTH - 2 * SPACING.space_18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: WINDOW_HEIGHT,
  },
  textMain: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.medium,
    textAlign: "center",
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  wrapper: {
    paddingTop: SPACING.space_18,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
  },
  wrapperImage: {
    // aspectRatio: 1, // Đảm bảo chiều cao và chiều rộng bằng nhau
    width: 340,
    height: 340,
    // borderRadius: imageSize / 2,
    borderRadius: BORDERRADIUS.radius_8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    // transform: [{rotate: '100deg'}]
  },
  playerControlsTop: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingVertical: SPACING.space_28,
  },
  buttonMore: {
    backgroundColor: COLORS.WhiteRGBA15,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 25,
  },

  playerControlsBar: {
    paddingHorizontal: SPACING.space_18,
    width: "100%",
    gap: SPACING.space_8,
  },
  scrollBar: {
    width: "100%",
    gap: SPACING.space_8,
  },
  slider: {
    width: "100%",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_32,
  },
  actionButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  actionButtonStart: {
    backgroundColor: COLORS.Primary,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  playerControlsBottom: {
    marginTop: SPACING.space_32,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.space_18,
    alignItems: "center",
    width: "100%",
    borderTopColor: COLORS.WhiteRGBA15,
    borderTopWidth: 1,
  },
  BottomButton: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
});
