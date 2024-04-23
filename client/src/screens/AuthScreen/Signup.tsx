import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Linking,
  StatusBar,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  ImageBackground,
  Platform,
  SafeAreaView,
} from "react-native";
import { usePlaying } from "../../context/PlayingContext";
import IMAGES from "../../constants/images";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { WINDOW_WIDTH } from "../../utils";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import TouchableScale from "../../components/TouchableScale";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TouchableHighlight, WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../apis";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faCircleCheck,
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

interface SignupScreenProps {}

const SignupScreen = (props: SignupScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const { openBarSong, setOpenBarSong } = usePlaying();
  const [err, setErr] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<string>("");
  const [errName, setErrName] = React.useState<string>("");
  const [errEmail, setErrEmail] = React.useState<string>("");
  const [viewPassword, setViewPassword] = React.useState<boolean>(false);
  const [errPassword, setErrPassword] = React.useState<string>("");
  const linkTo = useLinkTo();
  const [isFocusedEmail, setIsFocusedEmail] = React.useState<boolean>(false);
  const [isFocusedPassword, setIsFocusedPassword] = React.useState<boolean>(false);
  const [isFocusedName, setIsFocusedName] = React.useState<boolean>(false);
  const inputNameRef = React.useRef<TextInput>(null);
  const inputEmailRef = React.useRef<TextInput>(null);
  const inputPasswordRef = React.useRef<TextInput>(null);
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,30}$/;

  React.useEffect(() => {
    setOpenBarSong(false);
  }, []);

  const handlePress = () => {
    setSuccess("");
    setErr("");
    if (name.trim().length === 0 || errName) return inputNameRef.current.focus();
    if (email.trim().length === 0 || errEmail) return inputEmailRef.current.focus();
    if (password.trim().length === 0 || errPassword) return inputPasswordRef.current.focus();

    setLoading(true);
    const post = async () => {
      try {
        const res = await authApi.signup(name, email, password);
        res && setSuccess("Account registration successful ");
        setLoading(false);
      } catch (err: any) {
        console.log("err", err.response.data.conflictError);
        setErr(err.response.data.conflictError);
      }
    };
    setLoading(false);
    post();
  };

  const handleChangeTextName = (text) => {
    setName(text);
    setErrName("");
    if (text.trim().length > 16) {
      return setErrName("Name must be 16 characters");
    } else if (text.trim().length < 6) {
      return setErrName("Name must be at least 6 characters");
    }
  };

  const handleChangeTextEmail = (text) => {
    let typingTimer;
    setEmail(text.trim());
    setErrEmail("");
    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      if (text.trim() === "") {
        setErrEmail("Email cannot be empty");
      } else if (!emailRegex.test(text)) {
        setErrEmail("Invalid email");
      } else {
        setErrEmail("");
      }
    }, 2000); // Thời gian đợi trước khi kiểm tra, ví dụ: 1000ms = 1 giây
  };

  const handleChangeTextPassword = (text) => {
    let typingTimer;
    setPassword(text.trim());
    setErrPassword("");

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      if (text.trim() === "") {
        setErrPassword("Password cannot be empty");
      } else if (text.trim().length < 6) {
        setErrPassword("Password must have at least 6 characters");
      } else if (text.trim().length > 30) {
        setErrPassword("Password must not exceed 30 characters");
      } else if (!passwordRegex.test(text)) {
        setErrPassword(
          "At least one lowercase letter, uppercase letter, number, special character"
        );
      } else {
        setErrPassword("");
      }
    }, 2000); // Thời gian đợi trước khi kiểm tra, ví dụ: 1000ms = 1 giây
  };

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <ImageBackground source={IMAGES.GRADIENT} style={{ flex: 1 }} blurRadius={30}>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <SafeAreaView style={{ zIndex: 100 }}>
            <View
              style={[
                styles.header,
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
              <Text style={styles.titleHeader}>Create account</Text>
              <View style={[styles.buttonHeader, { opacity: 0 }]}></View>
            </View>
          </SafeAreaView>
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

            {success && (
              <View style={styles.boxSucc}>
                <FontAwesomeIcon icon={faCircleCheck} size={24} color={COLORS.White1} />
                <Text style={styles.textSucc}>{success}</Text>
              </View>
            )}

            {err && (
              <View style={styles.boxErr}>
                <FontAwesomeIcon icon={faCircleExclamation} size={24} color={COLORS.White1} />
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
                  <Text style={[styles.titleBox, isFocusedName && styles.titleBoxMove]}>Name</Text>
                </Pressable>
                <Text numberOfLines={1} style={styles.descErr}>
                  {errName && errName}
                </Text>
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
                <Text numberOfLines={1} style={styles.descErr}>
                  {errEmail && errEmail}
                </Text>
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
                  <Text style={[styles.titleBox, isFocusedPassword && styles.titleBoxMove]}>
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
                      <FontAwesomeIcon icon={faEye} size={20} style={{ color: COLORS.White2 }} />
                    )}
                  </TouchableOpacity>
                </Pressable>
                <Text numberOfLines={2} style={styles.descErr}>
                  {errPassword && errPassword}
                </Text>
              </View>
            </View>

            <Text style={styles.titleForgetPassword}>Forget Password ?</Text>

            <TouchableOpacity
              disabled={loading}
              style={styles.button}
              onPress={() => handlePress()}
            >
              {loading ? <ActivityIndicator /> : <Text style={styles.titleLogin}>Sign Up</Text>}
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
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignupScreen;
