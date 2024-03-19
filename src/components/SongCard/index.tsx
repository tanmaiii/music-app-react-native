import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TSong } from "../../types/song.type";
import IMAGES from "../../constants/images";

import styles from "./style";
import { SPACING } from "../../theme/theme";

const SongCard = (props: any) => {
  const { song } = props;

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
            {song.title}
          </Text>
          <Text numberOfLines={2} style={styles.textDes}>
            {song.author}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SongCard;
