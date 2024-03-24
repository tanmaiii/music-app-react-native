import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import IMAGES from "../../constants/images";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";

interface PlaylistCardProps {}

const PlaylistCard = (props: PlaylistCardProps) => {
  return (
    <TouchableHighlight
      underlayColor={COLORS.Black2}
      onPress={() => console.log("click song top")}
      style={styles.container}
    >
      <View style={styles.swapper}>
        <View style={styles.swapperImage}>
          <Image style={styles.image} source={IMAGES.POSTER} />
        </View>
        <View style={styles.body}>
          <View>
            <Text style={styles.textMain}>Chắc ai đó sẽ về</Text>
            <Text style={styles.textEtra}>12.343.000 - 2017</Text>
          </View>
          <TouchableOpacity>
            <Feather name="more-horizontal" size={24} style={{ color: COLORS.White1 }} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default PlaylistCard;

const styles = StyleSheet.create({
  container: {
    // marginBottom: SPACING.space_8,
    // padding: SPACING.space_4,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White1,
  },
  textEtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  swapper: {
    height: 68,
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
  },
  swapperImage: {
    height: 68,
    width: 68,
    padding: 4,
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    borderRadius: BORDERRADIUS.radius_8,
  },
  body: {
    borderTopWidth: 0.6,
    borderColor: COLORS.WhiteRGBA15,
    flex: 1,
    paddingHorizontal: SPACING.space_8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
