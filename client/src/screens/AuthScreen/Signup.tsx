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
} from "react-native";
import { usePlaying } from "../../context/PlayingContext";
import IMAGES from "../../constants/images";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { WINDOW_WIDTH } from "../../utils";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import TouchableScale from "../../components/TouchableScale";
import { TouchableOpacity } from "react-native-gesture-handler";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { useLinkTo } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";

interface SignupScreenProps {}

const SignupScreen = (props: SignupScreenProps) => {
  const { openBarSong, setOpenBarSong } = usePlaying();
  const [err, setErr] = React.useState<boolean>(false);
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

  React.useEffect(() => {
    setOpenBarSong(false);
  }, []);

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
              Sign Up Now
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
              <AntDesign name="exclamationcircleo" size={24} style={{ color: COLORS.White1 }} />
              <Text style={styles.textErr}>
                Wrong Email or Password Wrong Email or Password Wrong Email or Password Wrong Email
                or Password
              </Text>
            </View>
          )}

          <View style={styles.box}>
            <Pressable onPress={() => inputNameRef.current?.focus()} style={styles.boxInput}>
              <TextInput
                ref={inputNameRef}
                style={styles.textInput}
                onFocus={() => setIsFocusedName(true)}
                onBlur={() => name.trim() === "" && setIsFocusedName(false)}
                onChangeText={(text) => setName(text)}
              />
              <Text style={[styles.titleBox, isFocusedName && { top: -16 }]}>Name</Text>
              <FontAwesome6 name="circle-user" size={24} style={{ color: COLORS.White2 }} />
            </Pressable>
          </View>

          <View style={styles.box}>
            <Pressable onPress={() => inputEmailRef.current?.focus()} style={styles.boxInput}>
              <TextInput
                ref={inputEmailRef}
                style={styles.textInput}
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => email.trim() === "" && setIsFocusedEmail(false)}
                onChangeText={(text) => setEmail(text)}
              />
              <Text style={[styles.titleBox, isFocusedEmail && { top: -16 }]}>Email</Text>
              <Feather name="mail" size={24} color="black" style={{ color: COLORS.White2 }} />
            </Pressable>
          </View>

          <View style={styles.box}>
            <Pressable onPress={() => inputPasswordRef.current?.focus()} style={styles.boxInput}>
              <TextInput
                secureTextEntry={true} // Hiển thị dưới dạng mật khẩu
                ref={inputPasswordRef}
                passwordRules="*"
                style={styles.textInput}
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={() => password.trim() === "" && setIsFocusedPassword(false)}
                onChangeText={(text) => setPassword(text)}
              />
              <Text style={[styles.titleBox, isFocusedPassword && { top: -16 }]}>Password</Text>
              <Feather name="lock" size={24} color="black" style={{ color: COLORS.White2 }} />
            </Pressable>
            <Text style={styles.descBox}>Password must be least 8 Character</Text>
          </View>

          <Text style={styles.titleForgetPassword}>Forget Password ?</Text>

          <TouchableOpacity style={styles.button} onPress={() => linkTo("/Home")}>
            <Text style={styles.titleLogin}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.titleOr}>Or signup with</Text>

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
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => linkTo("/Login")}>
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
      </ScrollView>
    </View>
  );
};

export default SignupScreen;
