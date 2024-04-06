import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import { TSong } from "../../types/song.type";
import IMAGES from "../../constants/images";
import { Skeleton } from "moti/skeleton";

import styles from "./style";
import { COLORS, SPACING } from "../../theme/theme";
import { useNavigation, useLinkTo } from "@react-navigation/native";
import { usePlaying } from "../../context/PlayingContext";
import { PATH } from "../../constants/path";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/TStack";

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
  cardWidth?: number;
}

import { NavigationProp } from "../../navigation/TStack";

const PlaylistCard = (props: PlaylistCardProps) => {
  const { playlist, loading = false, cardWidth = "100%" } = props;

  const { setOpenBarSong, setSongPlaying } = usePlaying();
  const linkTo = useLinkTo();
  const navigation = useNavigation<NavigationProp>();

  const goToScreen = () => {};

  const handlePress = () => {
    // setOpenBarSong(true);
    // setSongPlaying(playlist.id);
    // linkTo(`/${PATH.PLAYLIST}/${playlist.id}`);
    navigation.navigate("Playlist", { id: 123 });
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
