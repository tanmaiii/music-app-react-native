import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "@/theme/theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    textAlign: "center",
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
    height: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
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
    // paddingVertical: SPACING.space_12,
    paddingBottom: HEIGHT.navigator + HEIGHT.playingCard,
    gap: SPACING.space_18,
    marginTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
  },
  wrapperTop: {
    gap: SPACING.space_12,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperImage: {
    aspectRatio: 1,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: BORDERRADIUS.radius_8,
    transformOrigin: "bottom",
  },

  button: {
    width: 160,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.Primary,
    paddingHorizontal: SPACING.space_14,
    paddingVertical: 10,
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
  textDesc: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    paddingHorizontal: SPACING.space_12,
    color: COLORS.White2,
    width: "100%",
    marginBottom: SPACING.space_12,
  },

  //Modal search

  modalSearch: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: COLORS.Black1,
    flex: 1,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    zIndex: 99,
    display: "none",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  scroll: {
    height: "100%",
    paddingHorizontal: SPACING.space_12,
  },
  titleHeaderScroll: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.medium,
  },
  scrollViewContent: {
    paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 20,
  },
});

export default styles;
