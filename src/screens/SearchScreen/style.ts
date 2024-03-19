import { StyleSheet } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING, BORDERRADIUS, HEIGHT } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black1,
    padding: 10,
    marginBottom: HEIGHT.navigator,
    // paddingHorizontal: SPACING.space_10,
  },
  title: {
    paddingVertical: SPACING.space_8,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.regular,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    marginTop: SPACING.space_20,
    gap: SPACING.space_10,
  },
  headerImage: { width: 46, height: 46, borderRadius: 40 },
  headerTitle: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.bold,
  },
  genres: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: COLORS.Black1,
    // paddingVertical: -SPACING.space_8,
  },
  genreCard: {
    height: 150,
    backgroundColor: COLORS.Primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  genreCardWrapper: {},
});

export default styles;
