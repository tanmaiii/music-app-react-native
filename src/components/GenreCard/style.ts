import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    height: 120,
    // marginRight: SPACING.space_8,
    // padding: SPACING.space_8,
  },
  wrapper: {
    position: "relative",
    height: "100%",
    padding: SPACING.space_16,
    backgroundColor: COLORS.Primary,
    borderRadius: BORDERRADIUS.radius_4,
    overflow: "hidden",
  },
  title: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.medium,
  },
  image: {
    position: "absolute",
    right: -18,
    bottom: 0,
    width: 80,
    borderRadius: BORDERRADIUS.radius_4,
    height: 80,
    objectFit: 'cover',
    transform: 'rotate(20deg)',
  },

  shadowProp: {
    backgroundColor: 'red',
    alignSelf: 'center',
    elevation: 56,
  },
});

export default styles;
