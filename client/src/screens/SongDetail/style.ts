import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "none",
  },
  buttonHeader: {
    // backgroundColor: COLORS.Black2,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    borderRadius: 25,
  },
  iconButtonHeader: {
    color: COLORS.White1,
    fontSize: FONTSIZE.size_24,
  },
  titleHeader: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    textAlign: "center",
    color: COLORS.White1,
    transform: [{ translateY: 20 }],
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.space_12,
    gap: SPACING.space_8,
    paddingBottom: HEIGHT.navigator + HEIGHT.playingCard,
    marginTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
  },
  wrapperImage: {
    aspectRatio: 1,
  },
  image: {
    width: 280,
    height: 280,
    borderRadius: BORDERRADIUS.radius_8,
    transformOrigin: "bottom",
  },
  groupButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.space_24,
  },
  button: {
    width: 160,
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.Primary,
    paddingHorizontal: SPACING.space_14,
    paddingVertical: SPACING.space_8,
    borderRadius: 25,
    gap: SPACING.space_8,
  },
  buttonExtra: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  textButton: {
    color: COLORS.White1,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
  },
  // textDesc: {
  //   fontSize: FONTSIZE.size_14,
  //   fontFamily: FONTFAMILY.regular,
  //   paddingHorizontal: SPACING.space_12,
  //   color: COLORS.White2,
  //   width: "100%",
  //   marginBottom: SPACING.space_12,
  // },
  info: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: SPACING.space_8,
  },
  listArtist: {
    width: "100%",
    paddingHorizontal: SPACING.space_12,
    display: "flex",
    flexDirection: 'column',
    gap: SPACING.space_14
  },
  boxArtist: {
    width: "100%",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_12,
    backgroundColor: COLORS.Black2,
    borderRadius: BORDERRADIUS.radius_14,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.space_12
  },
  leftBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_12,
  },
  boxImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  boxDesc:{
    gap: SPACING.space_4
  },
  rightBox: {},
  btnFollow:{
    borderRadius: BORDERRADIUS.radius_20,
    borderColor: COLORS.WhiteRGBA15,
    borderWidth: 0.6,
    paddingHorizontal: SPACING.space_16,
    paddingVertical: SPACING.space_8
  }
});

export default styles;
