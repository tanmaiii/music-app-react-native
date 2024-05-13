import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import { NavigationProp, RootRouteProps } from "../../../navigators/TStack";
import { Platform } from "react-native";
import styles from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { COLORS, FONTSIZE, HEIGHT, SPACING } from "../../../theme/theme";
import Constants from "expo-constants";
import Checkbox from "../../../components/Checkbox";
import { userApi } from "../../../apis";
import { useAuth } from "../../../context/AuthContext";
import CustomModal from "../../../components/CustomModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../context/ToastContext";
const statusBarHeight = Constants.statusBarHeight;

const ItemGender = () => {
  const { setToastMessage } = useToast();
  const { token, currentUser } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  const route = useRoute<RootRouteProps<"UpdateItem">>();
  const [selected, setSelected] = React.useState("");
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const dataGender = ["Male", "Female", ""];

  React.useEffect(() => {
    setSelected(currentUser.gender ? currentUser.gender : "");
  }, [currentUser]);

  const updateUser = async () => {
    try {
      await userApi.update(token, {
        gender: selected,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const mutationSave = useMutation({
    mutationFn: updateUser,
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

            <Text style={[styles.titleHeader]}>Gender</Text>

            <TouchableOpacity
              style={[styles.buttonHeader, currentUser?.gender == selected && { opacity: 0.6 }]}
              disabled={currentUser.gender === selected}
              onPress={() => setOpenModal(!openModal)}
            >
              <Text style={[styles.textSave]}>Save</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={[styles.body, { marginTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT }]}>
          <Text style={styles.textMain}>Gender</Text>
          {dataGender.map((item) => (
            <TouchableOpacity style={styles.boxOption} onPress={() => setSelected(item)}>
              <Text style={styles.textOption}>{item === "" ? "Undisclosed" : item}</Text>
              <Checkbox isChecked={item === selected} onFunc={() => setSelected(item)} />
            </TouchableOpacity>
          ))}
          <Text style={[styles.textEtra, { marginTop: SPACING.space_12 }]}>Gender</Text>
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
          Are you sure you want to change gender?
        </Text>
        <TextInput />
      </CustomModal>
    </>
  );
};

export default ItemGender;
