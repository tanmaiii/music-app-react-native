import * as React from "react";
import { Text, View, StyleSheet, ImageBackground, Image } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { IMAGES } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigation/TStack";
import { usePlaying } from "../../context/PlayingContext";

interface WelcomeScreenProps {}

const WelcomeScreen = (props: WelcomeScreenProps) => {
  const {setOpenBarSong} = usePlaying();
  
  const navigate = useNavigation<NavigationProp>();

  React.useEffect(() => {
    setOpenBarSong(false);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.Black, COLORS.Black2]} style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
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
                Welcome
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

            <TouchableOpacity style={styles.button} onPress={() => navigate.navigate("Signup")}>
              <Text style={styles.titleLogin}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGoogle}>
              <Image source={IMAGES.GOOGLE} style={{ width: 30, height: 30 }} />
              <Text style={styles.titleGoogle}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonLine} onPress={() => navigate.navigate("Login")}>
              <Text style={[styles.titleLogin, { color: COLORS.Primary }]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default WelcomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   wrapper: {
//     paddingHorizontal: SPACING.space_16,
//     paddingVertical: SPACING.space_32,
//   },
// });
