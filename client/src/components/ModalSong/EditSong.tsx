import ButtonSwitch from "@/components/ButtonSwitch";
import { IMAGES } from "@/constants";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "@/theme/theme";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Constants from "expo-constants";
import * as React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
const statusBarHeight = Constants.statusBarHeight;
import * as ImagePicker from "expo-image-picker";
import { imageApi, mp3Api, songApi, userApi } from "@/apis";
import { useAuth } from "@/context/AuthContext";
import * as FileSystem from "expo-file-system";
import moment from "moment";
import { useToast } from "@/context/ToastContext";
import * as DocumentPicker from "expo-document-picker";
import { TSong } from "@/types";
import { apiConfig } from "@/configs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAudio } from "@/context/AudioContext";
import { NavigationProp } from "@/navigators/TStack";
import { useNavigation } from "@react-navigation/native";

interface EditSongProps {
  song: TSong;
  setIsOpen: (value: boolean) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const EditSong = ({ song, setIsOpen }: EditSongProps) => {
  const textInputRef = React.useRef<TextInput>();
  const [name, setName] = React.useState<string>(song?.title);
  const [isPrivate, setIsPrivate] = React.useState<boolean>(song?.public === 1 ? false : true);
  const [fileImage, setFileImage] = React.useState<any>("");
  const [fileMp3, setFileMp3] = React.useState<any>("");
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [fileImageDefault, setFileImageDefault] = React.useState<any>("");
  const [fileMp3Default, setFileMp3Default] = React.useState<any>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const { currentUser } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const { clearQueue, songIdPlaying } = useAudio();

  const queryClient = useQueryClient();

  const { setToastMessage } = useToast();
  const { token } = useAuth();

  React.useEffect(() => {
    textInputRef.current?.focus();
  }, []);

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

      const info: any = await FileSystem.getInfoAsync(result.assets[0].uri);

      if (info?.size > MAX_FILE_SIZE) {
        setToastMessage("The selected file is too large. Please select a file smaller than 5MB.");
        // Alert.alert("The selected file is too large. Please select a file smaller than 5MB.");
        return;
      }

      setFileImage(file);

      setFileImage(file);
      // mutationSaveImage.mutate();
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
        type: "image/jpeg",
        name: "photo.jpg",
      };
      const info: any = await FileSystem.getInfoAsync(result.assets[0].uri);

      if (info?.size > MAX_FILE_SIZE) {
        setToastMessage("The selected file is too large. Please select a file smaller than 5MB.");
        // Alert.alert("The selected file is too large. Please select a file smaller than 5MB.");
        return;
      }

