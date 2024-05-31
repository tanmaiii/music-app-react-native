import { faBars, faMinusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import {
  Alert,
  Animated,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { imageApi, playlistApi, songApi } from "@/apis";
import { apiConfig } from "@/configs";
import { IMAGES } from "@/constants";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "@/theme/theme";
import { TPlaylist, TSong } from "@/types";
import ButtonSwitch from "../ButtonSwitch";

import DraggableFlatList, {
  OpacityDecorator,
  RenderItemParams,
  ScaleDecorator,
  ShadowDecorator,
} from "react-native-draggable-flatlist";

import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

interface EditPlaylistProps {
  setIsOpen: (boolean) => void;
  playlist: TPlaylist;
}

const EditPlaylist = ({ setIsOpen, playlist }: EditPlaylistProps) => {
  const { setToastMessage } = useToast();
  const [file, setFile] = React.useState<any>("");
  const [songsNew, setSongsNew] = React.useState<{ id: string; num_song: number }[]>([]);
  const [isPrivate, setIsPrivate] = React.useState<boolean>(playlist.public === 1 ? false : true);
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [newPlaylist, setNewPlaylist] = React.useState<TPlaylist>({
    title: playlist.title,
    public: playlist.public,
  });

  const updatePlaylist = (newValue: Partial<TPlaylist>) => {
    setNewPlaylist((prevState) => ({
      ...prevState,
      ...newValue,
    }));
    console.log(newPlaylist);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const { data: songs } = useQuery({
    queryKey: ["songs", playlist.id],
    queryFn: async () => {
      const res = await songApi.getAllByPlaylistId(token, playlist.id, 1, 50);
      res.data.map((item) => {
        setSongsNew((prev) => [...prev, { id: item.id, num_song: item.num_song }]);
      });
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
        type: "image/jpeg",
        name: "photo.jpg",
      };
      setFile(file);
    }
  };

  const showOptions = () => {
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

  const handleSave = async () => {
    const formData = new FormData();
    try {
      if (file) {
        formData.append("image", file);
        const res = await imageApi.upload(formData, token);
        if (res.image) {
          await playlistApi.updatePlaylist(token, playlist.id, { image_path: res.image });
        } else {
          setToastMessage("Update image unsuccessful");
        }
      }

      await playlistApi.updatePlaylist(token, playlist.id, newPlaylist);
      await playlistApi.updateSong(token, playlist.id, songsNew);
      setToastMessage("Update playlist successfully");
      setIsOpen(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const mutation = useMutation({
    mutationFn: handleSave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlist", playlist.id] });
      queryClient.invalidateQueries({ queryKey: ["playlist-songs", playlist.id] });
    },
  });

  React.useEffect(() => {
    updatePlaylist({ public: isPrivate ? 0 : 1 });
  }, [isPrivate]);

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<{ id: string; num_song: number }>) => {
    return (
      <ScaleDecorator>
        <OpacityDecorator>
          <ShadowDecorator>
            <Animated.View>
              <TouchableOpacity
                onLongPress={drag}
                activeOpacity={1}
                style={[{ elevation: isActive ? 30 : 0 }]}
              >
                <SongItem setSongsNew={setSongsNew} songsNew={songsNew} songId={item?.id} />
              </TouchableOpacity>
            </Animated.View>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
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
          <TouchableOpacity onPress={() => mutation.mutate()}>
            <Text style={[styles.textExtra, { color: COLORS.Primary }]}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={songsNew}
          contentContainerStyle={{
            paddingVertical: SPACING.space_20,
          }}
          ListHeaderComponent={
            <View style={styles.headerBody}>
              <View style={styles.imageBox}>
                <TouchableOpacity style={styles.imageBoxWrapper}>
                  <Image
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    source={
                      file
                        ? { uri: file.uri }
                        : playlist?.image_path
                        ? { uri: apiConfig.imageURL(playlist.image_path) }
                        : IMAGES.PLAYLIST
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonChange} onPress={showOptions}>
                  <Text style={[styles.textExtra, { color: COLORS.Primary }]}>Change image</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.textExtra}>Name playlist</Text>
                <BottomSheetTextInput
                  defaultValue={playlist.title}
                  value={newPlaylist.title}
                  style={styles.textInput}
                  onChangeText={(text) => updatePlaylist({ title: text })}
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
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => {
            data.forEach((item, index) => {
              item.num_song = index + 1;
            });

            console.log(data);
            setSongsNew(data);
          }}
        />
      </View>

      {/* <FlatList
        data={songs}
        style={styles.body}
     
        ListHeaderComponent={
          <View style={styles.headerBody}>
            <View style={styles.imageBox}>
              <TouchableOpacity style={styles.imageBoxWrapper}>
                <Image
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  source={
                    file
                      ? { uri: file.uri }
                      : playlist?.image_path
                      ? { uri: apiConfig.imageURL(playlist.image_path) }
                      : IMAGES.PLAYLIST
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonChange} onPress={showOptions}>
                <Text style={[styles.textExtra, { color: COLORS.Primary }]}>Change image</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.textExtra}>Name playlist</Text>
              <BottomSheetTextInput
                defaultValue={playlist.title}
                value={newPlaylist.title}
                style={styles.textInput}
                onChangeText={(text) => updatePlaylist({ title: text })}
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
        renderItem={({ item, index }) => (
          <SongItem setSongsNew={setSongsNew} songsNew={songsNew} song={item} />
        )}
      /> */}
    </View>
  );
};

type TSongItem = {
  songId: string;
  setSongsNew?: (value: { id: string; num_song: number }[]) => void;
  songsNew?: { id: string; num_song: number }[];
};

const SongItem = (props: TSongItem) => {
  const { songId, setSongsNew, songsNew } = props;
  const [isDeleted, setIsDeleted] = React.useState(false);
  const { token } = useAuth();
  const [song, setSong] = React.useState<TSong>();
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

  React.useEffect(() => {
    if (isDeleted) {
      // Xóa phần tử khỏi danh sách
      setSongsNew(songsNew.filter((item) => item.id !== song.id));
      console.log(songsNew.filter((item) => item.id !== song.id));
    }
  }, [isDeleted]);

  React.useEffect(() => {
    const getSong = async () => {
      const res = await songApi.getDetail(songId, token);
      setSong(res);
    };
    getSong();
  }, [songId]);

  return (
    song && (
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
              <View style={styles.cardIcon}>
                <FontAwesomeIcon icon={faBars} size={24} color={COLORS.WhiteRGBA32} />
              </View>
            </View>
          </View>
        )}
      </Animated.View>
    )
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
    backgroundColor: COLORS.Black2,
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
