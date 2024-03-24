import { StyleSheet } from "react-native";
import { SPACING, FONTSIZE, FONTFAMILY, COLORS, HEIGHT } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black1,
  },
  Title: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.medium,
  },

  HomeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    // height: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
    height: 100,
    padding: SPACING.space_10,
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    gap: SPACING.space_8,
  },
  titleHello: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  HomeHeaderImage: {
    width: 46,
    height: 46,
    borderRadius: 40,
  },
  HomeHeaderIcon: {
    borderRadius: 40,
    fontSize: 38,
    color: COLORS.White2,
  },
  scroll: {
    height: "100%",
    padding: SPACING.space_10,

    paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 40,
  },
});

export default styles;
