import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./style";
import { IMAGES } from "@/constants";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "@/theme/theme";
import { OTPInput } from "@/components/OTPInput";
import { authApi } from "@/apis";
import { useNavigation } from "@react-navigation/native";

interface VeridyScreenProps {
  email: string;
  err: string;
  onSubmit: (string) => void;
}

const VerifyScreen = ({ email, err, onSubmit }: VeridyScreenProps) => {
  const [loadingResend, setLoadingResend] = React.useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);
  const [errVerify, setErrVerify] = React.useState<string>(err);
  const navigation = useNavigation();
  const [code, setCode] = React.useState<Array<string>>(["", "", "", ""]);

  React.useEffect(() => {
    setErrVerify(err);
  }, [err]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false, // Vô hiệu hóa các cử chỉ vuốt
    });
  }, [navigation]);

  const resendCode = async () => {
    setLoadingResend(true);
    setErrVerify("");
    try {
      await authApi.sendVerifyAccount(email);
      setLoadingResend(false);
    } catch (error) {
      setErrVerify(error.response.data.conflictError);
    }
    setLoadingResend(false);
  };

  const handleSubmit = async () => {
    console.log(code.join("").trim().length);
    if (code.join("").trim().length < 4) return;
    setLoadingSubmit(true);
    setTimeout(async () => {
      await onSubmit(code.join("").trim());
      setLoadingSubmit(false);
    }, 2000);
  };

  return (
    <View style={styles.body}>
      <View style={styles.bodyTop}>
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
            Verifycation
          </Text>
        </View>
        {loadingResend ? (
          <>
            <ActivityIndicator />
            <Text style={styles.textEtra}>Loading resend the verify code via email</Text>
          </>
        ) : (
          <>
            <Text style={styles.textEtra}>Enter the OTP sent to {email && email}</Text>

            <View style={{ paddingVertical: SPACING.space_24 }}>
              <OTPInput
                length={4}
                value={code}
                onChange={(value) => setCode(value)}
                disabled={false}
              />
            </View>

            {errVerify && <Text style={[styles.textErr, { color: COLORS.Red }]}>{errVerify}</Text>}

            <TouchableOpacity disabled={loadingSubmit} style={styles.button} onPress={handleSubmit}>
              {loadingSubmit ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.titleLogin}>Submit</Text>
              )}
            </TouchableOpacity>

            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={styles.textEtra}>Didn't receive code ? </Text>
              <TouchableOpacity onPress={() => resendCode()}>
                <Text style={[styles.textEtra, { color: COLORS.Blue }]}>Click to resend</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default VerifyScreen;
