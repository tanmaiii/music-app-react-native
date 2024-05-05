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
const statusBarHeight = Constants.statusBarHeight;

interface ItemNameProps {}

const ItemPassowrd = ({ value, updateState }: { value: string; updateState: (string) => void }) => {
  const navigation = useNavigation<NavigationProp>();

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

          <Text style={[styles.titleHeader]}>Name</Text>

          <TouchableOpacity style={[styles.buttonHeader]}>
            <Text style={[styles.textSave]}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={[styles.body, { marginTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT }]}>
        <Text style={styles.textMain}>Name</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={(text) => updateState({ name: text })}
          />
          <TouchableOpacity style={styles.buttonClear} onPress={() => updateState({ name: "" })}>
            <FontAwesomeIcon icon={faXmark} size={14} color={COLORS.Black2} />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.textEtra,
            { marginTop: SPACING.space_12, paddingHorizontal: SPACING.space_12 },
          ]}
        >
          asdasd
        </Text>
      </View>
    </View>
  );
};

export default ItemPassowrd;
