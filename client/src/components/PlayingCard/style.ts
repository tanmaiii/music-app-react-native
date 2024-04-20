import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING, HEIGHT } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    height: HEIGHT.playingCard,
    // paddingHorizontal: SPACING.space_10,
    // overflow: "hidden",
    // borderRadius: BORDERRADIUS.radius_8,
    width: "100%",

    position: "absolute",
    left: 0,
    bottom: HEIGHT.navigator,
    // bottom: 0,
    zIndex: 1,

    borderBottomWidth: 0.8,
    borderBottomColor: COLORS.Black1,
  },
  wrapper: {
    // opacity: 0.9,
    // blur: '10',
    backgroundColor: COLORS.Black2,
    padding: SPACING.space_8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_12,
  },
  right: { display: "flex", flexDirection: "row", alignItems: "center", gap: SPACING.space_8 },
  shadowProp: {
    shadowColor: COLORS.Black,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
  boxImage: {
    aspectRatio: 1 / 1,
    height: "100%",
  },
  image: {
    borderRadius: BORDERRADIUS.radius_4,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  title: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.medium,
  },
  artist: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White2,
    fontFamily: FONTFAMILY.regular,
  },
  icon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White1,
    // marginLeft: SPACING.space_4,
    // marginRight: 'auto',
    // marginLeft: 'auto'
  },
  iconDisable: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White2,
    opacity: 0.8,
  },
  iconPlay: {
    backgroundColor: COLORS.Primary,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.space_10,
  },
  iconNext: {
    padding: SPACING.space_4,
    // backgroundColor: COLORS.WhiteRGBA32,
    borderRadius: 50,
    height: 38,
    width: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default styles;
