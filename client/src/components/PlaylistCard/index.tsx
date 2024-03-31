import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TSong } from "../../types/song.type";
import IMAGES from "../../constants/images";
import { Skeleton } from "moti/skeleton";

import styles from "./style";
import { COLORS, SPACING } from "../../theme/theme";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { usePlaying } from "../../context/PlayingContext";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;
type TPlaylist = {
  id: number;
  title: string;
  desc: string;
};

interface PlaylistCardProps {
  loading?: boolean;
  playlist: TPlaylist;
  cardWidth: number;
  navigation: any;
}

const PlaylistCard = (props: PlaylistCardProps) => {
  const { playlist, navigation, loading = false } = props;
  const { setOpenBarSong, setSongPlaying } = usePlaying();
  const linkTo = useLinkTo();

  const handlePress = () => {
    // setOpenBarSong(true);
    // setSongPlaying(playlist.id);
    linkTo("/PlaylistDetail");
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[styles.container, { marginRight: SPACING.space_12 }, { maxWidth: props.cardWidth }]}
      >
        <Skeleton height={props.cardWidth} width={props.cardWidth} {...SkeletonCommonProps}>
          {loading ? null : (
            <Image
              style={[styles.image, { width: props.cardWidth, height: props.cardWidth }]}
              source={IMAGES.POSTER}
            />
          )}
        </Skeleton>
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
              <Text numberOfLines={2} style={styles.textDes}>
                {playlist.desc || "Đây là phần giới thiệu ...."}
              </Text>
            )}
          </Skeleton>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistCard;
