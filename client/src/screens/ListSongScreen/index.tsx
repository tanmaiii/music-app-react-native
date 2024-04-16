import * as React from "react";
import { useRef, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Animated,
  Platform,
  FlatList,
  Keyboard,
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
  faMagnifyingGlass,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
import ModalSearchSong from "../../components/ModalSearchSong";
import { songApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";

interface ListSongScreenProps {}

const ListSongScreen = (props: ListSongScreenProps) => {
  const [songs, setSongs] = useState<TSong[]>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("Songs");
  const { currentUser } = useAuth();

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

  const heightAnimation = {
    height: animatedValue.interpolate({
      inputRange: [0, 300],
      outputRange: [200, 0],
      extrapolate: "clamp",
    }),
    opacity: animatedValue.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  useEffect(() => {
    const getSong = async () => {
      try {
        const res = await songApi.getAllFavoritesByUser(currentUser.id, 10, 1);
        setSongs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSong();
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedLinearGradient
        colors={[COLORS.Primary, "transparent"]}
        style={[{ position: "absolute", left: 0, right: 0, top: 0 }, heightAnimation]}
      ></AnimatedLinearGradient>

      <StatusBar barStyle="light-content" backgroundColor={COLORS.Black2} />

      <SafeAreaView style={{ zIndex: 99 }}>
        <Animated.View
          style={[
            styles.header,
            backgroundColorAnimation,
            Platform.OS === "ios" && { paddingTop: statusBarHeight + SPACING.space_12 },
          ]}
        >
          <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} size={20} style={{ color: COLORS.White1 }} />
          </TouchableOpacity>
          <Animated.Text style={[styles.titleHeader, headerAnimation]}>{title}</Animated.Text>
          <TouchableOpacity style={[styles.buttonHeader]} onPress={() => setIsOpenModal(true)}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} style={{ color: COLORS.White1 }} />
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>

      {!songs ? (
        <View style={styles.wrapper}>
          <View style={[styles.wrapperTop]}>
            <Text style={[styles.textMain, { fontSize: FONTSIZE.size_24 }]}>{title}</Text>
            <Text style={styles.textExtra}>Not found</Text>
          </View>
        </View>
      ) : (
        <View style={styles.wrapper} onTouchStart={Keyboard.dismiss}>
          <FlatList
            onScroll={(e) => {
              const offsetY = e.nativeEvent.contentOffset.y;
              animatedValue.setValue(offsetY);
            }}
            scrollEventThrottle={16}
            data={songs}
            contentContainerStyle={{
              paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 20,
            }}
            ListHeaderComponent={
              <View style={[styles.wrapperTop]}>
                <Text style={[styles.textMain, { fontSize: FONTSIZE.size_24 }]}>{title}</Text>
                <Text style={styles.textExtra}>12 Songs</Text>
                <TouchableOpacity style={styles.button}>
                  <FontAwesomeIcon icon={faPlay} size={26} style={{ color: COLORS.White1 }} />
                  <Text style={styles.textButton}>Play</Text>
                </TouchableOpacity>
              </View>
            }
            renderItem={({ item, index }) => <SongItem song={item} />}
          />
        </View>
      )}

      <ModalSearchSong isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </View>
  );
};

export default ListSongScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
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
    padding: SPACING.space_12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonHeader: {
    // backgroundColor: COLORS.Black2,
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
  titleHeader: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    textAlign: "center",
    color: COLORS.White1,
    transform: [{ translateY: 20 }],
  },
  wrapper: {
    gap: SPACING.space_18,
    marginTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
  },
  wrapperTop: {
    gap: SPACING.space_12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.space_24,
  },
  wrapperImage: {
    aspectRatio: 1,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: BORDERRADIUS.radius_8,
    transformOrigin: "bottom",
  },

  button: {
    width: 160,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.Primary,
    paddingHorizontal: SPACING.space_14,
    paddingVertical: 10,
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
