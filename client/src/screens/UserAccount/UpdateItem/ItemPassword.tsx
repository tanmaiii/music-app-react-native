import { authApi } from "@/apis";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { NavigationProp } from "@/navigators/TStack";
import { COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "@/theme/theme";
import {
  faChevronLeft,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as React from "react";
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import styles from "./style";
const statusBarHeight = Constants.statusBarHeight;

interface ItemNameProps {}

const ItemPassowrd = (props: ItemNameProps) => {
  const navigation = useNavigation<NavigationProp>();
  const { token } = useAuth();
  const { setToastMessage } = useToast();
  const [loading, setLoading] = React.useState<boolean>(false);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,30}$/;

  const [stateOldPass, setStateOldPass] = React.useState<{
    value: string;
    err: string;
    view: boolean;
  }>({
    value: "",
    err: "",
    view: false,
  });

  const [stateNewPass, setStateNewPass] = React.useState<{
    value: string;
    err: string;
    view: boolean;
  }>({
    value: "",
    err: "",
    view: false,
  });

  const [stateReNewPass, setStateReNewPass] = React.useState<{
    value: string;
    err: string;
    view: boolean;
  }>({
    value: "",
    err: "",
    view: false,
  });

  const handleChangeOldPass = (text: string) => {
    setStateOldPass((prevState) => ({
      ...prevState,
      value: text.trim(),
    }));
  };

  const handleChangeNewPass = (text: string) => {
    setStateNewPass((prevState) => ({
      ...prevState,
      value: text.trim(),
    }));
  };

  const handleChangeReNewPass = (text: string) => {
    setStateReNewPass((prevState) => ({
      ...prevState,
      value: text.trim(),
    }));
  };

  const checkOldPassword = () => {
    // if (stateOldPass.value.length < 1)
    //   return setStateOldPass((prevState) => ({
    //     ...prevState,
    //     err: `Password not null.`,
    //   }));

    setStateOldPass((prevState) => ({
      ...prevState,
      err: "",
    }));
  };

  const checkNewPassword = () => {
    // if (stateNewPass.value.length < 1) {
    //   setStateNewPass((prevState) => ({
    //     ...prevState,
    //     err: `New password not null.`,
    //   }));
    // } else
    if (stateNewPass.value === stateOldPass.value) {
      setStateNewPass((prevState) => ({
        ...prevState,
        err: `The new password cannot be the same as the old password`,
      }));
    } else if (!passwordRegex.test(stateNewPass.value)) {
      setStateNewPass((prevState) => ({
        ...prevState,
        err: `Your password must have a minimum of 6 characters and include numbers, letters and special characters (!$@%)`,
      }));
    } else {
      setStateNewPass((prevState) => ({
        ...prevState,
        err: "",
      }));
    }
  };

  const checkReNewPassword = () => {
    if (stateReNewPass.value !== stateNewPass.value)
      return setStateReNewPass((prevState) => ({
        ...prevState,
        err: "Re passsword not match !",
      }));

    setStateReNewPass((prevState) => ({
      ...prevState,
      err: "",
    }));
  };

  const handleSubmit = async () => {
    if (stateNewPass.err !== "" || stateReNewPass.err !== "" || stateNewPass.err !== "") return;
    if (stateOldPass.value === "")
      return setStateOldPass((prevState) => ({
        ...prevState,
        err: `Password not null.`,
      }));

    if (stateNewPass.value === "")
      return setStateNewPass((prevState) => ({
        ...prevState,
        err: `Password not null.`,
      }));

    if (stateReNewPass.value === "")
      return setStateReNewPass((prevState) => ({
        ...prevState,
        err: `Password not null.`,
      }));
    setLoading(true);
    try {
      await authApi.changePassword(token, stateNewPass.value, stateOldPass.value);
      setToastMessage("Change password successfully !");
      navigation.goBack();
      setLoading(false);
    } catch (error) {
      setStateOldPass((prevState) => ({
        ...prevState,
        err: error.response.data.conflictError,
      }));
    }
    setLoading(false);
  };

  React.useEffect(() => {
    stateOldPass.value.length > 0 && checkOldPassword();
    stateNewPass.value.length > 0 && checkNewPassword();
    stateReNewPass.value.length > 0 && checkReNewPassword();
  }, [stateOldPass.value, stateNewPass.value, stateReNewPass.value]);

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
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

          <Text style={[styles.titleHeader]}>Change Password</Text>

          <TouchableOpacity style={[styles.buttonHeader]}></TouchableOpacity>
        </View>
      </SafeAreaView>
      <View
        style={[
          styles.body,
          { marginTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT, gap: SPACING.space_8 },
        ]}
      >
        <Text style={styles.textMain}>Old Password</Text>

        <View style={{ gap: SPACING.space_8 }}>
          <View style={styles.boxInput}>
            <TextInputDebounce
              placeholder="Enter old password"
              onSubmit={(text) => handleChangeOldPass(text)}
              styles={styles.textInput}
              password={stateOldPass.view ? false : true}
            />

            <TouchableOpacity
              style={styles.buttonEyePassword}
              onPress={() =>
                setStateOldPass((prevState) => ({
                  ...prevState,
                  view: !stateOldPass.view,
                }))
              }
            >
              {stateOldPass.view ? (
                <FontAwesomeIcon icon={faEyeSlash} size={22} color={COLORS.WhiteRGBA32} />
              ) : (
                <FontAwesomeIcon icon={faEye} size={20} color={COLORS.WhiteRGBA32} />
              )}
            </TouchableOpacity>
          </View>
          {stateOldPass.err && <Text style={styles.textError}>{stateOldPass.err}</Text>}
        </View>

        <Text style={styles.textMain}>New Password</Text>

        <View style={{ gap: SPACING.space_8 }}>
          <View style={[styles.boxInput]}>
            <TextInputDebounce
              placeholder="Enter new password"
              onSubmit={(text) => handleChangeNewPass(text)}
              styles={styles.textInput}
              password={stateNewPass.view ? false : true}
            />
            <TouchableOpacity
              style={styles.buttonEyePassword}
              onPress={() =>
                setStateNewPass((prevState) => ({
                  ...prevState,
                  view: !stateNewPass.view,
                }))
              }
            >
              {stateNewPass.view ? (
                <FontAwesomeIcon icon={faEyeSlash} size={22} color={COLORS.WhiteRGBA32} />
              ) : (
                <FontAwesomeIcon icon={faEye} size={20} color={COLORS.WhiteRGBA32} />
              )}
            </TouchableOpacity>
          </View>
          {stateNewPass.err && <Text style={styles.textError}>{stateNewPass.err}</Text>}
        </View>
        <View style={{ gap: SPACING.space_8 }}>
          <View style={styles.boxInput}>
            <TextInputDebounce
              placeholder="Enter re new password"
              onSubmit={(text) => handleChangeReNewPass(text)}
              styles={styles.textInput}
              password={stateReNewPass.view ? false : true}
            />
            <TouchableOpacity
              style={styles.buttonEyePassword}
              onPress={() =>
                setStateReNewPass((prevState) => ({
                  ...prevState,
                  view: !stateReNewPass.view,
                }))
              }
            >
              {stateReNewPass.view ? (
                <FontAwesomeIcon icon={faEyeSlash} size={22} color={COLORS.WhiteRGBA32} />
              ) : (
                <FontAwesomeIcon icon={faEye} size={20} color={COLORS.WhiteRGBA32} />
              )}
            </TouchableOpacity>
          </View>
          {stateReNewPass.err && <Text style={styles.textError}>{stateReNewPass.err}</Text>}
        </View>
        <View>
          <Text style={styles.textEtra}>
            Your password must have a minimum of 6 characters and include numbers, letters and
            special characters (!$@%).
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            marginTop: SPACING.space_12,
            paddingHorizontal: SPACING.space_16,
            paddingVertical: SPACING.space_20,
            backgroundColor: COLORS.Primary,
            borderRadius: 28,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={{
                color: COLORS.White1,
                fontSize: FONTSIZE.size_16,
                fontFamily: FONTFAMILY.regular,
              }}
            >
              Change passsword
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TextInputDebounce = ({
  onSubmit,
  styles,
  placeholder,
  password,
}: {
  onSubmit: (string) => void;
  styles: any;
  placeholder: string;
  password: boolean;
}) => {
  const textInputRef = React.useRef<TextInput>(null);
  const [keyword, setKeyword] = React.useState<string>("");
  const typingTimeoutRef = React.useRef(null);

  function handleOnChange(text) {
    setKeyword(text);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSubmit(text);
    }, 300);
  }

  return (
    <TextInput
      secureTextEntry={password ? true : false}
      style={styles}
      ref={textInputRef}
      placeholder={placeholder}
      placeholderTextColor={COLORS.WhiteRGBA32}
      onChangeText={(text) => handleOnChange(text)}
    />
  );
};

export default ItemPassowrd;
