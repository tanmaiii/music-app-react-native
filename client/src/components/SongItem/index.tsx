import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import IMAGES from "../../constants/images";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { usePlaying } from "../../context/PlayingContext";
import { TSong } from "../../types";
import { ModalSong } from "../ItemModal";
import CustomBottomSheet from "../CustomBottomSheet";
import apiConfig from "../../configs/axios/apiConfig";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle, faDotCircle, faLock } from "@fortawesome/free-solid-svg-icons";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

interface SongItemProps {
  loading?: boolean;
  song?: TSong;
  playlistId?: string;
}

const SongItem = (props: SongItemProps) => {
  const { setOpenBarSong, setSongIdPlaying, songIdPlaying } = usePlaying();
  const { song, loading = false } = props;
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [heightModal, setHeightModal] = React.useState(100);
  const navigation = useNavigation();
  const route = useRoute();

  const handlePress = () => {
    setSongIdPlaying(song.id);
    setOpenBarSong(true);
  };

  return (
    <>
      <TouchableHighlight
        underlayColor={COLORS.Black2}
        onPress={() => handlePress()}
        style={styles.container}
      >
        <View style={styles.swapper}>
          <View style={styles.swapperImage}>
            <Skeleton radius={4} width={"100%"} height={"100%"} {...SkeletonCommonProps}>
              {loading ? null : (
                <Image
                  style={styles.image}
                  source={
                    song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG
                  }
                />
              )}
            </Skeleton>
          </View>
          <View style={styles.body}>
            <View style={{ gap: SPACING.space_4, flex: 1 }}>
              <Skeleton radius={4} width={180} height={16} {...SkeletonCommonProps}>
                {loading ? null : (
                  <Text numberOfLines={1} style={[styles.textMain]}>
                    {song?.public === 0 && (
                      <>
                        <FontAwesomeIcon icon={faLock} size={12} color={COLORS.White1} />{" "}
                      </>
                    )}
                    {song?.title}
                  </Text>
                )}
              </Skeleton>
              <Skeleton radius={4} width={100} height={16} {...SkeletonCommonProps}>
                {loading ? null : (
                  <View
                    style={{ flexDirection: "row", alignItems: "center", gap: SPACING.space_4 }}
                  >
                    <Text style={[styles.textEtra]}>{song.author}</Text>
                    <FontAwesomeIcon icon={faCircle} size={2} color={COLORS.White2} />
                    <Text style={[styles.textEtra]}>{moment(song?.created_at).format("YYYY")}</Text>
                  </View>
                )}
              </Skeleton>
            </View>
            {!loading && (
              <TouchableHighlight
                onPress={() => setIsOpenModal(!isOpenModal)}
                underlayColor={COLORS.Black2}
                style={styles.buttonMore}
              >
                <Feather name="more-horizontal" size={24} style={{ color: COLORS.White1 }} />
              </TouchableHighlight>
            )}
          </View>
        </View>
      </TouchableHighlight>
      {isOpenModal && (
        <CustomBottomSheet
          isOpen={true}
          closeModal={() => setIsOpenModal(false)}
          height1={heightModal}
        >
          <View onLayout={(event) => setHeightModal(event.nativeEvent.layout.height)}>
            <ModalSong song={song} setOpenModal={setIsOpenModal} playlistId={props.playlistId} />
          </View>
        </CustomBottomSheet>
      )}
    </>
  );
};

export default SongItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.space_12,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White1,
  },
  textEtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  swapper: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  swapperImage: {
    height: 50,
    width: 50,
    overflow: "hidden",
    borderRadius: BORDERRADIUS.radius_4,
    alignItems: "center",
    backgroundColor: COLORS.Black2,
  },
  image: {
    height: 50,
    width: 50,
    aspectRatio: 1 / 1,
    objectFit: "cover",
  },
  body: {
    flex: 1,
    marginLeft: SPACING.space_8,
    borderBottomWidth: 0.6,
    borderColor: COLORS.WhiteRGBA15,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
  },
  buttonMore: {
    position: "relative",
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  buttonMoreBody: {
    flex: 1,
    position: "absolute",
    flexDirection: "column",
    right: 0,
    top: "100%",
    backgroundColor: COLORS.Black2,
    padding: SPACING.space_4,
  },
});
