import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import styles from "./style";

interface PlayingCardProps {}

const PlayingCard = (props: PlayingCardProps) => {
  return (
    <View style={styles.container}>
      <Text>PlayingCard</Text>
    </View>
  );
};

export default PlayingCard;
