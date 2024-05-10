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
import { NavigationProp } from "../../navigation/TStack";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;
import VerifyScreen from "./Verify";
import { useToast } from "../../context/ToastContext";

interface SignupScreenProps {}

const SignupScreen = (props: SignupScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const { setOpenBarSong } = usePlaying();
  const { setToastMessage } = useToast();
  const inputNameRef = React.useRef<TextInput>(null);
  const inputEmailRef = React.useRef<TextInput>(null);
  const inputPasswordRef = React.useRef<TextInput>(null);
  const [verify, setVerify] = React.useState<boolean>(false);

  const [errVerify, setErrVerify] = React.useState<string>("");
  const [err, setErr] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const [viewPassword, setViewPassword] = React.useState<boolean>(false);

  const [errName, setErrName] = React.useState<string>("");
  const [errEmail, setErrEmail] = React.useState<string>("");
  const [errPassword, setErrPassword] = React.useState<string>("");

  const [isFocusedEmail, setIsFocusedEmail] = React.useState<boolean>(false);
  const [isFocusedPassword, setIsFocusedPassword] = React.useState<boolean>(false);
  const [isFocusedName, setIsFocusedName] = React.useState<boolean>(false);

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

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
    setVerify(false);
    if (name.trim().length === 0 || errName) return inputNameRef.current.focus();
    if (email.trim().length === 0 || errEmail) return inputEmailRef.current.focus();
    if (password.trim().length === 0 || errPassword) return inputPasswordRef.current.focus();

    setLoading(true);

    try {
      const res = await authApi.signup(name, email, password);
      if (res) {
        await authApi.sendVerifyAccount(email);
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
    setErrVerify("");
    try {
      const res = await authApi.verifyAccount(email, code);
      if (res) {
        setVerify(false);
        setEmail("");
        setName("");
        setPassword("");
        setToastMessage("Verification successfully !");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error.response.data.conflictError);
      setErrVerify(error.response.data.conflictError);
    }
  };

  const validateName = (text: string) => {
    console.log(text);
    if (text.trim().length > 16) {
      setErrName("Name must be 16 characters");
    } else if (text.trim().length < 6) {
      setErrName("Name must be at least 6 characters");
    }
  };

  const validateEmail = (text: string) => {
    if (text.trim() === "") {
      setErrEmail("Email cannot be empty");
    } else if (!REGEX.email.test(text)) {
      setErrEmail("Invalid email");
    }
  };

  const validatePassword = (text: string) => {
    if (text.trim() === "") {
      setErrPassword("Password cannot be empty");
    } else if (text.trim().length < 6) {
      setErrPassword("Password must have at least 6 characters");
    } else if (text.trim().length > 30) {
      setErrPassword("Password must not exceed 30 characters");
    } else if (!REGEX.password.test(text)) {
      setErrPassword("At least one lowercase letter, uppercase letter, number, special character");
    }
  };

  const handleChangeTextName = (text: string) => {
    setName(text.trim());
    setErrName("");
    validateName(text.trim());
  };

  const handleChangeTextEmail = (text: string) => {
    setEmail(text.trim());
    setErrEmail("");
    validateEmail(text.trim());
  };

  const handleChangeTextPassword = (text: string) => {
    setPassword(text.trim());
    setErrPassword("");
    validatePassword(text.trim());
  };

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
                            style={[styles.boxInput, errName && styles.boxInputErr]}
                          >
                            <FontAwesomeIcon icon={faUser} size={20} color={COLORS.White2} />

                            <TextInput
                              ref={inputNameRef}
                              style={styles.textInput}
                              onFocus={() => setIsFocusedName(true)}
                              onBlur={() => name.trim() === "" && setIsFocusedName(false)}
                              onChangeText={(text) => handleChangeTextName(text)}
                            />
                            <Text style={[styles.titleBox, isFocusedName && styles.titleBoxMove]}>
                              Name
                            </Text>
                          </Pressable>
                          {errName && (
                            <Text numberOfLines={1} style={styles.descErr}>
                              {errName}
                            </Text>
                          )}
                        </View>

                        <View style={styles.box}>
                          <Pressable
                            onPress={() => inputEmailRef.current?.focus()}
                            style={[styles.boxInput, errEmail && styles.boxInputErr]}
                          >
                            <FontAwesomeIcon icon={faEnvelope} size={20} color={COLORS.White2} />
                            <TextInput
                              ref={inputEmailRef}
                              style={styles.textInput}
                              onFocus={() => setIsFocusedEmail(true)}
                              onBlur={() => email.trim() === "" && setIsFocusedEmail(false)}
                              onChangeText={(text) => handleChangeTextEmail(text)}
                            />
                            <Text style={[styles.titleBox, isFocusedEmail && styles.titleBoxMove]}>
                              Email
                            </Text>
                          </Pressable>
                          {errEmail && (
                            <Text numberOfLines={1} style={styles.descErr}>
                              {errEmail}
                            </Text>
                          )}
                        </View>

                        <View style={styles.box}>
                          <Pressable
                            onPress={() => inputPasswordRef.current?.focus()}
                            style={[styles.boxInput, errPassword && styles.boxInputErr]}
                          >
                            <FontAwesomeIcon icon={faLock} size={20} color={COLORS.White2} />

                            <TextInput
                              secureTextEntry={viewPassword ? false : true} // Hiển thị dưới dạng mật khẩu
                              ref={inputPasswordRef}
                              passwordRules="*"
                              style={styles.textInput}
                              value={password}
                              onFocus={() => setIsFocusedPassword(true)}
                              onBlur={() => password.trim() === "" && setIsFocusedPassword(false)}
                              onChangeText={(text) => handleChangeTextPassword(text)}
                            />
                            <Text
                              style={[styles.titleBox, isFocusedPassword && styles.titleBoxMove]}
                            >
                              Password
                            </Text>
                            <TouchableOpacity onPress={() => setViewPassword(!viewPassword)}>
                              {viewPassword ? (
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
                          {errPassword && (
                            <Text numberOfLines={2} style={styles.descErr}>
                              {errPassword}
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
                      email={email && email}
                      onSubmit={(code) => handleVerifyAccount(code)}
                      err={errVerify && errVerify}
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
