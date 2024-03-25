import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black1,
    padding: SPACING.space_10,
    paddingBottom: HEIGHT.navigator + HEIGHT.playingCard + 40,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: SPACING.space_10,
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
    gap: SPACING.space_8,
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
    height: "100%",
  },
  scrollArtist:{
    flexDirection: "row", // Chia theo hàng ngang để tạo hai cột
    justifyContent: "space-between", // Căn các cột ở hai đầu
    alignItems: "stretch", // Mở rộng các cột để chiếm toàn bộ không gian
    flex: 1, // Đảm bảo container mở rộng để điều chỉnh các cột
    flexWrap: "wrap",
    // marginRight: -SPACING.space_4,
    // marginLeft: -SPACING.space_4,
    // paddingHorizontal: SPACING.space_10,
  }
});

export default styles;
