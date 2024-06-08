import { StyleSheet } from "react-native";
import { SPACING, FONTFAMILY, FONTSIZE, COLORS, BORDERRADIUS } from "@/theme/theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    gap: SPACING.space_4,
  },
  wrapperImage: {
    aspectRatio: 1,
    borderRadius: 100,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.Black2,
  },
  textTitle: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
    textAlign: "center",
  },
  textDes: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White2,
  },
  buttonPlay: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 40,
    height: 40,
    backgroundColor: COLORS.button,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  iconButtonPlay: {
    color: COLORS.White1,
  },
});

export default styles;
