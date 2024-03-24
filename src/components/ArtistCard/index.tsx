import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import IMAGES from "../../constants/images";
import styles from "./style";
import { COLORS, SPACING } from "../../theme/theme";
import { Skeleton } from "moti/skeleton";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

const ArtistCard = (props: any) => {
  const { artist, navigation, loading = false } = props;
  const handleTouch = () => {
    navigation.push("ArtistDetail", { id: artist.id });
  };

  return (
    <TouchableOpacity onPress={() => handleTouch()}>
      <View
        style={[styles.container, { marginRight: SPACING.space_12 }, { maxWidth: props.cardWidth }]}
      >
        <Skeleton
          height={props.cardWidth}
          width={props.cardWidth}
          radius={"round"}
          {...SkeletonCommonProps}
        >
          {loading ? null : (
            <Image
              style={[styles.image, { width: props.cardWidth, height: props.cardWidth }]}
              source={IMAGES.ARTIST}
              // blurRadius={10}
            />
          )}
        </Skeleton>
        <View>
          <Skeleton height={18} width={"100%"} {...SkeletonCommonProps}>
            {loading ? null : (
              <Text numberOfLines={1} style={styles.textTitle}>
                {artist.title}
              </Text>
            )}
          </Skeleton>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCard;
