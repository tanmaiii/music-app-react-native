import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import styles from "./style";
import { IMAGES } from "../../constants";
import { COLORS, FONTFAMILY, FONTSIZE } from "../../theme/theme";

interface VeridyScreenProps {}

const VeridyScreen = (props: VeridyScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.image} source={IMAGES.LOGO} />
      </View>
      <View style={styles.body}>
        <View style={styles.bodyTop}>
          <Text
            style={{
              fontSize: FONTSIZE.size_30,
              fontFamily: FONTFAMILY.bold,
              color: COLORS.Primary,
            }}
          >
            Log In Now
          </Text>
          <Text
            style={{
              fontSize: FONTSIZE.size_16,
              fontFamily: FONTFAMILY.regular,
              color: COLORS.White2,
            }}
          >
            Please login to continue using our app
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VeridyScreen;

// const styles = StyleSheet.create({
//   container: {},
// });
