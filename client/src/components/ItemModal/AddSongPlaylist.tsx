import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { faCompactDisc, faMusic } from "@fortawesome/free-solid-svg-icons";
import CustomBottomSheet from "../CustomBottomSheet";
import AddPlaylist from "./AddPlaylist";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface AddSongPlaylistProps {
  setAddPlaylist: (boolean) => void;
}

const AddSongPlaylist = ({ setAddPlaylist }: AddSongPlaylistProps) => {
  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: "center", paddingVertical: SPACING.space_14 }}>
          <View
            style={{
              width: 48,
              height: 6,
              backgroundColor: COLORS.WhiteRGBA50,
              borderRadius: BORDERRADIUS.radius_14,
            }}
          ></View>
        </View>

        <TouchableOpacity onPress={() => setAddPlaylist(true)}>
          <View style={styles.buttonItem}>
            <FontAwesomeIcon icon={faCompactDisc} size={30} color={COLORS.White2} />
            <View>
              <Text style={styles.textMain}>Create playlist</Text>
              <Text style={styles.textExtra}>Create a playlist of your favorite songs</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.buttonItem}>
            <FontAwesomeIcon icon={faMusic} size={30} color={COLORS.White2} />
            <View>
              <Text style={styles.textMain}>Create song</Text>
              <Text style={styles.textExtra}>Create a playlist of your favorite songs</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddSongPlaylist;

const styles = StyleSheet.create({
  container: {
    paddingBottom: SPACING.space_14,
    backgroundColor: COLORS.Black2,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  buttonItem: {
    flexDirection: "row",
    gap: SPACING.space_12,
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_14,
    alignItems: "center",
  },
});
