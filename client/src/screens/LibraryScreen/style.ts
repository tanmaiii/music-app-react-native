import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { WINDOW_WIDTH } from "../../utils";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_10,
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8,
  },
  headerImage: {
    width: 40,
    height: 40,
    // borderRadius: 40,
  },
  headerTitle: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.bold,
  },
  headerIcon: {
    borderRadius: 40,
    fontSize: 38,
    color: COLORS.White2,
  },
  category: {
    paddingHorizontal: SPACING.space_8,
    display: "flex",
    flexDirection: "row",
  },
  categoryItem: {
    borderRadius: BORDERRADIUS.radius_20,
    borderBlockColor: COLORS.White1,
    paddingHorizontal: SPACING.space_16,
    paddingVertical: SPACING.space_8,
    backgroundColor: COLORS.Black2,
    marginRight: SPACING.space_8,
  },
  categoryItemActive: {
    backgroundColor: COLORS.Primary,
    color: COLORS.Black1,
  },
  categoryItemText: {
    color: COLORS.White1,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
  },
  headerList: {
    padding: SPACING.space_8,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  headerListLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8,
  },

  headerListRight: {},
  headerListText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White2,
    fontFamily: FONTFAMILY.regular,
  },
  headerListIcon: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.regular,
  },
  scroll: {
    height: "100%",
  },
});

export default styles;
