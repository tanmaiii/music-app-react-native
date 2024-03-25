import { StyleSheet } from "react-native";
import { SPACING, FONTSIZE, COLORS, FONTFAMILY } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.space_8,
    display: "flex",
    flexDirection: "row",
    backgroundColor: COLORS.Black1,
  },
  boxImage: {
    width: 70,
    height: 70,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    // overflow: "hidden",
  },
  image: {
    width: 70,
    height: 70,
    objectFit: "cover",
    aspectRatio: 1/1
  },
  body: {
    padding: SPACING.space_12,
    display: "flex",
    justifyContent: "center",
    gap: SPACING.space_4,
  },
  title: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  desc: {
    display: "flex",
    flexDirection: "row",
    gap: SPACING.space_4,
  },
  descText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
});

export default styles;
