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

  const widthCard = type === "songs" ? 2.4 : 3;

  return (
    <View>
      <CategoryHeader title={title} />
      <FlatList
        data={songs}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        snapToInterval={width / widthCard + SPACING.space_12}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        style={{ gap: SPACING.space_12 }}
        renderItem={({ item, index }) => {
          return type === "songs" ? (
            <SongCard
              navigation={navigation}
              shoudlMarginatedAtEnd={true}
              cardWidth={width / widthCard}
              isFirst={index == 0 ? true : false}
              isLast={index == songs?.length - 1 ? true : false}
              song={item}
            />
          ) : (
            <ArtistCard
            navigation={navigation}
              shoudlMarginatedAtEnd={true}
              cardWidth={width / widthCard}
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
