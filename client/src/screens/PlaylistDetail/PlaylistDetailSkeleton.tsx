import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import styles from "./style";
import { Skeleton } from "moti/skeleton";
import { COLORS, SPACING } from "../../theme/theme";

interface PlaylistDetailSkeletonProps {}

const SkeletonCommonProps = {
  colorMode: "dark",
  type: "timing",
  duration: 1000,
  backgroundColor: COLORS.Black3,
} as const;

const PlaylistDetailSkeleton = (props: PlaylistDetailSkeletonProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.wrapperHeader]}>
        <View style={[styles.wrapperImage]}>
          <Skeleton {...SkeletonCommonProps} width="100%" height="100%" />
        </View>

        <Skeleton {...SkeletonCommonProps} width={200} height={40} />
        <Skeleton {...SkeletonCommonProps} width="80%" height={18} />
        <Skeleton {...SkeletonCommonProps} width="80%" height={18} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: SPACING.space_12,
          }}
        >
          <Skeleton {...SkeletonCommonProps} width={40} height={40} radius={"round"} />

          <Skeleton {...SkeletonCommonProps} width={140} height={40} radius={20} />

          <Skeleton {...SkeletonCommonProps} width={40} height={40} radius={"round"} />
        </View>
        <View style={{ padding: SPACING.space_12 }}>
          <Skeleton {...SkeletonCommonProps} height={60} width={"100%"} radius={4} />
        </View>
      </View>
    </View>
  );
};

export default PlaylistDetailSkeleton;
