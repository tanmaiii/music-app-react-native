import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
  FlatList,
  Platform,
} from "react-native";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import IMAGES from "../../constants/images";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils";
import styles from "./style";
import CategoryHeader from "../../components/CategoryHeader";
import SongItem from "../../components/SongItem";
import { TSong } from "../../types";
import { Skeleton } from "moti/skeleton";
import ArtistCard from "../../components/ArtistCard";
import PlaylistCard from "../../components/PlaylistCard";
import { NavigationProp } from "../../navigation/TStack";
import { StackNavigationProp } from "@react-navigation/stack";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;

const HEIGHT_AVATAR = 360;

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

interface ArtistDetailProps {}

const ArtistDetail = (props: ArtistDetailProps) => {
  const navigation = useNavigation<NavigationProp>();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [random, setRandom] = React.useState(false);
  const [follow, setFollow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const opacityAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [-500, 0, 200],
          outputRange: [1.8, 1.2, 1],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const opacityHideAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

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
            Platform.OS === "ios" && { paddingTop: statusBarHeight + SPACING.space_8 },
          ]}
        >
          <TouchableHighlight
            underlayColor={COLORS.Black2}
            style={styles.buttonHeader}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="black" style={styles.icon} />
          </TouchableHighlight>

          <Animated.Text style={[styles.title, opacityHideAnimation]}>Son Tung MTP</Animated.Text>

          <TouchableHighlight
            underlayColor={COLORS.Black2}
            style={styles.buttonHeader}
            onPress={() => navigation.goBack()}
          >
            <Feather name="more-horizontal" size={24} style={styles.icon} />
          </TouchableHighlight>
        </Animated.View>
      </SafeAreaView>

      <View>
        <Animated.View style={[styles.avatar, { height: HEIGHT_AVATAR }, opacityAnimation]}>
          <Skeleton height={"100%"} width={"100%"} colorMode="dark" backgroundColor={COLORS.Black2}>
            {loading ? null : <Image style={styles.imageAvatar} source={IMAGES.ARTIST} />}
          </Skeleton>
        </Animated.View>

        <ScrollView
          onScroll={(e) => {
            const offsetY = e.nativeEvent.contentOffset.y;
            animatedValue.setValue(offsetY);
          }}
          scrollEventThrottle={16}
          style={{}}
        >
          <View style={[{ height: HEIGHT_AVATAR }]}>
            <Text style={styles.avatarTitle}>Son Tung MTP</Text>
          </View>

          <View style={[styles.body]}>
            <View>
              <Text style={styles.countFollow}>1.2 milon following</Text>
            </View>

            <View style={styles.bodyTop}>
              <TouchableOpacity
                style={styles.buttonFollow}
                onPress={() => setFollow((follow) => !follow)}
              >
                <Text style={{ fontSize: FONTSIZE.size_16, color: COLORS.White1 }}>
                  {follow ? "Follow" : "Following"}
                </Text>
              </TouchableOpacity>

              <View style={styles.bodyTopRight}>
                <TouchableOpacity
                  style={styles.buttonSort}
                  onPress={() => setRandom((random) => !random)}
                >
                  <FontAwesome
                    name="random"
                    size={24}
                    style={[{ color: COLORS.White1 }, random && { color: COLORS.Primary }]}
                  />
                  {random && (
                    <View
                      style={[
                        {
                          position: "absolute",
                          bottom: 8,
                          width: 4,
                          height: 4,
                          borderRadius: 50,
                          backgroundColor: COLORS.Primary,
                        },
                      ]}
                    ></View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonPlay]}>
                  <FontAwesome
                    name="play"
                    size={24}
                    style={{
                      color: COLORS.White1,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableHighlight
              underlayColor={COLORS.Black2}
              onPress={() => console.log("click song top")}
            >
              <View style={styles.SongTop}>
                <View style={styles.SongTopLeft}>
                  <Image style={styles.SongTopImage} source={IMAGES.POSTER} />
                </View>
                <View style={styles.SongTopRight}>
                  <View>
                    <Text style={styles.textExtra}>4 otc 1, 2024</Text>
                    <Text style={styles.textMain}>Chúng ta của tuơng lai</Text>
                    <Text style={styles.textExtra}>Son Tung ..</Text>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.songTopLike}>
                      <FontAwesome
                        name="heart-o"
                        size={18}
                        color="black"
                        style={{ color: COLORS.Red }}
                      />
                      {/* <FontAwesome name="heart" size={24} color="black" /> */}
                      <Text
                        style={[
                          {
                            color: COLORS.Red,
                            fontSize: FONTSIZE.size_18,
                            fontFamily: FONTFAMILY.regular,
                          },
                        ]}
                      >
                        Like
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableHighlight>

            <View style={styles.SlideSong}>
              <CategoryHeader
                title={"Songs"}
                PropFunction={() => navigation.navigate("ListSong", { id: 1 })}
              />
              <FlatList
                data={songs}
                snapToInterval={WINDOW_WIDTH - 20}
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                renderItem={({ item }) => (
                  <View style={{ width: WINDOW_WIDTH - 20 }}>
                    <SongItem song={item} />
                    <SongItem song={item} />
                    <SongItem song={item} />
                    <SongItem song={item} />
                  </View>
                )}
              />
            </View>

            <ScrollView style={{}}>
              <View style={{ paddingHorizontal: SPACING.space_10, marginBottom: SPACING.space_24 }}>
                <CategoryHeader
                  title={"Playlist popular"}
                  PropFunction={() => navigation.navigate("ListPlaylist", { id: 1 })}
                />
                <FlatList
                  data={songs}
                  keyExtractor={(item: any) => item.id}
                  bounces={false}
                  snapToInterval={WINDOW_WIDTH / 2.4 + SPACING.space_12}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  decelerationRate={0}
                  style={{ gap: SPACING.space_12 }}
                  renderItem={({ item, index }) => (
                    <PlaylistCard cardWidth={WINDOW_WIDTH / 2.4} playlist={item} />
                  )}
                />
              </View>

              <View style={styles.bodyBottom}>
                <View style={{ paddingHorizontal: SPACING.space_10 }}>
                  <CategoryHeader title={"Related artists"} />
                  <FlatList
                    data={songs}
                    keyExtractor={(item: any) => item.id}
                    bounces={false}
                    snapToInterval={WINDOW_WIDTH / 3 + SPACING.space_12}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    style={{ gap: SPACING.space_12 }}
                    renderItem={({ item, index }) => (
                      <ArtistCard
                        navigation={navigation}
                        cardWidth={WINDOW_WIDTH / 3}
                        artist={item}
                      />
                    )}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ArtistDetail;
