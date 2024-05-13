import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../../theme/theme";
import { Skeleton } from "moti/skeleton";
import styles from "./style";

interface SongItemProps {}

const SkeletonCommonProps = {
  colorMode: "dark",
  duration: 1500,
  type: "timing",
  backgroundColor: COLORS.Black2,
} as const;

const SongItemSkeleton = (props: SongItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.swapper}>
        <View style={styles.swapperImage}>
          <Skeleton {...SkeletonCommonProps} radius={4} width={"100%"} height={"100%"} />
        </View>
        <View style={styles.body}>
          <View style={{ gap: SPACING.space_4, flex: 1 }}>
            <Skeleton {...SkeletonCommonProps} radius={4} width={180} height={16}></Skeleton>
            <Skeleton {...SkeletonCommonProps} radius={4} width={100} height={16}></Skeleton>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SongItemSkeleton;
