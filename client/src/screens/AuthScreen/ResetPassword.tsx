import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Keyboard,
  ImageBackground,
  Platform,
  TouchableHighlight,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import styles from "./style";
import { IMAGES } from "../../constants";
import { COLORS, FONTSIZE, SPACING } from "../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import {
  faChevronLeft,
  faCircleExclamation,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProp, RootRouteProps } from "../../navigators/TStack";
import { REGEX, WINDOW_HEIGHT } from "../../utils";
import Constants from "expo-constants";
import { authApi } from "../../apis";
import { useToast } from "../../context/ToastContext";
import { TStateAuth } from "../../types";
const statusBarHeight = Constants.statusBarHeight;

interface ResetPasswordProps {}

const ResetPassword = (props: ResetPasswordProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [err, setErr] = React.useState<string>("");
  const inputPasswordRef = React.useRef<TextInput>(null);
  const inputRePasswordRef = React.useRef<TextInput>(null);
  const { setToastMessage } = useToast();
  const route = useRoute<RootRouteProps<"ResetPassword">>();
  const token = route.params.token;

  const [statePassword, setStatePassword] = React.useState<TStateAuth>({
    value: "",
    err: "",
    loading: false,
    focus: false,
    view: false,
  });

  const [stateRePassword, setStateRePassword] = React.useState<TStateAuth>({
    value: "",
    err: "",
    loading: false,
    focus: false,
    view: false,
  });

  const updateStatePassword = (newValue: Partial<TStateAuth>) => {
    setStatePassword((prevState) => ({
      ...prevState,
      ...newValue,
    }));
  };

  const updateStateRePassword = (newValue: Partial<TStateAuth>) => {
    setStateRePassword((prevState) => ({
      ...prevState,
      ...newValue,
    }));
  };

  const validatePassword = () => {
    if (statePassword.value === "") {
      return updateStatePassword({ err: "Password cannot be empty" });
    } else if (statePassword.value.length < 6) {
      return updateStatePassword({ err: "Password must have at least 6 characters" });
    } else if (statePassword.value.length > 30) {
      return updateStatePassword({ err: "Password must not exceed 30 characters" });
    } else if (!REGEX.password.test(statePassword.value)) {
      return updateStatePassword({
        err: "At least one lowercase letter, uppercase letter, number, special character",
      });
    }
    updateStatePassword({ err: "" });
  };

  const validateRePassword = () => {
    if (stateRePassword.value !== statePassword.value)
      return updateStateRePassword({ err: "Re passsword not match !" });
    updateStateRePassword({ err: "" });
  };

  const handleSubmit = async () => {
    setErr("");
    if (statePassword.value.length === 0 || statePassword.err) {
      return inputPasswordRef.current.focus();
    }
    if (stateRePassword.value.length === 0 || stateRePassword.err) {
      return inputRePasswordRef.current.focus();
    }

    setLoading(true);

    try {
      const res = token && (await authApi.resetPassword(token, stateRePassword.value));

      res && setToastMessage("Refresh password successfully");
      setLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      setErr(error.response.data.conflictError);
    }
    setLoading(false);
  };

  const handleChangeTextPassword = (text: string) => {
    updateStatePassword({ value: text.trim() });
  };

  const handleChangeTextRePassword = (text: string) => {
    updateStateRePassword({ value: text.trim() });
  };

  React.useEffect(() => {
    statePassword.value.length > 0 && validatePassword();
    stateRePassword.value.length > 0 && validateRePassword();
  }, [statePassword.value, stateRePassword.value]);

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <ImageBackground source={IMAGES.GRADIENT} style={{ flex: 1 }} blurRadius={30}>
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.header,
              { zIndex: 100 },
              Platform.OS === "ios" && { paddingTop: statusBarHeight + SPACING.space_8 },
            ]}
          >
            <TouchableHighlight
              underlayColor={COLORS.Black2}
              style={[styles.buttonHeader]}
              onPress={() => navigation.goBack()}
            >
              <FontAwesomeIcon icon={faChevronLeft} size={18} color={COLORS.White1} />
            </TouchableHighlight>
            <Text style={styles.textMain}>Login</Text>
            <View style={[styles.buttonHeader, { opacity: 0 }]}></View>
          </View>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              justifyContent: "center",
              height: WINDOW_HEIGHT,
            }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={{ height: WINDOW_HEIGHT }}>
              <ScrollView>
                <View style={{ height: WINDOW_HEIGHT }}>
                  <View style={[styles.body]}>
                    <View style={styles.logo}>
                      <Image style={styles.image} source={IMAGES.LOGO} />
                    </View>

                    <View style={styles.bodyTop}>
                      <Text style={styles.titleLogo}>Reset Password</Text>
                      <Text style={[styles.textEtra, { textAlign: "center" }]}>
                        Don't worry! It happens. Please enter the email we will send the OTP in this
                        email.
                      </Text>
                    </View>

                    {err && (
                      <View style={styles.boxErr}>
                        <FontAwesomeIcon
                          icon={faCircleExclamation}
                          size={24}
                          color={COLORS.White1}
                        />
                        <Text style={styles.textErr}>{err}</Text>
                      </View>
                    )}

                    <View style={styles.boxs}>
                      <View style={styles.box}>
                        <Pressable
                          onPress={() => inputPasswordRef.current?.focus()}
                          style={[styles.boxInput, statePassword.err && styles.boxInputErr]}
                        >
                          <FontAwesomeIcon icon={faLock} size={20} color={COLORS.White2} />
                          <TextInput
                            ref={inputPasswordRef}
                            secureTextEntry={statePassword.view ? false : true}
                            style={styles.textInput}
                            onFocus={() => updateStatePassword({ focus: true })}
                            onBlur={() =>
                              statePassword.value.trim() === "" &&
                              updateStatePassword({ focus: false })
                            }
                            value={statePassword.value}
                            onChangeText={(text) => handleChangeTextPassword(text.trim())}
                          />
                          <TouchableOpacity
                            onPress={() => updateStatePassword({ view: !statePassword.view })}
                          >
                            {statePassword.view ? (
                              <FontAwesomeIcon
                                icon={faEyeSlash}
                                size={20}
                                style={{ color: COLORS.White2 }}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faEye}
                                size={20}
                                style={{ color: COLORS.White2 }}
                              />
                            )}
                          </TouchableOpacity>
                          <Text
                            style={[styles.titleBox, statePassword.focus && styles.titleBoxMove]}
                          >
                            Password
                          </Text>
                        </Pressable>
                        {statePassword.err && (
                          <Text numberOfLines={1} style={styles.descErr}>
                            {statePassword.err}
                          </Text>
                        )}
                      </View>

                      <View style={styles.box}>
                        <Pressable
                          onPress={() => inputRePasswordRef.current?.focus()}
                          style={[styles.boxInput, stateRePassword.err && styles.boxInputErr]}
                        >
                          <FontAwesomeIcon icon={faLock} size={20} color={COLORS.White2} />
                          <TextInput
                            ref={inputRePasswordRef}
                            secureTextEntry={stateRePassword.view ? false : true}
                            style={styles.textInput}
                            onFocus={() => updateStateRePassword({ focus: true })}
                            onBlur={() =>
                              stateRePassword.value.trim() === "" &&
                              updateStateRePassword({ focus: false })
                            }
                            value={stateRePassword.value}
                            onChangeText={(text) => handleChangeTextRePassword(text.trim())}
                          />
                          <TouchableOpacity
                            onPress={() => updateStateRePassword({ view: !stateRePassword.view })}
                          >
                            {stateRePassword.view ? (
                              <FontAwesomeIcon
                                icon={faEyeSlash}
                                size={20}
                                style={{ color: COLORS.White2 }}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faEye}
                                size={20}
                                style={{ color: COLORS.White2 }}
                              />
                            )}
                          </TouchableOpacity>
                          <Text
                            style={[styles.titleBox, stateRePassword.focus && styles.titleBoxMove]}
                          >
                            Re Password
                          </Text>
                        </Pressable>
                        {stateRePassword.err && (
                          <Text numberOfLines={1} style={styles.descErr}>
                            {stateRePassword.err}
                          </Text>
                        )}
                      </View>
                    </View>

                    <TouchableOpacity
                      disabled={loading}
                      style={styles.button}
                      onPress={handleSubmit}
                    >
                      {loading ? (
                        <ActivityIndicator />
                      ) : (
                        <Text style={styles.titleLogin}>Submit</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ResetPassword;
