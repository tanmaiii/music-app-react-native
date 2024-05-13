import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import styles from "./style";
import IMAGES from "../../constants/images";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../../theme/theme";
import { AntDesign } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import TouchableScale from "../TouchableScale";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigators/TStack";
import { ResFavourite, TPlaylist, TUser } from "../../types";
import apiConfig from "../../configs/axios/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

interface ItemHorizontalProps {
  data?: ResFavourite;
  loading?: boolean;
  type?: string;
}

const ItemHorizontal = (props: ItemHorizontalProps) => {
  const { data, loading = false, type } = props;
  const navigation = useNavigation<NavigationProp>();

  const linkTo = useLinkTo();

  return (
    <View>
      {type === "artist" && (
        <TouchableOpacity onPress={() => navigation.navigate("Artist", { userId: data.id })}>
          <View style={styles.container}>
            <View style={styles.boxImage}>
              <Image
                style={[styles.image, { borderRadius: 50 }]}
                source={
                  data?.image_path ? { uri: apiConfig.imageURL(data.image_path) } : IMAGES.AVATAR
                }
              />
            </View>
            <View style={styles.body}>
              <Text style={styles.title} numberOfLines={1}>
                {data?.name}
              </Text>
              <Text style={styles.descText}>Artist</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {type === "playlist" && (
        <TouchableOpacity onPress={() => navigation.navigate("Playlist", { playlistId: data.id })}>
          <View style={styles.container}>
            <View style={styles.boxImage}>
              <Image
                style={[styles.image, { borderRadius: BORDERRADIUS.radius_8 }]}
                source={
                  data?.image_path ? { uri: apiConfig.imageURL(data.image_path) } : IMAGES.PLAYLIST
                }
              />
            </View>
            <View style={styles.body}>
              <Text style={styles.title} numberOfLines={1}>
                {data?.title}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: SPACING.space_4 }}>
                <Text numberOfLines={1} style={[styles.descText]}>
                  Playlist
                </Text>
                <FontAwesomeIcon icon={faCircle} size={2} color={COLORS.White2} />
                <Text numberOfLines={1} style={[styles.descText]}>
                  {data.author}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
//
export default ItemHorizontal;
