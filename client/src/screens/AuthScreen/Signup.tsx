import * as React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  ImageBackground,
  Platform,
} from "react-native";
import { usePlaying } from "../../context/PlayingContext";
import IMAGES from "../../constants/images";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { REGEX, WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TouchableHighlight } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { authApi } from "../../apis";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faCircleExclamation,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { text } from "@fortawesome/fontawesome-svg-core";
import { NavigationProp } from "../../navigators/TStack";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;
import VerifyScreen from "./Verify";
import { useToast } from "../../context/ToastContext";
import { TStateAuth } from "../../types";

interface SignupScreenProps {}

const SignupScreen = (props: SignupScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const { setOpenBarSong } = usePlaying();
  const { setToastMessage } = useToast();
  const inputNameRef = React.useRef<TextInput>(null);
  const inputEmailRef = React.useRef<TextInput>(null);
  const inputPasswordRef = React.useRef<TextInput>(null);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [err, setErr] = React.useState<string>("");

  const [verify, setVerify] = React.useState<boolean>(false);

  const [stateVerify, setStateVerify] = React.useState<TStateAuth>({
    value: "",
    err: "",
    loading: false,
    focus: false,
    view: false,
  });

  const [stateName, setStateName] = React.useState<TStateAuth>({
    value: "",
    err: "",
    loading: false,
    focus: false,
    view: false,
  });

  const [stateEmail, setStateEmail] = React.useState<TStateAuth>({
    value: "",
    err: "",
    loading: false,
    focus: false,
    view: false,
  });

  const [statePassword, setStatePassword] = React.useState<TStateAuth>({
    value: "",
    err: "",
    loading: false,
    focus: false,
    view: false,
  });

  const updateStateVerify = (newValue: Partial<TStateAuth>) => {
    setStateVerify((prevState) => ({
      ...prevState,
      ...newValue,
    }));
  };

  const updateStateName = (newValue: Partial<TStateAuth>) => {
    setStateName((prevState) => ({
      ...prevState,
      ...newValue,
    }));
  };

  const updateStateEmail = (newValue: Partial<TStateAuth>) => {
    setStateEmail((prevState) => ({
      ...prevState,
      ...newValue,
    }));
  };

  const updateStatePassword = (newValue: Partial<TStateAuth>) => {
    setStatePassword((prevState) => ({
      ...prevState,
      ...newValue,
    }));
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (verify) {
        e.preventDefault();
        setToastMessage("You need to verify before exiting.");
      } else {
        return;
      }
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    setOpenBarSong(false);
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false, // Vô hiệu hóa các cử chỉ vuốt
    });
  }, [navigation]);

  const handlePress = async () => {
    setErr("");
    if (stateName.value.length === 0 || stateName.err) {
      return inputNameRef.current.focus();
    }
    if (stateEmail.value.length === 0 || stateEmail.err) {
      return inputEmailRef.current.focus();
    }
    if (statePassword.value.length === 0 || statePassword.err) {
      return inputPasswordRef.current.focus();
    }

    setVerify(false);
    setLoading(true);
    try {
      const res = await authApi.signup(stateName.value, stateEmail.value, statePassword.value);
      if (res) {
        await authApi.sendVerifyAccount(stateEmail.value);
        setVerify(true);
      }
    } catch (err) {
      console.log("err", err.response?.data?.conflictError);
      setErr(err.response?.data?.conflictError || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAccount = async (code: string) => {
    updateStateVerify({ err: "" });
    try {
      const res = await authApi.verifyAccount(stateEmail.value, code);
      if (res) {
        setVerify(false);
        setToastMessage("Verification successfully !");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error.response.data.conflictError);
      updateStateVerify({ err: error.response.data.conflictError });
    }
  };

  const validateName = () => {
    if (stateName.value.length > 16) {
      return updateStateName({ err: "Name must be 16 characters" });
    } else if (stateName.value.length < 6) {
      return updateStateName({ err: "Name must be at least 6 characters" });
    }
    return updateStateName({ err: "" });
  };

  const validateEmail = () => {
    if (stateEmail.value === "") {
      return updateStateEmail({ err: "Email cannot be empty" });
    } else if (!REGEX.email.test(stateEmail.value)) {
      return updateStateEmail({ err: "Invalid email" });
    }
    return updateStateEmail({ err: "" });
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
    return updateStatePassword({ err: "" });
  };

  React.useEffect(() => {
    stateEmail.value.length > 0 && validateEmail();
    stateName.value.length > 0 && validateName();
    statePassword.value.length > 0 && validatePassword();
  }, [statePassword.value, stateEmail.value, stateName.value]);

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
              disabled={verify}
              style={[styles.buttonHeader, verify && { opacity: 0.6 }]}
              onPress={() => navigation.goBack()}
            >
              <FontAwesomeIcon icon={faChevronLeft} size={18} color={COLORS.White1} />
            </TouchableHighlight>
            <Text style={styles.textMain}>Create account</Text>
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
                  {!verify ? (
                    <View style={styles.body}>
                      <View style={styles.logo}>
                        <Image style={styles.image} source={IMAGES.LOGO} />
                      </View>

                      <View style={styles.bodyTop}>
                        <Text
                          style={{
                            fontSize: FONTSIZE.size_30,
                            fontFamily: FONTFAMILY.bold,
                            color: COLORS.Primary,
                          }}
                        >
                          Create account
                        </Text>
                        <Text
                          style={{
                            fontSize: FONTSIZE.size_16,
                            fontFamily: FONTFAMILY.regular,
                            color: COLORS.White2,
                          }}
                        >
                          Please fill the details and create account
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
                            onPress={() => inputNameRef.current?.focus()}
                            style={[styles.boxInput, stateName.err && styles.boxInputErr]}
                          >
                            <FontAwesomeIcon icon={faUser} size={20} color={COLORS.White2} />

                            <TextInput
                              ref={inputNameRef}
                              style={styles.textInput}
                              onFocus={() => updateStateName({ focus: true })}
                              onBlur={() =>
                                stateName.value === "" && updateStateName({ focus: false })
                              }
                              onChangeText={(text) => updateStateName({ value: text.trim() })}
                            />
                            <Text style={[styles.titleBox, stateName.focus && styles.titleBoxMove]}>
                              Name
                            </Text>
                          </Pressable>
                          {stateName.err && (
                            <Text numberOfLines={1} style={styles.descErr}>
                              {stateName.err}
                            </Text>
                          )}
                        </View>

                        <View style={styles.box}>
                          <Pressable
                            onPress={() => inputEmailRef.current?.focus()}
                            style={[styles.boxInput, stateEmail.err && styles.boxInputErr]}
                          >
                            <FontAwesomeIcon icon={faEnvelope} size={20} color={COLORS.White2} />
                            <TextInput
                              ref={inputEmailRef}
                              style={styles.textInput}
                              value={stateEmail.value}
                              onFocus={() => updateStateEmail({ focus: true })}
                              onBlur={() =>
                                stateEmail.value === "" && updateStateEmail({ focus: false })
                              }
                              onChangeText={(text) => updateStateEmail({ value: text.trim() })}
                            />
                            <Text
                              style={[styles.titleBox, stateEmail.focus && styles.titleBoxMove]}
                            >
                              Email
                            </Text>
                          </Pressable>
                          {stateEmail.err && (
                            <Text numberOfLines={1} style={styles.descErr}>
                              {stateEmail.err}
                            </Text>
                          )}
                        </View>

                        <View style={styles.box}>
                          <Pressable
                            onPress={() => inputPasswordRef.current?.focus()}
                            style={[styles.boxInput, statePassword.err && styles.boxInputErr]}
                          >
                            <FontAwesomeIcon icon={faLock} size={20} color={COLORS.White2} />

                            <TextInput
                              secureTextEntry={statePassword.view ? false : true} // Hiển thị dưới dạng mật khẩu
                              ref={inputPasswordRef}
                              passwordRules="*"
                              style={styles.textInput}
                              value={statePassword.value}
                              onFocus={() => updateStatePassword({ focus: true })}
                              onBlur={() =>
                                statePassword.value === "" && updateStatePassword({ focus: false })
                              }
                              onChangeText={(text) => updateStatePassword({ value: text.trim() })}
                            />
                            <Text
                              style={[styles.titleBox, statePassword.focus && styles.titleBoxMove]}
                            >
                              Password
                            </Text>
                            <TouchableOpacity
                              style={styles.buttonView}
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
                          </Pressable>
                          {statePassword.err && (
                            <Text numberOfLines={2} style={styles.descErr}>
                              {statePassword.err}
                            </Text>
                          )}
                        </View>
                      </View>

                      <View
                        style={[
                          { alignItems: "flex-end", justifyContent: "flex-end", width: "100%" },
                        ]}
                      >
                        <Pressable onPress={() => navigation.navigate("ForgetPassword")}>
                          <Text style={styles.titleForgetPassword}>Forget Password ?</Text>
                        </Pressable>
                      </View>

                      <TouchableOpacity
                        disabled={loading}
                        style={styles.button}
                        onPress={() => handlePress()}
                      >
                        {loading ? (
                          <ActivityIndicator />
                        ) : (
                          <Text style={styles.titleLogin}>Sign Up</Text>
                        )}
                      </TouchableOpacity>

                      <View style={styles.boxBottom}>
                        <Text
                          style={{
                            fontSize: FONTSIZE.size_16,
                            fontFamily: FONTFAMILY.regular,
                            color: COLORS.White1,
                          }}
                        >
                          Already have an account?{" "}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                          <Text
                            style={{
                              fontSize: FONTSIZE.size_16,
                              fontFamily: FONTFAMILY.regular,
                              color: COLORS.Primary,
                            }}
                          >
                            Log In
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <VerifyScreen
                      email={stateEmail?.value}
                      onSubmit={(code) => handleVerifyAccount(code)}
                      err={stateVerify.err}
                    />
                  )}
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignupScreen;
