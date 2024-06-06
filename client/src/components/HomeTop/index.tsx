import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "moti/skeleton";
import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import apiConfig from "../../configs/axios/apiConfig";
import IMAGES from "../../constants/images";
import { useAuth } from "../../context/AuthContext";
import { NavigationProp } from "../../navigators/TStack";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { ResFavourite } from "../../types";
import TouchableScale from "../TouchableScale";

interface HomeTopProps {
  data: ResFavourite[];
  loading: boolean;
}

const SkeletonCommonProps = {
  colorMode: "dark",
  type: "timing",
  duration: 1500,
  backgroundColor: COLORS.Black2,
} as const;

const HomeTop = ({ data, loading }: HomeTopProps) => {
  const navigation = useNavigation<NavigationProp>();
  const { currentUser, token } = useAuth();

  if (loading)
    return (
      <View style={[styles.container]}>
        <View style={styles.card}>
          <View style={[styles.wrapper]}>
            <Skeleton {...SkeletonCommonProps} height={"100%"} width={"100%"} radius={0}></Skeleton>
          </View>
        </View>
        <View style={styles.card}>
          <View style={[styles.wrapper]}>
            <Skeleton {...SkeletonCommonProps} height={"100%"} width={"100%"} radius={0}></Skeleton>
          </View>
        </View>
        <View style={styles.card}>
          <View style={[styles.wrapper]}>
            <Skeleton {...SkeletonCommonProps} height={"100%"} width={"100%"} radius={0}></Skeleton>
          </View>
        </View>
        <View style={styles.card}>
          <View style={[styles.wrapper]}>
            <Skeleton {...SkeletonCommonProps} height={"100%"} width={"100%"} radius={0}></Skeleton>
          </View>
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <TouchableScale style={styles.card} onPress={() => navigation.navigate("ListSongLike")}>
        <View style={[styles.wrapper]}>
          <View
            style={[
              styles.cardImage,
              { backgroundColor: COLORS.Primary, alignItems: "center", justifyContent: "center" },
            ]}
          >
            <FontAwesomeIcon icon={faHeart} size={20} color={COLORS.White} />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.title}>Favorite Song</Text>
          </View>
        </View>
      </TouchableScale>
      {data &&
        data?.slice(0, 5).map((item, index) => (
          <TouchableScale
            key={index}
            style={styles.card}
            onPress={
              item.type === "playlist"
                ? () => navigation.navigate("Playlist", { playlistId: item.id })
                : () => navigation.navigate("Artist", { userId: item.id })
            }
          >
            <View style={[styles.wrapper]}>
              <Image
                style={styles.cardImage}
                source={
                  item?.image_path
                    ? { uri: apiConfig.imageURL(item.image_path) }
                    : item.name
                    ? IMAGES.AVATAR
                    : IMAGES.PLAYLIST
                }
              />
              <View style={styles.cardBody}>
                <Text style={styles.title}>{item.title || item.name}</Text>
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
    borderRadius: BORDERRADIUS.radius_4,
    backgroundColor: COLORS.Black3,
    overflow: "hidden",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  cardImage: {
    height: "100%",
    width: 56,
    aspectRatio: 1 / 1,
    backgroundColor: COLORS.Black2,
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
