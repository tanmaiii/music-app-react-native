import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SPACING } from "../../theme/theme";

interface AddSongProps {
  closeModal?: () => void;
}

const AddSong = (props: AddSongProps) => {
  const { closeModal } = props;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text>Add song to playlist</Text>
        </View>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faXmark} size={24} color={COLORS.White2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddSong;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.space_8,
  },
  header: {},
});
