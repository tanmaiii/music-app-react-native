import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./style";
import { COLORS, FONTSIZE } from "../../theme/theme";

const InputHeader = (props: any) => {
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
        onChangeText={(textInput) => props.setKeyword(textInput)}
        value={props.keyword}
        placeholder="Artists, songs, or playlist"
        placeholderTextColor={COLORS.Black1}
      ></TextInput>
    </View>
  );
};

export default InputHeader;
