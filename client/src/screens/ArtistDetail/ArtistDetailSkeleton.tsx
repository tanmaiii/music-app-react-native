import { faChevronLeft, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { Skeleton } from "moti/skeleton";
import * as React from "react";
import {
  Platform,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CategoryHeader from "@/components/CategoryHeader";
import SongItem from "@/components/SongItem";
import { NavigationProp } from "@/navigators/TStack";
import { COLORS, SPACING } from "@/theme/theme";
import styles from "./style";
const statusBarHeight = Constants.statusBarHeight;

const SkeletonCommonProps = {
  colorMode: "dark",
  type: "timing",
  duration: 1000,
  backgroundColor: COLORS.Black3,
} as const;

interface ArtistDetailSkeletonProps {}
const HEIGHT_AVATAR = 400;

const ArtistDetailSkeleton = (props: ArtistDetailSkeletonProps) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ zIndex: 99 }}>
        <View
          style={[
            styles.header,
            Platform.OS === "ios" && { paddingTop: statusBarHeight + SPACING.space_8 },
          ]}
        >
          <TouchableHighlight
            underlayColor={COLORS.Black2}
            style={[styles.buttonHeader]}
            onPress={() => navigation.goBack()}
          >
            <FontAwesomeIcon icon={faChevronLeft} size={18} style={styles.icon} />
          </TouchableHighlight>

          <Text numberOfLines={1} style={[styles.title]}>
            <Skeleton {...SkeletonCommonProps} width={100} height={18} />
          </Text>

          <TouchableHighlight underlayColor={COLORS.Black2} style={[styles.buttonHeader]}>
            <FontAwesomeIcon icon={faEllipsis} size={18} style={styles.icon} />
          </TouchableHighlight>
        </View>
      </SafeAreaView>

      <ScrollView>
        <View style={[{ height: HEIGHT_AVATAR }]}>
          <View style={styles.imageAvatar}>
            <Skeleton {...SkeletonCommonProps} width="100%" height="100%" radius={0} />
          </View>
        </View>
        <View style={styles.body}>
          <View style={{ paddingHorizontal: SPACING.space_10 }}>
            <Skeleton {...SkeletonCommonProps} width={100} height={18} radius={4} />
          </View>
          <View style={styles.bodyTop}>
            <Skeleton {...SkeletonCommonProps} width={100} height={44} radius={20} />
            <View style={styles.bodyTop}>
              <Skeleton {...SkeletonCommonProps} width={44} height={44} radius={22} />
              <Skeleton {...SkeletonCommonProps} width={44} height={44} radius={22} />
            </View>
          </View>
          <View style={{ paddingHorizontal: SPACING.space_10 }}>
            <Skeleton {...SkeletonCommonProps} width="100%" height={100} radius={4} />
            <CategoryHeader title="Song" loading={true} />
          </View>
          <SongItem song={null} loading={true} />
          <SongItem song={null} loading={true} />
          <SongItem song={null} loading={true} />
          <SongItem song={null} loading={true} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ArtistDetailSkeleton;
