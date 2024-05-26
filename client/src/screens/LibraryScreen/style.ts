import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "@/theme/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black1,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
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
    paddingHorizontal: SPACING.space_8,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
  likeSong: {
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_12,
    display: "flex",
    flexDirection: "row",
    backgroundColor: COLORS.Black1,
  },
  boxImage: {
    width: 70,
    height: 70,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: COLORS.Primary,
    borderRadius: BORDERRADIUS.radius_8,
  },
  image: {
    width: 70,
    height: 70,
    objectFit: "cover",
    aspectRatio: 1 / 1,
  },
  body: {
    padding: SPACING.space_12,
    display: "flex",
    justifyContent: "center",
    gap: SPACING.space_4,
  },
  title: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  desc: {
    display: "flex",
    flexDirection: "row",
    gap: SPACING.space_4,
    alignItems: "center",
  },
  descText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
});

export default styles;
