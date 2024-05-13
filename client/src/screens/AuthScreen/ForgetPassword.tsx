import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Keyboard,
  ImageBackground,
  SafeAreaView,
  Platform,
  BackHandler,
  Alert,
} from "react-native";
import { usePlaying } from "../../context/PlayingContext";
import IMAGES from "../../constants/images";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { useFocusEffect, useLinkTo, useNavigation } from "@react-navigation/native";
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
const statusBarHeight = Constants.statusBarHeight;
import { REGEX } from "../../utils/index";
import { authApi } from "../../apis";
import VerifyScreen from "./Verify";
import CustomModal from "../../components/CustomModal";

interface ForgetPasswordProps {}

const ForgetPassword = (props: ForgetPasswordProps) => {
  const navigation = useNavigation<NavigationProp>();
  const inputRef = React.useRef<TextInput>(null);
  const [isModal, setIsModal] = React.useState<boolean>(false);

  const [state, setState] = React.useState<{
    email: string;
    focus: boolean;
    err: string;
    mess: string;
    loading: boolean;
    verify: boolean;
  }>({
    email: "",
    focus: false,
    err: "",
    mess: "",
    loading: false,
    verify: false,
  });

  const [stateVerify, setStateVerify] = React.useState<{
    verify: boolean;
    value: string;
    err: string;
    resetPasswordToken: string;
  }>({
    verify: false,
    value: "",
    err: "",
    resetPasswordToken: "",
  });

  const updateState = (newValue) => {
    setState((prevState) => ({
      ...prevState,
      ...newValue,
    }));
  };

  const updateStateVerify = (newValue) => {
    setStateVerify((prevState) => ({
      ...prevState,
      ...newValue,
    }));
  };

  const validateEmail = (text: string) => {
    if (text.trim() === "") {
      updateState({
        err: "Email cannot be empty",
      });
    } else if (!REGEX.email.test(text)) {
      updateState({
        err: "Invalid email",
      });
    }
  };

  const HandleSubmit = async () => {
    validateEmail(state.email);
    updateState({ err: "" });
    if (state.err) return;
    updateState({ loading: true });
    try {
      await authApi.sendVerifyAccount(state.email);
      updateStateVerify({ verify: true });
      updateState({ loading: false });
    } catch (error) {
      updateState({
        err: error.response?.data?.conflictError || "An error occurred",
      });
    }
    updateState({ loading: false });
  };

  const handleVerify = async (code: string) => {
    try {
      const res = await authApi.verifyForgotPassword(state.email, code);
      if (res) {
        res.success && navigation.navigate("ResetPassword", { token: res.data.resetPasswordToken });
      }
    } catch (error) {
      updateStateVerify({ err: error.response?.data?.conflictError || "An error occurred" });
    }
  };

  const handleBlack = () => {
    if (stateVerify.verify) {
      setIsModal(true);
    } else {
      navigation.goBack();
    }
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
              style={[styles.buttonHeader]}
              onPress={() => handleBlack()}
            >
              <FontAwesomeIcon icon={faChevronLeft} size={18} color={COLORS.White1} />
            </TouchableHighlight>
            <Text style={styles.textMain}>Forget Password</Text>
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
                  {!stateVerify.verify ? (
                    <View style={styles.body}>
                      <View style={styles.logo}>
                        <Image style={styles.image} source={IMAGES.LOGO} />
                      </View>
                      <View style={styles.bodyTop}>
                        <Text style={styles.titleLogo}>Forget Password</Text>
                        <Text style={[styles.textEtra, { textAlign: "center" }]}>
                          Don't worry! It happens. Please enter the email we will send the OTP in
                          this email.
                        </Text>
                      </View>

                      {state.err && (
                        <View style={styles.boxErr}>
                          <FontAwesomeIcon
                            icon={faCircleExclamation}
                            size={24}
                            color={COLORS.White1}
                          />
                          <Text style={styles.textErr}>{state.err}</Text>
                        </View>
                      )}

                      <View style={styles.boxs}>
                        <View style={styles.box}>
                          <Pressable style={styles.boxInput}>
                            <FontAwesomeIcon icon={faEnvelope} size={20} color={COLORS.White2} />
                            <TextInput
                              style={styles.textInput}
                              ref={inputRef}
                              onChangeText={(text) => updateState({ email: text })}
                              onFocus={() => updateState({ focus: true })}
                              onBlur={() =>
                                state.email.trim() === "" && updateState({ focus: false })
                              }
                            />
                            <Text style={[styles.titleBox, state.focus && styles.titleBoxMove]}>
                              Email
                            </Text>
                          </Pressable>
                        </View>
                      </View>

                      <TouchableOpacity
                        disabled={state.loading}
                        style={[styles.button]}
                        onPress={HandleSubmit}
                      >
                        {state.loading ? (
                          <ActivityIndicator />
                        ) : (
                          <Text style={styles.titleLogin}>Continue</Text>
                        )}
                      </TouchableOpacity>

                      <View style={styles.boxBottom}>
                        <Text style={styles.textEtra}>Back to </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                          <Text style={(styles.textEtra, { color: COLORS.Primary })}>Sign in</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <VerifyScreen
                      email={state?.email}
                      onSubmit={(code) => handleVerify(code)}
                      err={stateVerify?.err}
                    />
                  )}
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
      {isModal && (
        <CustomModal
          isOpen={isModal}
          setIsOpen={() => setIsModal(false)}
          modalFunction={() => navigation.goBack()}
          header="Go back"
        >
          <Text style={styles.textMain}>
            You haven't authenticated, do you really want to come back ?
          </Text>
        </CustomModal>
      )}
    </View>
  );
};

export default ForgetPassword;
