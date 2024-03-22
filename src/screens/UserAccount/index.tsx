import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import styles from "./style";
import IMAGES from "../../constants/images";

interface UserAccountProps {}

const UserAccount = (props: UserAccountProps) => {
  return (
    <View style={styles.container}>
      <Text>UserAccount</Text>
    </View>
  );
};

export default UserAccount;
