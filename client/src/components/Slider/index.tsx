import * as React from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { IMAGES } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";
import { WINDOW_WIDTH } from "../../utils";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { BORDERRADIUS, COLORS, SPACING } from "../../theme/theme";
import { Skeleton } from "moti/skeleton";
import { TSong } from "../../types";
import { apiConfig } from "../../configs";

const data = [
  {
    id: 1,
    image_path: require("../../assets/images/banner1.jpg"),
  },
  {
    id: 2,
    image_path: require("../../assets/images/banner2.jpg"),
  },
  {
    id: 3,
    image_path: require("../../assets/images/banner3.jpg"),
  },
];

const width = WINDOW_WIDTH - SPACING.space_12 * 2;

interface SliderProps {
  data?: TSong[];
  loading?: boolean;
}

const Slider = ({ loading = true }: SliderProps) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const flatlistRef = React.useRef<FlatList>();

  React.useEffect(() => {
    const autoPlay =
      !loading &&
      setInterval(() => {
        if (activeIndex === data.length - 1) {
          flatlistRef &&
            flatlistRef.current.scrollToIndex({
              index: 0,
              animated: true,
            });
        } else {
          flatlistRef &&
            flatlistRef.current.scrollToIndex({
              index: activeIndex + 1,
              animated: true,
            });
        }
      }, 2000);
    return () => clearInterval(autoPlay);
  });

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index: index,
  });

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / width;
    let roundedNumber = Math.round(index);
    // console.log(roundedNumber);

    setActiveIndex(roundedNumber);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.item}>
            <Skeleton height={"100%"} width={"100%"} radius={0} />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FlatList
          ref={flatlistRef}
          showsHorizontalScrollIndicator={false}
          data={data}
          getItemLayout={getItemLayout}
          horizontal={true}
          onScroll={handleScroll}
          pagingEnabled
          // snapToInterval={WINDOW_WIDTH - SPACING.space_12 * 2}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Image
                style={styles.item}
                // source={item.image_path ? { uri: apiConfig.imageURL(item.image_path) } : IMAGES.BG}
                source={item.image_path}
              />
            </View>
          )}
        />
      </View>
      <RenderDots data={data} activeIndex={activeIndex} />
    </View>
  );
};

const RenderDots = ({ data, activeIndex }: { data: any; activeIndex: number }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: WINDOW_WIDTH,
        justifyContent: "center",
        position: "absolute",
        bottom: 20,
        left: 0,
        gap: SPACING.space_8,
      }}
    >
      {data &&
        data?.map((item) => {
          return (
            <View
              key={item.id}
              style={[
                {
                  backgroundColor: COLORS.WhiteRGBA32,
                  height: 8,
                  width: 8,
                  borderRadius: 4,
                },
                activeIndex === item.id - 1 && { backgroundColor: COLORS.White1 },
              ]}
            ></View>
          );
        })}
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.space_12,
  },
  wrapper: {
    overflow: "hidden",
    borderRadius: BORDERRADIUS.radius_8,
    width: width,
    height: 200,
    position: "relative",
  },
  item: {
    width: width,
    height: 200,
    backgroundColor: COLORS.Black2,
  },
});
