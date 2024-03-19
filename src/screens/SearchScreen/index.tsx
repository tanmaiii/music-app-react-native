import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import styles from "./style";
import InputHeader from "../../components/InputHeader";
import CategoryHeader from "../../components/CategoryHeader";
import GenreCard from "../../components/GenreCard";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import IMAGES from "../../constants/images";
import GridView from "../../components/GridView";
const { width, height } = Dimensions.get("window");

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

interface SearchScreenProps {}

const SearchScreen = (props: SearchScreenProps) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={IMAGES.AVATAR} style={styles.headerImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
      </View>
      <View style={{ height: 10 }} />
      <InputHeader />
      <View style={{ height: 10 }} />
      <GridView
        data={DATA}
        renderItem={(item) => {
          return <GenreCard />;
        }}
      />
    </View>
  );
};

export default SearchScreen;
