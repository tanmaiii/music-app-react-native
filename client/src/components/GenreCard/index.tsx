import * as React from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import IMAGES from "../../constants/images";
import { TGenre } from "../../types/genre.type";
import { apiConfig } from "../../configs";
import GenreCardSkeleton from "./GenreCardSkeleton";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigators/TStack";

interface GenreCardProps {
  genre: TGenre;
  loading?: boolean;
}

const GenreCard = ({ genre, loading = false }: GenreCardProps) => {
  const navigation = useNavigation<NavigationProp>();

  if (loading) return <GenreCardSkeleton />;

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => navigation.navigate("Genre", { genreId: genre.id })}
    >
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
