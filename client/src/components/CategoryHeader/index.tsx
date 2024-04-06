import * as React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface CategoryHeaderProps {
  title: string;
  PropFunction?: () => void;
}

const CategoryHeader = ({ title, PropFunction }: CategoryHeaderProps) => {
  if (PropFunction) {
    return (
      <Pressable style={styles.container} onPress={() => PropFunction()}>
        <Text style={styles.textMain}>{title}</Text>
        <FontAwesomeIcon size={20} color={COLORS.White1} icon={faChevronRight} />
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textMain}>{title}</Text>
    </View>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.space_16,
    justifyContent: "flex-start",
  },
  textMain: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.bold,
    color: COLORS.White,
  },
});
