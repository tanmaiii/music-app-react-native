import { StyleSheet } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING, BORDERRADIUS, HEIGHT } from "../../theme/theme";
import { WINDOW_HEIGHT } from "../../utils";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black1,
    position: "relative",
    flex: 1,
  },
  upperHeaderPlaceholder: {
    height: HEIGHT.LOWER_HEADER_SEARCH_HEIGHT,
  },
  header: {
    position: "absolute",
    width: "100%",
    zIndex: 99,
  },
  upperHeader: {
    height: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
    padding: SPACING.space_10,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8,
  },
  lowerHeader: {
    height: HEIGHT.LOWER_HEADER_SEARCH_HEIGHT,
    padding: SPACING.space_10,
  },
  paddingForHeader: {
    height: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
  },
  inputBox: {
    display: "flex",
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_14,
    borderWidth: 0,
    backgroundColor: COLORS.White1,
    borderRadius: BORDERRADIUS.radius_8,
    flexDirection: "row",
    textAlign: "center",
    color: COLORS.White,
  },
  textInput: {
    width: "90%",
    borderWidth: 0,
    justifyContent: "center",
  },
  boxIcon: {
    marginRight: SPACING.space_10,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    color: COLORS.Black3,
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.size_14,
  },
  scrollViewContent: {
    paddingHorizontal: SPACING.space_10,
    paddingBottom: HEIGHT.navigator + HEIGHT.playingCard,
  },
  headerImage: { width: 40, height: 40 },
  headerTitle: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.bold,
  },
});

export default styles;
