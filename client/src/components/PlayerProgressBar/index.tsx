import { useAudio } from "@/context/AudioContext";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "@/theme/theme";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";

const PlayerProgressBar = ({ style }: ViewProps) => {
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

  const progress = useSharedValue(currentPosition);
  const min = useSharedValue(0);
  const max = useSharedValue(songDuration);
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
      changeSongDuration(value);
    }, 300);
  };

  useEffect(() => {
    progress.value = currentPosition;
  }, [currentPosition]);

  return (
    <View style={[style, styles.container]}>
      <View>
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
            if (!isPlaying) return;
            stopSound();
          }}
          onSlidingComplete={() => {
            setFocus(false);
          }}
          onValueChange={async (value) => {
            handleChangeValue(value);
          }}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.textExtra}>{currentPosition && formatDuration(currentPosition)} </Text>
        <Text style={styles.textExtra}>{songDuration && formatDuration(songDuration)}</Text>
      </View>
    </View>
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    // flex: 1,
    gap: SPACING.space_8,
  },
  textExtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
});
