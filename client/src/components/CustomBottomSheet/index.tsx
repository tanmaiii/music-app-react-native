import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal as BottomSheetModalGorhom,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import * as React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { COLORS, SPACING } from "../../theme/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface CustomBottomSheetProps {
  isOpen: boolean;
  closeModal: () => void;
  enableClose?: boolean;
  height1?: number | string;
  height2?: number | string;
  children: React.ReactNode;
  border?: boolean;
}

const CustomBottomSheet = (props: CustomBottomSheetProps) => {
  const {
    isOpen,
    closeModal,
    height1 = 240,
    height2,
    children,
    enableClose = true,
    border = true,
  } = props;

  const snapPoints = React.useMemo(() => {
    const points = [];
    if (height1) points.push(height1);
    if (height2) points.push(height2);
    return points;
  }, [height1, height2]);

  const bottomSheetRef = React.useRef<BottomSheetModalGorhom>(null);

  const handleSheetChanges = React.useCallback((index: number) => {
    if (index < 0) {
      closeModal();
    }
  }, []);

  const handleOpenPress = React.useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleClosePress = () => bottomSheetRef.current?.close();

  const renderBackdrop = React.useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  React.useEffect(() => {
    if (isOpen) {
      handleOpenPress();
    }
  }, [isOpen]);

  return (
    <BottomSheetModalGorhom
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
      enablePanDownToClose={enableClose}
      handleComponent={() => null}
      keyboardBehavior={Platform.OS !== "ios" ? "interactive" : "extend"}
      keyboardBlurBehavior={Platform.OS !== "ios" ? "restore" : "none"}
      android_keyboardInputMode={Platform.OS !== "ios" ? "adjustResize" : "adjustPan"}
    >
      <BottomSheetView
        style={[
          border && {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            overflow: "hidden",
            backgroundColor: COLORS.Black2,
          },
        ]}
      >
        <View
          style={{
            backgroundColor: COLORS.Black2,
            height: "100%",
          }}
        >
          {children}
        </View>
      </BottomSheetView>
    </BottomSheetModalGorhom>
  );
};

export default CustomBottomSheet;
