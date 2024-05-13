import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import styles from "./style";
import { Skeleton } from "moti/skeleton";
import { SPACING } from "../../theme/theme";

interface PlaylistDetailSkeletonProps {}

const PlaylistDetailSkeleton = (props: PlaylistDetailSkeletonProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.wrapperHeader]}>
        <View style={[styles.wrapperImage]}>
          <Skeleton width="100%" height="100%" />
        </View>

        <Skeleton width={200} height={40} />
        <Skeleton width="80%" height={18} />
        <Skeleton width="80%" height={18} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: SPACING.space_12,
          }}
        >
          <Skeleton width={40} height={40} radius={"round"} />

          <Skeleton width={140} height={40} radius={20} />

          <Skeleton width={40} height={40} radius={"round"} />
        </View>
        <View style={{ padding: SPACING.space_12 }}>
          <Skeleton height={60} width={"100%"} radius={4} />
        </View>
      </View>
    </View>
  );
};

export default PlaylistDetailSkeleton;
