import React from "react";
import { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { usePlaying } from "../../context/PlayingContext";
import IMAGES from "../../constants/images";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import SongDetail from "../../screens/SongDetail";
import { BORDERRADIUS, COLORS, SPACING } from "../../theme/theme";

const ModalPlaying = () => {
  const { openBarSong, setOpenBarSong, setOpenModalSong, openModalSong } = usePlaying();
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => [160, WINDOW_HEIGHT + 160], []);

  // callbacks
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index === -1) {
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
    openModalSong && handleOpenPress();
  }, [openModalSong]);

  // useEffect(() => {
  //   handleOpenPress();
  // }, [openModalSong]);

  return (
    <View style={[styles.container, !openModalSong && { display: "none" }]}>
      {/* <View style={[styles.container]}> */}
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        handleComponent={() => null}
        backgroundStyle={{
          backgroundColor: "none",
          borderRadius: 12,
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          {/* <View
              style={{
                width: 48,
                height: 6,
                backgroundColor: COLORS.WhiteRGBA50,
                borderRadius: BORDERRADIUS.radius_14,
                alignItems: "center",
                justifyContent: "center",
              }}
            ></View> */}
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
