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

const DATA = [
  { id: 1, title: "1 Front Left", desc: "Song", type: "Song" },
  { id: 2, title: "2 Les", desc: "Song", type: "Song" },
  { id: 3, title: "3 New jeans", desc: "Artist", type: "Artist" },
  { id: 4, title: "4 New jeans", desc: "Artist", type: "Artist" },
  { id: 5, title: "5 New jeans", desc: "Artist", type: "Artist" },
  { id: 6, title: "6 New jeans", desc: "Playlist", type: "Playlist" },
  { id: 6, title: "7 New jeans", desc: "Playlist", type: "Playlist" },
  { id: 6, title: "8 New jeans", desc: "Playlist", type: "Playlist" },
  { id: 6, title: "9 New jeans bottom", desc: "Playlist", type: "Playlist" },
];

interface ModalSearchProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const ModalSearch = ({ isOpen, setIsOpen }: ModalSearchProps) => {
  const textInputRef = useRef<TextInput>(null);
  const [keyword, setKeyword] = useState<string>(null);

  useEffect(() => {
    // Sử dụng timeout để đảm bảo TextInput đã được render trước khi focus
    const focusTextInput = setTimeout(() => {
      if (textInputRef.current) {
        isOpen ? textInputRef.current.focus() : textInputRef.current.blur();
      }
    }, 100);

    // Xóa timeout khi component unmount
    return () => clearTimeout(focusTextInput);
  }, [isOpen]);

  return (
    <View style={[styles.modal, isOpen ? { display: "flex" } : { display: "none" }]}>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.input}>
              <TouchableOpacity onPress={() => textInputRef.current.focus()}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={18} color={COLORS.White1} />
              </TouchableOpacity>
              <TextInput
                ref={textInputRef}
                style={styles.textInput}
                placeholder="Search"
                value={keyword}
                placeholderTextColor={COLORS.White2}
                onChangeText={(text) => setKeyword(text)}
              />
              {keyword && (
                <TouchableOpacity onPress={() => setKeyword("")}>
                  <FontAwesomeIcon icon={faXmark} size={20} color={COLORS.White1} />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity style={styles.buttonCancel} onPress={() => setIsOpen(false)}>
              <Text
                style={{
                  color: COLORS.White1,
                  fontSize: FONTSIZE.size_16,
                  fontFamily: FONTFAMILY.regular,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <ScrollView style={styles.scroll} onTouchStart={Keyboard.dismiss}>
          <View>
            <Text style={styles.titleHeaderScroll}>Recent searches</Text>
          </View>
          <View style={styles.scrollViewContent}>
            {DATA.map((item, index) => {
              return (
                <ItemHorizontal
                  id={item.id}
                  key={index}
                  title={item.title}
                  desc={item.desc}
                  type={item.type}
                />
              );
            })}
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
  header: {
    flexDirection: "row",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_12,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.space_8,
  },
  input: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.Black2,
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_8,
    gap: SPACING.space_8,
  },
  textInput: {
    flex: 1,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.regular,
  },
  buttonCancel: {},
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
