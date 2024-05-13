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
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import IMAGES from "../../constants/images";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import Constants from "expo-constants";
import { apiConfig } from "../../configs";
const statusBarHeight = Constants.statusBarHeight;
import * as ImagePicker from "expo-image-picker";
import { imageApi, userApi } from "../../apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NavigationProp } from "../../navigators/TStack";

interface AccountProps {}

const EditProfile = (props: AccountProps) => {
  const { currentUser, token, loadingAuth } = useAuth();
  // const [user, setUser] = React.useState();
  const navigation = useNavigation<NavigationProp>();
  const [file, setFile] = React.useState<any>("");
  const queryClient = useQueryClient();

  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: statusCamera } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Photo gallery access permission not granted!");
      }
      if (statusCamera !== "granted") {
        Alert.alert("Camera access permission not granted!");
      }
    })();
  }, []);

  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const file = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      };
      setFile(file);
      mutationSaveImage.mutate();
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const file = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      };
      setFile(file);
      mutationSaveImage.mutate();
    }
  };

  const showOptions = () => {
    Alert.alert(
      "Chọn ảnh",
      "Bạn muốn lấy ảnh từ thư viện hay chụp ảnh mới?",
      Platform.OS === "ios"
        ? [
            { text: "Chụp ảnh", onPress: takePhoto },
            { text: "Lấy ảnh từ thư viện", onPress: pickImageFromLibrary },
            { text: "Hủy bỏ", onPress: () => console.log("Hủy bỏ") },
          ]
        : [
            { text: "Hủy bỏ", onPress: () => console.log("Hủy bỏ") },
            { text: "Lấy ảnh từ thư viện", onPress: pickImageFromLibrary },
            { text: "Chụp ảnh", onPress: takePhoto },
          ],
      { cancelable: true }
    );
  };

  const handleSaveImage = async () => {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append("image", file);

      const res = await imageApi.upload(formData, token);
      if (res.image)
        await userApi.update(token, {
          image_path: res.image,
        });
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên server:", error);
    }
  };

  const mutationSaveImage = useMutation({
    mutationFn: async () => {
      await handleSaveImage();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ zIndex: 99 }}>
        <View
          style={[
            styles.header,
            Platform.OS === "ios" && { paddingTop: statusBarHeight + SPACING.space_8 },
          ]}
        >
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

      <ScrollView
        style={{ marginTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT, paddingVertical: SPACING.space_12 }}
      >
        <View style={styles.boxAvatar}>
          <View style={styles.wrapperImage}>
            {loadingAuth ? (
              <ActivityIndicator />
            ) : (
              <Image
                style={styles.image}
                source={
                  currentUser?.image_path
                    ? { uri: apiConfig.imageURL(currentUser.image_path) }
                    : IMAGES.AVATAR
                }
              />
            )}
          </View>
          <TouchableOpacity style={{ padding: SPACING.space_12 }} onPress={showOptions}>
            <Text style={[styles.textMain, { color: COLORS.Primary }]}>Edit avatar</Text>
          </TouchableOpacity>
        </View>
        <Item
          title="Name"
          desc={currentUser?.name}
          func={() => navigation.navigate("UpdateItem", { type: "name" })}
        />
        <Item
          title="Email"
          desc={currentUser?.email}
          func={() => navigation.navigate("UpdateItem", { type: "email" })}
        />
        <Item
          title="Gender"
          desc={currentUser?.gender}
          func={() => navigation.navigate("UpdateItem", { type: "gender" })}
        />
        <Item
          title="Password"
          func={() => navigation.navigate("UpdateItem", { type: "password" })}
        />
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const Item = ({ title, desc, func }: { title: string; desc?: string; func: () => void }) => {
  return (
    <TouchableOpacity onPress={() => func()}>
      <View style={styles.box}>
        <View style={styles.boxLeft}>
          <View style={styles.title}>
            <Text numberOfLines={1} style={[styles.textMain]}>
              {title}
            </Text>
          </View>
          <View style={styles.desc}>
            <Text
              numberOfLines={1}
              style={[styles.textEtra, !desc && { color: COLORS.WhiteRGBA32 }]}
            >
              {(desc && desc) || title}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          {/* <FontAwesomeIcon icon={faAngleRight} size={20} style={{ color: COLORS.White2 }} /> */}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

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
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_8,
    backgroundColor: COLORS.Black2,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White1,
  },
  textEtra: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White1,
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
  boxAvatar: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperImage: {
    width: 120,
    height: 120,
    overflow: "hidden",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.Black2,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  box: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    paddingHorizontal: SPACING.space_12,
    marginBottom: SPACING.space_4,
  },
  boxLeft: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.space_16,
    marginRight: SPACING.space_12,
  },
  title: {
    width: 80,
  },
  desc: {
    flex: 1,
    borderBottomColor: COLORS.WhiteRGBA15,
    borderBottomWidth: 0.6,
    paddingVertical: SPACING.space_14,
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
