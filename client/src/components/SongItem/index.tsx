import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import IMAGES from "../../constants/images";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import { useNavigation } from "@react-navigation/native";
import { usePlaying } from "../../context/PlayingContext";
import { TSong } from "../../types";
import { ModalSong } from "../ItemModal";
import CustomBottomSheet from "../CustomBottomSheet";

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
  song: TSong;
}

const SongItem = (props: SongItemProps) => {
  const { setOpenBarSong } = usePlaying();
  const { song, loading = false } = props;
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [activeMore, setActiveMore] = React.useState(false);
  const navigation = useNavigation();

  return (
    <>
      <TouchableHighlight
        underlayColor={COLORS.Black2}
        onPress={() => setOpenBarSong(true)}
        style={styles.container}
      >
        <View style={styles.swapper}>
          <View style={styles.swapperImage}>
            <Skeleton radius={4} width={"100%"} height={"100%"} {...SkeletonCommonProps}>
              {loading ? null : <Image style={styles.image} source={IMAGES.POSTER} />}
            </Skeleton>
          </View>
          <View style={styles.body}>
            <View style={{ gap: SPACING.space_4 }}>
              <Skeleton radius={4} width={180} height={18} {...SkeletonCommonProps}>
                {loading ? null : <Text style={styles.textMain}>Chắc ai đó sẽ về {song.id}</Text>}
              </Skeleton>
              <Skeleton radius={4} width={100} height={18} {...SkeletonCommonProps}>
                {loading ? null : <Text style={styles.textEtra}>12.343.000 - 2017</Text>}
              </Skeleton>
            </View>
            <TouchableHighlight
              onPress={() => setIsOpenModal(true)}
              underlayColor={COLORS.Black2}
              style={styles.buttonMore}
            >
              <Feather name="more-horizontal" size={24} style={{ color: COLORS.White1 }} />
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
      {isOpenModal && (
        <CustomBottomSheet isOpen={true} closeModal={() => setIsOpenModal(false)} height1={240}>
          <ModalSong id={song.id} />
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
    height: "100%",
    width: "100%",
    aspectRatio: 1 / 1,
    objectFit: "cover",
  },
  body: {
    marginLeft: SPACING.space_8,
    borderBottomWidth: 0.6,
    borderColor: COLORS.WhiteRGBA15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
  },
  buttonMore: {
    position: "relative",
    // backgroundColor: COLORS.Black2,
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
    // width: "100%",
    // top: 0,
    right: 0,
    top: "100%",
    backgroundColor: COLORS.Black2,
    padding: SPACING.space_4,
  },
});
