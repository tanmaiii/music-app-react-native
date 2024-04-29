import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, FlatList, Keyboard, Text } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { WINDOW_WIDTH } from "../../utils";
import HeaderSearch from "../HeaderSearch";
import SongItem from "../SongItem";
import { TSong } from "../../types";
import { songApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import { useRoute } from "@react-navigation/native";
import { RootRouteProps } from "../../navigation/TStack";
import { useQuery } from "@tanstack/react-query";
import CustomInput from "../CustomInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// const songs: TSong[] = [
//   {
//     id: 1,
//     title: "Despacito, Despacito ,Despacito, Despacito",
//     image_path: "despacito.jpg",
//     author: "Luis Fonsi",
//   },
//   { id: 2, title: "Shape of You", image_path: "shape_of_you.jpg", author: "Ed Sheeran" },
//   {
//     id: 3,
//     title: "Uptown Funk",
//     image_path: "uptown_funk.jpg",
//     author: "Mark Ronson ft. Bruno Mars",
//   },
//   { id: 4, title: "Closer", image_path: "closer.jpg", author: "The Chainsmokers ft. Halsey" },
//   {
//     id: 5,
//     title: "See You Again",
//     image_path: "see_you_again.jpg",
//     author: "Wiz Khalifa ft. Charlie Puth",
//   },
//   { id: 6, title: "God's Plan", image_path: "gods_plan.jpg", author: "Drake" },
//   {
//     id: 7,
//     title: "Old Town Road",
//     image_path: "old_town_road.jpg",
//     author: "Lil Nas X ft. Billy Ray Cyrus",
//   },
//   { id: 8, title: "Shape of My Heart", image_path: "shape_of_my_heart.jpg", author: "Sting" },
//   { id: 9, title: "Someone Like You", image_path: "someone_like_you.jpg", author: "Adele" },
//   { id: 10, title: "Bohemian Rhapsody", image_path: "bohemian_rhapsody.jpg", author: "Queen" },
//   {
//     id: 11,
//     title: "Despacito, Despacito ,Despacito, Despacito",
//     image_path: "despacito.jpg",
//     author: "Luis Fonsi",
//   },
//   { id: 12, title: "Shape of You", image_path: "shape_of_you.jpg", author: "Ed Sheeran" },
//   {
//     id: 13,
//     title: "Uptown Funk",
//     image_path: "uptown_funk.jpg",
//     author: "Mark Ronson ft. Bruno Mars",
//   },
//   { id: 14, title: "Closer", image_path: "closer.jpg", author: "The Chainsmokers ft. Halsey" },
//   {
//     id: 15,
//     title: "See You Again",
//     image_path: "see_you_again.jpg",
//     author: "Wiz Khalifa ft. Charlie Puth",
//   },
//   { id: 16, title: "God's Plan", image_path: "gods_plan.jpg", author: "Drake" },
//   {
//     id: 17,
//     title: "Old Town Road",
//     image_path: "old_town_road.jpg",
//     author: "Lil Nas X ft. Billy Ray Cyrus",
//   },
//   { id: 18, title: "Shape of My Heart", image_path: "shape_of_my_heart.jpg", author: "Sting" },
//   { id: 19, title: "Someone Like You", image_path: "someone_like_you.jpg", author: "Adele" },
//   { id: 20, title: "Bohemian Rhapsody", image_path: "bohemian_rhapsody.jpg", author: "Queen" },
// ];

interface ModalSearchSongProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const ModalSearchSong = ({ isOpen, setIsOpen }: ModalSearchSongProps) => {
  const textInputRef = useRef<TextInput>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const [songs, setSongs] = useState<TSong[]>(null);
  const { currentUser } = useAuth();
  const route = useRoute<RootRouteProps<"ListSong" | "ListSongLike">>();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    isOpen ? setFocus(true) : setFocus(false);
  }, [isOpen]);

  const getLikeSongs = async () => {
    page === 1 && setLoading(true);
    const res = await songApi.getAllFavoritesByUser(route.params.userId, page, 20, keyword);
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
    const res = await songApi.getAllByUserId(route.params.userId, page, 20, keyword);
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
        {/* <HeaderSearch
         
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          setKeyword={setKeyword}
          keyword={keyword}
        /> */}
        <SafeAreaView>
          <View style={styles.headerSearch}>
            <View style={styles.headerSearchInput}>
              <CustomInput onSubmit={(text) => setKeyword(text)} focus={focus} />
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
