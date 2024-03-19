import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import IMAGES from "../../constants/images";

import styles from "./style";
import { SPACING } from "../../theme/theme";

const ArtistCard = (props: any) => {
  const { artist } = props;

  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View
        style={[styles.container, { marginRight: SPACING.space_12 }, { maxWidth: props.cardWidth }]}
      >
        <Image
          style={[styles.image, { width: props.cardWidth, height: props.cardWidth }]}
          source={IMAGES.POSTER}
        />
        <View>
          <Text numberOfLines={1} style={styles.textTitle}>
            {artist.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCard;
