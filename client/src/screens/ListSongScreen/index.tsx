import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { TSong } from "../../types";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import SongItem from "../../components/SongItem";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;

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
  {
    id: 11,
    title: "Despacito, Despacito ,Despacito, Despacito",
    image_path: "despacito.jpg",
    author: "Luis Fonsi",
  },
  { id: 12, title: "Shape of You", image_path: "shape_of_you.jpg", author: "Ed Sheeran" },
  {
    id: 13,
    title: "Uptown Funk",
    image_path: "uptown_funk.jpg",
    author: "Mark Ronson ft. Bruno Mars",
  },
  { id: 14, title: "Closer", image_path: "closer.jpg", author: "The Chainsmokers ft. Halsey" },
  {
    id: 15,
    title: "See You Again",
    image_path: "see_you_again.jpg",
    author: "Wiz Khalifa ft. Charlie Puth",
  },
  { id: 16, title: "God's Plan", image_path: "gods_plan.jpg", author: "Drake" },
  {
    id: 17,
    title: "Old Town Road",
    image_path: "old_town_road.jpg",
    author: "Lil Nas X ft. Billy Ray Cyrus",
  },
  { id: 18, title: "Shape of My Heart", image_path: "shape_of_my_heart.jpg", author: "Sting" },
  { id: 19, title: "Someone Like You", image_path: "someone_like_you.jpg", author: "Adele" },
  { id: 20, title: "Bohemian Rhapsody", image_path: "bohemian_rhapsody.jpg", author: "Queen" },
];

interface ListSongScreenProps {}

const ListSongScreen = (props: ListSongScreenProps) => {
  const navigation = useNavigation();

  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const backgroundColorAnimation = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 100], // Phạm vi scroll
      outputRange: ["rgba(0,0,0,0)", COLORS.Black2], // Màu nền tương ứng
      extrapolate: "clamp", // Giữ giá trị nằm trong phạm vi inputRange
    }),
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ zIndex: 99 }}>
        <Animated.View
          style={[
            styles.header,
            backgroundColorAnimation,
            Platform.OS === "ios" && { paddingTop: statusBarHeight },
          ]}
        >
          <TouchableHighlight
            underlayColor={COLORS.button}
            style={styles.buttonBack}
            onPress={() => navigation.goBack()}
          >
            <FontAwesomeIcon icon={faChevronLeft} size={24} color={COLORS.Primary} />
          </TouchableHighlight>
          <View style={styles.headerTitle}>
            <Text style={styles.title}>All Playlist</Text>
          </View>
          <View style={styles.buttonBack}></View>
        </Animated.View>
      </SafeAreaView>
      <View style={styles.scroll}>
        <FlatList
          onScroll={(e) => {
            const offsetY = e.nativeEvent.contentOffset.y;
            animatedValue.setValue(offsetY);
          }}
          scrollEventThrottle={16}
          data={songs}
          // horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          contentContainerStyle={{
            paddingTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
            paddingBottom: HEIGHT.playingCard + 20,
          }}
          renderItem={({ item }) => <SongItem song={item} />}
        />
      </View>
    </View>
  );
};

export default ListSongScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
    height: WINDOW_HEIGHT,
  },
  header: {
    flexDirection: "row", // Sắp xếp các phần tử theo hàng ngang
    alignItems: "center", // Căn chỉnh các phần tử theo chiều dọc
    justifyContent: "center", // Căn chỉnh các phần tử theo chiều ngang
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_12,
    position: "absolute",
    top: 0,
    left: 0,
  },
  buttonBack: {
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    borderRadius: 25,
  },
  headerTitle: {
    flex: 1,
  },
  title: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
    width: "100%",
    textAlign: "center",
  },
  scroll: {
    // paddingTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
  },
});
