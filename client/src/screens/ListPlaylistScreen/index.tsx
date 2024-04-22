import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TPlaylist, TSong } from "../../types";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import SongItem from "../../components/SongItem";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import PlaylistCard from "../../components/PlaylistCard";
import IMAGES from "../../constants/images";
import { NavigationProp, RootRouteProps } from "../../navigation/TStack";
import Constants from "expo-constants";
import { playlistApi } from "../../apis";
import apiConfig from "../../apis/apiConfig";
import { useAuth } from "../../context/AuthContext";
const statusBarHeight = Constants.statusBarHeight;

interface ListPlaylistScreenProps {}

const ListPlaylistScreen = (props: ListPlaylistScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [playlists, setPlaylists] = React.useState<TPlaylist[]>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const route = useRoute<RootRouteProps<"ListPlaylist">>();
  const userId = route.params.userId;
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const { currentUser, token } = useAuth();
  const items = Array.from({ length: 10 }, (_, index) => index);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [totalPages, setTotalPages] = React.useState<number>(1);

  const backgroundColorAnimation = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 100], // Phạm vi scroll
      outputRange: ["rgba(0,0,0,0)", COLORS.Black2], // Màu nền tương ứng
      extrapolate: "clamp", // Giữ giá trị nằm trong phạm vi inputRange
    }),
  };

  const getPlaylists = async () => {
    page === 1 && setLoading(true);
    try {
      const res = await playlistApi.getAllByUserId(userId, page, limit);

      if (res.pagination.page === 1) {
        setPlaylists(res.data);
        setTotalPages(res.pagination.totalPages);
      } else {
        setPlaylists((prevSongs) => [...prevSongs, ...res.data]);
        // Nếu đã được khởi tạo, sử dụng phép cộng mảng để thêm dữ liệu mới vào
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    page < totalPages && setPage(page + 1);
  };

  const renderLoader = () => {
    return loading ? (
      <View style={{ paddingVertical: SPACING.space_14 }}>
        <ActivityIndicator size={"large"} color={COLORS.White1} />
      </View>
    ) : null;
  };

  const handleRefresh = () => {
    console.log("Refreshing Playlist");
    setRefreshing(true);
    setTimeout(() => {
      setPage(1);
      getPlaylists();
    }, 2000);
    setRefreshing(false);
  };

  React.useEffect(() => {
    userId && getPlaylists();
  }, [userId, page]);

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
          {items.map((item, index) => (
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
                key={index}
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
  },
  flatlist: {
  },
  card: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: SPACING.space_12,
    marginBottom: SPACING.space_12,
  },
  imageCard: {},
  image: {
    backgroundColor: COLORS.Black2,
    aspectRatio: 3 / 3,
    borderRadius: BORDERRADIUS.radius_8,
    objectFit: "cover",
    width: WINDOW_WIDTH / 2 - SPACING.space_12 * 2,
    height: WINDOW_WIDTH / 2 - SPACING.space_12 * 2,
  },
  descCard: {
    paddingTop: SPACING.space_8,
  },
  textTitle: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
});
