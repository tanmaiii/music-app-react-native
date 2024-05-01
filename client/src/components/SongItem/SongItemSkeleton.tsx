import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { Skeleton } from "moti/skeleton";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

interface SongItemProps {}

const SongItemSkeleton = (props: SongItemProps) => {
  return (
    <>
      <View style={styles.swapper}>
        <View style={styles.swapperImage}>
          <Skeleton radius={4} width={"100%"} height={"100%"} {...SkeletonCommonProps} />
        </View>
        <View style={styles.body}>
          <View style={{ gap: SPACING.space_4, flex: 1 }}>
            <Skeleton radius={4} width={180} height={16} {...SkeletonCommonProps}></Skeleton>
            <Skeleton radius={4} width={100} height={16} {...SkeletonCommonProps}></Skeleton>
          </View>
        </View>
      </View>
    </>
  );
};
export default SongItemSkeleton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.space_12,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White1,
  },
  textEtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  swapper: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  swapperImage: {
    height: 50,
    width: 50,
    overflow: "hidden",
    borderRadius: BORDERRADIUS.radius_4,
    alignItems: "center",
    backgroundColor: COLORS.Black2,
  },
  image: {
    height: 50,
    width: 50,
    aspectRatio: 1 / 1,
    objectFit: "cover",
  },
  body: {
    flex: 1,
    marginLeft: SPACING.space_8,
    borderBottomWidth: 0.6,
    borderColor: COLORS.WhiteRGBA15,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
  },
  buttonMore: {
    position: "relative",
    // backgroundColor: COLORS.Black2,
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  buttonMoreBody: {
    flex: 1,
    position: "absolute",
    flexDirection: "column",
    right: 0,
    top: "100%",
    backgroundColor: COLORS.Black2,
    padding: SPACING.space_4,
  },
});
