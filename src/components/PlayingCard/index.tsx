import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import styles from "./style";

interface componentNameProps {}

const componentName = (props: componentNameProps) => {
  return (
    <View style={styles.container}>
      <Text>componentName</Text>
    </View>
  );
};

export default componentName;
