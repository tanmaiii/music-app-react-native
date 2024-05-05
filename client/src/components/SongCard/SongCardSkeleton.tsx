import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TSong } from "../../types/song.type";
import { Skeleton } from "moti/skeleton";
import styles from "./style";
import { COLORS, SPACING } from "../../theme/theme";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

const SongCardSkeleton = () => {
  return (
    <TouchableOpacity>
      <View style={[styles.container]}>
        <View style={styles.wrapperImage}>
          <Skeleton {...SkeletonCommonProps} height={170} width={"100%"} />
        </View>

        <View style={{ gap: SPACING.space_4 }}>
          <Skeleton height={18} width={"100%"} {...SkeletonCommonProps} radius={4} />
          <Skeleton height={14} width={"100%"} {...SkeletonCommonProps} radius={4} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SongCardSkeleton;
