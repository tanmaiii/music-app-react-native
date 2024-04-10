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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BORDERRADIUS, COLORS, SPACING } from "../../theme/theme";
import { usePlaying } from "../../context/PlayingContext";
import { faForwardStep, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import CustomBottomSheet from "../CustomBottomSheet";
import SongPlaying from "../SongPlaying";

interface PlayingCardProps {}

const PlayingCard = (props: PlayingCardProps) => {
  const { openBarSong } = usePlaying();

  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);

  const [play, setPlay] = React.useState(false);

  const handleTouch = () => {
    setIsOpenModal(true);
  };

  return openBarSong ? (
    <>
      <Pressable style={[styles.container, { width: width }]} onPress={() => setIsOpenModal(true)}>
        <ImageBackground
          source={IMAGES.AI}
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
          blurRadius={60}
        >
          <View style={styles.wrapper}>
            <View style={styles.left}>
              <View style={[styles.boxImage, styles.shadowProp]}>
                <Image style={styles.image} source={IMAGES.AI} />
              </View>
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
      {isOpenModal && (
        <CustomBottomSheet isOpen={true} closeModal={() => setIsOpenModal(false)} height1="100%">
          <SongPlaying />
        </CustomBottomSheet>
      )}
    </>
  ) : (
    <></>
  );
};

export default PlayingCard;
