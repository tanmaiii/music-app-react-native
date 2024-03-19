import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";

interface CategoryHeaderProps {
  title: string;
}

const CategoryHeader = (props: CategoryHeaderProps) => {
  return <Text style={styles.text}>{props.title}</Text>;
};

export default CategoryHeader;

const styles = StyleSheet.create({
  text: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White,
    // paddingHorizontal: SPACING.space_36,
    paddingVertical: SPACING.space_16,
  },
});
