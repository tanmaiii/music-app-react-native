import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import IMAGES from "../../constants/images";
import styles from "./style";
import { COLORS, SPACING } from "../../theme/theme";
import { Skeleton } from "moti/skeleton";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigators/TStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { TUser } from "../../types";
import apiConfig from "../../configs/axios/apiConfig";
import ArtistCardSkeleton from "./ArtistCardSkeleton";

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

  if (loading) {
    return <ArtistCardSkeleton />;
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container]}>
        <View style={styles.wrapperImage}>
          <Image
            style={[styles.image]}
            source={
              artist?.image_path ? { uri: apiConfig.imageURL(artist.image_path) } : IMAGES.AVATAR
            }
          />
        </View>

        <View style={{ gap: SPACING.space_4 }}>
          <Text numberOfLines={1} style={styles.textTitle}>
            {artist.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCard;
