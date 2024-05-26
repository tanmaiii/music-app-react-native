import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Modal,
  Animated,
  Share,
  FlatListProps,
} from "react-native";
import IMAGES from "../../constants/images";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils/index";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { songApi } from "../../apis";
import { TSong } from "../../types";
import { useAuth } from "../../context/AuthContext";
import apiConfig from "../../configs/axios/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowUpFromBracket,
  faBars,
  faHeart,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import { usePlaying } from "../../context/PlayingContext";
import CustomModal from "../CustomModal";
import { ModalSong } from "../ItemModal";
import CustomBottomSheet from "../CustomBottomSheet";
import { BlurView } from "expo-blur";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigators/TStack";
import { useAudio } from "../../context/AudioContext";
import styles from "./style";
import SongQueue from "./SongQueue";
import SongPlaying from "./SongPlaying";

interface TSongPlaying {}

const ModalPlaying = (props: TSongPlaying) => {
  const { songIdPlaying } = usePlaying();
  const { token } = useAuth();
  const [like, setLike] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const flatListRef = React.useRef<FlatList<any>>(null); // Sử dụng any nếu không biết kiểu dữ liệu của mục trong danh sách
  const navigation = useNavigation<NavigationProp>();
  const [isOpenQueue, setIsOpenQueue] = useState<boolean>(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: "React Native | A framework for building native apps using React",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { data: song } = useQuery({
    queryKey: ["song", songIdPlaying],
    queryFn: async () => {
      const res = await songApi.getDetail(songIdPlaying, token);
      return res;
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : null}
        blurRadius={80}
      >
        <LinearGradient
          colors={[!song?.image_path ? COLORS.Primary : "transparent", COLORS.Black2]}
          style={[{ position: "absolute", left: 0, right: 0, top: 0, height: WINDOW_HEIGHT }]}
        ></LinearGradient>

        <View style={styles.wrapper}>
          {/* <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            ref={flatListRef} // Sử dụng useRef đã khai báo ở trên
            horizontal
            decelerationRate={0.5}
            scrollEventThrottle={100} // Đặt độ nhạy của sự kiện cuộn
            snapToInterval={WINDOW_WIDTH}
            renderItem={({ item, index }) => <View key={index}>{item.item}</View>}
          /> */}

          <View style={{ flex: 1 }}>
            <View style={[!isOpenQueue ? { display: "none" } : { display: "flex" }]}>
              <SongQueue setIsOpen={setIsOpenQueue} />
            </View>
            <View style={[isOpenQueue ? { display: "none" } : { display: "flex" }]}>
              <SongPlaying  />
            </View>
          </View>

          <View style={[styles.playerControlsBottom]}>
            <TouchableOpacity style={styles.BottomButton}>
              {like ? (
                <FontAwesomeIcon icon={faHeart} size={20} color={COLORS.Red} />
              ) : (
                <FontAwesomeIcon icon={faHeartRegular} size={20} color={COLORS.WhiteRGBA50} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.BottomButton}>
              <FontAwesomeIcon icon={faShuffle} size={20} color={COLORS.WhiteRGBA50} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.BottomButton} onPress={handleShare}>
              <FontAwesomeIcon icon={faArrowUpFromBracket} size={20} color={COLORS.WhiteRGBA50} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.BottomButton, isOpenQueue && { backgroundColor: COLORS.WhiteRGBA15 }]}
              onPress={() => setIsOpenQueue(!isOpenQueue)}
            >
              <FontAwesomeIcon icon={faBars} size={20} color={COLORS.WhiteRGBA50} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {isOpenModal && (
        <CustomBottomSheet
          isOpen={isOpenModal}
          closeModal={() => setIsOpenModal(false)}
          height1={400}
        >
          <ModalSong song={song} setOpenModal={setIsOpenModal} />
        </CustomBottomSheet>
      )}
    </View>
  );
};

const MoreSong = ({
  setIsOpenModal,
  song,
}: {
  setIsOpenModal: (isOpen: boolean) => void;
  song: TSong;
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [scrollViewRef, setScrollViewRef] = React.useState(null);

  return (
    <View style={{ flex: 1, height: WINDOW_HEIGHT }}>
      <BlurView
        tint="dark"
        intensity={100}
        style={{ flex: 1, paddingVertical: SPACING.space_12 }}
        blurReductionFactor={100}
      >
        <Animated.View
          style={[
            {
              flex: 1,
              height: WINDOW_HEIGHT,
              justifyContent: "space-between",
              flexDirection: "column",
            },
          ]}
        >
          <ScrollView style={{ flex: 1 }} ref={setScrollViewRef}>
            <ModalSong song={song} size={2} setOpenModal={setIsOpenModal} />
          </ScrollView>
        </Animated.View>
        <TouchableOpacity
          onPress={() => setIsOpenModal(false)}
          style={{ alignItems: "center", padding: SPACING.space_12 }}
        >
          <Text style={styles.textExtra}>Close</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

export default ModalPlaying;
