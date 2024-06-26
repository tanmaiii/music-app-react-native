import { useAudio } from "@/context/AudioContext";
import { COLORS, SPACING } from "@/theme/theme";
import {
  faBackward,
  faForward,
  faForwardStep,
  faPause,
  faPlay,
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import { ViewStyle } from "react-native";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

interface PlayerControlsProps {}

const PlayerControls = (props: PlayerControlsProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 40,
          alignItems: "center",
          paddingVertical: SPACING.space_8,
        }}
      >
        <PrevButton />
        <PlayPauseButton style={styles.buttonStart} />
        <NextButton />
      </View>
    </View>
  );
};

type PlayerButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export const PlayPauseButton = ({ style, iconSize = 34 }: PlayerButtonProps) => {
  const { isPlaying, songIdPlaying, playSound, stopSound, loading: loadingAudio } = useAudio();
  const timeoutRef = React.useRef(null);

  const handlePlay = () => {
    console.log("next");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      isPlaying ? stopSound() : playSound(songIdPlaying);
    }, 200);
  };

  return (
    <View>
      <TouchableOpacity style={[style]} onPress={() => !loadingAudio && handlePlay()}>
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          size={iconSize}
          color={COLORS.White1}
        />
      </TouchableOpacity>
    </View>
  );
};

export const NextButton = ({ style, iconSize = 34 }: PlayerButtonProps) => {
  const { isPlaying, queue, nextSong } = useAudio();
  const [disabled, setDisabled] = React.useState(true);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    if (queue.length <= 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [queue]);

  const handlePress = async () => {
    console.log("next");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      await nextSong();
    }, 300);
  };

  return (
    <View style={[style]}>
      <TouchableOpacity disabled={disabled} style={styles.button} onPress={() => handlePress()}>
        <FontAwesomeIcon
          icon={faForwardStep}
          size={iconSize}
          color={disabled ? COLORS.WhiteRGBA32 : COLORS.White}
        />
      </TouchableOpacity>
    </View>
  );
};

export const PrevButton = ({ style, iconSize = 34 }: PlayerButtonProps) => {
  const { isPlaying, queue, previousSong } = useAudio();
  const [disabled, setDisabled] = React.useState(true);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    if (queue.length <= 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [queue]);

  const handlePress = async () => {
    console.log("prev");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      await previousSong();
    }, 300);
  };

  return (
    <View style={[style]}>
      <TouchableOpacity disabled={disabled} style={styles.button} onPress={() => handlePress()}>
        <FontAwesomeIcon
          icon={faStepBackward}
          size={iconSize}
          color={disabled ? COLORS.WhiteRGBA32 : COLORS.White}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlayerControls;

const styles = StyleSheet.create({
  container: {},
  button: {
    // width: 50,
    // height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  buttonStart: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: COLORS.White1,
    borderWidth: 2.4,
  },
});
