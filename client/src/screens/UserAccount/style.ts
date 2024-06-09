import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "@/theme/theme";
import { WINDOW_HEIGHT } from "@/utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
    minHeight: WINDOW_HEIGHT,
    // padding: SPACING.space_10,
  },
  flexCenter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.space_4,
  },
  line: { width: "100%", height: 0.3, backgroundColor: COLORS.WhiteRGBA15, marginVertical: 4 },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textEtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  header: {
    height: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
    padding: SPACING.space_10,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8,
  },
  headerImage: { width: 40, height: 40 },
  headerTitle: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.bold,
  },
  account: {
    width: "100%",
    // backgroundColor: COLORS.Black2,
    padding: SPACING.space_20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
    gap: SPACING.space_16,
    flexDirection: "row",
  },
  accountLeft: {
    flexDirection: "row",
    gap: SPACING.space_16,
    alignItems: "center",
  },
  accountRight: {
    flexDirection: "row",
    gap: SPACING.space_16,
    alignItems: "center",
  },
  accountAvatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: COLORS.Black2,
  },
  accountBody: {
    gap: SPACING.space_4,
    maxWidth: 100,
  },
  accountBox: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_12,
    justifyContent: "space-between",
    gap: SPACING.space_8,
  },
  box: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_12,
    justifyContent: "space-between",
    borderRadius: BORDERRADIUS.radius_14,
    overflow: "hidden",
  },
  boxLeft: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8,
  },
  boxIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.Black2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDERRADIUS.radius_14,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  buttonLogout: {
    backgroundColor: COLORS.White1,
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_12,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_4,
  },
});

export default styles;
