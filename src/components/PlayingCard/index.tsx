import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import styles from "./style";
import IMAGES from "../../constants/images";
const { width, height } = Dimensions.get("window");
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { BORDERRADIUS, COLORS, SPACING } from "../../theme/theme";
import { usePlaying } from "../../context/PlayingContext";
import { BlurView } from "@react-native-community/blur";

interface PlayingCardProps {}
const PlayingCard = (props: PlayingCardProps) => {
  const { openBarSong, setOpenBarSong, setOpenModalSong } = usePlaying();

  const [play, setPlay] = React.useState(false);

  const handleTouch = () => {
    setOpenBarSong(false);
    setOpenModalSong(true);
  };

  return openBarSong ? (
    <Pressable style={[styles.container, { width: width }]} onPress={handleTouch}>
      <ImageBackground
        source={IMAGES.POSTER}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: BORDERRADIUS.radius_8,
          overflow: "hidden",
        }}
        blurRadius={90}
      >
        <View style={styles.wrapper}>
          <View style={styles.left}>
            <Image style={styles.image} source={IMAGES.POSTER} />
            <Text style={styles.title}>Thằng điên</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity onPress={() => setPlay((play) => !play)} style={styles.iconPlay}>
              {play ? (
                <FontAwesome5 name="play" style={[styles.icon]} />
              ) : (
                <FontAwesome name="stop" style={[styles.icon]} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              disabled={true}
              style={styles.iconNext}
              onPress={() => {
                console.log("pressed");
              }}
            >
              <FontAwesome name="forward" color="black" style={[styles.iconDisable]} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  ) : (
    <></>
  );
};

export default PlayingCard;
