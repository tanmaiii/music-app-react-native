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
  navigation: any;
  loading?: boolean;
}

const ItemHorizontal = (props: ItemHorizontalProps) => {
  const { title, desc, image_path, id, type, navigation, loading = false } = props;

  const border = type === "Artist" ? 50 : 0;

  const handleTouch = () => {
    navigation.push("ArtistDetail", { id: id });
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

export default ItemHorizontal;
