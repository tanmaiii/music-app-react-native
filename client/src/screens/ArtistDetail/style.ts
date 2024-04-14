import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  textMain: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.medium,
    textAlign: "center",
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.White1,
    fontSize: FONTSIZE.size_24,
  },
  // header
  header: {
    padding: SPACING.space_8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 100,
  },
  buttonHeader: {
    backgroundColor: COLORS.button,
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    borderRadius: 25,
  },
  title: {
    color: COLORS.White1,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
  },
  //
  avatar: {
    position: "absolute",
    width: "100%",
    height: 400,
    backgroundColor: COLORS.Black1,
  },
  imageAvatar: {
    width: "100%",
    height: "100%",
  },
  avatarTitle: {
    position: "absolute",
    padding: SPACING.space_18,
    bottom: 0,
    left: 0,
    fontSize: 56,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.bold,
  },
  body: {
    backgroundColor: COLORS.Black1,
  },
  bodyTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.space_10,
    alignItems: "center",
  },
  bodyTopRight: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.space_8,
  },
  countFollow: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White2,
    margin: SPACING.space_18,
  },
  buttonFollow: {
    paddingHorizontal: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
    borderWidth: 1.2,
    borderColor: COLORS.White2,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  buttonPlay: {
    width: 45,
    height: 45,
    backgroundColor: COLORS.Primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSort: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  SongTop: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.space_10,
    height: 130,
  },
  SongTopLeft: {
    width: 110,
    height: 110,
  },
  SongTopImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: BORDERRADIUS.radius_8,
  },
  SongTopRight: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: SPACING.space_4,
    height: "100%",
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_12,
  },
  songTopLike: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_4,
    backgroundColor: COLORS.Black2,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  SlideSong: {
    padding: SPACING.space_10,
  },
  bodyBottom: {
    marginTop: SPACING.space_8,
    backgroundColor: COLORS.Black2,
    paddingBottom: HEIGHT.navigator + HEIGHT.playingCard,
  },
});

export default styles;
