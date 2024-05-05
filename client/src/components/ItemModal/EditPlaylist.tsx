import {
  faBars,
  faCheckCircle,
  faMagnifyingGlass,
  faMinusCircle,
  faPlusCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  Image,
  Keyboard,
  Animated,
  Alert,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { BottomSheetTextInput, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import ButtonSwitch from "../ButtonSwitch/ButtonSwitch";
import { TPlaylist, TSong } from "../../types";
import { IMAGES } from "../../constants";
import Constants from "expo-constants";
import { useQuery } from "@tanstack/react-query";
import { imageApi, songApi } from "../../apis";
import { apiConfig } from "../../configs";
const statusBarHeight = Constants.statusBarHeight;
import * as ImagePicker from "expo-image-picker";

import { useAuth } from "../../context/AuthContext";
import axios from "axios";

interface EditPlaylistProps {
  setIsOpen: (boolean) => void;
  playlist: TPlaylist;
}

const EditPlaylist = ({ setIsOpen, playlist }: EditPlaylistProps) => {
  const [name, setName] = React.useState<string>(playlist.title);
  const [file, setFile] = React.useState<any>("");
  const [isPrivate, setIsPrivate] = React.useState<boolean>(playlist.public === 1 ? false : true);
  const { token } = useAuth();

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const { data: songs } = useQuery({
    queryKey: ["songs", playlist.id],
    queryFn: async () => {
      const res = await songApi.getAllByPlaylistId(token, playlist.id, 1, 50);
      return res.data;
    },
  });

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

  const handleSave = async () => {
    const formData = new FormData();

    if (!file) return;

    console.log(file);

    formData.append("image", file);
    try {
      const res = await imageApi.upload(formData, token);
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ zIndex: 999 }}>
        <View style={[styles.header]}>
          <TouchableOpacity style={[styles.buttonClose]} onPress={() => handleCloseModal()}>
            <FontAwesomeIcon icon={faXmark} size={20} color={COLORS.White1} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={[styles.textMain]}>Edit playlist</Text>
          </View>
          <TouchableOpacity onPress={handleSave}>
            <Text style={[styles.textExtra, { color: COLORS.Primary }]}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <FlatList
        data={songs}
        style={styles.body}
        contentContainerStyle={{
          paddingBottom: SPACING.space_20,
        }}
        ListHeaderComponent={
          <View style={styles.headerBody}>
            <View style={styles.imageBox}>
              <TouchableOpacity style={styles.imageBoxWrapper}>
                <Image
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  source={file ? { uri: file.uri } : IMAGES.PLAYLIST}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonChange} onPress={showOptions}>
                <Text style={[styles.textExtra, { color: COLORS.Primary }]}>Change image</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.textExtra}>Name playlist</Text>
              <BottomSheetTextInput
                // ref={textInputRef}
                value={name}
                style={styles.textInput}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.textMain}>Private</Text>
              </View>
              <ButtonSwitch isOn={isPrivate} setIsOn={setIsPrivate} />
            </View>
          </View>
        }
        renderItem={({ item, index }) => <SongItem song={item} />}
      />
    </View>
  );
};

function MovableSong({ song, id, positions }: { song: TSong; id: string; positions: object }) {
  // const gestureHandler = useAnimatedGestureHandler({
  //   onStart() {},
  //   onActive() {},
  //   onFinish() {},
  // });

  console.log(positions);

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        // top: positions[id] * SONG_HEIGHT,
      }}
    >
      <SongItem song={song} />
    </View>
  );
}

type TSongItem = {
  song: TSong;
};

const SongItem = (props: TSongItem) => {
  const { song } = props;
  const [openModal, setOpenModal] = React.useState(false);

  const [isDeleted, setIsDeleted] = React.useState(false);
  const fadeAnim = new Animated.Value(1);
  const slideAnim = new Animated.Value(1);

  const handleDelete = () => {
    // Kích hoạt hiệu ứng mờ dần và di chuyển khi xóa
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300, // Thời gian mờ dần
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100, // Di chuyển sang trái 100px
        duration: 300, // Thời gian di chuyển
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsDeleted(true); // Đánh dấu là đã xóa
    });
  };

  return (
    <Animated.View
      style={{ opacity: isDeleted ? 0 : fadeAnim, transform: [{ translateX: slideAnim }] }}
    >
      {!isDeleted && (
        <View style={[styles.card, styles.cardDelete]} onTouchStart={Keyboard.dismiss}>
          <View style={styles.cardLeft}>
            <TouchableOpacity style={styles.cardIcon} onPress={() => handleDelete()}>
              <FontAwesomeIcon icon={faMinusCircle} size={24} color={COLORS.WhiteRGBA32} />
            </TouchableOpacity>
          </View>
          <View style={styles.cardCenter}>
            <TouchableOpacity style={styles.cardImage}>
              <Image
                source={
                  song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG
                }
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.cardBody}>
              <View>
                <Text numberOfLines={1} style={styles.textMain}>
                  {song.title}
                </Text>
                <Text numberOfLines={1} style={styles.textExtra}>
                  {song.author}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardRight}>
            <TouchableOpacity style={styles.cardIcon}>
              <FontAwesomeIcon icon={faBars} size={24} color={COLORS.WhiteRGBA32} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Animated.View>
  );
};
export default EditPlaylist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  header: {
    paddingVertical: SPACING.space_18,
    paddingHorizontal: SPACING.space_14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.Black2,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  buttonClose: {},
  body: {
    paddingVertical: SPACING.space_12,
  },
  headerBody: {
    paddingHorizontal: SPACING.space_12,
    flexDirection: "column",
    marginBottom: SPACING.space_14,
  },
  imageBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBoxWrapper: {
    width: 140,
    height: 140,
    borderRadius: BORDERRADIUS.radius_8,
    overflow: "hidden",
  },
  buttonChange: {
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_16,
  },
  inputBox: {
    width: "100%",
    flexDirection: "column",
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_12,
  },
  textInput: {
    width: "100%",
    borderBottomColor: COLORS.WhiteRGBA15,
    borderBottomWidth: 0.6,
    paddingVertical: SPACING.space_8,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.regular,
  },
  card: {
    flexDirection: "row",
    gap: SPACING.space_8,
    width: "100%",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_4,
    alignItems: "center",
  },
  cardDelete: {
    // transform: [{ translateX: WINDOW_WIDTH }],
  },
  cardLeft: {},
  cardCenter: {
    flex: 1,
    flexDirection: "row",
    gap: SPACING.space_8,
    alignItems: "center",
  },
  cardRight: {},
  cardImage: {
    width: 60,
    height: 60,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: BORDERRADIUS.radius_8,
  },
  cardBody: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardIcon: {
    padding: SPACING.space_8,
  },
});
