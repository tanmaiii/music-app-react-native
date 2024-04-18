import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import IMAGES from "../../constants/images";
import styles from "./style";
import { COLORS, SPACING } from "../../theme/theme";
import { Skeleton } from "moti/skeleton";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigation/TStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { TUser } from "../../types";
import apiConfig from "../../apis/apiConfig";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

type TArtistCard = {
  artist: TUser;
  loading?: boolean;
  cardWidth: number;
};

const ArtistCard = (prop: TArtistCard) => {
  const { artist, loading = false, cardWidth } = prop;
  const linkTo = useLinkTo();
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate("Artist", { userId: artist.id });
  };

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <View
        style={[
          styles.container,
          { marginRight: SPACING.space_12 },
          { maxWidth: cardWidth || "100%" },
        ]}
      >
        <Skeleton radius="square" height={cardWidth} width={cardWidth} {...SkeletonCommonProps}>
          {loading ? null : (
            <Image
              style={[styles.image, { width: cardWidth || "100%", height: cardWidth || "100%" }]}
              source={
                artist?.image_path ? { uri: apiConfig.imageURL(artist.image_path) } : IMAGES.AVATAR
              }
            />
          )}
        </Skeleton>
        <View>
          <Skeleton height={18} width={"100%"} {...SkeletonCommonProps}>
            {loading ? null : (
              <Text numberOfLines={1} style={styles.textTitle}>
                {artist.name}
              </Text>
            )}
          </Skeleton>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCard;
