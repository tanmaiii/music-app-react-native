import LottieView from "lottie-react-native";
import * as React from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import { COLORS } from "@/theme/theme";
import { IMAGES } from "@/constants";

interface SplashScreenProps {}

const SplashScreen = (props: SplashScreenProps) => {
  return (
    <Modal>
      <View
        style={{
          backgroundColor: COLORS.Black1,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <LottieView source={IMAGES.SPLASH} style={{ width: "60%", height: "60%" }} autoPlay loop />
      </View>
    </Modal>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {},
});
