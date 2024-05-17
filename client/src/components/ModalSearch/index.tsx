import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styles from "./style";
import {
  Keyboard,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { searchApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import { COLORS, FONTFAMILY, FONTSIZE, HEIGHT } from "../../theme/theme";
import { ResSoPaAr, TStateParams } from "../../types";
import CustomInput from "../CustomInput";
import ItemHorizontal from "../ItemHorizontal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigators/TStack";

interface ModalSearchProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const ModalSearch = ({ isOpen, setIsOpen }: ModalSearchProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [focus, setFocus] = useState<boolean>(false);
  const { token } = useAuth();
  const [data, setData] = useState<ResSoPaAr[]>();
  const [historySearch, setHistorySearch] = useState<string[]>([
    "Ai",
    "Son tung",
    "Sau tat ca",
    "history13",
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
    const res = await searchApi.getAll(token, page, limit, keyword, sort);

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

    // Lưu vào AsyncStorage với các key tương ứng
    AsyncStorage.setItem("historySearch", historySearchJSON);
    console.log(historySearch);
  }, [historySearch]);

  const handleSubmitEditing = () => {
    if (!historySearch.includes(keyword.trim())) {
      const updateHistory = [keyword.trim(), ...historySearch];
      setHistorySearch(updateHistory?.slice(0, 8));
    }
    console.log("End");
  };

  return (
    // <View style={[styles.modal, isOpen ? { display: "flex" } : { display: "none" }]}>
    <Modal visible={isOpen}>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.headerSearch}>
            <View style={styles.headerSearchInput}>
              <View style={{ flex: 1 }}>
                <CustomInput
                  onSubmitEditing={handleSubmitEditing}
                  clearValue={state.keyword ? false : true}
                  value={state.keyword}
                  // setKeyword={(text) => updateState({ keyword: text })}
                  onSubmit={(text) => updateState({ keyword: text.trim() })}
                  focus={focus}
                />
              </View>
              {state.keyword.length > 0 && (
                <TouchableOpacity
                  style={styles.buttonClear}
                  onPress={() => updateState({ keyword: "" })}
                >
                  <FontAwesomeIcon icon={faXmark} size={14} color={COLORS.Black2} />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity style={styles.buttonCancel} onPress={() => setIsOpen(false)}>
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
        </SafeAreaView>

        <View style={styles.scroll} onTouchStart={Keyboard.dismiss}>
          {keyword ? (
            <FlatList
              contentContainerStyle={{ paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 100 }}
              // ListHeaderComponent={<Text style={styles.titleHeaderScroll}>Recent searches</Text>}
              data={data}
              renderItem={({ item, index }) => {
                return <ItemHorizontal type={item.type} data={item} key={index} />;
              }}
              ListFooterComponent={
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SearchResultScreen", { keyword: keyword });
                    setIsOpen(false);
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
                  {historySearch && historySearch?.map((item) => (
                    <TouchableOpacity
                      onPress={() => updateState({ keyword: item })}
                      style={styles.itemHistory}
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} color={COLORS.White2} size={16} />
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
      </View>
    </Modal>
    //</View>
  );
};

export default ModalSearch;
