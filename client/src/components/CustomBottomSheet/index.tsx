import {
  BottomSheetBackdrop,
  BottomSheetModal as BottomSheetModalGorhom,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../theme/theme";

interface CustomBottomSheetProps {
  isOpen: boolean;
  closeModal: () => void;
  height1?: number | string;
  height2?: number | string;
  children: React.ReactNode;
}

const CustomBottomSheet = (props: CustomBottomSheetProps) => {
  const { isOpen, closeModal, height1 = 240, height2, children } = props;

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

  const handleClosePress = () => bottomSheetRef.current.close();

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
      enablePanDownToClose={true}
      handleComponent={() => null}
    >
      <BottomSheetView
        style={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          overflow: "hidden",
        }}
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
