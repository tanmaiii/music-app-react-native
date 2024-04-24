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
import apiConfig from "../../configs/axios/apiConfig";

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
};

const ArtistCard = (prop: TArtistCard) => {
  const { artist, loading = false } = prop;
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate("Artist", { userId: artist.id });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container]}>
        <View style={styles.wrapperImage}>
          <Skeleton {...SkeletonCommonProps}>
            {loading ? (
              <Skeleton {...SkeletonCommonProps} width={"100%"} height={170} />
            ) : (
              <Image
                style={[styles.image]}
                source={
                  artist?.image_path
                    ? { uri: apiConfig.imageURL(artist.image_path) }
                    : IMAGES.AVATAR
                }
              />
            )}
          </Skeleton>
        </View>

        <View style={{ gap: SPACING.space_4 }}>
          <Skeleton height={18} width={"100%"} {...SkeletonCommonProps}>
            {loading ? null : (
              <Text numberOfLines={1} style={styles.textTitle}>
                {artist.name}
              </Text>
            )}
          </Skeleton>
          {/* <Skeleton height={14} width={80} {...SkeletonCommonProps}>
            {loading ? null : (
              <Text numberOfLines={2} style={styles.textDes}>
                {artist.}
              </Text>
            )}
          </Skeleton> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCard;
