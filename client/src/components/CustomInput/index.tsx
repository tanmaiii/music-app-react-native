import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CustomInputProps {
  onSubmit: (string) => void;
  focus?: boolean;
  clearValue?: boolean;
  value: string;
  onSubmitEditing?: (string) => void;
  textInputRef: React.RefObject<TextInput>;
}

const CustomInput = (props: CustomInputProps) => {
  const { onSubmit, focus = false, clearValue, value, onSubmitEditing, textInputRef } = props;
  const [keyword, setKeyword] = React.useState<string>("");
  const typingTimeoutRef = React.useRef(null);

  // const textInputRef = React.useRef<TextInput>(null);

  function handleSearchInput(text) {
    setKeyword(text);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSubmit(text);
    }, 300);
  }

  React.useEffect(() => {
    // Sử dụng timeout để đảm bảo TextInput đã được render trước khi focus
    const focusTextInput = setTimeout(() => {
      if (textInputRef.current) {
        focus ? textInputRef.current.focus() : textInputRef.current.blur();
      }
    }, 100);

    // Xóa timeout khi component unmount
    return () => clearTimeout(focusTextInput);
  }, [focus]);

  React.useEffect(() => {
    if (clearValue) setKeyword("");
  }, [clearValue]);

  React.useEffect(() => {
    setKeyword(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => textInputRef.current.focus()}>
        <FontAwesomeIcon icon={faMagnifyingGlass} size={18} color={COLORS.White2} />
      </TouchableOpacity>
      <TextInput
        onSubmitEditing={onSubmitEditing}
        value={keyword}
        ref={textInputRef}
        placeholder="Search input"
        placeholderTextColor={COLORS.White2}
        style={styles.text}
        onChangeText={(text) => handleSearchInput(text)}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black3,
    paddingHorizontal: SPACING.space_14,
    paddingVertical: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: "row",
    gap: SPACING.space_8,
    alignItems: "center",
  },
  text: {
    flex: 1,
    color: COLORS.White1,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
  },
});
