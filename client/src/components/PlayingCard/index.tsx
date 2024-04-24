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
import { TSong } from "../../types";
import { songApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import ModalPlaying from "../ModalPlaying";
import apiConfig from "../../configs/axios/apiConfig";

interface PlayingCardProps {}

const PlayingCard = (props: PlayingCardProps) => {
  const { openBarSong, songPlaying } = usePlaying();
  const { token } = useAuth();
  const [song, setSong] = React.useState<TSong | null>(null);
  const [loading, setLoading] = React.useState(false);

  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);

  const [play, setPlay] = React.useState(false);

  const getSongs = async () => {
    setLoading(true);
    try {
      const res = await songApi.getDetail(songPlaying, token);
      setSong(res);
      console.log(res);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.conflictError);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    songPlaying && getSongs();
  }, [songPlaying]);

  const handleTouch = () => {
    setIsOpenModal(true);
  };

  return openBarSong && song ? (
    <>
      <Pressable
        style={[styles.container, { width: width }]}
        onPress={() => setIsOpenModal(!isOpenModal)}
      >
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
                <Image
                  style={styles.image}
                  source={
                    song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG
                  }
                />
              </View>
              <View>
                <Text style={styles.title}>{song?.title}</Text>
                <Text style={styles.artist}>{song?.author}</Text>
              </View>
            </View>
            <View style={styles.right}>
              <TouchableOpacity onPress={() => setPlay((play) => !play)} style={styles.iconPlay}>
                {play ? (
                  <FontAwesomeIcon icon={faPlay} size={24} color={COLORS.White1} />
                ) : (
                  <FontAwesomeIcon icon={faPause} size={24} color={COLORS.White1} />
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
          <ModalPlaying />
        </CustomBottomSheet>
      )}
    </>
  ) : (
    <></>
  );
};

export default PlayingCard;