      setFileImage(file);
      // mutationSaveImage.mutate();
    }
  };

  const showOptionPhoto = () => {
    setFileImage(null);
    setFileImageDefault(null);
    Alert.alert(
      "Select Image",
      "Do you want to choose an image from the library or take a new photo?",
      Platform.OS === "ios"
        ? [
            { text: "Take Photo", onPress: takePhoto },
            { text: "Choose from Library", onPress: pickImageFromLibrary },
            { text: "Cancel", onPress: () => console.log("Cancel") },
          ]
        : [
            { text: "Cancel", onPress: () => console.log("Cancel") },
            { text: "Choose from Library", onPress: pickImageFromLibrary },
            { text: "Take Photo", onPress: takePhoto },
          ],
      { cancelable: true }
    );
  };

  const pickDocument = async () => {
    setFileMp3(null);
    setFileMp3Default(null);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
      });

      console.log(result);
      if (!result.canceled) {
        const file = {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name: result.assets[0].name,
        };

        const info: any = await FileSystem.getInfoAsync(result.assets[0].uri);

        if (info.size > 4 * 1024 * 1024) {
          setToastMessage("The selected file is too large. Please select a file smaller than 4MB.");
          return;
        }

        setFileMp3(file);
      }
    } catch (error) {
      setToastMessage("Error while selecting file");
      console.log("Error while selecting file: ", error);
    }
  };

  React.useEffect(() => {
    if (song?.image_path)
      setFileImageDefault({
        uri: song?.image_path,
        image_path: song?.image_path,
        type: "image/jpeg",
        name: song?.image_path,
      });
    if (song?.song_path)
      setFileMp3Default({ uri: song?.song_path, type: "audio/mpeg", name: song?.song_path });
  }, [song]);

  React.useEffect(() => {
    if (name.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [fileImage, fileMp3, name, isPrivate]);

  const handleSave = async () => {
    try {
      if (loading) return;
      setLoading(true);
      let resImage;
      if (fileImage) {
        const formDataImg = new FormData();
        formDataImg.append("image", fileImage);

        resImage = await imageApi.upload(formDataImg, token);
      }

      let resMp3;
      if (fileMp3) {
        const formDataMp3 = new FormData();
        formDataMp3.append("mp3", fileMp3);
        resMp3 = await mp3Api.upload(formDataMp3, token);
      }
      const res = await songApi.updateSong(token, song?.id, {
        title: name,
        image_path: resImage?.image || fileImageDefault?.uri,
        song_path: resMp3?.mp3 || fileMp3Default?.uri,
        public: isPrivate ? 0 : 1,
      });

      res && setToastMessage("Successfully update song");
      setIsOpen(false);
      setName("");
      setFileImage(null);
      setFileMp3(null);
      setIsPrivate(false);
      setFileImageDefault(null);
      setFileMp3Default(null);
      setLoading(false);
      songIdPlaying === song?.id && clearQueue();
    } catch (error) {
      setToastMessage("Error while uploading file"); // Thông báo lỗi
      console.error("Lỗi khi tải ảnh lên server:", error.response.data);
    }
    setLoading(false);
  };

  const mutationSave = useMutation({
    mutationFn: handleSave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["song", song?.id] });
      queryClient.invalidateQueries({
        queryKey: ["song", song?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs", currentUser?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs-artist", currentUser?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs-favorites", currentUser?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["favorites-songs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["count-songs-favorites"],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs-new"],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs-popular"],
      });
      setIsOpen(false);
      navigation.navigate("Song", { songId: song?.id });
    },
  });

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <SafeAreaView style={{ zIndex: 999 }}>
        <View style={[styles.header]}>
          <TouchableOpacity style={{}} onPress={() => setIsOpen(false)}>
            <FontAwesomeIcon
              icon={faXmark}
              size={20}
              color={COLORS.White1}
              style={{ opacity: 0 }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={[styles.textMain]}>Edit song</Text>
          </View>
          <TouchableOpacity disabled={disabled} onPress={() => mutationSave.mutate()}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={[styles.textEtra, { color: COLORS.Primary }]}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        keyboardShouldPersistTaps="always"
        style={[styles.body, { gap: SPACING.space_28 }]}
      >
        <View style={styles.inputBox}>
          <Text style={styles.textMain}>Name song</Text>
          <BottomSheetTextInput
            ref={textInputRef}
            defaultValue={song?.title}
            value={name}
            style={styles.textInput}
            onChangeText={(text) => {
              name.length < 255 && setName(text);
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: SPACING.space_16,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.textMain}>Private</Text>
          </View>
          <ButtonSwitch isOn={isPrivate} setIsOn={setIsPrivate} />
        </View>

        <View>
          <View style={styles.boxUpload}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textMain}>Cover image</Text>
              <Text style={styles.textEtra}>Allow uploading cover images for songs</Text>
            </View>
            <TouchableOpacity style={styles.buttonUpload} onPress={showOptionPhoto}>
              <FontAwesomeIcon icon={faUpload} size={14} color={COLORS.White} />
              <Text style={styles.textButton}>Upload file</Text>
            </TouchableOpacity>
          </View>

          {fileImage && <ItemFile file={fileImage} setFile={setFileImage} />}
          {fileImageDefault && <ItemFile file={fileImageDefault} setFile={setFileImageDefault} />}
        </View>

        <View>
          <View>
            <View style={styles.boxUpload}>
              <View style={{ flex: 1 }}>
                <Text style={styles.textMain}>Music file</Text>
                <Text style={styles.textEtra}>Accepts mp3 music files</Text>
              </View>
              <TouchableOpacity style={styles.buttonUpload} onPress={pickDocument}>
                <FontAwesomeIcon icon={faUpload} size={14} color={COLORS.White} />
                <Text style={styles.textButton}>Upload file</Text>
              </TouchableOpacity>
            </View>
          </View>
          {fileMp3 && <ItemFile file={fileMp3} setFile={setFileMp3} />}
          {fileMp3Default && <ItemFile file={fileMp3Default} setFile={setFileMp3Default} />}
        </View>
      </ScrollView>
      {/* <View style={{ position: "absolute", bottom: 20, width: "100%", alignItems: "center" }}>
        <TouchableOpacity
          style={[styles.button, disabled && { opacity: 0.8 }]}
          disabled={disabled}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Add Song</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default EditSong;

const ItemFile = ({ file, setFile }: { file?: any; setFile: (value: any) => void }) => {
  const [fileInfo, setFileInfo] = React.useState(null);

  React.useEffect(() => {
    // Lấy thông tin tập tin
    const getInfo = async () => {
      const info = await FileSystem.getInfoAsync(file?.uri);
      setFileInfo(info);
    };
    file?.uri && getInfo();
  }, [file]);

  const formatBytesToMB = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2); // Chuyển đổi sang MB và làm tròn đến 2 chữ số thập phân
  };

  return (
    <View
      style={{
        paddingVertical: SPACING.space_8,
        paddingHorizontal: SPACING.space_8,
        borderRadius: BORDERRADIUS.radius_8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.BlackRGB32,
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: BORDERRADIUS.radius_4,
          overflow: "hidden",
        }}
      >
        <Image
          style={{ width: "100%", height: "100%" }}
          source={
            file?.type == "audio/mpeg"
              ? IMAGES.SONG
              : file?.image_path
              ? { uri: apiConfig.imageURL(file?.image_path) }
              : { uri: file?.uri }
          }
        />
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          flex: 1,
          paddingHorizontal: SPACING.space_8,
        }}
      >
        <Text style={styles.textMain} numberOfLines={2}>
          {file?.name}
        </Text>
        {fileInfo?.size && (
          <Text style={styles.textEtra}>{formatBytesToMB(fileInfo?.size)} MB</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => setFile(null)}
        style={{
          padding: SPACING.space_8,
          backgroundColor: COLORS.WhiteRGBA32,
          borderRadius: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} color={COLORS.White} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: SPACING.space_8,
    flex: 1,
    height: "100%",
    backgroundColor: COLORS.Black1,
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
  textButton: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White,
  },
  header: {
    paddingVertical: SPACING.space_18,
    paddingHorizontal: SPACING.space_14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.Black2,
  },
  body: {
    flexDirection: "column",
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_12,
    gap: SPACING.space_14,
    flex: 1,
    height: "100%",
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
  boxUpload: {
    paddingVertical: SPACING.space_16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  button: {
    width: 160,
    height: 46,
    backgroundColor: COLORS.Primary,
    borderRadius: BORDERRADIUS.radius_25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  buttonUpload: {
    flexDirection: "row",
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_14,
    backgroundColor: COLORS.WhiteRGBA32,
    borderRadius: BORDERRADIUS.radius_20,
    gap: SPACING.space_8,
  },
});
