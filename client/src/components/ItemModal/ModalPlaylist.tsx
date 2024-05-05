import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Share, Modal } from "react-native";
import { IMAGES } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart,
  faMusic,
  faPenToSquare,
  faPlusCircle,
  faShare,
  faTrashCan,
  faFlag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { TPlaylist } from "../../types";
import apiConfig from "../../configs/axios/apiConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { playlistApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigation/TStack";
import CustomBottomSheet from "../CustomBottomSheet";
import AddSong from "./AddSong";

interface ModalSongProps {
  playlist?: TPlaylist;
  setOpenModal: (boolean) => void;
  setIsOpenAddSong: (boolean) => void;
  setIsOpenEdit: (boolean) => void;
}

const ModalSong = ({ playlist, setOpenModal, setIsOpenEdit, setIsOpenAddSong }: ModalSongProps) => {
  const queryClient = useQueryClient();
  const { token, currentUser } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  // const [isOpenModalAddSong, setIsOpenModalAddSong] = React.useState<boolean>(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: "React Native | A framework for building native apps using React",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { data: isLike } = useQuery({
    queryKey: ["like-playlist", playlist.id],
    queryFn: async () => {
      const res = await playlistApi.checkLikedPlaylist(playlist.id, token);
      return res.isLiked;
    },
  });

  const mutationLike = useMutation({
    mutationFn: (like: boolean) => {
      if (like) return playlistApi.unLikePlaylist(playlist.id, token);
      return playlistApi.likePlaylist(playlist.id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-favorites"],
      });
      queryClient.invalidateQueries({
        queryKey: ["like-playlist", playlist.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlists-favorites"],
      });
    },
  });

  const handleGoArtist = () => {
    setOpenModal(false);
    navigation.navigate("Artist", { userId: playlist?.user_id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={
              playlist?.image_path
                ? { uri: apiConfig.imageURL(playlist.image_path) }
                : IMAGES.PLAYLIST
            }
            style={{
              height: 50,
              width: 50,
              aspectRatio: 1,
              objectFit: "cover",
              overflow: "hidden",
              borderRadius: BORDERRADIUS.radius_4,
            }}
          />
          <View style={styles.headerDesc}>
            <Text style={styles.textMain}>{playlist.title}</Text>
            <Text style={styles.textEtra}>{playlist.author}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btnShare} onPress={() => handleShare()}>
          <FontAwesomeIcon icon={faShare} size={18} color={COLORS.White1} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          height: 0.6,
          backgroundColor: COLORS.WhiteRGBA15,
        }}
      />
      <View style={styles.body}>
        {playlist?.user_id !== currentUser.id && (
          <Item
            icon={isLike ? faHeart : faHeartRegular}
            title={isLike ? "Remove to favorites" : "Add to favorites"}
            itemFunc={() => mutationLike.mutate(isLike)}
          />
        )}
        {playlist?.user_id === currentUser.id && (
          <Item icon={faPlusCircle} title="Add song" itemFunc={() => setIsOpenAddSong(true)} />
        )}
        {playlist?.user_id === currentUser.id && (
          <Item icon={faPenToSquare} title="Edit playlist" itemFunc={() => setIsOpenEdit(true)} />
        )}
        {playlist?.user_id === currentUser.id && (
          <Item icon={faTrashCan} title="Delete playlist" itemFunc={() => console.log("PRESS")} />
        )}
        <Item icon={faUser} title="View artist" itemFunc={() => handleGoArtist()} />
        <Item icon={faFlag} title="Repport" itemFunc={() => console.log("PRESS")} />
      </View>

      {/* {isOpenModalAddSong && (
        <CustomBottomSheet
          isOpen={true}
          closeModal={() => setIsOpenModalAddSong(false)}
          height1={"100%"}
          border={false}
        >
          <AddSong />
        </CustomBottomSheet>
      )} */}
    </View>
  );
};

export default ModalSong;

type TItem = {
  icon: IconProp;
  title: string;
  itemFunc: () => void;
};

const Item = ({ icon, title, itemFunc }: TItem) => {
  return (
    <TouchableHighlight
      underlayColor={COLORS.Black3}
      style={{ borderRadius: BORDERRADIUS.radius_8 }}
      onPress={() => itemFunc()}
    >
      <View style={styles.item}>
        <FontAwesomeIcon icon={icon} size={18} color={COLORS.White1} />
        <Text style={styles.itemText}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.space_8,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textEtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  header: {
    flexDirection: "row",
    paddingVertical: SPACING.space_14,
    paddingHorizontal: SPACING.space_12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    gap: SPACING.space_8,
  },
  headerDesc: {
    justifyContent: "center",
  },
  btnShare: {
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
    // backgroundColor: COLORS.button,
  },
  body: {
    flexDirection: "column",
    paddingVertical: SPACING.space_12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.space_14,
    paddingHorizontal: SPACING.space_12,
    gap: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_8,
  },
  itemText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White1,
  },
});
