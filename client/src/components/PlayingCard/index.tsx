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
// import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BORDERRADIUS, COLORS, SPACING } from "../../theme/theme";
import { usePlaying } from "../../context/PlayingContext";
import { BlurView } from "@react-native-community/blur";
import { faForwardStep, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

interface PlayingCardProps {}
const PlayingCard = (props: PlayingCardProps) => {
  const { openBarSong, setOpenBarSong, setOpenModalSong, songPlaying } = usePlaying();

  const [play, setPlay] = React.useState(false);

  const handleTouch = () => {
    setOpenBarSong(false);
    setOpenModalSong(true);
  };

  return openBarSong ? (
    <Pressable style={[styles.container, { width: width }]} onPress={handleTouch}>
      <ImageBackground
        source={IMAGES.AI}
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
            <Image style={styles.image} source={IMAGES.AI} />
            <View>
              <Text style={styles.title}>Thằng điên</Text>
              <Text style={styles.artist}>Phương Ly</Text>
            </View>
          </View>
          <View style={styles.right}>
            <TouchableOpacity onPress={() => setPlay((play) => !play)} style={styles.iconPlay}>
              {play ? (
                <FontAwesomeIcon icon={faPlay} size={26} color={COLORS.White1} />
              ) : (
                <FontAwesomeIcon icon={faPause} size={26} color={COLORS.White1} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              disabled={true}
              style={styles.iconNext}
              onPress={() => {
                console.log("pressed");
              }}
            >
              <FontAwesomeIcon icon={faForwardStep} size={26} color={COLORS.White1} />
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
