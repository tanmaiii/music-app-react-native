import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { genreApi } from "../../apis";
import GenreCard from "../../components/GenreCard";
import ModalSearch from "../../components/ModalSearch";
import IMAGES from "../../constants/images";
import { COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { TGenre } from "../../types/genre.type";
import { WINDOW_WIDTH } from "../../utils";
import styles from "./style";

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

interface SearchScreenProps {}

const SearchScreen = (props: SearchScreenProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [openModal, setOpenModal] = React.useState(false);
  const [genres, setGenres] = React.useState<TGenre[]>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const items = Array.from({ length: 10 }, (_, index) => index);

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

  const getAllGenre = async () => {
    try {
      const res = await genreApi.getAll(1, 100);
      res && setGenres(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
    }
    return;
  };

  const { refetch: refetchGenres } = useQuery({
    queryKey: ["genres"],
    queryFn: getAllGenre,
  });

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.upperHeaderPlaceholder} />
      </SafeAreaView>

      <AnimatedSafeAreaView style={[styles.header, headerAnimation]}>
        <Animated.View style={[styles.upperHeader, opacityAnimation]}>
          <TouchableOpacity>
            <Image source={IMAGES.LOGO} style={styles.headerImage} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search </Text>
        </Animated.View>
        <View style={styles.lowerHeader}>
          <TouchableOpacity style={styles.inputBox} onPress={() => setOpenModal(true)}>
            <View style={styles.boxIcon}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size={FONTSIZE.size_20}
                color={COLORS.Black1}
              />
            </View>
            <View style={styles.textInput}>
              <Text style={styles.text}>Artists, songs, or playlist</Text>
            </View>
          </TouchableOpacity>
        </View>
      </AnimatedSafeAreaView>

      <View style={{}}></View>

      {loading ? (
        <>
          <FlatList
            scrollEnabled={false}
            data={items}
            contentContainerStyle={{
              paddingBottom: HEIGHT.playingCard + 20,
              paddingTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
            }}
            numColumns={2}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={{
                  width: WINDOW_WIDTH / 2,
                  padding: SPACING.space_10,
                }}
              >
                <GenreCard genre={null} loading={true} />
              </View>
            )}
          />
        </>
      ) : (
        <FlatList
          data={genres}
          onScroll={(e) => {
            const offsetY = e.nativeEvent.contentOffset.y;
            animatedValue.setValue(offsetY);
          }}
          ListHeaderComponent={
            <Text
              style={{
                paddingHorizontal: SPACING.space_12,
                fontSize: FONTSIZE.size_14,
                color: COLORS.White2,
                fontFamily: FONTFAMILY.regular,
              }}
            >
              Browse by genre
            </Text>
          }
          scrollEventThrottle={16}
          keyExtractor={(item: any) => item.id}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: HEIGHT.playingCard + 20,
            paddingTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
          }}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                width: WINDOW_WIDTH / 2,
                padding: SPACING.space_10,
              }}
            >
              <GenreCard genre={item} />
            </View>
          )}
        />
      )}

      <ModalSearch isOpen={openModal} setIsOpen={setOpenModal} />
    </View>
  );
};

export default SearchScreen;
