import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./style";
import { IMAGES } from "../../constants";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { OTPInput } from "../../components/OTPInput/OTPInput";

interface VeridyScreenProps {
  email: string;
  err: string;
  onSubmit: (string) => void;
}

const VerifyScreen = ({ email, err, onSubmit }: VeridyScreenProps) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [code, setCode] = React.useState<Array<string>>(["0", "0", "0", "0"]);

  const resendCode = () => {};

  const handleSubmit = async () => {
    if (code.join("").trim().length < 4) return;
    setLoading(true);
    await onSubmit(code.join("").trim());
    setLoading(false);
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
          <Text
            style={{
              fontSize: FONTSIZE.size_16,
              fontFamily: FONTFAMILY.regular,
              color: COLORS.White2,
            }}
          >
            Enter the OTP sent to {email && email}
          </Text>
        </View>

        <View style={{ paddingVertical: SPACING.space_24 }}>
          <OTPInput length={4} value={code} onChange={(value) => setCode(value)} disabled={false} />
        </View>
        {err && <Text style={[styles.textErr, { color: COLORS.Red }]}>{err}</Text>}

        <TouchableOpacity disabled={loading} style={styles.button} onPress={handleSubmit}>
          {loading ? <ActivityIndicator /> : <Text style={styles.titleLogin}>Submit</Text>}
        </TouchableOpacity>

        <View style={{ flexDirection: "row", gap: 4 }}>
          <Text style={styles.textEtra}>Didn't receive code ? </Text>
          <TouchableOpacity onPress={() => resendCode()}>
            <Text style={[styles.textEtra, { color: COLORS.Blue }]}>Click to resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VerifyScreen;
