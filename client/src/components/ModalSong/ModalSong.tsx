import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart as faHeartRegular, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faFlag,
  faHeart,
  faMinusCircle,
  faMusic,
  faPenToSquare,
  faPlusCircle,
  faShare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { Image, Pressable, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { playlistApi, songApi } from "@/apis";
import apiConfig from "@/configs/axios/apiConfig";
import { IMAGES } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { NavigationProp } from "@/navigators/TStack";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "@/theme/theme";
import { TSong } from "@/types";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import AddSongToPlaylist from "./AddSongToPlaylist";
import { useToast } from "@/context/ToastContext";
import { useAudio } from "@/context/AudioContext";
import EditSong from "./EditSong";
import CustomModal from "../CustomModal";

interface ModalSongProps {
  song: TSong;
  playlistId?: string;
  setOpenModal: (value: boolean) => void;
  setIsOpenEditSong?: (value: boolean) => void;
}

const ModalSong = ({
  song,
  setOpenModal,
  playlistId = null,
  setIsOpenEditSong,
}: ModalSongProps) => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [isModalDeleted, setIsModalDeleted] = React.useState<boolean>(false);
  const navigation = useNavigation<NavigationProp>();
  const { clearQueue, songIdPlaying } = useAudio();
  const [heightModal, setHeightModal] = React.useState(200);
  const { token, currentUser } = useAuth();
  const { addToQueue } = useAudio();
  const { setToastMessage } = useToast();
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

  const { data: isLike } = useQuery({
    queryKey: ["like-song", song?.id],

    queryFn: async () => {
      const res = await songApi.checkLikedSong(song?.id, token);
      return res.isLiked;
    },
  });

  const mutationLike = useMutation({
    mutationFn: (like: boolean) => {
      if (like) return songApi.unLikeSong(song?.id, token);
      return songApi.likeSong(song?.id, token);
    },
    onSuccess: () => {
      setOpenModal(false);
      setToastMessage(isLike ? "Remove from favorites success" : "Add to favorites success");
      queryClient.invalidateQueries({
        queryKey: ["like-song", song?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs-favorites", currentUser?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["count-songs-favorites"],
      });
    },
  });

  const handleGoDetail = () => {
    setOpenModal(false);
    navigation.navigate("Song", { songId: song?.id });
  };

  const handleGoArtist = () => {
    setOpenModal(false);
    navigation.navigate("Artist", { userId: song?.user_id });
  };

  const handleOpenEditSong = () => {
    setOpenModal(false);
    setIsOpenEditSong(true);
  };

  const mutationRemoveSongFromPlaylist = useMutation({
    mutationFn: async () => {
      await playlistApi.removeSong(playlistId, song?.id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist-songs", playlistId],
      });
      setOpenModal(false);
    },
  });

  const handleAddQueue = () => {
    addToQueue(song);
    setOpenModal(false);
  };

  const mutationDelete = useMutation({
    mutationFn: async () => {
      await songApi.deleteSong(token, song?.id);
    },
    onSuccess: () => {
      setOpenModal(false);
      queryClient.invalidateQueries({
        queryKey: ["song", song?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs", currentUser?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs-artist", currentUser?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs-favorites", currentUser?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["favorites-songs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["count-songs-favorites"],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs-new"],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs-popular"],
      });
      songIdPlaying === song?.id && clearQueue();
      setToastMessage("Delete song success");
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Pressable style={[styles.headerLeft]} onPress={() => handleGoDetail()}>
          <Image
            style={{
              height: 50,
              width: 50,
              aspectRatio: 1,
              objectFit: "cover",
              overflow: "hidden",
              borderRadius: BORDERRADIUS.radius_4,
              borderWidth: 0.6,
              borderColor: COLORS.WhiteRGBA15,
            }}
            source={song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG}
          />
          <View style={styles.headerDesc}>
            <Text style={styles.textMain}>{song?.title}</Text>
            <Text style={styles.textEtra}>{song?.author}</Text>
          </View>
        </Pressable>

        <TouchableOpacity style={styles.btnShare} onPress={() => handleShare()}>
          <FontAwesomeIcon icon={faShare} size={18} color={COLORS.White1} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 0.6,
          backgroundColor: COLORS.WhiteRGBA15,
        }}
      />

      <View style={styles.body}>
        <Item
          icon={isLike ? faHeart : faHeartRegular}
          title={isLike ? "Remove from favorites" : "Add to favorites"}
          itemFunc={() => mutationLike.mutate(isLike)}
        />
        <Item icon={faPlusCircle} title="Add to playlist" itemFunc={() => setIsOpenModal(true)} />
        {song?.user_id === currentUser?.id && (
          <Item icon={faPenToSquare} title="Edit song" itemFunc={handleOpenEditSong} />
        )}
        {song?.user_id === currentUser.id && (
          <Item icon={faTrashCan} title="Delete song" itemFunc={() => setIsModalDeleted(true)} />
        )}
        {playlistId && (
          <Item
            icon={faMinusCircle}
            title="Remove from playlist"
            itemFunc={() => mutationRemoveSongFromPlaylist.mutate()}
          />
        )}
        <Item icon={faPlusCircle} title="Add to waiting" itemFunc={() => handleAddQueue()} />
        <Item icon={faMusic} title="View detail" itemFunc={() => handleGoDetail()} />
        <Item icon={faUser} title="View artist" itemFunc={() => handleGoArtist()} />
        <Item icon={faFlag} title="Repport" itemFunc={() => console.log("PRESS")} />
      </View>

      {isOpenModal && (
        <CustomBottomSheet isOpen={true} closeModal={() => setIsOpenModal(false)} height1={"90%"}>
          <AddSongToPlaylist songId={song?.id} />
        </CustomBottomSheet>
      )}

      {isModalDeleted && (
        <CustomModal
          isOpen={isModalDeleted}
          setIsOpen={() => setIsModalDeleted(false)}
          modalFunction={() => mutationDelete.mutate()}
          header="Delete playlist"
        >
          <Text
            style={styles.textMain}
          >{`Are you sure you want to delete this playlist ${song?.title}?`}</Text>
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
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textEtra: {
    fontSize: FONTSIZE.size_16,
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
  },

  header2: {
    flexDirection: "row",
    paddingVertical: SPACING.space_14,
    paddingHorizontal: SPACING.space_12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.space_18,
  },

  header2Desc: {
    marginTop: SPACING.space_12,
    alignItems: "center",
  },

  body: {
    flexDirection: "column",
    paddingVertical: SPACING.space_8,
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
