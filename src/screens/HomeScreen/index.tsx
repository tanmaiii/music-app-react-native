import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./style";
import { TSong } from "../../types/song.type";
import CategoryHeader from "../../components/CategoryHeader";
import { SPACING } from "../../theme/theme";
import SongCard from "../../components/SongCard";
import SongSlider from "../../components/SongSlider";
import IMAGES from "../../constants/images";

import { Ionicons } from "@expo/vector-icons";

interface HomeScreenProps {}

const songs: TSong[] = [
  {
    id: 1,
    title: "Despacito, Despacito ,Despacito, Despacito",
    image_path: "despacito.jpg",
    author: "Luis Fonsi",
  },
  { id: 2, title: "Shape of You", image_path: "shape_of_you.jpg", author: "Ed Sheeran" },
  {
    id: 3,
    title: "Uptown Funk",
    image_path: "uptown_funk.jpg",
    author: "Mark Ronson ft. Bruno Mars",
  },
  { id: 4, title: "Closer", image_path: "closer.jpg", author: "The Chainsmokers ft. Halsey" },
  {
    id: 5,
    title: "See You Again",
    image_path: "see_you_again.jpg",
    author: "Wiz Khalifa ft. Charlie Puth",
  },
  { id: 6, title: "God's Plan", image_path: "gods_plan.jpg", author: "Drake" },
  {
    id: 7,
    title: "Old Town Road",
    image_path: "old_town_road.jpg",
    author: "Lil Nas X ft. Billy Ray Cyrus",
  },
  { id: 8, title: "Shape of My Heart", image_path: "shape_of_my_heart.jpg", author: "Sting" },
  { id: 9, title: "Someone Like You", image_path: "someone_like_you.jpg", author: "Adele" },
  { id: 10, title: "Bohemian Rhapsody", image_path: "bohemian_rhapsody.jpg", author: "Queen" },
];

//Chiều cao, rộng của màn hình
const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.HomeHeader}>
        <TouchableOpacity>
          <Image source={IMAGES.AVATAR} style={styles.HomeHeaderImage} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="add-outline" size={24} color="black" style={styles.HomeHeaderIcon}/>
        </TouchableOpacity>
      </View>
      <SongSlider songs={songs} title="Song Popular" navigation={navigation} />
      <SongSlider songs={songs} title="Song Popular" navigation={navigation} />
      <SongSlider songs={songs} title="Song Popular" navigation={navigation} />
    </ScrollView>
  );
};

export default HomeScreen;
