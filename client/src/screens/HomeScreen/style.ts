import { StyleSheet } from "react-native";
import { SPACING, FONTSIZE, FONTFAMILY, COLORS, HEIGHT } from "../../theme/theme";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";

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
    width: 40,
    height: 40,
    // borderRadius: 40,
  },
  HomeHeaderIcon: {
    borderRadius: 40,
    fontSize: 38,
    color: COLORS.White2,
  },
  scroll: {
    paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 60,
    minHeight: WINDOW_HEIGHT,
  },
});

export default styles;
