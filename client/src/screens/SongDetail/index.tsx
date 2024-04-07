import * as React from "react";
import styles from "./style";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Animated,
  Platform,
  ImageBackground,
} from "react-native";
import IMAGES from "../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TSong } from "../../types";
import SongItem from "../../components/SongItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowUpFromBracket,
  faChevronLeft,
  faHeart as faHeartSolid,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
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
];

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface SongDetailProps {}

const SongDetail = (props: SongDetailProps) => {
  const navigation = useNavigation();
  const route = useRoute();
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const headerAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 400],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 100],
          outputRange: [20, 0],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const backgroundColorAnimation = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: ["transparent", COLORS.Black2],
      extrapolate: "clamp",
    }),
  };

  const imageAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 400],
          outputRange: [1, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  const heightAnimation = {
    height: animatedValue.interpolate({
      inputRange: [0, 200],
      outputRange: [400, 0],
      extrapolate: "clamp",
    }),
    opacity: animatedValue.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={IMAGES.POSTER} blurRadius={90}>
        <LinearGradient
          colors={["transparent", COLORS.Black1]}
          style={[{ position: "absolute", left: 0, right: 0, top: 0, height: "100%" }]}
        ></LinearGradient>

        <StatusBar barStyle="light-content" backgroundColor={COLORS.Black2} />

        <SafeAreaView style={{ zIndex: 999 }}>
          <Animated.View
            style={[
              styles.header,
              backgroundColorAnimation,
              Platform.OS === "ios" && { paddingTop: statusBarHeight + SPACING.space_8 },
            ]}
          >
            <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faChevronLeft} size={20} style={{ color: COLORS.White1 }} />
            </TouchableOpacity>
            <Animated.Text style={[styles.titleHeader, headerAnimation]}>
              Thiên lý ơi (Single)
            </Animated.Text>
            <TouchableOpacity
              style={[styles.buttonHeader, { opacity: 0 }]}
              onPress={() => navigation.goBack()}
            >
              <FontAwesomeIcon icon={faChevronLeft} size={20} style={{ color: COLORS.White1 }} />
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const offsetY = e.nativeEvent.contentOffset.y;
            animatedValue.setValue(offsetY);
          }}
          scrollEventThrottle={16}
        >
          <View style={styles.wrapper}>
            <View style={[styles.wrapperImage]}>
              <Animated.Image style={[styles.image, imageAnimation]} source={IMAGES.POSTER} />
            </View>

            <Text style={[styles.textMain, { fontSize: FONTSIZE.size_24 }]}>
              Thiên lý ơi(Single)
            </Text>

            <Text
              style={{
                fontSize: FONTSIZE.size_16,
                color: COLORS.Primary,
                fontFamily: FONTFAMILY.regular,
              }}
            >
              Sound Hub
            </Text>

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

            <View style={styles.info}></View>
            <Text style={styles.textExtra}>Released: 2019</Text>
            <Text style={styles.textExtra}>Duration: 4 minutes</Text>

            {/* <Text style={styles.textDesc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae obcaecati
            accusamus labore eius aperiam soluta dolores nihil velit eveniet aliquid facere
            reprehenderit. Iusto maiores sit saepe modi non? Hic?
          </Text> */}

            
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SongDetail;
