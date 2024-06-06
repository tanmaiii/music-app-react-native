import { useAudio } from "@/context/AudioContext";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "@/theme/theme";
import { faVolumeHigh, faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";

const PlayerVolumeBar = ({ style }: ViewProps) => {
  const {
    playSound,
    stopSound,
    isPlaying,
    songIdPlaying,
    songDuration,
    currentPosition,
    changeSongDuration,
    volume,
    changeSoundVolume,
  } = useAudio();
  const [focus, setFocus] = React.useState(false);

  const progress = useSharedValue(volume);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const timeoutRef = React.useRef(null);

  const formatDuration = (millis: number | null): string => {
    if (millis === null) return "0:00";
    const minutes = Math.floor(millis / 1000 / 60);
    const seconds = Math.floor((millis / 1000) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleChangeValue = (value: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      changeSoundVolume(value);
    }, 300);
  };

  return (
    <View style={[style, styles.container]}>
      <FontAwesomeIcon icon={faVolumeOff} size={FONTSIZE.size_18} color={COLORS.White2} />
      <View style={{ flex: 1 }}>
        <Slider
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          thumbWidth={0}
          renderBubble={() => null}
          theme={{
            minimumTrackTintColor: focus ? COLORS.White : COLORS.WhiteRGBA32,
            maximumTrackTintColor: COLORS.WhiteRGBA15,
          }}
          containerStyle={{
            height: focus ? 8 : 6,
            borderRadius: 10,
          }}
          onSlidingStart={() => {
            setFocus(true);
          }}
          onSlidingComplete={() => {
            setFocus(false);
          }}
          onValueChange={async (value) => {
            handleChangeValue(value);
          }}
        />
      </View>

      <FontAwesomeIcon icon={faVolumeHigh} size={FONTSIZE.size_18} color={COLORS.White2} />
    </View>
  );
};

export default PlayerVolumeBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    gap: SPACING.space_12,
  },
  textExtra: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
});
