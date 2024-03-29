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
} from "react-native";
import { usePlaying } from "../../context/PlayingContext";
import IMAGES from "../../constants/images";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { WINDOW_WIDTH } from "../../utils";
import { Feather } from "@expo/vector-icons";
import TouchableScale from "../../components/TouchableScale";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { useLinkTo } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";
import { authApi } from "../../apis";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

interface LoginScreenProps {}

const LoginScreen = (props: LoginScreenProps) => {
  const { openBarSong, setOpenBarSong } = usePlaying();
  const [err, setErr] = React.useState<string | null>("");
  const linkTo = useLinkTo();
  const [isFocusedEmail, setIsFocusedEmail] = React.useState<boolean>(false);
  const [isFocusedPassword, setIsFocusedPassword] = React.useState<boolean>(false);
  const inputEmailRef = React.useRef<TextInput>(null);
  const inputPasswordRef = React.useRef<TextInput>(null);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { currentUser, setCurrentUser } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setOpenBarSong(false);
  }, []);

  const HandlePress = async () => {
    setErr("");
    setLoading(true);
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        const res = await authApi.signin(email, password);
        setCurrentUser(res);
        setLoading(false);
        console.log(res);
      } catch (err: any) {
        console.log(err.response.data.conflictError);
        setErr(err.response.data.conflictError);
      }
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (currentUser) return linkTo("/Home");
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.logo}>
          <Image style={styles.image} source={IMAGES.LOGO} />
        </View>
        <View style={styles.body}>
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
              <AntDesign name="exclamationcircleo" size={24} style={{ color: COLORS.White1 }} />
              <Text style={styles.textErr}>{err}</Text>
            </View>
          )}

          <View style={styles.box}>
            <Pressable onPress={() => inputEmailRef.current?.focus()} style={styles.boxInput}>
              <TextInput
                ref={inputEmailRef}
                style={styles.textInput}
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => email.trim() === "" && setIsFocusedEmail(false)}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <Text style={[styles.titleBox, isFocusedEmail && { top: -16 }]}>Email</Text>
              <Feather name="mail" size={24} color="black" style={{ color: COLORS.White2 }} />
            </Pressable>
          </View>

          <View style={styles.box}>
            <Pressable onPress={() => inputPasswordRef.current?.focus()} style={styles.boxInput}>
              <TextInput
                style={styles.textInput}
                ref={inputPasswordRef}
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={() => password.trim() === "" && setIsFocusedPassword(false)}
                onChangeText={(text) => setPassword(text)}
              />
              <Text style={[styles.titleBox, isFocusedPassword && { top: -16 }]}>Password</Text>
              <Feather name="lock" size={24} color="black" style={{ color: COLORS.White2 }} />
            </Pressable>
            <Text style={styles.descBox}>Password must be least 8 Character </Text>
          </View>

          <Pressable onPress={() => linkTo("/Home")}>
            <Text style={styles.titleForgetPassword}>Forget Password ?</Text>
          </Pressable>

          <TouchableOpacity style={styles.button} onPress={HandlePress}>
            {loading ? <ActivityIndicator /> : <Text style={styles.titleLogin}>Log In</Text>}
          </TouchableOpacity>
          <Text style={styles.titleOr}>Or login with</Text>

          <TouchableOpacity style={styles.buttonGoogle}>
            <Image source={IMAGES.GOOGLE} style={{ width: 30, height: 30 }} />
            <Text style={styles.titleGoogle}>Google</Text>
          </TouchableOpacity>

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
            <TouchableOpacity onPress={() => linkTo("/Signup")}>
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
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
