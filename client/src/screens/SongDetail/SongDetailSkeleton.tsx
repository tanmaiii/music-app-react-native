import * as React from "react";
import styles from "./style";
import { Text, View, TouchableOpacity } from "react-native";
import { Skeleton } from "moti/skeleton";
import { COLORS, SPACING } from "../../theme/theme";
import { WINDOW_WIDTH } from "../../utils";
import { duration } from "moment";

const SkeletonCommonProps = {
  colorMode: "dark",
  duration: 1500,
  type: "timing",
  backgroundColor: COLORS.Black2,
} as const;

interface SongDetailProps {}

const SongDetailSkeleton = (props: SongDetailProps) => {
  return (
    <View style={[styles.wrapper]}>
      <View style={[styles.wrapperImage]}>
        <Skeleton {...SkeletonCommonProps} width={300} height={300}></Skeleton>
      </View>
      <Skeleton {...SkeletonCommonProps} width={"80%"} />
      <Skeleton {...SkeletonCommonProps} width={100} height={18} />
      <View style={styles.groupButton}>
        <View style={styles.buttonExtra}>
          <Skeleton {...SkeletonCommonProps} width={40} height={40} radius={"round"} />
        </View>

        <Skeleton {...SkeletonCommonProps} width={120} height={40} radius={SPACING.space_20} />

        <View style={styles.buttonExtra}>
          <Skeleton {...SkeletonCommonProps} width={40} height={40} radius={"round"} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 30, gap: SPACING.space_12 }}>
        <Skeleton {...SkeletonCommonProps} width={"100%"} height={60} />
        <Skeleton {...SkeletonCommonProps} width={"100%"} height={60} />
      </View>
    </View>
  );
};

export default SongDetailSkeleton;
