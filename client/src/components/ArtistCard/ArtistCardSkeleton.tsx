import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import IMAGES from "../../constants/images";
import styles from "./style";
import { COLORS, SPACING } from "../../theme/theme";
import { Skeleton } from "moti/skeleton";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigation/TStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { TUser } from "../../types";
import apiConfig from "../../configs/axios/apiConfig";

const SkeletonCommonProps = {
  colorMode: "dark",
  //   transition: {
  //     type: "timing",
  //     duration: 1500,
  //   },
  backgroundColor: COLORS.Black2,
} as const;

const ArtistCardSkeleton = (prop) => {
  return (
    <TouchableOpacity>
      <View style={[styles.container]}>
        <View style={styles.wrapperImage}>
          <Skeleton {...SkeletonCommonProps} radius="round" width={"100%"} height={170} />
        </View>

        <View style={{ gap: SPACING.space_4 }}>
          <Skeleton height={20} width={"100%"} {...SkeletonCommonProps} radius={6} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCardSkeleton;
