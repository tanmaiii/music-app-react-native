import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { IMAGES } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faMusic, faShare } from "@fortawesome/free-solid-svg-icons";
import {
  faFlag,
  faHeart as faHeartRegular,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { TouchableHighlight } from "react-native-gesture-handler";
import CustomBottomSheet from "../CustomBottomSheet";
import ModalAddPlaylist from "./ModalAddPlaylist";

interface ModalSongProps {}

const ModalSong = (props: ModalSongProps) => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);

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
            <Text style={styles.textMain}>Thiên Lý ơi</Text>
            <Text style={styles.textEtra}>Jack 5 củ</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btnShare}>
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
        <TouchableHighlight
          underlayColor={COLORS.Black3}
          style={{ borderRadius: BORDERRADIUS.radius_8 }}
          onPress={() => console.log("PRESS")}
        >
          <View style={styles.item}>
            <FontAwesomeIcon icon={faHeartRegular} size={18} color={COLORS.White1} />
            <Text style={styles.itemText}>Add to favorites</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={COLORS.Black3}
          style={{ borderRadius: BORDERRADIUS.radius_8 }}
          onPress={() => setIsOpenModal(true)}
        >
          <View style={styles.item}>
            <FontAwesomeIcon icon={faPlusSquare} size={18} color={COLORS.White1} />
            <Text style={styles.itemText}>Add to playlist</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={COLORS.Black3}
          style={{ borderRadius: BORDERRADIUS.radius_8 }}
          onPress={() => console.log("PRESS")}
        >
          <View style={styles.item}>
            <FontAwesomeIcon icon={faFlag} size={18} color={COLORS.White1} />
            <Text style={styles.itemText}>Repport</Text>
          </View>
        </TouchableHighlight>
      </View>

      {isOpenModal && (
        <CustomBottomSheet isOpen={true} closeModal={() => setIsOpenModal(false)} height1={240}>
          <ModalAddPlaylist />
        </CustomBottomSheet>
      )}
    </View>
  );
};

export default ModalSong;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
