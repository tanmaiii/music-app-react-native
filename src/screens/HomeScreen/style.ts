import { StyleSheet } from "react-native";
import { SPACING, FONTSIZE, FONTFAMILY, COLORS } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    height: 1000,
    padding: SPACING.space_10,
    backgroundColor: COLORS.Black1,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
  Title: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.medium,
  },
  HomeHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    marginTop: SPACING.space_20,
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
});

export default styles;
