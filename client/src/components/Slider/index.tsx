import * as React from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { IMAGES } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";
import { WINDOW_WIDTH } from "../../utils";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { BORDERRADIUS, COLORS, SPACING } from "../../theme/theme";

const data = [
  {
    id: 1,
    image: IMAGES.AI,
  },
  {
    id: 2,
    image: IMAGES.ARTIST,
  },
  {
    id: 3,
    image: IMAGES.BG,
  },
];

const width = WINDOW_WIDTH - SPACING.space_12 * 2;

interface SliderProps {}

const Slider = (props: SliderProps) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(1);
  const flatlistRef = React.useRef<FlatList>();

  React.useEffect(() => {
    const autoPlay = setInterval(() => {
      if (activeIndex === data.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
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
    setActiveIndex(roundedNumber);
  };

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
              <Image style={styles.item} source={item.image} />
            </View>
          )}
        />
      </View>
      <RenderDots activeIndex={activeIndex} />
    </View>
  );
};

const RenderDots = (props: any) => {
  const { activeIndex } = props;
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
      {data.map((ite, index) => {
        return (
          <View
            style={[
              {
                backgroundColor: COLORS.WhiteRGBA32,
                height: 8,
                width: 8,
                borderRadius: 4,
              },
              activeIndex === index && { backgroundColor: COLORS.White1 },
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
  },
});
