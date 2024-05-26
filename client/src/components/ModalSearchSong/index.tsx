import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, FlatList, Keyboard, Text } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { WINDOW_WIDTH } from "../../utils";
import SongItem from "../SongItem";
import { TSong } from "../../types";
import { favouriteApi, songApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import { useRoute } from "@react-navigation/native";
import { RootRouteProps } from "../../navigators/TStack";
import { useQuery } from "@tanstack/react-query";
import CustomInput from "../CustomInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface ModalSearchSongProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const ModalSearchSong = ({ isOpen, setIsOpen }: ModalSearchSongProps) => {
  const textInputRef = useRef<TextInput>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const [songs, setSongs] = useState<TSong[]>(null);
  const { currentUser, token } = useAuth();
  const route = useRoute<RootRouteProps<"ListSong" | "ListSongLike">>();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    isOpen ? setFocus(true) : setFocus(false);
  }, [isOpen]);

  const getLikeSongs = async () => {
    page === 1 && setLoading(true);
    const res = await favouriteApi.getSongs(token, page, 20, "new", keyword);
    if (res.pagination.page === 1) {
      setSongs(res.data);
      setTotalPages(res.pagination.totalPages);
    } else {
      setSongs((prevSongs) => [...prevSongs, ...res.data]);
    }
    setLoading(false);
    return res;
  };

  const getSongs = async () => {
    page === 1 && setLoading(true);
    const res = await songApi.getAllByUserId(token, route.params.userId, page, 20, keyword);
    if (res.pagination.page === 1) {
      setSongs(res.data);
      setTotalPages(res.pagination.totalPages);
    } else {
      setSongs((prevSongs) => [...prevSongs, ...res.data]);
    }
    setLoading(false);

    return res;
  };

  const {} = useQuery({
    queryKey: route.name === "ListSongLike" ? ["songs-favorites"] : ["songs"],
    queryFn: () => {
      return route.name === "ListSongLike" ? getLikeSongs() : getSongs();
    },
  });

  const loadMore = () => {
    page < totalPages && setPage(page + 1);
  };

  useEffect(() => {
    route.name === "ListSongLike" ? getLikeSongs() : getSongs();
  }, [keyword, page]);

  return (
    <View style={[styles.modal, isOpen ? { display: "flex" } : { display: "none" }]}>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.headerSearch}>
            <View style={styles.headerSearchInput}>
              <CustomInput
              value={keyword}
                textInputRef={textInputRef}
                clearValue={keyword ? false : true}
                onSubmit={(text) => setKeyword(text)}
                focus={focus}
              />
            </View>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
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

        <View style={[styles.scroll]} onTouchStart={Keyboard.dismiss}>
          <FlatList
            data={songs}
            onEndReached={loadMore}
            contentContainerStyle={{
              paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 80,
            }}
            renderItem={({ item, index }) => <SongItem song={item} />}
          />
        </View>
      </View>
    </View>
  );
};

export default ModalSearchSong;

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: COLORS.Black1,
    flex: 1,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    zIndex: 100,
    display: "none",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
    maxHeight: WINDOW_HEIGHT,
  },
  headerSearch: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_12,
    alignItems: "center",
    gap: SPACING.space_8,
  },
  headerSearchInput: {
    flex: 1,
  },
  scroll: {},
  titleHeaderScroll: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.medium,
  },
  scrollViewContent: {
    // paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 20,
  },
});
