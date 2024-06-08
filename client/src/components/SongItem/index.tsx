import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import IMAGES from "../../constants/images";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useBarSong } from "../../context/BarSongContext";
import { TSong } from "../../types";
import { ModalSong } from "../ItemModal";
import CustomBottomSheet from "../CustomBottomSheet";
import apiConfig from "../../configs/axios/apiConfig";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle, faDotCircle, faLock } from "@fortawesome/free-solid-svg-icons";
import { NavigationProp } from "../../navigators/TStack";
import SongItemSkeleton from "./SongItemSkeleton";

import styles from "./style";
import { useAudio } from "@/context/AudioContext";
import LottieView from "lottie-react-native";

interface SongItemProps {
  loading?: boolean;
  song?: TSong;
  playlistId?: string;
}

const SongItem = (props: SongItemProps) => {
  const { setOpenBarSong } = useBarSong();
  const { playSound, songIdPlaying, isPlaying, changeToQueue } = useAudio();
  const { song, loading = false } = props;
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [heightModal, setHeightModal] = React.useState(100);
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    const songsToPlay = song ? [song] : [];
    changeToQueue(songsToPlay);
  };

  if (loading || !song) return <SongItemSkeleton />;

  return (
    song && (
      <>
        <TouchableHighlight
          underlayColor={COLORS.Black2}
          onPress={() => handlePress()}
          style={styles.container}
        >
          <View style={styles.swapper}>
            <View style={styles.swapperImage}>
              {songIdPlaying == song?.id && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: COLORS.BlackRGB32,
                    zIndex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LottieView
                    source={require("@/assets/images/music.json")}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                    speed={isPlaying ? 1 : 0}
                    autoPlay
                    loop
                  />
                </View>
              )}
              <Image
                style={styles.image}
                source={
                  song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG
                }
              />
            </View>
            <View style={styles.body}>
              <View style={{ gap: SPACING.space_4, flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={[styles.textMain, songIdPlaying == song?.id && { color: COLORS.Primary }]}
                >
                  {song?.public === 0 && (
                    <>
                      <FontAwesomeIcon icon={faLock} size={12} color={COLORS.White1} />{" "}
                    </>
                  )}
                  {song?.title}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: SPACING.space_4 }}>
                  <Text style={[styles.textEtra]}>{song?.author}</Text>
                  <FontAwesomeIcon icon={faCircle} size={2} color={COLORS.White2} />
                  <Text style={[styles.textEtra]}>{moment(song?.created_at).format("YYYY")}</Text>
                </View>
              </View>
              {!loading && (
                <TouchableHighlight
                  onPress={() => setIsOpenModal(!isOpenModal)}
                  underlayColor={COLORS.Black2}
                  style={styles.buttonMore}
                >
                  <Feather name="more-horizontal" size={24} style={{ color: COLORS.White1 }} />
                </TouchableHighlight>
              )}
            </View>
          </View>
        </TouchableHighlight>
        {isOpenModal && (
          <CustomBottomSheet
            isOpen={true}
            closeModal={() => setIsOpenModal(false)}
            height1={heightModal}
          >
            <View onLayout={(event) => setHeightModal(event.nativeEvent.layout.height)}>
              <ModalSong song={song} setOpenModal={setIsOpenModal} playlistId={props.playlistId} />
            </View>
          </CustomBottomSheet>
        )}
      </>
    )
  );
};

export default SongItem;
