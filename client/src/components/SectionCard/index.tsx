import * as React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import styles from "./style";
import { SPACING } from "../../theme/theme";
import { WINDOW_WIDTH } from "../../utils";
import CategoryHeader from "../CategoryHeader";
import { ScrollView } from "react-native-gesture-handler";
import SongCard from "../SongCard";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

interface SectionProps {
  title: string;
  data: any;
  loading?: boolean;
  renderItem?: ({ item, index }: { item: any; index: number }) => JSX.Element;
  numItem?: number;
  functionProp?: () => void;
}

const SectionCard = ({
  title,
  data,
  loading = false,
  renderItem,
  numItem = 2.4,
  functionProp,
}: SectionProps) => {
  if (loading || !data)
    return (
      <View style={{ paddingHorizontal: SPACING.space_10 }}>
        <CategoryHeader title={""} loading={true} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}>
            <SongCard song={null} loading={true} />
          </View>
          <View style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}>
            <SongCard song={null} loading={true} />
          </View>
          <View style={{ marginRight: SPACING.space_12, maxWidth: WINDOW_WIDTH / 2.4 }}>
            <SongCard song={null} loading={true} />
          </View>
        </ScrollView>
      </View>
    );

  return (
    data?.length > 0 && (
      <View style={{ paddingHorizontal: SPACING.space_10 }}>
        {data.length > 4 && functionProp ? (
          <CategoryHeader title={title} loading={loading} PropFunction={functionProp} />
        ) : (
          <CategoryHeader title={title} loading={loading} />
        )}

        <FlatList
          data={data}
          keyExtractor={(item: any) => item.id}
          bounces={false}
          snapToInterval={WINDOW_WIDTH / numItem + SPACING.space_12}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          style={{ gap: SPACING.space_12 }}
          renderItem={renderItem && renderItem}
        />
      </View>
    )
  );
};

export default SectionCard;
