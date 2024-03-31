import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import IMAGES from "../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import PlaylistCard from "../../components/PlaylistCard";
import { FlatList } from "react-native-gesture-handler";
import { TSong } from "../../types";
import SongItem from "../../components/SongItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowUpFromBracket,
  faHeart as faHeartSolid,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

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

interface PlaylistDetailProps {}

const PlaylistDetail = (props: PlaylistDetailProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ zIndex: 999 }}>
        <View style={styles.header}>
          <TouchableHighlight
            underlayColor={COLORS.Black2}
            style={styles.buttonHeader}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="black" style={styles.iconButtonHeader} />
          </TouchableHighlight>
        </View>
      </SafeAreaView>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={[styles.wrapperImage]}>
            <Image style={styles.image} source={IMAGES.AI} />
          </View>

          <Text style={styles.textMain}>AI Music</Text>

          <Text
            style={{
              fontSize: FONTSIZE.size_16,
              color: COLORS.Primary,
              fontFamily: FONTFAMILY.regular,
            }}
          >
            Sound Hub
          </Text>

          <Text style={styles.textExtra}>12 Songs</Text>

          <View style={styles.groupButton}>
            <TouchableOpacity style={styles.buttonExtra}>
              <FontAwesomeIcon
                icon={faArrowUpFromBracket}
                size={18}
                style={{ color: COLORS.White2 }}
              />

              <Text
                style={{
                  fontSize: FONTSIZE.size_12,
                  color: COLORS.White2,
                  fontFamily: FONTFAMILY.regular,
                }}
              >
                Share
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <FontAwesomeIcon icon={faPlay} size={26} style={{ color: COLORS.White1 }} />

              {/* <Ionicons name="play" size={28} style={{ color: COLORS.White1 }} /> */}
              <Text style={styles.textButton}>Play</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonExtra}>
              <FontAwesomeIcon icon={faHeart} size={18} style={{ color: COLORS.White2 }} />
              <Text
                style={{
                  fontSize: FONTSIZE.size_12,
                  color: COLORS.White2,
                  fontFamily: FONTFAMILY.regular,
                }}
              >
                Like
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.textDesc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati
            accusamus labore eius aperiam soluta dolores nihil velit eveniet aliquid facere
            reprehenderit. Iusto maiores sit saepe modi non? Hic?
          </Text>

          <View style={{ width: "100%" }}>
            {songs.map((item) => (
              <SongItem />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaylistDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  textMain: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.medium,
    textAlign: "center",
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    // backgroundColor: "pink",
    padding: SPACING.space_4,
  },
  buttonHeader: {
    backgroundColor: COLORS.button,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    borderRadius: 25,
  },
  iconButtonHeader: {
    color: COLORS.White1,
    fontSize: FONTSIZE.size_24,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
    paddingVertical: SPACING.space_36,
    // paddingHorizontal: SPACING.space_12,
    gap: SPACING.space_8,
  },
  wrapperImage: {
    aspectRatio: 1,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: BORDERRADIUS.radius_8,
  },
  groupButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
    gap: SPACING.space_24,
  },
  button: {
    width: 160,
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.Primary,
    paddingHorizontal: SPACING.space_14,
    paddingVertical: SPACING.space_8,
    borderRadius: 25,
    gap: SPACING.space_8,
  },
  buttonExtra: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  textButton: {
    color: COLORS.White1,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
  },
  textDesc: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    paddingHorizontal: SPACING.space_12,
    color: COLORS.White2,
    width: "100%",
    marginBottom: SPACING.space_12,
  },
});
