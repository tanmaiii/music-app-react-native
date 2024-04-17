import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Share, Modal } from "react-native";
import { IMAGES } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faMusic, faPenToSquare, faShare } from "@fortawesome/free-solid-svg-icons";
import {
  faFlag,
  faHeart as faHeartRegular,
  faPlusSquare,
  faTrashCan,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ModalSongProps {
  id?: number;
  setIsOpenAddSong: (boolean) => void;
  setIsOpenEdit: (boolean) => void;
}

const ModalSong = ({ id, setIsOpenAddSong, setIsOpenEdit }: ModalSongProps) => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: "React Native | A framework for building native apps using React",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={IMAGES.POSTER}
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
            <Text style={styles.textMain}>Thiên Lý ơi {id && id}</Text>
            <Text style={styles.textEtra}>Jack 5 củ</Text>
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
        <Item
          icon={faHeartRegular}
          title="Add to favorites"
          itemFunc={() => console.log("PRESS")}
        />
        <Item icon={faPlusSquare} title="Add song" itemFunc={() => setIsOpenAddSong(true)} />
        <Item icon={faPenToSquare} title="Edit playlist" itemFunc={() => setIsOpenEdit(true)} />
        <Item icon={faTrashCan} title="Delete playlist" itemFunc={() => console.log("PRESS")} />
        <Item icon={faUser} title="View artist" itemFunc={() => console.log("PRESS")} />
        <Item icon={faFlag} title="Repport" itemFunc={() => console.log("PRESS")} />
      </View>
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
