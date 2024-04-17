import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Share, Pressable } from "react-native";
import { IMAGES } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faMusic, faShare } from "@fortawesome/free-solid-svg-icons";
import {
  faFlag,
  faHeart as faHeartRegular,
  faPlusSquare,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import CustomBottomSheet from "../CustomBottomSheet";
import AddSongToPlaylist from "./AddSongToPlaylist";
import { TSong } from "../../types";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import apiConfig from "../../apis/apiConfig";
import { NavigationProp } from "../../navigation/TStack";
import { useNavigation } from "@react-navigation/native";
import { songApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface ModalSongProps {
  song: TSong;
  setOpenModal?: (boolean) => void;
}

const ModalSong = ({ song, setOpenModal }: ModalSongProps) => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [isLike, setIsLike] = React.useState<boolean>(false);
  const navigation = useNavigation<NavigationProp>();
  const { token } = useAuth();

  const checkLike = async () => {
    try {
      const res = await songApi.checkLikedSong(song.id, token);
      setIsLike(res.isLiked);
      console.log(res.isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    checkLike();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: "React Native | A framework for building native apps using React",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    const like = async () => {
      try {
        isLike ? await songApi.unLikeSong(song.id, token) : await songApi.likeSong(song.id, token);
      } catch (error) {
        console.log(error);
      }
    };
    like();
  };

  const handleGoDetail = () => {
    setOpenModal(false);
    navigation.navigate("Song", { songId: song?.id });
  };

  const handleGoArtist = () => {
    setOpenModal(false);
    navigation.navigate("Artist", { userId: song?.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.headerLeft} onPress={() => handleGoDetail()}>
          <Image
            style={{
              height: 50,
              width: 50,
              aspectRatio: 1,
              objectFit: "cover",
              overflow: "hidden",
              borderRadius: BORDERRADIUS.radius_4,
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
          width: "100%",
          height: 0.6,
          backgroundColor: COLORS.WhiteRGBA15,
        }}
      />

      <View style={styles.body}>
        <Item
          icon={isLike ? faHeart : faHeartRegular}
          title={isLike ? "Remove to favorites" : "Add to favorites"}
          itemFunc={() => handleLike()}
        />
        <Item icon={faPlusSquare} title="Add to playlist" itemFunc={() => setIsOpenModal(true)} />
        <Item icon={faMusic} title="View detail" itemFunc={() => handleGoDetail()} />
        <Item icon={faUser} title="View artist" itemFunc={() => handleGoArtist()} />
        <Item icon={faFlag} title="Repport" itemFunc={() => console.log("PRESS")} />
      </View>

      {isOpenModal && (
        <CustomBottomSheet isOpen={true} closeModal={() => setIsOpenModal(false)} height1={400}>
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
