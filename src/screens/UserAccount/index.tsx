import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import ModalPlaying from "../../components/ModalPlaying";
import { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils";
import IMAGES from "../../constants/images";

interface UserAccountProps {}

const UserAccount = (props: UserAccountProps) => {
  return (
    <View style={styles.container}>
    </View>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
