import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "@/theme/theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@/utils";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.Black1,
      height: WINDOW_HEIGHT,
    },
    header: {
      flexDirection: "row", // Sắp xếp các phần tử theo hàng ngang
      alignItems: "center", // Căn chỉnh các phần tử theo chiều dọc
      justifyContent: "center", // Căn chỉnh các phần tử theo chiều ngang
      paddingHorizontal: SPACING.space_12,
      paddingVertical: SPACING.space_12,
      position: "absolute",
      top: 0,
      left: 0,
    },
    buttonBack: {
      justifyContent: "center",
      alignItems: "center",
      width: 36,
      height: 36,
      borderRadius: 25,
    },
    headerTitle: {
      flex: 1,
    },
    title: {
      fontSize: FONTSIZE.size_16,
      fontFamily: FONTFAMILY.medium,
      color: COLORS.White1,
      width: "100%",
      textAlign: "center",
    },
    scroll: {},
    flatlist: {},
    card: {
      display: "flex",
      justifyContent: "center",
      flex: 1,
      paddingHorizontal: SPACING.space_12,
      marginBottom: SPACING.space_12,
    },
    imageCard: {},
    image: {
      backgroundColor: COLORS.Black2,
      aspectRatio: 3 / 3,
      borderRadius: BORDERRADIUS.radius_8,
      objectFit: "cover",
      width: WINDOW_WIDTH / 2 - SPACING.space_12 * 2,
      height: WINDOW_WIDTH / 2 - SPACING.space_12 * 2,
    },
    descCard: {
      paddingTop: SPACING.space_8,
    },
    textTitle: {
      fontSize: FONTSIZE.size_16,
      fontFamily: FONTFAMILY.medium,
      color: COLORS.White1,
    },
    textExtra: {
      fontSize: FONTSIZE.size_16,
      fontFamily: FONTFAMILY.regular,
      color: COLORS.White2,
    },
  });

export default styles;
