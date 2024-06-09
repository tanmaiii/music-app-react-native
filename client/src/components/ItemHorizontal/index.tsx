import * as React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import apiConfig from "../../configs/axios/apiConfig";
import IMAGES from "../../constants/images";
import { NavigationProp } from "../../navigators/TStack";
import { BORDERRADIUS, COLORS, SPACING } from "../../theme/theme";
import { ResSoPaAr } from "../../types";
import styles from "./style";
import ItemHorizontalSkeleton from "./ItemHorizontalSkeleton";

interface ItemHorizontalProps {
  data?: ResSoPaAr;
  loading?: boolean;
  type?: string;
}

const ItemHorizontal = (props: ItemHorizontalProps) => {
  const { data, loading = false, type } = props;
  const navigation = useNavigation<NavigationProp>();

  if (loading) return <ItemHorizontalSkeleton type={type} />;

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

      {type === "song" && (
        <TouchableOpacity onPress={() => navigation.navigate("Song", { songId: data.id })}>
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
                  song
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
