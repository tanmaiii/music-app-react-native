import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  Platform,
  Switch,
} from "react-native";
import { IMAGES } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { FlatList, ScrollView, TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { TSong } from "../../types";
import ButtonSwitch from "../ButtonSwitch/ButtonSwitch";
import Constants from "expo-constants";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { playlistApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigators/TStack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastMessage from "../ToastMessage";
import { useToast } from "../../context/ToastContext";
const statusBarHeight = Constants.statusBarHeight;

interface CreatePlaylistProps {
  closeModal?: () => void;
  setCreatePlaylist: (boolean) => void;
}

const CreatePlaylist = ({ setCreatePlaylist, closeModal }: CreatePlaylistProps) => {
  const [name, setName] = React.useState<string>("");
  const [isPrivate, setIsPrivate] = React.useState<boolean>(false);
  const textInputRef = React.useRef<TextInput>();
  const { token, currentUser } = useAuth();
  const { setToastMessage } = useToast();
  const queryClient = useQueryClient();

  const handleFunc = () => {
    setCreatePlaylist(false);
    textInputRef.current?.blur();
  };

  React.useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  const createPlaylist = async () => {
    try {
      const isPublic = isPrivate ? 0 : 1;
      await playlistApi.createPlaylist(token, name, isPublic);
      setCreatePlaylist(false);
      setToastMessage("Create playlist successfully");
    } catch (err) {
      console.log(err.response.data);
      setToastMessage(err.response.data.conflictError);
    }
  };

  const mutation = useMutation({
    mutationFn: createPlaylist,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["playlists", currentUser.id] });
      queryClient.invalidateQueries({ queryKey: ["all-favorites"] });
      queryClient.invalidateQueries({ queryKey: ["playlists-favorites"] });
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          Platform.OS === "ios" && { paddingTop: SPACING.space_12 + statusBarHeight },
        ]}
      >
        <TouchableOpacity onPress={() => handleFunc()}>
          <FontAwesomeIcon icon={faXmark} size={24} color={COLORS.White2} />
        </TouchableOpacity>
      </View>

      <ScrollView keyboardShouldPersistTaps="always" style={styles.body}>
        <View style={styles.inputBox}>
          <Text style={styles.textEtra}>Name playlist</Text>
          <BottomSheetTextInput
            ref={textInputRef}
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
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.textMain}>Private</Text>
          </View>
          <ButtonSwitch isOn={isPrivate} setIsOn={setIsPrivate} />
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 20, width: "100%", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => mutation.mutate()}
          style={[styles.button, name.length <= 0 && { opacity: 0.8 }]}
          disabled={name.length <= 0 && true}
        >
          <Text style={styles.buttonText}>Add Playlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePlaylist;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.space_8,
    flex: 1,
    height: "100%",
    backgroundColor: COLORS.Black2,
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
  header: {
    flexDirection: "row",
    padding: SPACING.space_12,
    // justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flexDirection: "column",
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_12,
    gap: SPACING.space_12,
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
});
