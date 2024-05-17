import * as React from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import IMAGES from "../../constants/images";
import { TGenre } from "../../types/genre.type";
import { apiConfig } from "../../configs";
const { width, height } = Dimensions.get("window");

interface GenreCardProps {
  genre: TGenre;
}

const GenreCard = ({ genre }: GenreCardProps) => {
  return (
    <TouchableOpacity style={[styles.container]}>
      <View style={[styles.wrapper, { backgroundColor: `${genre.color}` }]}>
        <Text style={styles.title}>{genre.title}</Text>
        <Image
          style={[styles.image, styles.shadowProp]}
          source={
            genre.image_path ? { uri: apiConfig.imageURL(genre.image_path) } : IMAGES.PLAYLIST
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default GenreCard;
