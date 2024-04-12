import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  Platform,
  Switch,
} from "react-native";
import { IMAGES } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { FlatList, ScrollView, TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { TSong } from "../../types";
import ButtonSwitch from "../ButtonSwitch/ButtonSwitch";
import Constants from "expo-constants";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
const statusBarHeight = Constants.statusBarHeight;

interface AddPlaylistProps {
  closeModal: () => void;
}

const AddPlaylist = ({closeModal}: AddPlaylistProps) => {
  const [name, setName] = React.useState<string>("");
  const textInputRef = React.useRef<TextInput>();

  const handleFunc = () => {
    closeModal()
    console.log("Dong");
  }

  React.useEffect(() => {
    textInputRef.current.focus();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          Platform.OS === "ios" && { paddingTop: SPACING.space_12 + statusBarHeight },
        ]}
      >
        <TouchableOpacity onPress={() => handleFunc()}>
          <FontAwesomeIcon icon={faXmark} size={24} color={COLORS.White2} />
        </TouchableOpacity>
      </View>

      <ScrollView keyboardShouldPersistTaps="always" style={styles.body}>
        <View style={styles.inputBox}>
          <Text style={styles.textEtra}>Name playlist</Text>
          <BottomSheetTextInput
            ref={textInputRef}
            value={name}
            style={styles.textInput}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.textMain}>Private</Text>
          </View>
          <ButtonSwitch />
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 20, width: "100%", alignItems: "center" }}>
        <TouchableOpacity
          style={[styles.button, name.length <= 0 && { opacity: 0.8 }]}
          disabled={name.length <= 0 && true}
        >
          <Text style={styles.buttonText}>Add Playlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPlaylist;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.space_8,
    flex: 1,
    height: "100%",
    // backgroundColor: "pink",
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textEtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  header: {
    flexDirection: "row",
    padding: SPACING.space_12,
    // justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flexDirection: "column",
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_12,
    gap: SPACING.space_12,
    flex: 1,
    height: "100%",
  },
  inputBox: {
    width: "100%",
    flexDirection: "column",
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_12,
  },
  textInput: {
    width: "100%",
    borderBottomColor: COLORS.WhiteRGBA15,
    borderBottomWidth: 0.6,
    paddingVertical: SPACING.space_8,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.regular,
  },
  button: {
    width: 160,
    height: 46,
    backgroundColor: COLORS.Primary,
    borderRadius: BORDERRADIUS.radius_25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
});
