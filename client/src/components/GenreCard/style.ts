import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    height: 120,
  },
  wrapper: {
    position: "relative",
    height: "100%",
    padding: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_4,
    overflow: "hidden",
  },
  title: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.bold,
  },
  image: {
    position: "absolute",
    right: -18,
    bottom: 0,
    width: 80,
    borderRadius: BORDERRADIUS.radius_4,
    height: 80,
    objectFit: "cover",
    transform: [{ rotate: "20deg" }],
    backgroundColor: COLORS.BlackRGB06,
  },

  shadowProp: {
    shadowColor: COLORS.Black,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 10,
  },
});

export default styles;
