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
} from "react-native";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import IMAGES from "../../constants/images";
import { WINDOW_HEIGHT } from "../../utils";
import { BlurView } from "expo-blur";
import styles from "./style";
import CategoryHeader from "../../components/CategoryHeader";
import PlaylistCard from "../../components/PlaylistCard";

const HEIGHT_AVATAR = 360;
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

interface ArtistDetailProps {
  navigation: any;
}

const ArtistDetail = (props: ArtistDetailProps) => {
  const navigation = useNavigation();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [random, setRandom] = React.useState(false);
  const [follow, setFollow] = React.useState(false);

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
      outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,.7)"], // Màu nền tương ứng
      extrapolate: "clamp", // Giữ giá trị nằm trong phạm vi inputRange
    }),
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ zIndex: 99 }}>
        <Animated.View style={[styles.header, backgroundColorAnimation]}>
          <TouchableHighlight
            underlayColor={COLORS.Black2}
            style={styles.buttonHeader}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="black" style={styles.icon} />
            {/* <FontAwesome name="angle-left" size={24} style={styles.icon} /> */}
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
          <Image style={styles.imageAvatar} source={IMAGES.ARTIST} />
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

          <View style={[styles.body, { height: WINDOW_HEIGHT * 2, zIndex: 200 }]}>
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

            <View>
              <CategoryHeader title={"Top Songs"} />
              <View>
                <PlaylistCard />
                <PlaylistCard />
                <PlaylistCard />
                <PlaylistCard />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ArtistDetail;
