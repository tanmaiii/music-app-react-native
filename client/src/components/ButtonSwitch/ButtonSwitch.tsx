import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS } from "../../theme/theme";

interface ButtonSwitchProps {
  isOn: boolean;
  setIsOn: (value: boolean) => void;
}

const ButtonSwitch = ({ isOn, setIsOn }: ButtonSwitchProps) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.outter,
          isOn
            ? {
                justifyContent: "flex-end",
                backgroundColor: COLORS.Primary,
                borderColor: COLORS.Primary,
              }
            : {
                justifyContent: "flex-start",
                backgroundColor: COLORS.Black2,
              },
        ]}
        activeOpacity={1}
        onPress={() => setIsOn(!isOn)}
      >
        <View style={styles.inner}></View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonSwitch;

const styles = StyleSheet.create({
  container: {},
  outter: {
    backgroundColor: COLORS.Black2,
    width: 44,
    height: 24,
    borderRadius: 30,
    paddingHorizontal: 2,
    borderColor: COLORS.WhiteRGBA32,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  inner: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: COLORS.White1,
  },
});
