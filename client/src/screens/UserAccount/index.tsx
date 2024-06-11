import * as React from "react";
import { userApi } from "@/apis";
import CustomModal from "@/components/CustomModal";
import apiConfig from "@/configs/axios/apiConfig";
import IMAGES from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { NavigationProp } from "@/navigators/TStack";
import { COLORS, FONTSIZE } from "@/theme/theme";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleRight,
  faArrowRightFromBracket,
  faCircleQuestion,
  faGear,
  faPenToSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import numeral from "numeral";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./style";

interface UserAccountProps {}

const UserAccount = (props: UserAccountProps) => {
  const [openModal, setOpenModal] = React.useState(false);
  const { logout } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const { currentUser } = useAuth();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data: followers } = useQuery({
    queryKey: ["followers"],
    queryFn: async () => {
      const res = await userApi.getCountFollowers(currentUser.id);
      return res;
    },
  });

  const { data: following } = useQuery({
    queryKey: ["following"],
    queryFn: async () => {
      const res = await userApi.getCountFollowing(currentUser.id);
      return res;
    },
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["followers"] });
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.White1} />
        }
      >
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
                <Text style={styles.textMain}>{numeral(followers).format("0a").toUpperCase()}</Text>
                <Text style={styles.textEtra}>followers</Text>
              </View>
              <View style={styles.flexCenter}>
                <Text style={styles.textMain}>{numeral(following).format("0a").toUpperCase()}</Text>
                <Text style={styles.textEtra}>following</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>

        <View style={styles.line} />

        <Item
          icon={faUser}
          title="Edit profile"
          func={() => navigation.navigate("UserEditProfile")}
        />

        <Item
          icon={faPenToSquare}
          title="Edit Information"
          func={() => navigation.navigate("UserEditProfile")}
        />

        <Item icon={faGear} title="Settings" func={() => navigation.navigate("Settings")} />

        <Item
          icon={faCircleQuestion}
          title="Help & Support"
          func={() => navigation.navigate("Support")}
        />

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

const Item = ({ icon, title, func }: { icon: IconProp; title: string; func: () => void }) => {
  return (
    <TouchableHighlight underlayColor={COLORS.Black} onPress={() => func()}>
      <View style={styles.box}>
        <View style={styles.boxLeft}>
          <View style={styles.boxIcon}>
            <FontAwesomeIcon icon={icon} size={20} style={{ color: COLORS.Primary }} />
          </View>
          <Text style={styles.textMain}>{title}</Text>
        </View>
        <View>
          <FontAwesomeIcon icon={faAngleRight} size={20} style={{ color: COLORS.White2 }} />
        </View>
      </View>
    </TouchableHighlight>
  );
};
