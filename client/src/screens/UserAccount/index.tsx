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
  TextInput,
  RefreshControl,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import apiConfig from "../../apis/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import {
  faAngleRight,
  faArrowRightFromBracket,
  faCircleArrowRight,
  faCircleChevronRight,
  faCircleQuestion,
  faGear,
  faPenToSquare,
  faUser,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import IMAGES from "../../constants/images";
import CustomModal from "../../components/CustomModal";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigation/TStack";
import { userApi } from "../../apis";
import numeral from "numeral";

interface UserAccountProps {}

const UserAccount = (props: UserAccountProps) => {
  const [openModal, setOpenModal] = React.useState(false);
  const { logout } = useAuth();
  const linkTo = useLinkTo();
  const navigation = useNavigation<NavigationProp>();
  const { currentUser } = useAuth();
  const [countFollowing, setCountFollowing] = React.useState<number>(0);
  const [countFollowers, setCountFollowers] = React.useState<number>(0);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const getCountFollower = async () => {
    try {
      const count = await userApi.getCountFollowers(currentUser.id);
      const count2 = await userApi.getCountFollowing(currentUser.id);
      setCountFollowers(count);
      setCountFollowing(count2);

      console.log(count, count2);
    } catch (error) {}
  };

  React.useEffect(() => {
    getCountFollower();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getCountFollower();
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={IMAGES.LOGO} style={styles.headerImage} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </SafeAreaView>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <TouchableHighlight
          underlayColor={COLORS.Black}
          onPress={() => navigation.navigate("Artist", { userId: currentUser?.id })}
        >
          <View style={styles.account}>
            <View style={styles.accountLeft}>
              <Image
                style={styles.accountAvatar}
                source={
                  currentUser?.image_path
                    ? { uri: apiConfig.imageURL(currentUser.image_path) }
                    : IMAGES.AVATAR
                }
              />
              <View style={styles.accountBody}>
                <Text numberOfLines={1} style={[styles.textMain]}>
                  {currentUser.name}
                </Text>
                <Text numberOfLines={1} style={styles.textEtra}>
                  {currentUser.email}
                </Text>
              </View>
            </View>
            <View style={styles.accountRight}>
              <View style={styles.flexCenter}>
                <Text style={styles.textMain}>
                  {numeral(countFollowing).format("0a").toUpperCase()}
                </Text>
                <Text style={styles.textEtra}>Followers</Text>
              </View>
              <View style={styles.flexCenter}>
                <Text style={styles.textMain}>
                  {" "}
                  {numeral(countFollowers).format("0a").toUpperCase()}
                </Text>
                <Text style={styles.textEtra}>Followed</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>

        <View style={styles.line} />
        <TouchableHighlight
          underlayColor={COLORS.Black}
          onPress={() => navigation.navigate("UserEditAccount")}
        >
          <View style={styles.box}>
            <View style={styles.boxLeft}>
              <View style={styles.boxIcon}>
                <FontAwesomeIcon icon={faUser} size={20} style={{ color: COLORS.Primary }} />
              </View>
              <Text style={styles.textMain}>Account</Text>
            </View>
            <View>
              <FontAwesomeIcon icon={faAngleRight} size={20} style={{ color: COLORS.White2 }} />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor={COLORS.Black} onPress={() => console.log("press")}>
          <View style={styles.box}>
            <View style={styles.boxLeft}>
              <View style={styles.boxIcon}>
                <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ color: COLORS.Primary }} />
              </View>
              <Text style={styles.textMain}>Edit Information</Text>
            </View>
            <View>
              <FontAwesomeIcon icon={faAngleRight} size={20} style={{ color: COLORS.White2 }} />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={COLORS.Black} onPress={() => console.log("press")}>
          <View style={styles.box}>
            <View style={styles.boxLeft}>
              <View style={styles.boxIcon}>
                <FontAwesomeIcon icon={faGear} size={20} style={{ color: COLORS.Primary }} />
              </View>
              <Text style={styles.textMain}>Settings</Text>
            </View>
            <View>
              <FontAwesomeIcon icon={faAngleRight} size={20} style={{ color: COLORS.White2 }} />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor={COLORS.Black} onPress={() => console.log("press")}>
          <View style={styles.box}>
            <View style={styles.boxLeft}>
              <View style={styles.boxIcon}>
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  size={20}
                  style={{ color: COLORS.Primary }}
                />
              </View>
              <Text style={styles.textMain}>Help & Support</Text>
            </View>
            <View>
              <FontAwesomeIcon icon={faAngleRight} size={20} style={{ color: COLORS.White2 }} />
            </View>
          </View>
        </TouchableHighlight>

        <View style={styles.line} />

        <TouchableHighlight underlayColor={COLORS.Black} onPress={() => setOpenModal(true)}>
          <View style={styles.box}>
            <View style={styles.boxLeft}>
              <View style={styles.boxIcon}>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  size={20}
                  style={{ color: COLORS.Red }}
                />
              </View>
              <Text style={[styles.textMain, { color: COLORS.Red }]}>Log out</Text>
            </View>
            <View>
              <FontAwesomeIcon icon={faAngleRight} size={20} style={{ color: COLORS.White2 }} />
            </View>
          </View>
        </TouchableHighlight>
      </ScrollView>

      <CustomModal
        withInput={true}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        header={"Sign out of your account"}
        modalFunction={() => logout()}
      >
        <Text style={{ color: COLORS.White1, fontSize: FONTSIZE.size_16 }}>
          Are you sure you want to sign out?
        </Text>
        <TextInput />
      </CustomModal>
    </View>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
    minHeight: WINDOW_HEIGHT,
    // padding: SPACING.space_10,
  },
  flexCenter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.space_4,
  },
  line: { width: "100%", height: 0.3, backgroundColor: COLORS.WhiteRGBA15, marginVertical: 4 },
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
  header: {
    height: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
    padding: SPACING.space_10,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8,
  },
  headerImage: { width: 40, height: 40 },
  headerTitle: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.bold,
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
  accountRight: {
    flexDirection: "row",
    gap: SPACING.space_16,
    alignItems: "center",
  },
  accountAvatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  accountBody: {
    gap: SPACING.space_4,
    maxWidth: 100,
  },
  accountBox: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_12,
    justifyContent: "space-between",
    gap: SPACING.space_8,
  },
  box: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_12,
    justifyContent: "space-between",
    borderRadius: BORDERRADIUS.radius_14,
    overflow: "hidden",
  },
  boxLeft: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8,
  },
  boxIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.Black2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDERRADIUS.radius_14,
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
