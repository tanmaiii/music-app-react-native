import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import IMAGES from "../../constants/images";
import styles from "./style";
import { COLORS, SPACING } from "../../theme/theme";
import { Skeleton } from "moti/skeleton";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigation/TStack";
import { StackNavigationProp } from "@react-navigation/stack";

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: COLORS.Black2,
} as const;

const ArtistCard = (props: any) => {
  const { artist, loading = false } = props;
  const linkTo = useLinkTo();
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate("Artist", { id: artist.id });
  };

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <View
        style={[
          styles.container,
          { marginRight: SPACING.space_12 },
          { maxWidth: props.cardWidth || "100%" },
        ]}
      >
        <Skeleton
          radius="square"
          height={props.cardWidth}
          width={props.cardWidth}
          {...SkeletonCommonProps}
        >
          {loading ? null : (
            <Image
              style={[
                styles.image,
                { width: props.cardWidth || "100%", height: props.cardWidth || "100%" },
              ]}
              source={IMAGES.ARTIST}
            />
          )}
        </Skeleton>
        <View>
          <Skeleton height={18} width={"100%"} {...SkeletonCommonProps}>
            {loading ? null : (
              <Text numberOfLines={1} style={styles.textTitle}>
                {artist.title}
              </Text>
            )}
          </Skeleton>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCard;
