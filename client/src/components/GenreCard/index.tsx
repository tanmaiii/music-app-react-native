import * as React from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import IMAGES from "../../constants/images";
const { width, height } = Dimensions.get("window");

interface GenreCardProps {
  title: string;
  image_path: string;
}

const GenreCard = (props: any) => {
  return (
    <TouchableOpacity style={[styles.container]}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Pop</Text>
        <Image style={[styles.image, styles.shadowProp]} source={IMAGES.POSTER} />
      </View>
    </TouchableOpacity>
  );
};

export default GenreCard;
