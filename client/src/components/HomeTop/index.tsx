import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import IMAGES from "../../constants/images";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import TouchableScale from "../TouchableScale";
import { Skeleton } from "moti/skeleton";
import { NavigationProp } from "../../navigation/TStack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { TPlaylist } from "../../types";
import { playlistApi } from "../../apis";
import apiConfig from "../../configs/axios/apiConfig";

interface HomeTopProps {
  data: TPlaylist[];
}

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

const HomeTop = ({ data }: HomeTopProps) => {
  const linkTo = useLinkTo();
  const navigation = useNavigation<NavigationProp>();
  const { currentUser, token } = useAuth();
  const [playlists, setPlaylists] = React.useState<TPlaylist[]>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  // const getData = async () => {
  //   setLoading(true);
  //   try {
  //     // const resArtist = await userApi.getFollowing(currentUser.id, page, 10, null, sort);
  //     const resPlaylist = await playlistApi.getAllFavoritesByUser(token, 1, 10, null, "new");
  //     setPlaylists(resPlaylist.data);
  //     // setArtists(resArtist.data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err.response.data.conflictError);
  //   }
  //   setLoading(false);
  // };

  // React.useEffect(() => {
  //   getData();
  // }, [currentUser]);

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
      <TouchableScale
        style={styles.card}
        onPress={() => navigation.navigate("ListSongLike", { userId: currentUser.id })}
      >
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
        data?.slice(0, 5).map((item) => (
          <TouchableScale
            style={styles.card}
            onPress={() => navigation.navigate("Playlist", { playlistId: item.id })}
          >
            <View style={[styles.wrapper]}>
              <Image
                style={styles.cardImage}
                source={
                  item?.image_path ? { uri: apiConfig.imageURL(item.image_path) } : IMAGES.PLAYLIST
                }
              />
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
