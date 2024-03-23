import React, { Component, useEffect, useRef } from "react";
import { useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, LogBox } from "react-native";
import { BottomModal, ModalContent } from "react-native-modals";
import { usePlaying } from "../../context/playingContext";
import IMAGES from "../../constants/images";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils";
import { AntDesign } from "@expo/vector-icons";

const ModalPlaying = () => {
  // const [modalVisible, setModalVisible] = useState(false);
  const { modalVisible, handleChangeModalVisible } = usePlaying();

  return (
    <BottomModal
      visible={modalVisible}
      onHardwareBackPress={() => handleChangeModalVisible(false)}
      swipeDirection={["up", "down"]}
      swipeThreshold={200}
      onTouchOutside={() => handleChangeModalVisible(false)}
    >
      <ModalContent
        style={{ height: WINDOW_HEIGHT, width: WINDOW_WIDTH, backgroundColor: "#5072A7" }}
      >
        <TouchableOpacity onPress={() => handleChangeModalVisible(!modalVisible)}>
          <AntDesign name="down" size={24} color="black" />
        </TouchableOpacity>
        <Image source={IMAGES.ARTIST} />
      </ModalContent>
    </BottomModal>
  );
};

const styles = StyleSheet.create({});

export default ModalPlaying;
