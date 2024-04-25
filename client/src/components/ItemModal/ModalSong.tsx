import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Share, Pressable } from "react-native";
import { IMAGES } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart,
  faMinus,
  faMusic,
  faShare,
  faMinusCircle,
  faPlusCircle,
  faUser,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import CustomBottomSheet from "../CustomBottomSheet";
import AddSongToPlaylist from "./AddSongToPlaylist";
import { TSong } from "../../types";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import apiConfig from "../../configs/axios/apiConfig";
import { NavigationProp } from "../../navigation/TStack";
import { useNavigation } from "@react-navigation/native";
import { songApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";

interface ModalSongProps {
  song: TSong;
  setOpenModal: (boolean) => void;
  size?: number;
  inPlaylist?: boolean;
}

const ModalSong = ({ song, setOpenModal, size = 1, inPlaylist = false }: ModalSongProps) => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [loading, setLoding] = React.useState<boolean>(false);
  const navigation = useNavigation<NavigationProp>();
  const { token } = useAuth();
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
    queryKey: ["like-song", song.id],

    queryFn: async () => {
      const res = await songApi.checkLikedSong(song.id, token);
      return res.isLiked;
    },
  });

  const mutationLike = useMutation({
    mutationFn: (like: boolean) => {
      if (like) return songApi.unLikeSong(song.id, token);
      return songApi.likeSong(song.id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["like-song", song.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs-favorites"],
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

  return (
    <View style={styles.container}>
      {size === 1 && (
        <>
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
                source={
                  song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG
                }
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
        </>
      )}

      {size === 2 && (
        <View style={styles.header2}>
          <Pressable
            onPress={() => handleGoDetail()}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 160,
                width: 160,
                aspectRatio: 1,
                objectFit: "cover",
                overflow: "hidden",
                borderRadius: BORDERRADIUS.radius_4,
              }}
              source={song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG}
            />
            <View style={styles.header2Desc}>
              <Text style={styles.textMain}>{song?.title}</Text>
              <Text style={styles.textEtra}>{song?.author}</Text>
            </View>
          </Pressable>
        </View>
      )}

      <View style={styles.body}>
        <Item
          icon={isLike ? faHeart : faHeartRegular}
          title={isLike ? "Remove to favorites" : "Add to favorites"}
          itemFunc={() => mutationLike.mutate(isLike)}
        />
        <Item icon={faPlusCircle} title="Add to playlist" itemFunc={() => setIsOpenModal(true)} />
        {inPlaylist && (
          <Item
            icon={faMinusCircle}
            title="Remove to playlist"
            itemFunc={() => console.log("PRESS")}
          />
        )}
        <Item icon={faMusic} title="View detail" itemFunc={() => handleGoDetail()} />
        <Item icon={faUser} title="View artist" itemFunc={() => handleGoArtist()} />
        <Item icon={faFlag} title="Repport" itemFunc={() => console.log("PRESS")} />
      </View>

      {isOpenModal && (
        <CustomBottomSheet
          isOpen={true}
          closeModal={() => setIsOpenModal(false)}
          height1={400}
          height2={"100%"}
        >
          <AddSongToPlaylist />
        </CustomBottomSheet>
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
