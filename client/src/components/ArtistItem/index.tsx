import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import numeral from "numeral";
import * as React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { userApi } from "../../apis";
import { apiConfig } from "../../configs";
import { IMAGES } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import { NavigationProp } from "../../navigators/TStack";
import { COLORS } from "../../theme/theme";
import { TUser } from "../../types";
import styles from "./style";
import ArtistItemSkeleton from "./ArtistItemSkeleton";

interface ArtistItemProps {}

const ArtistItem = ({ userId }: { userId: string }) => {
  const [artist, setArtist] = React.useState<TUser>();
  const [loading, setLoading] = React.useState<boolean>(false);
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
    setLoading(true);
    try {
      const res = await userApi.getDetail(userId);
      setArtist(res);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    userId && getArtist();
  }, [userId]);

  if (loading) return <ArtistItemSkeleton />;

  return (
    artist && (
      <TouchableOpacity
        style={styles.boxArtist}
        onPress={() => navigate.navigate("Artist", { userId: userId })}
      >
        <View style={styles.leftBox}>
          <Image
            style={[styles.boxImage]}
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
