import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";
import { TSong } from "../../types/song.type";
import SongCard from "../SongCard";
import ArtistCard from "../ArtistCard";
import CategoryHeader from "../CategoryHeader";
const { width, height } = Dimensions.get("window");
import { SPACING } from "../../theme/theme";

interface SongCardProps {
  songs: TSong[];
  title: string;
  navigation: any;
  type: string;
}

const Slider = (props: SongCardProps) => {
  const { songs, title, navigation, type } = props;

  return (
    <View>
      <CategoryHeader title={title} />
      <FlatList
        data={songs}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        snapToInterval={width / 2.6 + SPACING.space_12}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        style={{ gap: SPACING.space_12 }}
        renderItem={({ item, index }) => {
          return type === "songs" ? (
            <SongCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push("SongDetails", { movieid: item.id });
              }}
              cardWidth={width / 2.6}
              isFirst={index == 0 ? true : false}
              isLast={index == songs?.length - 1 ? true : false}
              song={item}
            />
          ) : (
            <ArtistCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push("SongDetails", { movieid: item.id });
              }}
              cardWidth={width / 2.6}
              isFirst={index == 0 ? true : false}
              isLast={index == songs?.length - 1 ? true : false}
              artist={item}
            />
          );
        }}
      />
    </View>
  );
};

export default Slider;
