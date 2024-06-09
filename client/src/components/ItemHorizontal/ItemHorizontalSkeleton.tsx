import * as React from "react";
import { View } from "react-native";
import { Skeleton } from "moti/skeleton";
import { COLORS } from "../../theme/theme";
import styles from "./style";

const SkeletonCommonProps = {
  colorMode: "dark",
  type: "timing",
  duration: 1500,
  backgroundColor: COLORS.Black2,
} as const;

const ItemHorizontalSkeleton = ({ type }: { type: string }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.boxImage}>
          <Skeleton
            {...SkeletonCommonProps}
            width={70}
            height={70}
            radius={type === "artist" ? 35 : 4}
          />
        </View>
        <View style={styles.body}>
          <Skeleton {...SkeletonCommonProps} width={200} height={18} radius={4} />
          <Skeleton {...SkeletonCommonProps} width={60} height={14} radius={4} />
        </View>
      </View>
    </View>
  );
};
//
export default ItemHorizontalSkeleton;
