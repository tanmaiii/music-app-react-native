import { IconProp } from "@fortawesome/fontawesome-svg-core";
import * as React from "react";
import { Text, View, StyleSheet, Image, Share } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IMAGES } from "../../constants";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import {
  faPenToSquare,
  faShare,
  faUserPlus,
  faUserXmark,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import CustomModal from "../CustomModal";
import { TUser } from "../../types";
import apiConfig from "../../apis/apiConfig";
import numeral from "numeral";
import { useAuth } from "../../context/AuthContext";
import { userApi } from "../../apis";

type ModalArtistProps = {
  artist: TUser;
  countFollowing: numeral;
};

const ModalArtist = ({ artist, countFollowing }: ModalArtistProps) => {
  const [isFollow, setIsFollow] = React.useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const { currentUser, token } = useAuth();

  const checkFollowing = async () => {
    try {
      const res = artist.id && (await userApi.checkFollowing(artist.id, token));
      setIsFollow(res.isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollow) {
        await userApi.unFollow(artist.id, token);
        countFollowing !== 0 && countFollowing - 1;
      } else {
        await userApi.follow(artist.id, token);
        countFollowing++;
      }
      checkFollowing();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: "React Native | A framework for building native apps using React",
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    checkFollowing(), [artist];
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={
                artist?.image_path ? { uri: apiConfig.imageURL(artist.image_path) } : IMAGES.AVATAR
              }
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
              <Text style={styles.textMain}>{artist?.name}</Text>
              <Text style={styles.textEtra}>
                {numeral(countFollowing).format("0a").toUpperCase()} following
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 0.6,
            backgroundColor: COLORS.WhiteRGBA15,
          }}
        />
        <View style={styles.body}>
          {currentUser.id !== artist.id && (
            <Item
              icon={isFollow ? faUserXmark : faUserPlus}
              title={isFollow ? "Unfollow" : "Follow"}
              itemFunc={() => handleFollow()}
            />
          )}
          <Item icon={faPenToSquare} title="Edit profile" itemFunc={() => console.log("PRESS")} />
          <Item icon={faShare} title="Share" itemFunc={() => handleShare()} />
          <Item icon={faFlag} title="Repport" itemFunc={() => console.log("PRESS")} />
        </View>
      </View>
      {isOpenModal && (
        <CustomModal
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          header={"Unfollow artist"}
          modalFunction={() => setIsFollow(false)}
        >
          <Text style={{ color: COLORS.White1, fontSize: FONTSIZE.size_16 }}>
            Are you sure unfollow artist Phuong Ly ?
          </Text>
        </CustomModal>
      )}
    </>
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
