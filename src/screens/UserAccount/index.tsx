import * as React from "react";
import { useCallback, useRef, useMemo } from "react";
import { Text, View, StyleSheet, Image, ScrollView, Button } from "react-native";
import CustomBottomSheet from "../../components/CustomBottomSheet";

interface UserAccountProps {}

const UserAccount = (props: UserAccountProps) => {
  return (
    <View style={styles.container}>
      {/* <CustomBottomSheet /> */}
    </View>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "pink" },
});
