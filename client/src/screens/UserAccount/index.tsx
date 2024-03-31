import * as React from "react";
import { useCallback, useRef, useMemo } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import apiConfig from "../../apis/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { faAngleRight, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";

interface UserAccountProps {}

const UserAccount = (props: UserAccountProps) => {
  const { currentUser } = useAuth();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView></SafeAreaView>
      <TouchableHighlight underlayColor={COLORS.Black} onPress={() => console.log("press")}>
        <View style={styles.account}>
          <View style={styles.accountLeft}>
            <Image
              style={styles.accountAvatar}
              source={{ uri: apiConfig.imageURL(currentUser.image_path) }}
            />
            <View style={styles.accountBody}>
              <Text style={styles.textMain}>{currentUser.name}</Text>
              <Text style={styles.textEtra}>Show Profile</Text>
            </View>
          </View>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faAngleRight} size={20} style={{ color: COLORS.White2 }} />
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={COLORS.Black} onPress={() => console.log("press")}>
        <View style={styles.accountBox}>
          <Text style={styles.textMain}>Account</Text>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faAngleRight} size={20} style={{ color: COLORS.White2 }} />
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={COLORS.Black} onPress={() => console.log("press")}>
        <View style={styles.accountBox}>
          <Text style={styles.textMain}>Account</Text>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faAngleRight} size={20} style={{ color: COLORS.White2 }} />
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={COLORS.Black} onPress={() => console.log("press")}>
        <View style={styles.accountBox}>
          <Text style={styles.textMain}>Account</Text>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faAngleRight} size={22} style={{ color: COLORS.White2 }} />
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={COLORS.Black} onPress={() => console.log("press")}>
        <View style={styles.accountBox}>
          <Text style={styles.textMain}>Account</Text>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faAngleRight} size={22} style={{ color: COLORS.White2 }} />
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={COLORS.Black} onPress={() => console.log("press")}>
        <View style={styles.accountBox}>
          <Text style={styles.textMain}>Account</Text>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faAngleRight} size={22} style={{ color: COLORS.White2 }} />
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={COLORS.Black} onPress={() => console.log("press")}>
        <View style={styles.accountBox}>
          <Text style={styles.textMain}>Account</Text>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faAngleRight} size={22} style={{ color: COLORS.White2 }} />
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.buttonLogout}>
          <Text
            style={{
              color: COLORS.Black1,
              fontSize: FONTSIZE.size_16,
              fontFamily: FONTFAMILY.medium,
            }}
          >
            Logout
          </Text>
          {/* <FontAwesomeIcon
            size={18}
            icon={faArrowRightFromBracket}
            style={{ color: COLORS.Black1 }}
          /> */}
        </TouchableOpacity>
      </View>
      <ScrollView></ScrollView>
    </View>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.Black1, minHeight: WINDOW_HEIGHT },
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
  account: {
    width: "100%",
    // backgroundColor: COLORS.Black2,
    padding: SPACING.space_20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
    gap: SPACING.space_16,
    flexDirection: "row",
  },
  accountLeft: {
    flexDirection: "row",
    gap: SPACING.space_16,
    alignItems: "center",
  },
  accountAvatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  accountBody: {},
  accountBox: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_12,
    justifyContent: "space-between",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  buttonLogout: {
    backgroundColor: COLORS.White1,
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_12,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_4,
  },
});
