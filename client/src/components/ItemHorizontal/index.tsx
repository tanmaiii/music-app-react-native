import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";

import styles from "./style";
import IMAGES from "../../constants/images";
import { BORDERRADIUS, COLORS, FONTSIZE } from "../../theme/theme";
import { AntDesign } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import TouchableScale from "../TouchableScale";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigation/TStack";
import { TPlaylist, TUser } from "../../types";
import apiConfig from "../../apis/apiConfig";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

interface ItemHorizontalProps {
  artist?: TUser;
  playlist?: TPlaylist;
  loading?: boolean;
}

const ItemHorizontal = (props: ItemHorizontalProps) => {
  const { artist, playlist, loading = false } = props;
  const navigation = useNavigation<NavigationProp>();

  const linkTo = useLinkTo();

  return (
    <View>
      {artist && (
        <TouchableHighlight
          onPress={() => navigation.navigate("Artist", { userId: artist.id })}
          style={{ backgroundColor: COLORS.Black1 }}
          underlayColor={COLORS.Black}
        >
          <View style={styles.container}>
            <View style={styles.boxImage}>
              <Image
                style={[styles.image, { borderRadius: 50 }]}
                source={
                  artist?.image_path
                    ? { uri: apiConfig.imageURL(artist.image_path) }
                    : IMAGES.AVATAR
                }
              />
            </View>
            <View style={styles.body}>
              <Text style={styles.title} numberOfLines={1}>
                {artist?.name}
              </Text>
              <Text style={styles.descText}>Artist</Text>
            </View>
          </View>
        </TouchableHighlight>
      )}
      {playlist && (
        <TouchableHighlight
          onPress={() => navigation.navigate("Playlist", { playlistId: playlist.id })}
          style={{ backgroundColor: COLORS.Black1 }}
          underlayColor={COLORS.Black}
        >
          <View style={styles.container}>
            <View style={styles.boxImage}>
              <Image
                style={[styles.image, { borderRadius: BORDERRADIUS.radius_8 }]}
                source={
                  playlist?.image_path
                    ? { uri: apiConfig.imageURL(playlist.image_path) }
                    : IMAGES.PLAYLIST
                }
              />
            </View>
            <View style={styles.body}>
              <Text style={styles.title} numberOfLines={1}>
                {playlist?.title}
              </Text>
              <Text style={styles.descText}>Playlist</Text>
            </View>
          </View>
        </TouchableHighlight>
      )}
    </View>
  );
};
//
export default ItemHorizontal;
