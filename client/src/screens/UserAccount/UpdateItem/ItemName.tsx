import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import { NavigationProp, RootRouteProps } from "@/navigators/TStack";
import { Platform } from "react-native";
import styles from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { COLORS, FONTSIZE, HEIGHT, SPACING } from "@/theme/theme";
import Constants from "expo-constants";
import { userApi } from "@/apis";
import { useAuth } from "@/context/AuthContext";
import CustomModal from "@/components/CustomModal";
import { useToast } from "@/context/ToastContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const statusBarHeight = Constants.statusBarHeight;

interface ItemNameProps {}

const ItemName = (props: ItemNameProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [openModal, setOpenModal] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const [value, setValue] = React.useState<string>("");
  const { token, currentUser } = useAuth();
  const { setToastMessage } = useToast();
  const route = useRoute<RootRouteProps<"UpdateItem">>();
  const params = route.params;
  const queryClient = useQueryClient();

  React.useEffect(() => {
    setName(currentUser.name);
    setValue(currentUser.name);
  }, [currentUser]);

  const handleOpenModal = () => {
    if (value.trim().length > 255) {
      return setToastMessage("Name must not exceed 255 characters !");
    }
    if (value.trim().length < 5) {
      return setToastMessage("Name must not be less than 5 characters !");
    }

    setOpenModal(!openModal);
  };

  const mutationSave = useMutation({
    mutationFn: async () => {
      return await userApi.update(token, {
        name: value,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setToastMessage("Updated successfully !");
      navigation.goBack();
    },
  });

  return (
    <>
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

            <Text style={[styles.titleHeader]}>Name</Text>

            <TouchableOpacity
              disabled={value.trim() === name.trim()}
              style={[styles.buttonHeader, value.trim() == name.trim() && { opacity: 0.6 }]}
              onPress={() => handleOpenModal()}
            >
              <Text style={[styles.textSave]}>Save</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={[styles.body, { marginTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT }]}>
          <Text style={styles.textMain}>Name</Text>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.textInput}
              value={value}
              onChangeText={(text) => setValue(text)}
            />
            <TouchableOpacity style={styles.buttonClear} onPress={() => setValue("")}>
              <FontAwesomeIcon icon={faXmark} size={14} color={COLORS.Black2} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.textEtra, { marginTop: SPACING.space_12 }]}>asdasd</Text>
        </View>
      </View>
      <CustomModal
        withInput={true}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        header={"Update info"}
        modalFunction={() => mutationSave.mutate()}
      >
        <Text style={{ color: COLORS.White1, fontSize: FONTSIZE.size_16 }}>
          Are you sure you want to change your name?
        </Text>
        <TextInput />
      </CustomModal>
    </>
  );
};

export default ItemName;
