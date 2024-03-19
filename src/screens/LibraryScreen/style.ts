import { StyleSheet } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black1,
    padding: SPACING.space_10,
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
    flexDirection: 'row',
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
});

export default styles;
