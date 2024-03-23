import * as React from "react";
import { useRef } from "react";
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
  StatusBar,
  SafeAreaView,
  Animated,
} from "react-native";
import styles from "./style";
import InputHeader from "../../components/InputHeader";
import CategoryHeader from "../../components/CategoryHeader";
import GenreCard from "../../components/GenreCard";
import { COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
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
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

interface SearchScreenProps {}

const SearchScreen = (props: SearchScreenProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const headerAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 50],
          outputRange: [0, -HEIGHT.UPPER_HEADER_SEARCH_HEIGHT],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const opacityAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView>
        <View style={styles.upperHeaderPlaceholder} />
      </SafeAreaView>

      <AnimatedSafeAreaView style={[styles.header, headerAnimation]}>
        <Animated.View style={[styles.upperHeader, opacityAnimation]}>
          <TouchableOpacity>
            <Image source={IMAGES.AVATAR} style={styles.headerImage} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search </Text>
        </Animated.View>
        <View style={styles.lowerHeader}>
          <InputHeader />
        </View>
      </AnimatedSafeAreaView>

      <ScrollView
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          animatedValue.setValue(offsetY);
        }}
        scrollEventThrottle={16}
      >
        <View style={styles.paddingForHeader} />
        <View style={styles.scrollViewContent}>
          <GridView
            data={DATA}
            renderItem={(item) => {
              return <GenreCard />;
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
