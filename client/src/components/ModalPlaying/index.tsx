import React from "react";
import { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, ImageBackground, StatusBar } from "react-native";
import { usePlaying } from "../../context/PlayingContext";
import IMAGES from "../../constants/images";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import SongDetail from "../../screens/SongDetail";
import { BORDERRADIUS, COLORS, SPACING } from "../../theme/theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";

const ModalPlaying = () => {
  const { openBarSong, setOpenBarSong, setOpenModalSong, openModalSong } = usePlaying();
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ["100%"], []);

  // callbacks
  const handleSheetChanges = React.useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
    if (index !== 0) {
      setOpenModalSong(false);
      setOpenBarSong(true);
    }
  }, []);

  const handleOpenPress = () => bottomSheetRef.current.expand();
  const handleClosePress = () => bottomSheetRef.current.close();

  // renders
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );
  useEffect(() => {
    console.log("openModalSong", openModalSong);

    openModalSong && handleOpenPress();
    !openModalSong && handleClosePress();
  }, [openModalSong]);

  return (
    <View style={[styles.container, !openModalSong && { display: "none" }]}>
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        handleComponent={() => null}
        backgroundStyle={[
          {
            backgroundColor: "none",
            borderRadius: 12,
          },
        ]}
      >
        <BottomSheetView style={styles.contentContainer}>
          <SongDetail />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    left: 0,
    position: "absolute",
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    zIndex: 100,
    // backgroundColor: "pink",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
    backgroundColor: COLORS.Black1,
  },
});

export default ModalPlaying;
