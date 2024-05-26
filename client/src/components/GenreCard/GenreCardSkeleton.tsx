import { Skeleton } from "moti/skeleton";
import * as React from "react";
import { View } from "react-native";
import { COLORS } from "../../theme/theme";
import styles from "./style";

const SkeletonCommonProps = {
  colorMode: "dark",
  duration: 1500,
  type: "timing",
  backgroundColor: COLORS.Black2,
} as const;

const GenreCardSkeleton = () => {
  return (
    <View style={[styles.container]}>
      {/* <View style={[styles.wrapper]}> */}
      <Skeleton {...SkeletonCommonProps} height={"100%"} width={"100%"} />
      {/* </View> */}
    </View>
  );
};

export default GenreCardSkeleton;
