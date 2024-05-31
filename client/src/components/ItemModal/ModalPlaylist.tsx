import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faFlag,
  faHeart,
  faPenToSquare,
  faPlusCircle,
  faShare,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { Image, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { playlistApi } from "../../apis";
import apiConfig from "../../configs/axios/apiConfig";
import { IMAGES } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import { NavigationProp } from "../../navigators/TStack";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { TPlaylist } from "../../types";
import CustomModal from "../CustomModal";

interface ModalSongProps {
  playlist?: TPlaylist;
  setIsOpen: (boolean) => void;
  setIsOpenAddSong: (boolean) => void;
  setIsOpenEdit: (boolean) => void;
}

const ModalSong = ({ playlist, setIsOpen, setIsOpenEdit, setIsOpenAddSong }: ModalSongProps) => {
  const queryClient = useQueryClient();
  const { token, currentUser } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const [isModalDeleted, setIsModalDeleted] = React.useState<boolean>(false);

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

  const mutationDelete = useMutation({
    mutationFn: async () => {
      try {
        await playlistApi.deletePlaylist(token, playlist.id);
      } catch (error) {
        console.log(error.response.data);
      }
    },
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["playlist", playlist.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlists", currentUser.id],
      });
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
    setIsOpen(false);
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
            style={styles.headerImage}
          />
          <View style={styles.headerDesc}>
            <Text numberOfLines={1} style={styles.textMain}>{playlist.title}</Text>
            <Text numberOfLines={1} style={styles.textEtra}>{playlist.author}</Text>
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
          <Item
            icon={faTrashCan}
            title="Delete playlist"
            itemFunc={() => setIsModalDeleted(true)}
          />
        )}
        <Item icon={faUser} title="View artist" itemFunc={() => handleGoArtist()} />
        <Item icon={faFlag} title="Repport" itemFunc={() => console.log("PRESS")} />
      </View>

      {isModalDeleted && (
        <CustomModal
          isOpen={isModalDeleted}
          setIsOpen={() => setIsModalDeleted(false)}
          modalFunction={() => mutationDelete.mutate()}
          header="Delete playlist"
        >
          <Text
            style={styles.textMain}
          >{`Are you sure you want to delete this playlist ${playlist.title}?`}</Text>
        </CustomModal>
      )}
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
  headerImage: {
    height: 50,
    width: 50,
    aspectRatio: 1,
    objectFit: "cover",
    overflow: "hidden",
    borderRadius: BORDERRADIUS.radius_4,
    borderWidth: 0.6,
    borderColor: COLORS.WhiteRGBA15,
  },
  headerDesc: {
    justifyContent: "center",
    maxWidth: "70%"
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
