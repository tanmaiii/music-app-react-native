import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { searchApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import { NavigationProp } from "../../navigators/TStack";
import { COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { ResSoPaAr, TStateParams } from "../../types";
import { WINDOW_WIDTH } from "../../utils";
import CustomInput from "../CustomInput";
import ItemHorizontal from "../ItemHorizontal";
import styles from "./style";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;

interface ModalSearchProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const ModalSearch = ({ isOpen, setIsOpen }: ModalSearchProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [focus, setFocus] = useState<boolean>(false);
  const { token } = useAuth();
  const [data, setData] = useState<ResSoPaAr[]>();
  const [itemsHeader, setItemHeader] = React.useState(["All", "Playlist", "Song", "Artist"]);
  const [itemActive, setItemActive] = React.useState(0);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const textInputRef = useRef<TextInput>(null);

  const [historySearch, setHistorySearch] = useState<string[]>([
    "Jack",
    "Son tung",
    "Sau tat ca",
    "Thằng điên",
  ]);
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

  useEffect(() => {
    isOpen ? setFocus(true) : setFocus(false);
  }, [isOpen]);

  const handleSearch = async () => {
    const res = await searchApi.getAll(token, 1, 10, keyword);
    if (res) {
      setData(res.data);
    }

    return res;
  };

  const {} = useQuery({
    queryKey: ["search"],
    queryFn: handleSearch,
  });

  useEffect(() => {
    handleSearch();
  }, [keyword, page]);

  useEffect(() => {
    const getStorage = async () => {
      try {
        const storage = await AsyncStorage.getItem("historySearch");
        storage ? setHistorySearch(JSON.parse(storage)) : setHistorySearch(null);
      } catch (error) {
        console.error("Error getting user from AsyncStorage:", error);
        return null;
      }
    };
    getStorage();
  }, []);

  React.useEffect(() => {
    const historySearchJSON = JSON.stringify(historySearch);
    AsyncStorage.setItem("historySearch", historySearchJSON);
  }, [historySearch]);

  const handleSubmitEditing = () => {
    if (!historySearch.includes(keyword.trim())) {
      const updateHistory = [keyword.trim(), ...historySearch];
      setHistorySearch(updateHistory?.slice(0, 8));
    }
  };

  useEffect(() => {
    if (textInputRef?.current) {
      textInputRef.current.isFocused() && setViewAll(false);
    }
  }, [textInputRef?.current?.isFocused()]);


  return (
    <View style={[styles.modal, isOpen && { display: "flex" }]}>
      <View style={styles.container}>
        <SafeAreaView>
          <View
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
                <View style={{ flex: 1 }}>
                  <CustomInput
                    textInputRef={textInputRef}
                    onSubmitEditing={handleSubmitEditing}
                    clearValue={state.keyword ? false : true}
                    value={state.keyword}
                    onSubmit={(text) => updateState({ keyword: text.trim() })}
                    focus={focus}
                  />
                </View>
                {state.keyword.length > 0 && (
                  <TouchableOpacity
                    style={styles.buttonClear}
                    onPress={() => {
                      updateState({ keyword: "" });
                      textInputRef.current.focus();
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} size={14} color={COLORS.Black2} />
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => {
                  updateState({ keyword: "" });
                  setIsOpen(false);
                  setViewAll(false);
                }}
              >
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
            {viewAll && (
              <ScrollView style={styles.wrapper} horizontal>
                {itemsHeader?.map((item, index) => (
                  <TouchableOpacity style={[styles.item]} onPress={() => setItemActive(index)}>
                    <Text
                      numberOfLines={1}
                      style={[styles.titleItem, itemActive === index && { color: COLORS.Primary }]}
                    >
                      {item}
                    </Text>
                    <View
                      style={[
                        styles.indicator,
                        itemActive === index && { backgroundColor: COLORS.Primary },
                      ]}
                    ></View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </SafeAreaView>

        {!viewAll && (
          <View style={styles.scroll} onTouchStart={Keyboard.dismiss}>
            {keyword ? (
              <FlatList
                contentContainerStyle={{
                  paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 100,
                }}
                data={data}
                renderItem={({ item, index }) => {
                  return <ItemHorizontal type={item.type} data={item} key={index} />;
                }}
                ListFooterComponent={
                  <TouchableOpacity
                    onPress={() => {
                      setItemActive(0);
                      setViewAll(true);
                    }}
                  >
                    <Text
                      style={[styles.titleViewAll]}
                    >{`See all results for keyword "${keyword}"`}</Text>
                  </TouchableOpacity>
                }
              />
            ) : (
              <View style={styles.wrapperHistory}>
                <ScrollView style={{ height: "100%" }}>
                  <Text style={styles.titleHeaderScroll}>Search history</Text>
                  <View style={styles.groupListHistory}>
                    {historySearch &&
                      historySearch?.map((item) => (
                        <TouchableOpacity
                          onPress={() => {
                            setItemActive(0);
                            updateState({ keyword: item });
                            setViewAll(true);
                          }}
                          style={styles.itemHistory}
                        >
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            color={COLORS.White2}
                            size={16}
                          />
                          <Text numberOfLines={1} style={styles.titleHistory}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        )}

        {viewAll && (
          <ModalViewAll keyword={keyword} active={itemActive} setActive={setItemActive} />
        )}
      </View>
    </View>
  );
};

export default ModalSearch;

const ListAll = ({ keyword: keywordDefault, type }: { keyword: string; type?: string }) => {
  const [data, setData] = React.useState<ResSoPaAr[]>();
  const { token } = useAuth();

  const [state, setState] = React.useState<TStateParams>({
    page: 1,
    limit: 10,
    loading: false,
    totalPages: 1,
    totalCount: 0,
    refreshing: false,
    keyword: keywordDefault,
    sort: "count",
  });

  const { limit, page, loading, sort, totalPages, keyword, refreshing } = state;

  const updateState = (newValue: Partial<TStateParams>) => {
    setState((prevState) => ({ ...prevState, ...newValue }));
  };

  const handleSearch = async () => {
    let res;

    if (type === "Playlist") res = await searchApi.getPlaylists(token, page, limit, keyword, sort);
    if (type === "Song") res = await searchApi.getSongs(token, page, limit, keyword, sort);
    if (type === "Artist") res = await searchApi.getArtists(token, page, limit, keyword, sort);
    if (type === "All") res = await searchApi.getAll(token, page, limit, keyword, sort);

    if (res.pagination.page === 1) {
      setData(null);
      updateState({ totalPages: res.pagination.totalPages });
      setData(res.data);
    } else {
      setData((pres) => [...pres, ...res.data]);
    }

    return res;
  };

  const {} = useQuery({
    queryKey: ["search"],
    queryFn: handleSearch,
  });

  useEffect(() => {
    handleSearch();
  }, [page, type]);

  const loadMore = () => {
    page < totalPages && updateState({ page: page + 1 });
  };

  return data?.length > 0 ? (
    <FlatList
      data={data}
      onEndReached={loadMore}
      style={{
        width: WINDOW_WIDTH,
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 20,
      }}
      renderItem={({ item, index }) => {
        return <ItemHorizontal type={item.type} data={item} key={index} />;
      }}
    />
  ) : (
    <View
      style={{
        paddingVertical: SPACING.space_12,
        width: WINDOW_WIDTH,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.titleHeaderScroll}>Sorry, there are no matching results</Text>
    </View>
  );
};

type TModalViewAllProps = {
  keyword: string;
  active: number;
  setActive: (value: number) => void;
};

const ModalViewAll = ({ keyword, active, setActive }: TModalViewAllProps) => {
  const flatListRef = React.useRef<FlatList<any>>(null);

  const SearchScreens = [
    {
      id: 1,
      item: <ListAll keyword={keyword} type={"All"} />,
    },
    {
      id: 2,
      item: <ListAll keyword={keyword} type={"Playlist"} />,
    },
    {
      id: 3,
      item: <ListAll keyword={keyword} type={"Song"} />,
    },
    {
      id: 4,
      item: <ListAll keyword={keyword} type={"Artist"} />,
    },
  ];

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef?.current?.scrollToIndex({ index: active, animated: false });
    }
  }, [active]);

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index || 0;
        if (active !== newIndex) {
          setActive(newIndex);
        }
      }
    },
    [active, setActive]
  );

  return (
    <FlatList
      data={SearchScreens}
      scrollEnabled={Platform.OS === "ios" ? true : false}
      onScrollToIndexFailed={(error) => {
        flatListRef.current.scrollToOffset({
          offset: error.averageItemLength * error.index,
          animated: true,
        });
        setTimeout(() => {
          if (SearchScreens.length !== 0 && flatListRef !== null) {
            flatListRef.current.scrollToIndex({ index: error.index, animated: true });
          }
        }, 100);
      }}
      ref={flatListRef}
      onViewableItemsChanged={Platform.OS === "ios" ? onViewableItemsChanged : null}
      decelerationRate={0.5}
      style={{ paddingVertical: SPACING.space_12 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      // scrollEventThrottle={500} // Đặt độ nhạy của sự kiện cuộn
      snapToInterval={WINDOW_WIDTH}
      renderItem={({ item, index }) => <View key={index}>{item.item}</View>}
    />
  );
};
