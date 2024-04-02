import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface HeroSlideProps {}

const HeroSlide = (props: HeroSlideProps) => {
  return (
    <View style={styles.container}>
      <Text>HeroSlide</Text>
    </View>
  );
};

export default HeroSlide;

const styles = StyleSheet.create({
  container: {},
});
