import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import IMAGES from "../../constants/images";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleRight,
  faArrowRightFromBracket,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;

interface AccountProps {}

const Account = (props: AccountProps) => {
  const { currentUser } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.Black2} />
      <SafeAreaView style={{ zIndex: 99 }}>
        <View style={[styles.header, Platform.OS === "ios" && { paddingTop: statusBarHeight + SPACING.space_12 }]}>
          <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} size={20} style={{ color: COLORS.White1 }} />
          </TouchableOpacity>

          <Text style={[styles.titleHeader]}>Account</Text>

          <TouchableOpacity
            style={[styles.buttonHeader, { opacity: 0 }]}
            onPress={() => navigation.goBack()}
          >
            <FontAwesomeIcon icon={faChevronLeft} size={20} style={{ color: COLORS.White1 }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView style={{marginTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT}}>
        <TouchableOpacity onPress={() => console.log("press")}>
          <View style={styles.box}>
            <View style={styles.boxLeft}>
              <View style={{}}>
                <Text numberOfLines={1} style={[styles.textMain]}>
                  Name
                </Text>
                <Text numberOfLines={1} style={[styles.textEtra, { maxWidth: 200 }]}>
                  {currentUser.name}
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <FontAwesomeIcon icon={faAngleRight} size={20} style={{ color: COLORS.White2 }} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("press")}>
          <View style={styles.box}>
            <View style={styles.boxLeft}>
              <View style={{}}>
                <Text numberOfLines={1} style={[styles.textMain]}>
                  Email
                </Text>
                <Text numberOfLines={1} style={[styles.textEtra, { maxWidth: 200 }]}>
                  {currentUser.email}
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <FontAwesomeIcon icon={faAngleRight} size={20} style={{ color: COLORS.White2 }} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("press")}>
          <View style={styles.box}>
            <View style={styles.boxLeft}>
              <Text numberOfLines={1} style={[styles.textMain]}>
                Password
              </Text>
              <Text numberOfLines={1} style={[styles.textEtra, { maxWidth: 200 }]}></Text>
            </View>
            <TouchableOpacity>
              <FontAwesomeIcon icon={faAngleRight} size={20} style={{ color: COLORS.White2 }} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    padding: SPACING.space_12,
    backgroundColor: COLORS.Black2,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textEtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  buttonHeader: {
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    borderRadius: 25,
  },
  titleHeader: {
    color: COLORS.White1,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
  },
  box: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    // borderRadius: BORDERRADIUS.radius_14,
    // backgroundColor: COLORS.Black2,
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_12,
    borderBottomColor: COLORS.WhiteRGBA15,
    borderBottomWidth: 0.6,
  },
  boxLeft: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.space_16,
  },
  boxIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.Black2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDERRADIUS.radius_14,
  },
});
