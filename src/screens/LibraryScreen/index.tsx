import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableHighlight,
  Alert,
  Dimensions,
} from "react-native";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import IMAGES from "../../constants/images";
import ItemHorizontal from "../../components/ItemHorizontal";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { COLORS, FONTSIZE, SPACING } from "../../theme/theme";
const { width, height } = Dimensions.get("window");

interface LibraryScreenProps {}

const item = {
  title: "Liked Songs",
  desc: "Artists",
};

const DATA = [
  {
    title: "Front Left",
    desc: "Song",
    type: "Song",
  },
  {
    title: "Les",
    desc: "Song",
    type: "Song",
  },
  {
    title: "New jeans",
    desc: "Artist",
    type: "Artist",
  },
  {
    title: "New jeans",
    desc: "Artist",
    type: "Artist",
  },
  {
    title: "New jeans",
    desc: "Artist",
    type: "Artist",
  },
  {
    title: "New jeans",
    desc: "Playlist",
    type: "Playlist",
  },
];

const LibraryScreen = (props: LibraryScreenProps) => {
  const [active, setActive] = useState("Playlists");

  return (
    <View style={[styles.container]}>
      <View style={{ flex: 0 }}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity>
              <Image source={IMAGES.AVATAR} style={styles.headerImage} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Library</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="add-outline" size={24} color="black" style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.category}
        >
          <TouchableOpacity
            onPress={() => setActive("Playlists")}
            style={[styles.categoryItem, active === "Playlists" && styles.categoryItemActive]}
          >
            <Text style={styles.categoryItemText}>Playlists</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActive("Artists")}
            style={[styles.categoryItem, active === "Artists" && styles.categoryItemActive]}
          >
            <Text style={styles.categoryItemText}>Artists</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActive("Podcasts & shows")}
            style={[
              styles.categoryItem,
              active === "Podcasts & shows" && styles.categoryItemActive,
            ]}
          >
            <Text style={styles.categoryItemText}>Podcasts & shows</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{ height: 10 }}></View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        <View style={styles.headerList}>
          <View style={styles.headerListLeft}>
            <FontAwesome
              name="sort"
              size={24}
              color="black"
              style={{ fontSize: FONTSIZE.size_14, color: COLORS.White1 }}
            />
            <Text style={styles.headerListText}>Recently played</Text>
          </View>
          <View style={styles.headerListRight}>
            <MaterialIcons style={styles.headerListIcon} name="grid-view" size={24} color="black" />
          </View>
        </View>

        <ItemHorizontal title={"Liked Songs"} desc={"Playlist - 25 songs"} type={"Playlist"} />
        {DATA.map((item, index) => {
          return (
            <ItemHorizontal key={index} title={item.title} desc={item.desc} type={item.type} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default LibraryScreen;
