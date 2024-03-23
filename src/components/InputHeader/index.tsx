import * as React from "react";
import { useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput,Animated } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./style";
import { COLORS, FONTSIZE } from "../../theme/theme";

const UPPER_HEADER_HEIGHT = 60;
const UPPER_HEADER_PADDING_TOP = 4;
const LOWER_HEADER_HEIGHT = 60;

const InputHeader = (props: any) => {
  const [keyword, setKeyword] = React.useState<string>("");


  return (
    <View style={styles.inputBox}>
      <TouchableOpacity style={styles.boxIcon} onPress={() => props.searchFunction()}>
        <Ionicons
          style={styles.icon}
          name="search-outline"
          size={FONTSIZE.size_24}
          color={COLORS.Black1}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        onChangeText={(textInput) => setKeyword(textInput)}
        value={props.keyword}
        placeholder="Artists, songs, or playlist"
        placeholderTextColor={COLORS.Black1}
      ></TextInput>
    </View>
  );
};

export default InputHeader;
