import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Skeleton } from "moti/skeleton";
import styles from "./style";
import { COLORS, SPACING } from "../../theme/theme";

const SkeletonCommonProps = {
  colorMode: "dark",
  duration: 1500,
  type: "timing",
  backgroundColor: COLORS.Black2,
} as const;

const SongCardSkeleton = () => {
  return (
    <TouchableOpacity>
      <View style={[styles.container]}>
        <View style={styles.wrapperImage}>
          <Skeleton {...SkeletonCommonProps} height={170} width={"100%"} radius={8} />
        </View>

        <View style={{ gap: SPACING.space_4 }}>
          <Skeleton {...SkeletonCommonProps} height={18} width={"100%"} />
          <Skeleton {...SkeletonCommonProps} height={14} width={"100%"} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SongCardSkeleton;
