import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: WINDOW_HEIGHT,
    zIndex: 999,
  },
  textMain: {
    fontSize: FONTSIZE.size_30,
    fontFamily: FONTFAMILY.bold,
    textAlign: "center",
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  wrapper: {
    paddingTop: SPACING.space_18,
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapperSong: {
    flex: 1,
    width: WINDOW_WIDTH,
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapperImage: {
    flex: 1,
    padding: SPACING.space_18,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    width: WINDOW_WIDTH,
  },
  image: {
    height: "100%",
    aspectRatio: 1 / 1,
    borderRadius: BORDERRADIUS.radius_8,
    backgroundColor: COLORS.Black2,
    overflow: "hidden",
    objectFit: "contain",
    shadowColor: COLORS.Primary,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
  playerControlsTop: {
    flexDirection: "column",
    width: WINDOW_WIDTH,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: SPACING.space_16,
    paddingHorizontal: SPACING.space_16,
  },
  buttonMore: {
    backgroundColor: COLORS.WhiteRGBA15,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 25,
  },
  playerControlsBar: {
    paddingHorizontal: SPACING.space_18,
    width: WINDOW_WIDTH,
    gap: SPACING.space_12,
  },
  scrollBar: {
    width: "100%",
    gap: SPACING.space_8,
  },
  sliderBar: {
    width: "100%",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_32,
  },
  actionButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  actionButtonStart: {
    // backgroundColor: COLORS.White1,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: COLORS.White1,
    borderWidth: 2.4,
  },

  playerControlsBottom: {
    marginTop: SPACING.space_32,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.space_18,
    alignItems: "center",
    width: "100%",
    // height: 60,
    padding: SPACING.space_12,
    // borderTopColor: COLORS.WhiteRGBA15,
    // borderTopWidth: 1,
  },
  BottomButton: {
    // height: 60,
    // width: 60,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_8,
  },
  actionVolume: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: SPACING.space_8,
  },
});

export default styles;
