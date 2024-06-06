import { faChevronLeft, faMagnifyingGlass, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { favouriteApi, songApi } from "@/apis";
import ModalSearchSong from "@/components/ModalSearchSong";
import SongItem from "@/components/SongItem";
import { useAuth } from "@/context/AuthContext";
import { NavigationProp, RootRouteProps } from "@/navigators/TStack";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "@/theme/theme";
import { TSong, TStateParams } from "@/types";
const statusBarHeight = Constants.statusBarHeight;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface ListSongLikeScreenProps {}

const ListSongLikeScreen = (props: ListSongLikeScreenProps) => {
  const [songs, setSongs] = useState<TSong[]>(null);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RootRouteProps<"ListSong" | "ListSongLike">>();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { currentUser, token } = useAuth();
  const queryClient = useQueryClient();

  const [state, setState] = React.useState<TStateParams>({
    page: 1,
    limit: 10,
    loading: false,
    totalPages: 1,
    totalCount: 0,
    refreshing: false,
    keyword: "",
    sort: "new",
  });

  const { limit, page, loading, sort, totalPages, keyword, refreshing, totalCount } = state;

  const updateState = (newValue: Partial<TStateParams>) => {
    setState((prevState) => ({ ...prevState, ...newValue }));
  };

  const items = Array.from({ length: 10 }, (_, index) => index);

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

  const getData = async (newPage?: number) => {
    newPage && updateState({ page: newPage });
    const res = await favouriteApi.getSongs(token, newPage || page, limit, sort);
    if (res.pagination.page === 1) {
      setSongs(null);
      updateState({ totalPages: res.pagination.totalPages });
      updateState({ totalCount: res.pagination.totalCount });
      setSongs(res.data);
    } else {
      setSongs((prevSongs) => [...prevSongs, ...res.data]);
    }
    return res;
  };

  const {} = useQuery({
    queryKey: ["songs-favorites", currentUser.id],
    queryFn: async () => {
      return await getData(1);
    },
  });

  useEffect(() => {
    getData();
  }, [limit, page]);

  const loadMore = () => {
    page < totalPages && updateState({ page: page + 1 });
  };

  const renderLoader = () => {
    return loading ? (
      <View style={{ paddingVertical: SPACING.space_14 }}>
        <ActivityIndicator size={"large"} color={COLORS.White1} />
      </View>
    ) : null;
  };

  const handleRefresh = () => {
    updateState({ refreshing: true });
    setTimeout(() => {
      updateState({ page: 1 });
      queryClient.invalidateQueries({
        queryKey: ["songs-favorites", currentUser.id],
      });
      updateState({ refreshing: false });
    }, 2000);
  };

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
          <Animated.Text style={[styles.titleHeader, headerAnimation]}>
            {route.name === "ListSongLike" ? "Favorite song" : "Songs"}
          </Animated.Text>
          <TouchableOpacity style={[styles.buttonHeader]} onPress={() => setIsOpenModal(true)}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} style={{ color: COLORS.White1 }} />
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>

      {!songs ? (
        <View style={styles.wrapper}>
          <View style={[styles.wrapperTop]}>
            <Text style={[styles.textMain, { fontSize: FONTSIZE.size_24 }]}>Favorite song</Text>
            <Text style={styles.textExtra}>0 Songs</Text>
            <View style={styles.button}>
              <FontAwesomeIcon icon={faPlay} size={26} style={{ color: COLORS.White1 }} />
              <Text style={styles.textButton}>Play</Text>
            </View>
          </View>
          <View>
            {items.map((item, index) => (
              <View key={index}>
                <SongItem loading={true} />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.wrapper} onTouchStart={Keyboard.dismiss}>
          <FlatList
            onScroll={(e) => {
              const offsetY = e.nativeEvent.contentOffset.y;
              animatedValue.setValue(offsetY);
            }}
            data={songs}
            ListFooterComponent={renderLoader}
            onEndReached={loadMore}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={COLORS.White1}
              />
            }
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingBottom: HEIGHT.playingCard + HEIGHT.navigator + 100,
            }}
            ListHeaderComponent={
              <View style={[styles.wrapperTop]}>
                <Text style={[styles.textMain, { fontSize: FONTSIZE.size_24 }]}>
                  Favorite song
                </Text>
                <Text style={styles.textExtra}>{totalCount} Songs</Text>
                <TouchableOpacity style={styles.button}>
                  <FontAwesomeIcon icon={faPlay} size={26} style={{ color: COLORS.White1 }} />
                  <Text style={styles.textButton}>Play</Text>
                </TouchableOpacity>
              </View>
            }
            renderItem={({ item, index }) => (
              <View key={item.id}>
                <SongItem song={item} loading={loading} />
              </View>
            )}
          />
        </View>
      )}

      <ModalSearchSong isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </View>
  );
};

export default ListSongLikeScreen;

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
    height: WINDOW_HEIGHT,
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
    overflow: "hidden",
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
