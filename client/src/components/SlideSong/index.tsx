import { SPACING } from "@/theme/theme";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import CategoryHeader from "../CategoryHeader";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/navigators/TStack";
import { FlatList } from "react-native-gesture-handler";
import { TSong } from "@/types";
import { WINDOW_WIDTH } from "@/utils";
import SongItem from "../SongItem";

interface SlideSongProps {
  songs: TSong[];
  title?: string;
}

const SlideSong = ({ songs, title }: SlideSongProps) => {
  const navigation = useNavigation<NavigationProp>();

  const renderGroupOfSongs = (songs: TSong[]) => {
    const chunkedSongs = [];
    const chunkSize = 5;
    for (let i = 0; i < songs?.length; i += chunkSize) {
      chunkedSongs.push(songs?.slice(i, i + chunkSize));
    }
    return chunkedSongs;
  };

  const groupedSongs = songs && renderGroupOfSongs(songs);

  React.useEffect(() => {
    console.log({ groupedSongs });
  }, [groupedSongs]);

  return (
    <View style={styles.SlideSong}>
      <CategoryHeader title={title || "Slide Songs"} />
      <FlatList<TSong[]>
        data={groupedSongs}
        snapToInterval={WINDOW_WIDTH - 20}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        renderItem={({ item, index: indexGroup }) => (
          <View style={{ width: WINDOW_WIDTH - 20 }}>
            {item.map((song: TSong, index: number) => (
              <View key={index}>
                <SongItem rankNumber={indexGroup * 5 + index + 1} song={song} />
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default SlideSong;

const styles = StyleSheet.create({
  SlideSong: {
    padding: SPACING.space_10,
  },
});
