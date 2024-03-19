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

interface ItemHorizontalProps {
  title: string;
  desc: string;
  image_path?: string;
  type?: string;
}

const ItemHorizontal = (props: ItemHorizontalProps) => {
  const { title, desc, image_path, type } = props;

  const border = type === "Artist" ? 50 : 0;

  return (
    <TouchableHighlight
      onPress={() => Alert.alert("xIN CHO")}
      style={{ backgroundColor: COLORS.Black1 }}
      underlayColor={COLORS.Black}
    >
      <View style={styles.container}>
        <View style={[styles.boxImage, { borderRadius: border }]}>
          {title === "Liked Songs" ? (
            <AntDesign style={{ color: COLORS.White1 }} name="heart" size={24} color="black" />
          ) : (
            <Image style={[styles.image]} source={image_path || IMAGES.POSTER} />
          )}
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>{title}</Text>
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
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ItemHorizontal;
