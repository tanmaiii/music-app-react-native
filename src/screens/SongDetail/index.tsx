import * as React from "react";
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from "react-native";
import IMAGES from "../../constants/images";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { Feather } from "@expo/vector-icons";
interface SongDetailProps {}

const SongDetail = (props: SongDetailProps) => {
  return (
    <ImageBackground source={IMAGES.POSTER} style={styles.container} blurRadius={80}>
      <View style={styles.wrapper}>
        <View
          style={{
            width: 48,
            height: 6,
            backgroundColor: COLORS.WhiteRGBA50,
            borderRadius: BORDERRADIUS.radius_14,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: SPACING.space_36,
          }}
        ></View>
        <View style={[styles.wrapperImage]}>
          <Image style={styles.image} source={IMAGES.POSTER} />
        </View>

        <View style={styles.playerControls}>
          <View style={styles.playerControlsTop}>
            <View>
              <Text style={styles.textMain}>Chúng ta của hiện tại</Text>
              <Text style={styles.textExtra}>Sơn tùng & Hải Tú</Text>
            </View>
            <TouchableOpacity style={styles.buttonMore}>
              <Feather name="more-horizontal" size={24} style={{ color: COLORS.White1 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
{/* 
      <View style={{backgroundColor: 'pink', height: 80}}>
        
      </View>
      <View style={{backgroundColor: 'pink', height: 80}}>
        
      </View> */}
    </ImageBackground>
  );
};

export default SongDetail;

const imageSize = WINDOW_WIDTH - 2 * SPACING.space_18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  textMain: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.medium,
    textAlign: "center",
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  wrapper: {
    // padding: SPACING.space_18,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_18,
    alignItems: "center",
  },
  wrapperImage: {
    aspectRatio: 1, // Đảm bảo chiều cao và chiều rộng bằng nhau
  },
  image: {
    width: imageSize,
    height: imageSize,
    resizeMode: "cover",
    borderRadius: BORDERRADIUS.radius_8,
  },
  playerControls: {},
  playerControlsTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingVertical: SPACING.space_28,
  },
  buttonMore: {
    backgroundColor: COLORS.WhiteRGBA15,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 25,
  },
});
