import { songApi } from "@/apis";
import { apiConfig } from "@/configs";
import { IMAGES } from "@/constants";
import { useAudio } from "@/context/AudioContext";
import { useAuth } from "@/context/AuthContext";
import { COLORS, FONTSIZE, SPACING } from "@/theme/theme";
import {
  faCircleCheck,
  faForwardStep,
  faPause,
  faPlay,
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import PlayerProgressBar from "../PlayerProgressBar";
import PlayerVolumeBar from "../PlayerVolumeBar";

interface SongPlayingProps {}

const SongPlaying = ({}: SongPlayingProps) => {
  const { playSound, stopSound, isPlaying, songIdPlaying } = useAudio();
  const { token } = useAuth();

  const handlePlay = () => {
    isPlaying ? stopSound() : playSound(songIdPlaying);
  };

  const { data: song } = useQuery({
    queryKey: ["song", songIdPlaying],
    queryFn: async () => {
      const res = await songApi.getDetail(songIdPlaying, token);
      return res;
    },
  });

  return (
    <View style={styles.wrapperSong}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={[styles.wrapperImage]}>
          <Image
            style={[styles.image]}
            source={song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG}
          />
        </View>
      </View>

      <View>
        <View style={[styles.playerControlsTop]}>
          <Text numberOfLines={1} style={styles.textMain}>
            {song?.title}
          </Text>

          <View style={{ flexDirection: "row", gap: SPACING.space_4, alignItems: "center" }}>
            {false && (
              <FontAwesomeIcon
                icon={faCircleCheck}
                color={COLORS.Primary}
                size={FONTSIZE.size_16}
              />
            )}
            <Text numberOfLines={1} style={styles.textExtra}>
              {song?.author}
            </Text>
          </View>
        </View>

        <View style={[styles.playerControlsBar]}>
          <View style={styles.scrollBar}>
            <PlayerProgressBar />
          </View>

          <View style={styles.action}>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesomeIcon icon={faStepBackward} size={34} color={COLORS.White1} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonStart} onPress={() => handlePlay()}>
              {isPlaying ? (
                <FontAwesomeIcon icon={faPause} size={28} color={COLORS.White1} />
              ) : (
                <FontAwesomeIcon icon={faPlay} size={28} color={COLORS.White1} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesomeIcon icon={faForwardStep} size={34} color={COLORS.White1} />
            </TouchableOpacity>
          </View>

          <View style={styles.actionVolume}>
            <PlayerVolumeBar />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SongPlaying;
