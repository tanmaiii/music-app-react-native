import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../theme/theme";

interface CheckboxProps {
  isChecked: boolean;
  onFunc: () => void;
}

const Checkbox = ({ isChecked, onFunc }: CheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={() => onFunc()}
      style={[styles.container, isChecked && styles.check]}
    ></TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.6,
    borderColor: COLORS.WhiteRGBA15,
  },
  check: {
    backgroundColor: COLORS.White1,
    borderWidth: 7,
    borderColor: COLORS.Primary,
  },
});
