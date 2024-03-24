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
} from "react-native";
import styles from "./style";
import IMAGES from "../../constants/images";
const { width, height } = Dimensions.get("window");
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../theme/theme";
import { usePlaying } from "../../context/playingContext";
import { BlurView } from "@react-native-community/blur";

interface PlayingCardProps {}
const PlayingCard = (props: PlayingCardProps) => {
  const { modalVisible, handleChangeModalVisible } = usePlaying();

  const [play, setPlay] = React.useState(false);

  return !modalVisible ? (
    <Pressable
      style={[styles.container, { width: width }]}
      onPress={() => handleChangeModalVisible(!modalVisible)}
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
    </Pressable>
  ) : (
    <></>
  );
};

export default PlayingCard;
