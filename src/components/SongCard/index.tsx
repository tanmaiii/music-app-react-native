import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TSong } from "../../types/song.type";
import IMAGES from "../../constants/images";
import { Skeleton } from "moti/skeleton";

import styles from "./style";
import { COLORS, SPACING } from "../../theme/theme";
import { useLinkTo, useNavigation } from "@react-navigation/native";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

interface SongCardProps {
  loading?: boolean;
  song: TSong;
  cardWidth: number;
  navigation: any
}

const SongCard = (props: SongCardProps) => {
  const { song, navigation, loading = false } = props;

  const linkTo = useLinkTo();
  const handleTouch = () => {
    linkTo("SongDetail");
  };
  return (
    <TouchableOpacity onPress={() => handleTouch()}>
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
                {song.title}
              </Text>
            )}
          </Skeleton>
          <Skeleton height={14} width={80} {...SkeletonCommonProps}>
            {loading ? null : (
              <Text numberOfLines={2} style={styles.textDes}>
                {song.author}
              </Text>
            )}
          </Skeleton>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SongCard;
