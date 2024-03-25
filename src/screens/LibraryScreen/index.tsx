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
  StatusBar,
  FlatList,
} from "react-native";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import IMAGES from "../../constants/images";
import ItemHorizontal from "../../components/ItemHorizontal";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { COLORS, FONTSIZE, SPACING } from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ArtistCard from "../../components/ArtistCard";
import { WINDOW_WIDTH } from "../../utils";
const { width, height } = Dimensions.get("window");

interface LibraryScreenProps {
  navigation: any;
}

const item = {
  title: "Liked Songs",
  desc: "Artists",
};

const DATA = [
  { id: 1, title: "Front Left", desc: "Song", type: "Song" },
  { id: 2, title: "Les", desc: "Song", type: "Song" },
  { id: 3, title: "New jeans", desc: "Artist", type: "Artist" },
  { id: 4, title: "New jeans", desc: "Artist", type: "Artist" },
  { id: 5, title: "New jeans", desc: "Artist", type: "Artist" },
  { id: 6, title: "New jeans", desc: "Playlist", type: "Playlist" },
  { id: 6, title: "New jeans", desc: "Playlist", type: "Playlist" },
  { id: 6, title: "New jeans", desc: "Playlist", type: "Playlist" },
  { id: 6, title: "New jeans", desc: "Playlist", type: "Playlist" },
];

const LibraryScreen = (props: LibraryScreenProps) => {
  const [active, setActive] = useState("Playlists");

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView>
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
      </SafeAreaView>

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

        {/* <View>
          <ItemHorizontal
            navigation={props.navigation}
            id={1}
            title={"Liked Songs"}
            desc={"Playlist - 25 songs"}
            type={"Playlist"}
          />
          {DATA.map((item, index) => {
            return (
              <ItemHorizontal
                id={item.id}
                navigation={props.navigation}
                key={index}
                title={item.title}
                desc={item.desc}
                type={item.type}
              />
            );
          })}
        </View> */}

        {active === "Artists" && (
          // <View style={styles.scrollArtist}>
          //   {DATA.map((item, index) => (
          //     <View style={{ width: WINDOW_WIDTH / 2, height: 200 }}>
          //       <ArtistCard artist={item} />
          //     </View>
          //   ))}
          // </View>
          <FlatList
            data={DATA}
            keyExtractor={(item: any) => item.id}
            bounces={false}
            snapToInterval={WINDOW_WIDTH / 2 + SPACING.space_12}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            style={{ gap: SPACING.space_12 }}
            renderItem={({ item, index }) => (
              <ArtistCard
                // navigation={navigation}
                cardWidth={WINDOW_WIDTH / 2}
                // isFirst={index == 0 ? true : false}
                // isLast={index == songs?.length - 1 ? true : false}
                song={item}
              />
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default LibraryScreen;
