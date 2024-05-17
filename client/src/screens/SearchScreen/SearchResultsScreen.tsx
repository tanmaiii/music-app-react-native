import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Platform } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import { ResSoPaAr, TStateParams } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigators/TStack";
import { ScrollView } from "react-native-gesture-handler";
import ItemHorizontal from "../../components/ItemHorizontal";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;

interface SearchResultsScreenProps {}

const SearchResultsScreen = (props: SearchResultsScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [heightHeader, setHeightHeader] = React.useState(10);
  const { token } = useAuth();
  const itemRefs = React.useRef([]);
  const [indicatorPosition, setIndicatorPosition] = React.useState([0, 0]);
  const [data, setData] = React.useState<ResSoPaAr[]>();
  const [itemsHeader, setItemHeader] = React.useState(["All", "Playlist", "Song", "Artist"]);
  const [itemActive, setItemActive] = React.useState("All");
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

  const { limit, page, loading, sort, totalPages, keyword, refreshing } = state;

  const updateState = (newValue: Partial<TStateParams>) => {
    setState((prevState) => ({ ...prevState, ...newValue }));
  };

  const handlePress = (item, index) => {
    setItemActive(item);
    itemRefs.current[index].measure((x, y, width, height, pageX, pageY) => {
      setIndicatorPosition([pageX, width]);
    });
  };

  React.useEffect(() => {
    itemRefs.current[0].measure((pageX, width) => {
      setIndicatorPosition([pageX, width]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ zIndex: 999 }}>
        <View
          onLayout={(event) => setHeightHeader(event.nativeEvent.layout.height)}
          style={[
            styles.header,
            Platform.OS === "ios" && {
              marginTop: -statusBarHeight,
              paddingTop: statusBarHeight + SPACING.space_12,
            },
          ]}
        >
          <View style={styles.headerSearch}>
            <View style={styles.headerSearchInput}>
              <CustomInput
                value={state.keyword}
                clearValue={state.keyword ? false : true}
                // keyword={state.keyword}
                // setKeyword={(text) => updateState({ keyword: text })}
                onSubmit={(text) => updateState({ keyword: text.trim() })}
              />
              {state.keyword.length > 0 && (
                <TouchableOpacity
                  style={styles.buttonClear}
                  onPress={() => updateState({ keyword: "" })}
                >
                  <FontAwesomeIcon icon={faXmark} size={14} color={COLORS.Black2} />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.goBack()}>
              <Text
                style={{
                  color: COLORS.White1,
                  fontSize: FONTSIZE.size_14,
                  fontFamily: FONTFAMILY.regular,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.wrapper} horizontal>
            {itemsHeader?.map((item, index) => (
              <TouchableOpacity
                ref={(ref) => (itemRefs.current[index] = ref)}
                style={[styles.item]}
                onPress={() => handlePress(item, index)}
              >
                <Text
                  numberOfLines={1}
                  style={[styles.titleItem, itemActive === item && { color: COLORS.Primary }]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
            <View
              style={[
                styles.indicator,
                { left: indicatorPosition[0], width: indicatorPosition[1] },
              ]}
            ></View>
          </ScrollView>
        </View>
      </SafeAreaView>
      {/* <View style={{ paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 100 }}> */}
      <FlatList
        data={data}
        // style={{ marginTop: heightHeader + 12 }}
        // contentContainerStyle={}
        ListHeaderComponent={<Text style={styles.titleHeaderScroll}>Recent searches</Text>}
        renderItem={({ item, index }) => {
          return <ItemHorizontal type={item.type} data={item} key={index} />;
        }}
      />
      {/* </View> */}
    </View>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  header: {
    width: "100%",
    padding: SPACING.space_12,
    flexDirection: "column",
    backgroundColor: COLORS.Black2,
    gap: SPACING.space_8,
  },
  headerSearch: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonClear: {
    backgroundColor: COLORS.WhiteRGBA32,
    padding: 2,
    position: "absolute",
    bottom: 11,
    right: 10,
    borderRadius: 50,
  },
  buttonCancel: {
    padding: SPACING.space_8,
  },
  headerSearchInput: {
    flex: 1,
  },
  scroll: {
    height: "100%",
  },
  wrapper: {
    flexDirection: "row",
    gap: SPACING.space_4,
  },
  item: {
    width: "auto",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    overflow: "hidden",
  },
  titleItem: {
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_4,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White2,
    textAlign: "center",
    fontFamily: FONTFAMILY.medium,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    backgroundColor: COLORS.Primary,
    width: 20,
    height: 3,
    borderRadius: 8,
  },
  titleHeaderScroll: {
    paddingHorizontal: SPACING.space_12,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White2,
    fontFamily: FONTFAMILY.medium,
  },
  scrollViewContent: {
    paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 20,
  },
});
