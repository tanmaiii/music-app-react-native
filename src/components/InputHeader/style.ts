import { StyleSheet } from "react-native";
import { COLORS, FONTSIZE, SPACING, BORDERRADIUS, FONTFAMILY } from "../../theme/theme";

const styles = StyleSheet.create({
  inputBox: {
    display: "flex",
    padding: SPACING.space_10,
    borderWidth: 2,
    backgroundColor: COLORS.White1,
    borderRadius: BORDERRADIUS.radius_8,
    flexDirection: "row",
    textAlign: "center",
    color: COLORS.White,
  },
  textInput: {
    width: "90%",
    color: COLORS.Black1,
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.size_14,
  },
  boxIcon: {
    marginRight: SPACING.space_10,
    justifyContent: "center",
    alignContent: "center",
  },
  icon: {},
});

export default styles;
