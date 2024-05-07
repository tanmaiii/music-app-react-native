import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { NavigationProp } from "../../../navigation/TStack";
import { Platform } from "react-native";
import styles from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../../theme/theme";
import Constants from "expo-constants";
import { authApi, userApi } from "../../../apis";
import { useAuth } from "../../../context/AuthContext";
import CustomModal from "../../../components/CustomModal";
import { OTPInput } from "../../../components/OTPInput/OTPInput";
import { Mutation, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../context/ToastContext";
const statusBarHeight = Constants.statusBarHeight;

interface ItemNameProps {}

const ItemEmail = (props: ItemNameProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [err, serErr] = React.useState("");
  const [value, setValue] = React.useState<string>("");
  const { token } = useAuth();
  const [openModalBack, setOpenModalBack] = React.useState(false);
  const [verify, setVerify] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // React.useEffect(() => {
  //   const getName = async () => {
  //     const res = await userApi.getMe(token);
  //     setEmail(res.email);
  //     // setValue(res.email);
  //   };
  //   getName();
  // }, []);

  const handleNext = async () => {
    setLoading(true);
    try {
      await authApi.checkEmail(value);

      await authApi.sendVerifyEmail(token, value);
      setVerify(true);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      serErr(error.response.data.conflictError);
    }
    setLoading(false);
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={{ zIndex: 99 }}>
          <View
            style={[
              styles.header,
              Platform.OS === "ios" && { paddingTop: statusBarHeight + SPACING.space_8 },
            ]}
          >
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => setOpenModalBack(!openModalBack)}
            >
              <FontAwesomeIcon icon={faChevronLeft} size={20} style={{ color: COLORS.White1 }} />
            </TouchableOpacity>

            <Text style={[styles.titleHeader]}>Email</Text>

            {loading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={[styles.buttonHeader, verify && { opacity: 0 }]}
                onPress={() => !verify && handleNext()}
              >
                <Text style={[styles.textSave]}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
        <View style={[styles.body, { marginTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT }]}>
          {!verify ? (
            <>
              <Text style={styles.textMain}>Update email</Text>
              <View style={styles.boxInput}>
                <TextInput
                  placeholder="New email address"
                  placeholderTextColor={COLORS.WhiteRGBA15}
                  style={styles.textInput}
                  value={value}
                  onChangeText={(text) => setValue(text)}
                />
                <TouchableOpacity style={styles.buttonClear} onPress={() => setValue("")}>
                  <FontAwesomeIcon icon={faXmark} size={14} color={COLORS.Black2} />
                </TouchableOpacity>
              </View>
              {err && (
                <Text style={[styles.textError, { marginTop: SPACING.space_12 }]}>{err}</Text>
              )}
              <Text style={[styles.textEtra, { marginTop: SPACING.space_12 }]}>asdasd</Text>
            </>
          ) : (
            <VerifyEmail email={value} />
          )}
        </View>
      </View>
      <CustomModal
        withInput={true}
        isOpen={openModalBack}
        setIsOpen={setOpenModalBack}
        header={"Update info"}
        modalFunction={() => navigation.goBack()}
      >
        <Text style={{ color: COLORS.White1, fontSize: FONTSIZE.size_16 }}>
          Do you sure you want to cancel ?
        </Text>
        <TextInput />
      </CustomModal>
    </>
  );
};

const VerifyEmail = ({ email }: { email: string }) => {
  const [code, setCode] = React.useState<Array<string>>(["0", "0", "0", "0"]);
  const [err, serErr] = React.useState("");
  const { token } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  const { setToastMessage } = useToast();
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log(code.join(""));
  }, [code]);

  const resendCode = async () => {
    setLoading(true);
    try {
      await authApi.sendVerifyEmail(token, email);
      setLoading(false);
    } catch (error) {
      serErr(error.response.data.conflictError);
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      if (code.join("").length > 4) return;
      const res = await authApi.verifyEmail(token, code.join(""));
      if (res.success) {
        await userApi.update(token, {
          email: email,
        });
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        setToastMessage("Updated email successfully");
        navigation.goBack();
      }
    } catch (error) {
      console.log(error.response.data.conflictError);
      serErr(error.response.data.conflictError);
    }
    setLoading(false);
  };

  const mutationVerify = useMutation({
    mutationFn: async () => {
      await handleVerify();
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  return loading ? (
    <View style={{ justifyContent: "center", alignItems: "center", gap: SPACING.space_12 }}>
      <Text style={[styles.textMain, { fontSize: FONTSIZE.size_24 }]}>Verification</Text>
      <ActivityIndicator />
    </View>
  ) : (
    <View>
      <Text style={[styles.textMain, { fontSize: FONTSIZE.size_24 }]}>Verification</Text>
      <Text
        style={styles.textEtra}
      >{`Please enter the OTP that we send to the Email ${email}`}</Text>
      <View
        style={{
          paddingHorizontal: SPACING.space_24,
          paddingVertical: SPACING.space_24,
        }}
      >
        <OTPInput length={4} value={code} onChange={(value) => setCode(value)} disabled={false} />
      </View>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Text style={styles.textEtra}>Didn't receive code ? </Text>
        <TouchableOpacity onPress={() => resendCode()}>
          <Text
            style={{
              fontSize: FONTSIZE.size_14,
              color: COLORS.Blue,
              fontFamily: FONTFAMILY.regular,
            }}
          >
            Click to resend
          </Text>
        </TouchableOpacity>
      </View>
      {err && <Text style={[styles.textError, { marginTop: SPACING.space_12 }]}>{err}</Text>}
      <TouchableOpacity
        onPress={() => mutationVerify.mutate()}
        style={{
          marginTop: SPACING.space_18,
          paddingHorizontal: SPACING.space_16,
          paddingVertical: SPACING.space_20,
          backgroundColor: COLORS.Primary,
          borderRadius: 28,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.White1,
            fontSize: FONTSIZE.size_16,
            fontFamily: FONTFAMILY.regular,
          }}
        >
          Verify email
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemEmail;
