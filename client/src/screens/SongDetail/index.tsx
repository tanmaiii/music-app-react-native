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
import {
  Feather,
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";
import TouchableScale from "../../components/TouchableScale";
import { songApi } from "../../apis";
import { TSong } from "../../types";
import { useAuth } from "../../context/AuthContext";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import apiConfig from "../../apis/apiConfig";
import TrackPlayer, { State } from "react-native-track-player";

interface SongDetailProps {}

const SongDetail = (props: SongDetailProps) => {
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
    console.log(play);
  };

  return (
    <ImageBackground source={IMAGES.AI} style={styles.container} blurRadius={80}>
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
            <Image style={styles.image} source={IMAGES.AI} />
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
              <Text style={styles.textExtra}>0:38</Text>
              <Text style={styles.textExtra}>{durationMillis}</Text>
            </View>
          </View>

          <View style={styles.action}>
            <TouchableOpacity style={styles.actionButton}>
              <AntDesign
                name="stepbackward"
                size={28}
                style={{ color: COLORS.Primary, opacity: 0.6 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonStart} onPress={handleClickPlay}>
              {!play ? (
                <Ionicons name="pause" size={30} style={{ color: COLORS.White1 }} />
              ) : (
                <Ionicons name="play" size={30} style={{ color: COLORS.White1 }} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <AntDesign name="stepforward" size={28} style={{ color: COLORS.Primary }} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.playerControlsBottom}>
          <TouchableOpacity style={styles.BottomButton} onPress={() => setLike((like) => !like)}>
            {like ? (
              <Ionicons name="heart" size={24} style={{ color: COLORS.Red }} />
            ) : (
              <Ionicons name="heart-outline" size={24} style={{ color: COLORS.WhiteRGBA50 }} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomButton}>
            <Ionicons name="repeat-outline" size={24} style={{ color: COLORS.WhiteRGBA50 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomButton}>
            <Feather name="share" size={24} color="black" style={{ color: COLORS.WhiteRGBA50 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomButton}>
            <Feather name="more-horizontal" size={24} style={{ color: COLORS.WhiteRGBA50 }} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SongDetail;

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
