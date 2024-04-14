import { IconProp } from "@fortawesome/fontawesome-svg-core";
import * as React from "react";
import { Text, View, StyleSheet, Image, Share } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IMAGES } from "../../constants";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { faPenToSquare, faShare, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faFlag,
  faHeart as faHeartRegular,
  faPlusSquare,
  faTrashCan,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

interface ModalArtistProps {}

const ModalArtist = (props: ModalArtistProps) => {
  const [isFollow, setIsFollow] = React.useState<boolean>(false);

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
              borderRadius: 25,
            }}
          />
          <View style={styles.headerDesc}>
            <Text style={styles.textMain}>Phương Ly</Text>
            <Text style={styles.textEtra}>Artist</Text>
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
          icon={isFollow ? faHeart : faHeartRegular}
          title={isFollow ? "Unfollow" : "Follow"}
          itemFunc={() => setIsFollow(!isFollow)}
        />
        <Item icon={faPlusSquare} title="Add song" itemFunc={() => console.log("PRESS")} />
        <Item icon={faPenToSquare} title="Edit playlist" itemFunc={() => console.log("PRESS")} />
        <Item icon={faFlag} title="Repport" itemFunc={() => console.log("PRESS")} />
      </View>
    </View>
  );
};

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

export default ModalArtist;

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
  },
  body: {
    paddingVertical: SPACING.space_8
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
