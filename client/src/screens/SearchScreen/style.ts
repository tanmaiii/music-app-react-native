import { StyleSheet } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING, BORDERRADIUS, HEIGHT } from "../../theme/theme";
import { WINDOW_HEIGHT } from "../../utils";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black1,
  },
  upperHeaderPlaceholder: {
    height: HEIGHT.LOWER_HEADER_SEARCH_HEIGHT,
  },
  header: {
    position: "absolute",
    width: "100%",
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
    // backgroundColor: "pink",
  },
  paddingForHeader: {
    height: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
  },
  scrollViewContent: {
    paddingHorizontal: SPACING.space_10,
    paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 50,
  },
  headerImage: { width: 40, height: 40 },
  headerTitle: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.bold,
  },
});

export default styles;
