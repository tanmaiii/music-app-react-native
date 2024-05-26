import { StyleSheet } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "@/theme/theme";
import { WINDOW_HEIGHT } from "@/utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: WINDOW_HEIGHT,
    backgroundColor: COLORS.Black1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_8,
    backgroundColor: COLORS.Black2,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
  textMain: {
    // paddingHorizontal: SPACING.space_12,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White2,
  },
  textEtra: {
    // paddingHorizontal: SPACING.space_12,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
    letterSpacing: 0.2,
    lineHeight: 16,
  },
  textError: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.Red,
    letterSpacing: 0.2,
    lineHeight: 16,
  },
  buttonHeader: {
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    borderRadius: 25,
  },
  titleHeader: {
    color: COLORS.White1,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
  },
  textSave: {
    color: COLORS.Primary,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.medium,
  },
  body: {
    flex: 1,
    paddingHorizontal: SPACING.space_12,

    paddingVertical: SPACING.space_4,
  },
  boxInput: {
    borderBottomColor: COLORS.WhiteRGBA15,
    borderBottomWidth: 0.6,
  },
  textInput: {
    // paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_12,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White1,
  },
  buttonClear: {
    backgroundColor: COLORS.WhiteRGBA32,
    padding: 2,
    position: "absolute",
    bottom: 12,
    right: 0,
    borderRadius: 50,
  },
  buttonEyePassword: {
    padding: 2,
    position: "absolute",
    bottom: 8,
    right: 0,
  },
  boxOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_12,
    alignItems: "center",
  },
  textOption: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White1,
  },
  checkbox: {
    backgroundColor: COLORS.Black1,
  },
});

export default styles;
