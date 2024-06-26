import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.space_12,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White1,
  },
  textEtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  swapper: {
    height: 70,
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  swapperImage: {
    height: 60,
    width: 60,
    overflow: "hidden",
    borderRadius: BORDERRADIUS.radius_4,
    alignItems: "center",
    backgroundColor: COLORS.Black2,
  },
  image: {
    height: 60,
    width: 60,
    aspectRatio: 1 / 1,
    objectFit: "cover",
  },
  ranking: {
    marginRight: SPACING.space_8,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderRadius: 25,
    // backgroundColor: COLORS.Primary,
  },
  numRanking: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  body: {
    flex: 1,
    marginLeft: SPACING.space_8,
    borderBottomWidth: 0.6,
    borderColor: COLORS.WhiteRGBA15,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
  },
  buttonMore: {
    position: "relative",
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  buttonMoreBody: {
    flex: 1,
    position: "absolute",
    flexDirection: "column",
    right: 0,
    top: "100%",
    backgroundColor: COLORS.Black2,
    padding: SPACING.space_4,
  },
});

export default styles;
