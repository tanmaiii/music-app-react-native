import {
  faArrowUpFromBracket,
  faBars,
  faHeart,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import { useState } from "react";
import { ImageBackground, Share, TouchableOpacity, View } from "react-native";
import { songApi } from "../../apis";
import apiConfig from "../../configs/axios/apiConfig";
import { useAuth } from "../../context/AuthContext";
import { COLORS } from "../../theme/theme";
import { WINDOW_HEIGHT } from "../../utils/index";

import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useAudio } from "../../context/AudioContext";
import { NavigationProp } from "../../navigators/TStack";
import CustomBottomSheet from "../CustomBottomSheet";
import { ModalSong } from "../ItemModal";
import SongPlaying from "./SongPlaying";
import SongQueue from "./SongQueue";
import styles from "./style";

interface TSongPlaying {}

const ModalPlaying = (props: TSongPlaying) => {
  const { songIdPlaying } = useAudio();
  const { token } = useAuth();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenQueue, setIsOpenQueue] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

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

  const { data: isLike } = useQuery({
    queryKey: ["like-song", song?.id],

    queryFn: async () => {
      const res = song && (await songApi.checkLikedSong(song?.id, token));
      return res.isLiked;
    },
  });

  const mutationLike = useMutation({
    mutationFn: (like: boolean) => {
      if (like) return songApi.unLikeSong(song?.id, token);
      return songApi.likeSong(song?.id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["like-song", song?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs-favorites", currentUser.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["count-songs-favorites"],
      });
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={song?.image_path ? { uri: apiConfig.imageURL(song?.image_path) } : null}
        blurRadius={80}
      >
        <LinearGradient
          colors={[!song?.image_path ? COLORS.Primary : "transparent", COLORS.Black2]}
          style={[{ position: "absolute", left: 0, right: 0, top: 0, height: WINDOW_HEIGHT }]}
        ></LinearGradient>

        <View style={styles.wrapper}>
          <View style={{ flex: 1 }}>
            <View style={[!isOpenQueue ? { display: "none" } : { display: "flex" }]}>
              <SongQueue setIsOpen={setIsOpenQueue} />
            </View>
            <View style={[isOpenQueue ? { display: "none" } : { display: "flex" }]}>
              <SongPlaying />
            </View>
          </View>

          <View style={[styles.playerControlsBottom]}>
            <TouchableOpacity
              style={styles.BottomButton}
              onPress={() => mutationLike.mutate(isLike)}
            >
              {isLike ? (
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

export default ModalPlaying;
