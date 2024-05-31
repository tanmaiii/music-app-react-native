import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import { useAudio } from "../../context/AudioContext";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { songApi } from "../../apis";
import { apiConfig } from "../../configs";
import { IMAGES } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS, FONTSIZE, SPACING } from "../../theme/theme";
import {
  faCircleCheck,
  faForwardStep,
  faPause,
  faPlay,
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";
import { usePlaying } from "../../context/PlayingContext";

interface SongPlayingProps {}

const SongPlaying = ({}: SongPlayingProps) => {
  const { playSound, stopSound, isPlaying } = useAudio();
  const { token } = useAuth();
  const { songIdPlaying } = usePlaying();
  const [durationMillis, setDurationMillis] = React.useState(null);

  const handlePlay = () => {
    isPlaying ? stopSound() : playSound();
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

        <View style={styles.playerControlsBar}>
          <View style={styles.scrollBar}>
            <View style={styles.sliderBar}>
              <View
                style={{
                  width: "100%",
                  marginTop: 10,
                  height: 4,
                  backgroundColor: COLORS.WhiteRGBA32,
                  borderRadius: 4,
                }}
              >
                <View
                  style={[
                    {
                      width: `${0.1 * 100}%`,
                      height: "100%",
                      backgroundColor: COLORS.White1,
                      borderRadius: 5,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.sliderBarDot,
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
              <Text style={styles.textExtra}>{durationMillis || "0:00"}</Text>
            </View>
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
        </View>
      </View>
    </View>
  );
};

export default SongPlaying;
