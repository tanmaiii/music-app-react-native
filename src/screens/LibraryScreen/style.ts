import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black1,
    // padding: SPACING.space_10,
    paddingHorizontal: SPACING.space_10,
    paddingBottom: 120
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: SPACING.space_10,
    marginTop: SPACING.space_20,
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_10,
  },
  headerImage: {
    width: 46,
    height: 46,
    borderRadius: 40,
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
    paddingVertical: SPACING.space_8,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  headerListLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8
  },

  headerListRight: {},
  headerListText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.regular,
  },
  headerListIcon: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.regular,
  },
  scroll: {
    // flex: 1,
    height: "100%",
  },
});

export default styles;
