import { StyleSheet } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "@/theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  title: {
    color: COLORS.White1,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
  },
  header: {
    width: "100%",
    padding: SPACING.space_12,
    flexDirection: "column",
    gap: SPACING.space_16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerBottom: {
    paddingHorizontal: SPACING.space_12,
  },
  titleHeaderBottom: {
    fontSize: FONTSIZE.size_30,
    fontFamily: FONTFAMILY.bold,
    color: COLORS.White1,
    marginBottom: SPACING.space_18,
  },
  buttonHeader: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 25,
  },
  icon: {
    color: COLORS.White1,
  },
});

export default styles;
