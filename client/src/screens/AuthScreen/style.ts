import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
    overflow: "hidden",
    gap: SPACING.space_16,
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: SPACING.space_12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "pink",
  },
  buttonHeader: {
    backgroundColor: COLORS.button,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 25,
  },
  titleLogo: {
    fontSize: FONTSIZE.size_30,
    fontFamily: FONTFAMILY.bold,
    color: COLORS.Primary,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.medium,
  },
  textEtra: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White2,
    fontFamily: FONTFAMILY.regular,
  },
  boxSucc: {
    backgroundColor: COLORS.Green,
    paddingHorizontal: SPACING.space_14,
    paddingVertical: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_8,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8,
  },
  textSucc: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
  },
  boxErr: {
    backgroundColor: COLORS.Red,
    paddingHorizontal: SPACING.space_14,
    paddingVertical: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_8,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8,
    width: "100%",
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
    // marginBottom: SPACING.space_18,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "cover",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: SPACING.space_14,
    paddingHorizontal: SPACING.space_16,
    marginTop: SPACING.space_24,
    width: "100%",
  },
  bodyTop: {
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.space_12,
    marginBottom: SPACING.space_4,
    maxWidth: "90%",
  },
  boxs: {
    gap: SPACING.space_14,
    width: "100%",
  },
  box: {
    flexDirection: "column",
    gap: SPACING.space_2,
    width: "100%",
  },
  boxInput: {
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_14,
    flexDirection: "row",
    gap: SPACING.space_4,
    alignItems: "center",
    height: 54,
    paddingHorizontal: SPACING.space_12,
    backgroundColor: COLORS.Black1,
    width: "100%",
  },
  boxInputErr: {
    borderColor: COLORS.Red,
  },
  descErr: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.Red,
    height: 20,
  },
  titleBox: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White2,
    backgroundColor: COLORS.Black1,
    // padding: SPACING.space_4,
    paddingHorizontal: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_8,
    overflow: "hidden",
    position: "absolute",
    left: 36,
  },
  titleBoxMove: {
    top: -10,
    fontSize: 14,
  },
  textInput: {
    fontSize: FONTSIZE.size_16,
    paddingVertical: SPACING.space_12,
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
  buttonView: {
    // backgroundColor: COLORS.Primary,
    padding: SPACING.space_4,
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
    minWidth: "100%",
  },
  buttonLine: {
    // borderWidth: 1,
    // borderColor: COLORS.Primary,
    borderRadius: BORDERRADIUS.radius_14,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_16,
    alignItems: "center",
    height: 54,
    // backgroundColor: COLORS.Black2,
  },
  titleLogin: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.medium,
  },
  titleOr: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White2,
    fontFamily: FONTFAMILY.regular,
    textAlign: "center",
  },
  buttonGoogle: {
    backgroundColor: COLORS.Primary,
    borderRadius: BORDERRADIUS.radius_14,
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_16,
    alignItems: "center",
    height: 54,
    minWidth: "100%",
  },
  titleGoogle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.regular,
  },
  boxBottom: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default styles;
