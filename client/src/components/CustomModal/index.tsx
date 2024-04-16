import * as React from "react";
import {
  ModalProps,
  Text,
  View,
  StyleSheet,
  Modal as RModal,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

type TModalProps = ModalProps & {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  withInput?: boolean;
  header: string;
  modalFunction: () => void;
};

const CustomModal = ({
  isOpen,
  setIsOpen,
  withInput = false,
  header,
  children,
  modalFunction,
  ...rest
}: TModalProps) => {
  const handlePressOk = () => {
    modalFunction();
    setIsOpen(false);
  };

  const content = withInput ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View>{children}</View>
  );

  return (
    <RModal visible={isOpen} transparent animationType="fade" statusBarTranslucent {...rest}>
      <View style={styles.container}>
        <View style={styles.opacity}>
          <View style={styles.swapper}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <FontAwesomeIcon size={22} icon={faCircleXmark} style={{ color: COLORS.White1 }} />
              </TouchableOpacity>
              <Text style={styles.titleHeader}>{header}</Text>
            </View>
            <View style={styles.body}>{content}</View>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={() => setIsOpen(false)}>
                <Text style={[styles.textButton, { color: COLORS.Primary }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: COLORS.Primary }]}
                onPress={() => handlePressOk()}
              >
                <Text style={[styles.textButton, { color: COLORS.White1 }]}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </RModal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  opacity: {
    backgroundColor: COLORS.WhiteRGBA15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  swapper: {
    backgroundColor: COLORS.Black1,
    width: WINDOW_WIDTH - SPACING.space_32,
    borderRadius: BORDERRADIUS.radius_8,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_16,
  },
  header: {
    borderBottomColor: COLORS.WhiteRGBA15,
    borderBottomWidth: 0.6,
    paddingBottom: SPACING.space_16,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_8,
  },
  titleHeader: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  body: {
    paddingVertical: SPACING.space_16,
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    paddingBottom: SPACING.space_12,
  },
  button: {
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_8,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.WhiteRGBA15,
    borderWidth: 0.7,
  },
  textButton: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    // color: COLORS.White1,
  },
});
