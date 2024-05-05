import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import { NavigationProp } from "../../../navigation/TStack";
import { Platform } from "react-native";
import styles from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { COLORS, HEIGHT, SPACING } from "../../../theme/theme";
import Constants from "expo-constants";
import Checkbox from "../../../components/Checkbox";
const statusBarHeight = Constants.statusBarHeight;

const ItemGender = () => {
  const [isChecked, setChecked] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const navigation = useNavigation<NavigationProp>();

  const gender = ["Male", "Female", "Undisclosed"];

  const handleChange = (name: string) => {
    setSelected(name);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ zIndex: 99 }}>
        <View
          style={[
            styles.header,
            Platform.OS === "ios" && { paddingTop: statusBarHeight + SPACING.space_8 },
          ]}
        >
          <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} size={20} style={{ color: COLORS.White1 }} />
          </TouchableOpacity>

          <Text style={[styles.titleHeader]}>Gender</Text>

          <TouchableOpacity style={[styles.buttonHeader]}>
            <Text style={[styles.textSave]}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={[styles.body, { marginTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT }]}>
        <Text style={styles.textMain}>Gender</Text>
        {gender.map((item) => (
          <View style={styles.boxOption}>
            <Text style={styles.textOption}>{item}</Text>
            <Checkbox isChecked={item === selected} onFunc={() => handleChange(item)} />
          </View>
        ))}
        <Text
          style={[
            styles.textEtra,
            { marginTop: SPACING.space_12, paddingHorizontal: SPACING.space_12 },
          ]}
        >
          Gender
        </Text>
      </View>
    </View>
  );
};

export default ItemGender;
