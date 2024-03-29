import { StyleSheet } from "react-native";
import { SPACING, FONTFAMILY, FONTSIZE, COLORS, BORDERRADIUS } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: COLORS.Black1,
    // padding: SPACING.space_10,
    gap: SPACING.space_4,
  },
  image: {
    aspectRatio: 3 / 3,
    borderRadius: BORDERRADIUS.radius_8,
  },
  textTitle: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textDes: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  buttonPlay: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 40,
    height: 40,
    backgroundColor: COLORS.Primary,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  iconButtonPlay: {
    color: COLORS.White1,
  },
});

export default styles;
