import React, { useEffect, useRef, useState } from "react";
import {
  faGlassCheers,
  faMagnifyingGlass,
  faMagnifyingGlassPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Pressable,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import ItemHorizontal from "../ItemHorizontal";
import { WINDOW_WIDTH } from "../../utils";
import HeaderSearch from "../HeaderSearch";
import { TPlaylist } from "../../types";
import { IMAGES } from "../../constants";

// const DATA: TPlaylist[] = [
//   { id: 1, title: "1 Front Left", desc: "Song", image_path: IMAGES.AI, author: "Joihn Cena" },
//   { id: 2, title: "2 Les", desc: "Song", image_path: IMAGES.AI, author: "Joihn Cena" },
//   { id: 3, title: "3 New jeans", desc: "Artist", image_path: IMAGES.AI, author: "Joihn Cena" },
//   { id: 4, title: "4 New jeans", desc: "Artist", image_path: IMAGES.AI, author: "Joihn Cena" },
//   { id: 5, title: "5 New jeans", desc: "Artist", image_path: IMAGES.AI, author: "Joihn Cena" },
//   { id: 6, title: "6 New jeans", desc: "Playlist", image_path: IMAGES.AI, author: "Joihn Cena" },
//   { id: 6, title: "7 New jeans", desc: "Playlist", image_path: IMAGES.AI, author: "Joihn Cena" },
//   { id: 6, title: "8 New jeans", desc: "Playlist", image_path: IMAGES.AI, author: "Joihn Cena" },
//   {
//     id: 6,
//     title: "9 New jeans bottom",
//     desc: "Playlist",
//     image_path: IMAGES.AI,
//     author: "Joihn Cena",
//   },
// ];

interface ModalSearchProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const ModalSearch = ({ isOpen, setIsOpen }: ModalSearchProps) => {
  const textInputRef = useRef<TextInput>(null);
  const [keyword, setKeyword] = useState<string>(null);
  const [focus, setFocus] = useState<boolean>(false);

  useEffect(() => {
    isOpen ? setFocus(true) : setFocus(false);
  }, [isOpen]);

  return (
    <View style={[styles.modal, isOpen ? { display: "flex" } : { display: "none" }]}>
      <View style={styles.container}>
        <HeaderSearch
          focus={focus}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          setKeyword={setKeyword}
          keyword={keyword}
        />
        <ScrollView style={styles.scroll} onTouchStart={Keyboard.dismiss}>
          <View>
            <Text style={styles.titleHeaderScroll}>Recent searches</Text>
          </View>
          <View style={styles.scrollViewContent}>
            {/* {DATA.map((item, index) => {
              return (
                // <ItemHorizontal
                //   playlist={item}
                //   // id={item.id}
                //   // key={index}
                //   // title={item.title}
                //   // desc={item.desc}
                //   // type={item.type}
                // />
              );
            })} */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ModalSearch;

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: COLORS.Black1,
    flex: 1,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    zIndex: 99,
    display: "none",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  scroll: {
    height: "100%",
    paddingHorizontal: SPACING.space_12,
  },
  titleHeaderScroll: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.medium,
  },
  scrollViewContent: {
    paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 20,
  },
});
