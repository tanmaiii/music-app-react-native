import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigators/TStack";
import { TUser } from "../../types";
import { userApi } from "../../apis";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { apiConfig } from "../../configs";
import { IMAGES } from "../../constants";
import numeral from "numeral";

interface ArtistItemProps {}

const ArtistItem = ({ userId }: { userId: string }) => {
  const [artist, setArtist] = React.useState<TUser>();
  const [followersCount, setFollowersCount] = React.useState<number>(0);
  const navigate = useNavigation<NavigationProp>();
  const { token, currentUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: follow } = useQuery({
    queryKey: ["follow", userId],
    queryFn: async () => {
      const res = await userApi.checkFollowing(userId, token);
      return res.isFollowing;
    },
  });

  const { data: followers } = useQuery({
    queryKey: ["followers", userId],
    queryFn: async () => {
      const res = await userApi.getCountFollowers(userId);
      return res;
    },
  });

  const mutationFollow = useMutation({
    mutationFn: (follow: boolean) => {
      if (follow) return userApi.unFollow(userId, token);
      return userApi.follow(userId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["follow", userId] });
      queryClient.invalidateQueries({ queryKey: ["followers", userId] });
      queryClient.invalidateQueries({ queryKey: ["artists-follow"] });
      queryClient.invalidateQueries({ queryKey: ["all-favorites"] });
    },
  });

  const getArtist = async () => {
    try {
      const res = await userApi.getDetail(userId);
      setArtist(res);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  React.useEffect(() => {
    userId && getArtist();
  }, [userId]);

  return (
    artist && (
      <TouchableOpacity
        style={styles.boxArtist}
        onPress={() => navigate.navigate("Artist", { userId: userId })}
      >
        <View style={styles.leftBox}>
          <Image
            style={styles.boxImage}
            source={
              artist?.image_path ? { uri: apiConfig.imageURL(artist.image_path) } : IMAGES.AVATAR
            }
          />
          <View style={styles.boxDesc}>
            <Text style={styles.textMain} numberOfLines={1}>
              {artist?.name}
            </Text>
            <Text style={styles.textExtra}>
              {numeral(followers).format("0a").toUpperCase()} follower
            </Text>
          </View>
        </View>
        <View style={styles.rightBox}>
          {currentUser.id === userId ? null : (
            <TouchableOpacity
              style={[styles.btnFollow, follow && { borderColor: COLORS.White1 }]}
              onPress={() => mutationFollow.mutate(follow)}
            >
              <Text style={styles.textExtra}>{follow ? "Following" : "Follow"}</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    )
  );
};

export default ArtistItem;

const styles = StyleSheet.create({
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  boxArtist: {
    width: "100%",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_12,
    backgroundColor: COLORS.Black2,
    borderRadius: BORDERRADIUS.radius_14,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.space_12,
  },
  leftBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_12,
  },
  boxImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  boxDesc: {
    gap: SPACING.space_4,
  },
  rightBox: {},
  btnFollow: {
    borderRadius: BORDERRADIUS.radius_20,
    borderColor: COLORS.WhiteRGBA32,
    borderWidth: 0.8,
    paddingHorizontal: SPACING.space_16,
    paddingVertical: SPACING.space_8,
  },
});
