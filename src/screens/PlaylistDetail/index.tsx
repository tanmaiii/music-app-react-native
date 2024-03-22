import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface PlaylistDetailProps {}

const PlaylistDetail = (props: PlaylistDetailProps) => {
  return (
    <View style={styles.container}>
      <Text>PlaylistDetail</Text>
    </View>
  );
};

export default PlaylistDetail;

const styles = StyleSheet.create({
  container: {},
});
