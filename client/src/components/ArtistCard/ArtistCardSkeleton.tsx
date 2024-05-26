import { Skeleton } from "moti/skeleton";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { COLORS, SPACING } from "@/theme/theme";
import styles from "./style";

const SkeletonCommonProps = {
  colorMode: "dark",
  type: "timing",
  duration: 1500,
  backgroundColor: COLORS.Black2,
} as const;

const ArtistCardSkeleton = () => {
  return (
    <TouchableOpacity>
      <View style={[styles.container]}>
        <View style={styles.wrapperImage}>
          <Skeleton {...SkeletonCommonProps} radius="round" width={"100%"} height={170} />
        </View>

        <View style={{ gap: SPACING.space_4 }}>
          <Skeleton height={20} width={"100%"} {...SkeletonCommonProps} radius={6} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCardSkeleton;
