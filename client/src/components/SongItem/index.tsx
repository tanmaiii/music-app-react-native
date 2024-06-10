import { ModalSong } from "@/components/ModalSong";
import apiConfig from "@/configs/axios/apiConfig";
import IMAGES from "@/constants/images";
import { useBarSong } from "@/context/BarSongContext";
import { NavigationProp } from "@/navigators/TStack";
import { COLORS, SPACING } from "@/theme/theme";
import { TSong } from "@/types";
import { Feather } from "@expo/vector-icons";
import { faCircle, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import * as React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import CustomBottomSheet from "../CustomBottomSheet";
import SongItemSkeleton from "./SongItemSkeleton";

import { useAudio } from "@/context/AudioContext";
import LottieView from "lottie-react-native";
import styles from "./style";

interface SongItemProps {
  loading?: boolean;
  song?: TSong;
  playlistId?: string;
  rankNumber?: number;
}

const SongItem = (props: SongItemProps) => {
  const { setOpenBarSong } = useBarSong();
  const { playSound, songIdPlaying, isPlaying, changeToQueue, playSong, stopSound } = useAudio();
  const { song, loading = false, rankNumber } = props;
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [heightModal, setHeightModal] = React.useState(100);
  const navigation = useNavigation<NavigationProp>();

  const handlePlay = () => {
    if (loading) return;
    if (song?.id === songIdPlaying && isPlaying) {
      stopSound();
    } else {
      if (song?.id === songIdPlaying) {
        playSound(song?.id);
      } else {
        console.log("song", song);

        playSong(song);
      }
      setOpenBarSong(true);
    }
  };

  if (loading || !song) return <SongItemSkeleton />;

  return (
    song && (
      <>
        <TouchableHighlight
          underlayColor={COLORS.Black2}
          onPress={() => handlePlay()}
          style={styles.container}
        >
          <View style={styles.swapper}>
            {rankNumber && (
              <View style={styles.ranking}>
                <Text numberOfLines={1} style={[styles.numRanking]}>{`#${rankNumber}`}</Text>
              </View>
            )}

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
