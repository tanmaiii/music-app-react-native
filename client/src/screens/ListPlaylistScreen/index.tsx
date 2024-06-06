import { playlistApi } from "@/apis";
import PlaylistCard from "@/components/PlaylistCard";
import { NavigationProp, RootRouteProps } from "@/navigators/TStack";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "@/theme/theme";
import { TPlaylist, TStateParams } from "@/types";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import Constants from "expo-constants";
import * as React from "react";
import {
  ActivityIndicator,
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
const statusBarHeight = Constants.statusBarHeight;

interface ListPlaylistScreenProps {}

const ListPlaylistScreen = (props: ListPlaylistScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [playlists, setPlaylists] = React.useState<TPlaylist[]>(null);
  const route = useRoute<RootRouteProps<"ListPlaylist">>();
  const userId = route.params.userId;
  const { token, currentUser } = useAuth();
  const queryClient = useQueryClient();
  const items = Array.from({ length: 10 }, (_, index) => index);
  
  // const [loading, setLoading] = React.useState<boolean>(false);
  // const [limit, setLimit] = React.useState(6);
  // const [page, setPage] = React.useState(1);
  // const [refreshing, setRefreshing] = React.useState<boolean>(false);
  // const [totalPages, setTotalPages] = React.useState<number>(1);

  const [state, setState] = React.useState<TStateParams>({
    page: 1,
    limit: 6,
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

  const backgroundColorAnimation = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 100], // Phạm vi scroll
      outputRange: ["rgba(0,0,0,0)", COLORS.Black2], // Màu nền tương ứng
      extrapolate: "clamp", // Giữ giá trị nằm trong phạm vi inputRange
    }),
  };

  const getData = async (newPage?: number) => {
    newPage && updateState({ page: newPage });
    const res = await playlistApi.getAllByUserId(userId,newPage || page, limit);
    if (res.pagination.page === 1) {
      setPlaylists(null);
      updateState({ totalPages: res.pagination.totalPages });
      updateState({ totalCount: res.pagination.totalCount });
      setPlaylists(res.data);
    } else {
      setPlaylists((prevSongs) => [...prevSongs, ...res.data]);
    }
    return res;
  };

  const {} = useQuery({
    queryKey: ["playlists", route.params.userId],
    queryFn: async () => {
      return await getData(1);
    },
  });

  React.useEffect(() => {
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
        queryKey: ["playlists", route.params.userId],
      });
      updateState({ refreshing: false });
    }, 2000);
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
      {!playlists || loading ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
          }}
        >
          {items?.map((item, index) => (
            <View
              style={{
                width: WINDOW_WIDTH / 2,
                padding: SPACING.space_10,
                height: 240,
              }}
            >
              <PlaylistCard loading={true} />
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.scroll}>
          <FlatList
            data={playlists}
            onScroll={(e) => {
              const offsetY = e.nativeEvent.contentOffset.y;
              animatedValue.setValue(offsetY);
            }}
            ListFooterComponent={renderLoader}
            onEndReached={loadMore}
            scrollEventThrottle={16}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            keyExtractor={(item: any) => item.id}
            style={styles.flatlist}
            numColumns={2}
            contentContainerStyle={{
              paddingTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
              paddingBottom: HEIGHT.playingCard + 20,
            }}
            renderItem={({ item, index }) => (
              <View
                key={item?.id}
                style={{
                  width: WINDOW_WIDTH / 2,
                  padding: SPACING.space_10,
                }}
              >
                <PlaylistCard playlist={item} loading={loading} />
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default ListPlaylistScreen;


