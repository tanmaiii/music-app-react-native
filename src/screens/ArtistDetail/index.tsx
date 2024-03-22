import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface ArtistDetailProps {}

const ArtistDetail = (props: ArtistDetailProps) => {
  return (
    <View style={styles.container}>
      <Text>ArtistDetail</Text>
    </View>
  );
};

export default ArtistDetail;

const styles = StyleSheet.create({
  container: {},
});
