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
import { COLORS, FONTSIZE } from "../../theme/theme";
import { AntDesign } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import TouchableScale from "../TouchableScale";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigation/TStack";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

interface ItemHorizontalProps {
  id: number;
  title: string;
  desc: string;
  image_path?: string;
  type?: string;
  loading?: boolean;
}

const ItemHorizontal = (props: ItemHorizontalProps) => {
  const { title, desc, image_path, id, type, loading = false } = props;
  const navigation = useNavigation<NavigationProp>();

  const linkTo = useLinkTo();

  const border = type === "Artist" ? 50 : 8;

  const handleTouch = () => {
    if (type === "Artist") {
      navigation.navigate("Artist", { id: 123 });
    } else if (type === "Playlist") {
      navigation.navigate("Playlist", { id: 123 });
    }
  };

  return (
    <TouchableHighlight
      onPress={() => handleTouch()}
      style={{ backgroundColor: COLORS.Black1 }}
      underlayColor={COLORS.Black}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.boxImage,
            ,
            title === "Liked Songs" && { backgroundColor: COLORS.Primary },
          ]}
        >
          {title === "Liked Songs" ? (
            <AntDesign style={{ color: COLORS.White1 }} name="heart" size={24} color="black" />
          ) : (
            <Skeleton height={"100%"} width={"100%"} {...SkeletonCommonProps}>
              {loading ? null : (
                <Image
                  style={[styles.image, { borderRadius: border }]}
                  source={image_path || IMAGES.POSTER}
                />
              )}
            </Skeleton>
          )}
        </View>
        <View style={styles.body}>
          <Skeleton {...SkeletonCommonProps} height={18} width={"60%"}>
            {loading ? null : <Text style={styles.title}>{title}</Text>}
          </Skeleton>
          <Skeleton {...SkeletonCommonProps} height={18} width={"40%"}>
            {loading ? null : (
              <View style={styles.desc}>
                {title === "Liked Songs" && (
                  <AntDesign
                    style={{ color: COLORS.Primary, fontSize: FONTSIZE.size_14 }}
                    name="pushpin"
                    size={24}
                    color="black"
                  />
                )}
                <Text style={styles.descText}>{desc}</Text>
              </View>
            )}
          </Skeleton>
        </View>
      </View>
    </TouchableHighlight>
  );
};
//
export default ItemHorizontal;
