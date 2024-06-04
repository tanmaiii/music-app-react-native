import { Skeleton } from "moti/skeleton";
import * as React from "react";
import { COLORS } from "../../theme/theme";

const SkeletonCommonProps = {
  colorMode: "dark",
  type: "timing",
  duration: 1500,
  backgroundColor: COLORS.Black2,
} as const;

const ArtistItemSkeleton = () => {
  return <Skeleton {...SkeletonCommonProps} radius={8} width={"100%"} height={100} />;
};

export default ArtistItemSkeleton;
