import * as React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Keyboard,
  ImageBackground,
  Platform,
} from "react-native";
import { usePlaying } from "../../context/PlayingContext";
import IMAGES from "../../constants/images";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLock,
  faEnvelope,
  faCircleExclamation,
  faEyeSlash,
  faEye,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { NavigationProp } from "../../navigators/TStack";
import { TouchableHighlight } from "react-native-gesture-handler";
import Constants from "expo-constants";
import { TStateAuth } from "../../types";
const statusBarHeight = Constants.statusBarHeight;

interface LoginScreenProps {}

const LoginScreen = (props: LoginScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const { currentUser, login } = useAuth();
  const { setOpenBarSong } = usePlaying();
  const inputEmailRef = React.useRef<TextInput>(null);
  const inputPasswordRef = React.useRef<TextInput>(null);

  const [err, setErr] = React.useState<string | null>("");
  const [loading, setLoading] = React.useState<boolean>(false);

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false, // Vô hiệu hóa các cử chỉ vuốt
    });
  }, [navigation]);

  React.useEffect(() => {
    setOpenBarSong(false);
  }, []);

  const HandlePress = async () => {
    setErr("");
    setLoading(true);
    if (stateEmail.value !== "" && statePassword.value !== "") {
      try {
        await login(stateEmail.value, statePassword.value);
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
                        Log In
                      </Text>
                      <Text style={styles.textEtra}>Please login to continue using our app</Text>
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
                          onPress={() => inputEmailRef.current?.focus()}
                          style={styles.boxInput}
                        >
                          <FontAwesomeIcon icon={faEnvelope} size={20} color={COLORS.White2} />
                          <TextInput
                            ref={inputEmailRef}
                            style={styles.textInput}
                            onFocus={() => updateStateEmail({ focus: true })}
                            onBlur={() =>
                              stateEmail.value === "" && updateStateEmail({ focus: false })
                            }
                            value={stateEmail.value}
                            onChangeText={(text) => updateStateEmail({ value: text.trim() })}
                          />
                          <Text style={[styles.titleBox, stateEmail.focus && styles.titleBoxMove]}>
                            Email
                          </Text>
                        </Pressable>
                      </View>

                      <View style={styles.box}>
                        <Pressable
                          onPress={() => inputPasswordRef.current?.focus()}
                          style={styles.boxInput}
                        >
                          <FontAwesomeIcon icon={faLock} size={20} color={COLORS.White2} />

                          <TextInput
                            style={styles.textInput}
                            value={statePassword.value}
                            secureTextEntry={statePassword.view ? false : true} // Hiển thị dưới dạng mật khẩu
                            ref={inputPasswordRef}
                            onFocus={() => updateStatePassword({ focus: true })}
                            onBlur={() =>
                              statePassword.value === "" && updateStatePassword({ focus: false })
                            }
                            onChangeText={(text) => updateStatePassword({ value: text.trim() })}
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

                    <TouchableOpacity style={styles.button} onPress={HandlePress}>
                      {loading ? (
                        <ActivityIndicator />
                      ) : (
                        <Text style={styles.titleLogin}>Log In</Text>
                      )}
                    </TouchableOpacity>

                    <View style={styles.boxBottom}>
                      <Text style={[styles.textEtra, { color: COLORS.White1 }]}>
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
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
