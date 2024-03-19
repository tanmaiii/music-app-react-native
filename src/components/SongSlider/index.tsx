import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";
import { TSong } from "../../types/song.type";
import SongCard from "../SongCard";
import CategoryHeader from "../CategoryHeader";
const { width, height } = Dimensions.get("window");
import { SPACING } from "../../theme/theme";

interface SongCardProps {
  songs: TSong[];
  title: string;
  navigation: any;
}

const SongSlider = (props: SongCardProps) => {
  const { songs, title, navigation } = props;

  return (
    <View>
      <CategoryHeader title={title} />
      <FlatList
        data={songs}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        snapToInterval={width / 2.4 + SPACING.space_12}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        style={{ gap: SPACING.space_12 }}
        renderItem={({ item, index }) => {
          return (
            <SongCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push("SongDetails", { movieid: item.id });
              }}
              cardWidth={width / 2.4}
              isFirst={index == 0 ? true : false}
              isLast={index == songs?.length - 1 ? true : false}
              song={item}
            />
          );
        }}
      />
    </View>
  );
};

export default SongSlider;
