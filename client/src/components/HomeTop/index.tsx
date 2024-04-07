import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import IMAGES from "../../constants/images";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import TouchableScale from "../TouchableScale";
import { Skeleton } from "moti/skeleton";

interface HomeTopProps {
  loading?: boolean;
}

const data = [
  {
    id: 1,
    title: "Son Tung MTP",
  },
  {
    id: 2,
    title: "Charlie Puth",
  },
  {
    id: 3,
    title: "Hot Hits Vietnam",
  },
  {
    id: 4,
    title: "Chill",
  },
  {
    id: 5,
    title: "Tuyển tập của RPT MCK",
  },
];

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

const HomeTop = (props: HomeTopProps) => {
  const { loading = false } = props;
  const linkTo = useLinkTo();

  if (loading)
    return (
      <View style={[styles.container]}>
        <View style={styles.card}>
          <View style={[styles.wrapper]}>
            <Skeleton height={"100%"} width={"100%"} {...SkeletonCommonProps}></Skeleton>
          </View>
        </View>
        <View style={styles.card}>
          <View style={[styles.wrapper]}>
            <Skeleton height={"100%"} width={"100%"} {...SkeletonCommonProps}></Skeleton>
          </View>
        </View>
        <View style={styles.card}>
          <View style={[styles.wrapper]}>
            <Skeleton height={"100%"} width={"100%"} {...SkeletonCommonProps}></Skeleton>
          </View>
        </View>
        <View style={styles.card}>
          <View style={[styles.wrapper]}>
            <Skeleton height={"100%"} width={"100%"} {...SkeletonCommonProps}></Skeleton>
          </View>
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <TouchableScale style={styles.card} onPress={() => linkTo("/ArtistDetail")}>
          <View style={[styles.wrapper]}>
            <Image style={styles.cardImage} source={IMAGES.POSTER} />
            <View style={styles.cardBody}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
        </TouchableScale>
      ))}
    </View>
  );
};

export default HomeTop;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Chia theo hàng ngang để tạo hai cột
    justifyContent: "space-between", // Căn các cột ở hai đầu
    alignItems: "stretch", // Mở rộng các cột để chiếm toàn bộ không gian
    flex: 1, // Đảm bảo container mở rộng để điều chỉnh các cột
    flexWrap: "wrap",
    marginRight: -SPACING.space_4,
    marginLeft: -SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
  },
  card: {
    height: 64,
    width: "50%",
    padding: SPACING.space_4,
  },
  wrapper: {
    backgroundColor: COLORS.Black3,
    borderRadius: BORDERRADIUS.radius_4,
    overflow: "hidden",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  cardImage: {
    height: "100%",
    width: 56,
    aspectRatio: 1 / 1,
  },
  cardBody: {
    flex: 1,
    justifyContent: "center",
    padding: SPACING.space_8,
  },
  title: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
});
