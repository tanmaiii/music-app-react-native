import * as React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { Skeleton } from "moti/skeleton";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

const CategoryHeaderSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton {...SkeletonCommonProps} width={100} height={24} radius={4}/>
    </View>
  );
};

export default CategoryHeaderSkeleton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.space_16,
    justifyContent: "flex-start",
  },
  textMain: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.bold,
    color: COLORS.White,
  },
});
