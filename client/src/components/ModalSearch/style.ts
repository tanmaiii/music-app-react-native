import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../utils";

const styles = StyleSheet.create({
  modal: {
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
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  header: {
    width: "100%",
    padding: SPACING.space_12,
    flexDirection: "column",
    backgroundColor: COLORS.Black2,
    gap: SPACING.space_8,
  },
  headerSearch: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonClear: {
    backgroundColor: COLORS.WhiteRGBA32,
    padding: 2,
    position: "absolute",
    right: 10,
    borderRadius: 50,
  },
  buttonCancel: {
    padding: SPACING.space_8,
  },
  headerSearchInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "row",
    gap: SPACING.space_4,
  },
  item: {
    width: "auto",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleItem: {
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_4,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White2,
    textAlign: "center",
    fontFamily: FONTFAMILY.medium,
  },
  indicator: {
    // backgroundColor: COLORS.Primary,
    width: "60%",
    height: 3,
    borderRadius: 8,
  },
  scroll: {
    height: "100%",
    // paddingVertical: SPACING.space_12,
    // paddingHorizontal: SPACING.space_12,
  },
  titleHeaderScroll: {
    paddingHorizontal: SPACING.space_12,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White2,
    fontFamily: FONTFAMILY.medium,
  },
  titleViewAll: {
    padding: SPACING.space_12,
    fontSize: FONTSIZE.size_16,
    color: COLORS.Primary,
    fontFamily: FONTFAMILY.regular,
  },
  wrapperHistory: {
    padding: SPACING.space_12,
  },
  groupListHistory: {
    marginTop: SPACING.space_12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.space_8,
  },
  itemHistory: {
    width: "auto",
    backgroundColor: COLORS.Black2,
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_20,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_4,
    overflow: "hidden",
  },
  titleHistory: {
    maxWidth: 140,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.regular,
  },
});

export default styles;
