import { IconProp } from "@fortawesome/fontawesome-svg-core";
import * as React from "react";
import { Text, View, StyleSheet, Image, Share } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "@/theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IMAGES } from "@/constants";
import {
  faPenToSquare,
  faShare,
  faUserPlus,
  faUserXmark,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import CustomModal from "@/components/CustomModal";
import { TUser } from "@/types";
import apiConfig from "@/configs/axios/apiConfig";
import numeral from "numeral";
import { useAuth } from "@/context/AuthContext";
import { userApi } from "@/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/navigators/TStack";

type ModalArtistProps = {
  artist: TUser;
  setIsOpen: (value: boolean) => void;
};

const ModalArtist = ({ artist, setIsOpen }: ModalArtistProps) => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const { currentUser, token } = useAuth();
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationProp>();

  const { data: follow, isLoading: loadingFollow } = useQuery({
    queryKey: ["follow", artist.id],
    queryFn: async () => {
      const res = await userApi.checkFollowing(artist.id, token);
      return res.isFollowing;
    },
  });

  const { data: followers, isLoading: loadingFollower } = useQuery({
    queryKey: ["followers", artist.id],
    queryFn: async () => {
      const res = await userApi.getCountFollowers(artist.id);
      return res;
    },
  });

  const mutationFollow = useMutation({
    mutationFn: (follow: boolean) => {
      if (follow) return userApi.unFollow(artist.id, token);
      return userApi.follow(artist.id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["following"],
      });
      queryClient.invalidateQueries({
        queryKey: ["follow", artist.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["followers", artist.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["artists-follow"],
      });
    },
  });

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
                {numeral(followers).format("0a").toUpperCase()} following
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
              icon={follow ? faUserXmark : faUserPlus}
              title={follow ? "Unfollow" : "Follow"}
              itemFunc={() => (follow ? setIsOpenModal(true) : mutationFollow.mutate(follow))}
            />
          )}
          <Item
            icon={faPenToSquare}
            title="Edit profile"
            itemFunc={() => {
              setIsOpen(false);
              navigation.navigate("UserEditProfile");
            }}
          />
          <Item icon={faShare} title="Share" itemFunc={() => handleShare()} />
          <Item icon={faFlag} title="Repport" itemFunc={() => console.log("PRESS")} />
        </View>
      </View>
      {isOpenModal && (
        <CustomModal
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          header={"Unfollow artist"}
          modalFunction={() => mutationFollow.mutate(follow)}
        >
          <Text style={{ color: COLORS.White1, fontSize: FONTSIZE.size_16 }}>
            {`  Are you sure unfollow artist ${artist.name}?`}
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
