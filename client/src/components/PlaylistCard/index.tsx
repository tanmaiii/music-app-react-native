import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import { TSong } from "../../types/song.type";
import IMAGES from "../../constants/images";
import { Skeleton } from "moti/skeleton";

import styles from "./style";
import { COLORS, SPACING } from "../../theme/theme";
import { useNavigation, useLinkTo } from "@react-navigation/native";
import { usePlaying } from "../../context/PlayingContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigators/TStack";
import { TPlaylist } from "../../types";
import { NavigationProp } from "../../navigators/TStack";
import apiConfig from "../../configs/axios/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const SkeletonCommonProps = {
  colorMode: "dark",
  type: "timing",
  duration: 1500,
  backgroundColor: COLORS.Black2,
} as const;

interface PlaylistCardProps {
  loading?: boolean;
  playlist?: TPlaylist;
}

const PlaylistCard = (props: PlaylistCardProps) => {
  const { playlist, loading = false } = props;

  const linkTo = useLinkTo();
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    playlist && navigation.navigate("Playlist", { playlistId: playlist.id });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container]}>
        <View style={styles.wrapperImage}>
          {loading ? (
            <Skeleton {...SkeletonCommonProps} width={"100%"} height={170} />
          ) : (
            <Image
              style={[styles.image]}
              source={
                playlist?.image_path
                  ? { uri: apiConfig.imageURL(playlist.image_path) }
                  : IMAGES.PLAYLIST
              }
            />
          )}
        </View>

        <View style={{ gap: SPACING.space_4 }}>
          <Skeleton height={18} width={"100%"} {...SkeletonCommonProps}>
            {loading ? null : (
              <Text numberOfLines={1} style={styles.textTitle}>
                {playlist.title}
              </Text>
            )}
          </Skeleton>
          <Skeleton height={14} width={80} {...SkeletonCommonProps}>
            {loading ? null : (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                <Text numberOfLines={1} style={[styles.textDes]}>
                  {playlist.author}
                </Text>
                <FontAwesomeIcon icon={faCircle} size={2} color={COLORS.White2} />
                <Text numberOfLines={1} style={[styles.textDes]}>
                  {moment(playlist.created_at).format("YYYY")}
                </Text>
              </View>
            )}
          </Skeleton>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistCard;
