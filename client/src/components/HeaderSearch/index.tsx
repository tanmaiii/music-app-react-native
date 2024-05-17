import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";

type HeaderSearchProps = {
  focus: boolean;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  keyword: string;
  setKeyword: (string) => void;
};

const HeaderSearch = ({ focus, isOpen, setIsOpen, keyword, setKeyword }: HeaderSearchProps) => {
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Sử dụng timeout để đảm bảo TextInput đã được render trước khi focus
    const focusTextInput = setTimeout(() => {
      if (textInputRef.current) {
        focus ? textInputRef.current.focus() : textInputRef.current.blur();
      }
    }, 100);

    // Xóa timeout khi component unmount
    return () => clearTimeout(focusTextInput);
  }, [focus]);

  return (
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
  );
};

// export default HeaderSearch;

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.Black3,
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
});
