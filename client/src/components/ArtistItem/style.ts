import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";

const styles = StyleSheet.create({
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
  boxArtist: {
    width: "100%",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_12,
    backgroundColor: COLORS.Black2,
    borderRadius: BORDERRADIUS.radius_14,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.space_12,
  },
  leftBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_12,
  },
  boxImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.Black3,
  },
  boxDesc: {
    gap: SPACING.space_4,
  },
  rightBox: {},
  btnFollow: {
    borderRadius: BORDERRADIUS.radius_20,
    borderColor: COLORS.WhiteRGBA32,
    borderWidth: 0.8,
    paddingHorizontal: SPACING.space_16,
    paddingVertical: SPACING.space_8,
  },
});

export default styles;
