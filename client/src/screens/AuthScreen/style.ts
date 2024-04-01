import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
    paddingHorizontal: SPACING.space_16,
    paddingVertical: SPACING.space_32,
    overflow: "hidden",
    gap: SPACING.space_16,
    height: WINDOW_HEIGHT,
    justifyContent: "center",
  },
  boxErr: {
    backgroundColor: COLORS.Red,
    paddingHorizontal: SPACING.space_14,
    paddingVertical: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_8,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8,
  },
  textErr: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
  },
  logo: {
    borderRadius: BORDERRADIUS.radius_10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: SPACING.space_36,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "cover",
  },
  body: {
    flexDirection: "column",
    gap: SPACING.space_16,
  },
  bodyTop: {
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.space_12,
    marginBottom: SPACING.space_18,
  },
  box: {
    flexDirection: "column",
    gap: SPACING.space_4,
  },
  boxInput: {
    borderColor: COLORS.White2,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_14,
    flexDirection: "row",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_8,
    gap: SPACING.space_8,
    alignItems: "center",
    height: 54,
  },
  titleBox: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White2,
    backgroundColor: COLORS.Black1,
    padding: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_4,
    position: "absolute",
    left: 14,
  },
  textInput: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
    flex: 1,
  },
  descBox: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White2,
    flex: 1,
  },
  titleForgetPassword: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.Primary,
    textAlign: "right",
  },
  button: {
    backgroundColor: COLORS.Primary,
    borderRadius: BORDERRADIUS.radius_14,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_16,
    alignItems: "center",
    height: 54,
  },
  titleLogin: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.regular,
  },
  titleOr: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White2,
    fontFamily: FONTFAMILY.regular,
    textAlign: "center",
  },
  buttonGoogle: {
    backgroundColor: "#d9e3fc",
    borderRadius: BORDERRADIUS.radius_14,
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_16,
    alignItems: "center",
    height: 54,
  },
  titleGoogle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.Primary,
    fontFamily: FONTFAMILY.regular,
  },
  boxBottom: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default styles;
