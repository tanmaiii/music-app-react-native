import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { usePlaying } from "../../context/PlayingContext";
import IMAGES from "../../constants/images";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { WINDOW_WIDTH } from "../../utils";
import { Feather } from "@expo/vector-icons";
import TouchableScale from "../../components/TouchableScale";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import styles from "./style";
import { authApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLock,
  faEnvelope,
  faCircleExclamation,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { NavigationProp } from "../../navigation/TStack";
import { LinearGradient } from "expo-linear-gradient";

interface LoginScreenProps {}

const LoginScreen = (props: LoginScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const { openBarSong, setOpenBarSong } = usePlaying();
  const [err, setErr] = React.useState<string | null>("");
  const linkTo = useLinkTo();
  const [isFocusedEmail, setIsFocusedEmail] = React.useState<boolean>(false);
  const [isFocusedPassword, setIsFocusedPassword] = React.useState<boolean>(false);
  const inputEmailRef = React.useRef<TextInput>(null);
  const inputPasswordRef = React.useRef<TextInput>(null);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { currentUser, setCurrentUser, login } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [viewPassword, setViewPassword] = React.useState<boolean>(false);

  React.useEffect(() => {
    setOpenBarSong(false);
  }, []);

  const HandlePress = async () => {
    setErr("");
    setLoading(true);
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        await login(email, password);
        setLoading(false);
      } catch (err: any) {
        console.log(err.response.data.conflictError);
        setErr(err.response.data.conflictError);
      }
    } else {
      inputEmailRef.current.focus();
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (currentUser) {
      navigation.navigate("Login");
    }
  }, [currentUser]);

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <View style={{ justifyContent: "center" }}>
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
              Log In Now
            </Text>
            <Text
              style={{
                fontSize: FONTSIZE.size_16,
                fontFamily: FONTFAMILY.regular,
                color: COLORS.White2,
              }}
            >
              Please login to continue using our app
            </Text>
          </View>

          {err && (
            <View style={styles.boxErr}>
              <FontAwesomeIcon icon={faCircleExclamation} size={24} color={COLORS.White1} />
              <Text style={styles.textErr}>{err}</Text>
            </View>
          )}

          <View style={styles.boxs}>
            <View style={styles.box}>
              <Pressable onPress={() => inputEmailRef.current?.focus()} style={styles.boxInput}>
                <FontAwesomeIcon icon={faEnvelope} size={20} color={COLORS.White2} />
                <TextInput
                  ref={inputEmailRef}
                  style={styles.textInput}
                  onFocus={() => setIsFocusedEmail(true)}
                  onBlur={() => email.trim() === "" && setIsFocusedEmail(false)}
                  value={email}
                  onChangeText={(text) => setEmail(text.trim())}
                />
                <Text style={[styles.titleBox, isFocusedEmail && styles.titleBoxMove]}>Email</Text>
              </Pressable>
              <Text style={styles.descErr}></Text>
            </View>

            <View style={styles.box}>
              <Pressable onPress={() => inputPasswordRef.current?.focus()} style={styles.boxInput}>
                <FontAwesomeIcon icon={faLock} size={20} color={COLORS.White2} />

                <TextInput
                  style={styles.textInput}
                  secureTextEntry={viewPassword ? false : true} // Hiển thị dưới dạng mật khẩu
                  ref={inputPasswordRef}
                  onFocus={() => setIsFocusedPassword(true)}
                  onBlur={() => password.trim() === "" && setIsFocusedPassword(false)}
                  onChangeText={(text) => setPassword(text.trim())}
                />
                <TouchableOpacity onPress={() => setViewPassword(!viewPassword)}>
                  {viewPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} size={20} style={{ color: COLORS.White2 }} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} size={20} style={{ color: COLORS.White2 }} />
                  )}
                </TouchableOpacity>
                <Text style={[styles.titleBox, isFocusedPassword && styles.titleBoxMove]}>
                  Password
                </Text>
              </Pressable>
              <Text style={styles.descErr}></Text>
            </View>
          </View>

          <Pressable onPress={() => navigation.navigate("Welcome")}>
            <Text style={styles.titleForgetPassword}>Forget Password ?</Text>
          </Pressable>

          <TouchableOpacity style={styles.button} onPress={HandlePress}>
            {loading ? <ActivityIndicator /> : <Text style={styles.titleLogin}>Log In</Text>}
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.buttonGoogle}>
            <Image source={IMAGES.GOOGLE} style={{ width: 30, height: 30 }} />
            <Text style={styles.titleGoogle}>Google</Text>
          </TouchableOpacity> */}

          <View style={styles.boxBottom}>
            <Text
              style={{
                fontSize: FONTSIZE.size_16,
                fontFamily: FONTFAMILY.regular,
                color: COLORS.White1,
              }}
            >
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text
                style={{
                  fontSize: FONTSIZE.size_16,
                  fontFamily: FONTFAMILY.regular,
                  color: COLORS.Primary,
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
