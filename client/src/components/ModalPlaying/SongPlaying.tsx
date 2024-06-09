import { apiConfig } from "@/configs";
import { IMAGES } from "@/constants";
import { useAudio } from "@/context/AudioContext";
import { useAuth } from "@/context/AuthContext";
import { SPACING } from "@/theme/theme";
import { TSong } from "@/types";
import * as React from "react";
import { Image, Text, View } from "react-native";
import PlayerControls from "../PlayerControls";
import PlayerProgressBar from "../PlayerProgressBar";
import PlayerVolumeBar from "../PlayerVolumeBar";
import styles from "./style";

interface SongPlayingProps {}

const SongPlaying = ({}: SongPlayingProps) => {
  const { playSound, stopSound, isPlaying, songIdPlaying, queue, currentSongIndex } = useAudio();
  const { token } = useAuth();
  const [song, setSong] = React.useState<TSong>(null);

  React.useEffect(() => {
    setSong(queue[currentSongIndex]);
  }, [queue, currentSongIndex, songIdPlaying]);

  return (
    <View style={styles.wrapperSong}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={[styles.wrapperImage]}>
          <Image
            style={[styles.image]}
            source={song?.image_path ? { uri: apiConfig.imageURL(song?.image_path) } : IMAGES.SONG}
          />
        </View>
      </View>

      <View>
        <View style={[styles.playerControlsTop]}>
          <Text numberOfLines={1} style={styles.textMain}>
            {song?.title || "        "}
          </Text>

          <View style={{ flexDirection: "row", gap: SPACING.space_4, alignItems: "center" }}>
            {/* <FontAwesomeIcon icon={faCircleCheck} color={COLORS.Primary} size={FONTSIZE.size_16} /> */}
            <Text numberOfLines={1} style={styles.textExtra}>
              {song?.author || "          "}
            </Text>
          </View>
        </View>

        <View style={[styles.playerControlsBar]}>
          <View style={styles.scrollBar}>
            <PlayerProgressBar />
          </View>

          <PlayerControls />

          <View style={styles.actionVolume}>
            <PlayerVolumeBar />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SongPlaying;
