import { IMAGES } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { usePlaying } from "@/context/PlayingContext";
import { NavigationProp } from "@/navigators/TStack";
import { COLORS, FONTFAMILY, FONTSIZE } from "@/theme/theme";
import { WINDOW_HEIGHT } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./style";

interface WelcomeScreenProps {}

const WelcomeScreen = (props: WelcomeScreenProps) => {
  const { setOpenBarSong } = usePlaying();
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const navigate = useNavigation<NavigationProp>();

  React.useEffect(() => {
    setOpenBarSong(false);
  }, []);

  const handleGetToken = () => {
    console.log("token", token);
  };

  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={IMAGES.GRADIENT} style={{ flex: 1 }} blurRadius={30}>
        <View style={{ flex: 1, justifyContent: "center", height: WINDOW_HEIGHT }}>
          <View style={[styles.body]}>
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
                  maxWidth: "80%",
                  textAlign: "center",
                }}
              >
                Welcome! Get ready to dive into the world of music.
              </Text>
            </View>

            <TouchableOpacity style={[styles.button]} onPress={() => navigate.navigate("Login")}>
              <Text style={styles.titleLogin}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonGoogle} onPress={() => handleGetToken()}>
              <Image source={IMAGES.GOOGLE} style={{ width: 30, height: 30 }} />
              <Text style={styles.titleGoogle}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonLine, { alignItems: "center" }]}
              onPress={() => navigate.navigate("Signup")}
            >
              <Text style={[styles.titleLogin]}>Create new account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
