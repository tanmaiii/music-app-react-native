import { useState, forwardRef, useImperativeHandle } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { useToast } from "../../context/ToastContext";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { WINDOW_WIDTH } from "../../utils";

type props = {
  timeout?: number;
  description: string;
};

const ToastMessage = forwardRef(({ description, timeout = 2000 }: props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const { setToastMessage } = useToast();

  const showToast = () => {
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
        <Modal transparent style={styles.container}>
          <Animated.View style={styles.wrapper} entering={FadeInUp.delay(0)} exiting={FadeOutUp}>
            <View style={styles.wrapperToast}>
              <Text style={styles.text}>{description}</Text>
            </View>
          </Animated.View>
        </Modal>
      )}
    </>
  );
});

export default ToastMessage;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: "transparent",
  },
  wrapper: {
    position: "absolute",
    top: WINDOW_HEIGHT / 2 - 100,
    width: "100%",
    padding: SPACING.space_12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    // backgroundColor: "pink",
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
