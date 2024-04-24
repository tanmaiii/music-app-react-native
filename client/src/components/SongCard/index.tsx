import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TSong } from "../../types/song.type";
import IMAGES from "../../constants/images";
import { Skeleton } from "moti/skeleton";
import { Ionicons } from "@expo/vector-icons";

import styles from "./style";
import { COLORS, SPACING } from "../../theme/theme";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { usePlaying } from "../../context/PlayingContext";
import { NavigationProp } from "../../navigation/TStack";
import apiConfig from "../../configs/axios/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

interface SongCardProps {
  loading?: boolean;
  song: TSong;
}

const SongCard = (props: SongCardProps) => {
  const { song, loading = false } = props;
  const { setOpenBarSong, setSongPlaying, setOpenModalSong } = usePlaying();
  const linkTo = useLinkTo();
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate("Song", { songId: song.id });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container]}>
        <View style={styles.wrapperImage}>
          {loading ? (
            <Skeleton {...SkeletonCommonProps} width={"100%"} height={170} />
          ) : (
            <>
              <Image
                style={[styles.image]}
                source={
                  song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG
                }
              />
              <View style={styles.buttonPlay}>
                <FontAwesomeIcon icon={faPlay} size={24} color={COLORS.White1} />
              </View>
            </>
          )}
        </View>

        <View style={{ gap: SPACING.space_4 }}>
          <Skeleton height={18} width={"100%"} {...SkeletonCommonProps}>
            {loading ? null : (
              <Text numberOfLines={1} style={styles.textTitle}>
                {song.title}
              </Text>
            )}
          </Skeleton>
          <Skeleton height={14} width={80} {...SkeletonCommonProps}>
            {loading ? null : (
              <Text numberOfLines={2} style={styles.textDes}>
                {song.author}
              </Text>
            )}
          </Skeleton>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SongCard;
