import { useState, forwardRef, useImperativeHandle } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import { useToast } from "../../context/ToastContext";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";

type props = {
  timeout?: number;
  description: string;
};

const ToastMessage = forwardRef(({ description, timeout = 2000 }: props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const { setToastMessage } = useToast();

  const showToast = () => {
    console.log("sHOW NE");

    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setToastMessage("");
      clearTimeout(timer);
    }, timeout);
  };

  useImperativeHandle(ref, () => ({
    show: showToast,
  }));

  return (
    <>
      {isVisible && (
        <Animated.View style={styles.wrapper} entering={FadeInUp.delay(200)} exiting={FadeOutUp}>
          <View style={styles.wrapperToast}>
            <Text style={styles.text}>{description}</Text>
          </View>
        </Animated.View>
      )}
    </>
  );
});

export default ToastMessage;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: WINDOW_HEIGHT / 2 - 100,
    width: "100%",
    padding: SPACING.space_12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  wrapperToast: {
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_18,
    borderRadius: BORDERRADIUS.radius_8,
    backgroundColor: "rgba(0,0,0,0.6)",
    minWidth: 200,
    maxWidth: "70%",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
text: {
      textAlign: "center",
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White1,
  },
});
