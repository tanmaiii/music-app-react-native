import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import IMAGES from "../../constants/images";
import { WINDOW_HEIGHT } from "../../utils";

const HEIGHT_AVATAR = 360;

interface ArtistDetailProps {
  navigation: any;
}

const ArtistDetail = (props: ArtistDetailProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.header}>
        <TouchableHighlight
          underlayColor={COLORS.Black2}
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={24} color="black" style={styles.icon} />
        </TouchableHighlight>
        <Text style={styles.title}>Son Tung MTP</Text>
      </SafeAreaView>
      <View style={{ height: WINDOW_HEIGHT * 2 }}>
        <View style={[styles.avatar, { height: HEIGHT_AVATAR, position: "absolute" }]}>
          <Image style={styles.imageAvatar} source={IMAGES.ARTIST} />
        </View>

        <ScrollView style={{}}>
          <View style={{ height: HEIGHT_AVATAR }} />
          <View
            style={[
              styles.body,
              { backgroundColor: "pink", height: WINDOW_HEIGHT * 2, zIndex: 200 },
            ]}
          ></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ArtistDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.White1,
    fontSize: FONTSIZE.size_30,
  },
  header: {
    padding: SPACING.space_12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    zIndex: 100,
  },
  buttonBack: {
    position: "absolute",
    left: 8,
    backgroundColor: COLORS.Black2,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  title: {
    color: COLORS.White1,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
  },
  avatar: {
    width: "100%",
    height: 400,
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
  body: {},
});
