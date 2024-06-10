import { searchApi } from "@/apis";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "moti/skeleton";
import * as React from "react";
import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { TSong } from "../../types";
import { WINDOW_WIDTH } from "../../utils";
import { apiConfig } from "@/configs";
import { IMAGES } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeadphonesSimple } from "@fortawesome/free-solid-svg-icons";
import { NavigationProp } from "@/navigators/TStack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const width = WINDOW_WIDTH - SPACING.space_12 * 2;

interface SliderProps {
  loading?: boolean;
  refetch?: boolean;
}

const Slider: React.FC<SliderProps> = ({ loading = true, refetch = false }) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const flatlistRef = React.useRef<FlatList<TSong>>(null);
  const { token } = useAuth();
  const [data, setData] = React.useState<TSong[] | null>(null);
  const navigation = useNavigation<NavigationProp>();

  const getData = async () => {
    try {
      const res = await searchApi.getPopular(token, 1, 3, null, "new");
      console.log(res);
      res && setData(res && res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
    // console.log(apiConfig.imageURL(data[0]?.image_path));
  }, [refetch]);

  React.useEffect(() => {
    const autoPlay =
      !loading &&
      data &&
      setInterval(() => {
        if (activeIndex === data.length - 1) {
          flatlistRef &&
            flatlistRef.current?.scrollToIndex({
              index: 0,
              animated: true,
            });
        } else {
          flatlistRef &&
            flatlistRef.current?.scrollToIndex({
              index: activeIndex + 1,
              animated: true,
            });
        }
      }, 2000);
    return () => clearInterval(autoPlay);
  }, [activeIndex, data, flatlistRef, loading]);

  const getItemLayout = React.useCallback(
    (data: TSong[] | null, index: number) => ({
      length: width,
      offset: width * index,
      index: index,
    }),
    []
  );

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / width;
    let roundedNumber = Math.round(index);
    // console.log(roundedNumber);

    setActiveIndex(roundedNumber);
  };

  if (loading || refetch) {
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
            <View style={styles.item} key={item.id}>
              <ImageBackground
                style={styles.item}
                source={
                  item?.image_path ? { uri: apiConfig.imageURL(item.image_path) } : IMAGES.SONG
                }
              >
                <LinearGradient colors={["transparent", COLORS.Black2]} style={styles.gradient}>
                  <View style={styles.listen}>
                    <FontAwesomeIcon color={COLORS.White2} icon={faHeadphonesSimple} size={14} />
                    <Text style={styles.textExtra}>{item?.count}</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Song", { songId: item?.id })}
                    >
                      <Text style={styles.textMain}>{item?.title}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textExtra}>{item?.author}</Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
          )}
        />
      </View>
      <RenderDots data={data} activeIndex={activeIndex} />
    </View>
  );
};

const RenderDots: React.FC<{ data: TSong[] | null; activeIndex: number }> = ({
  data,
  activeIndex,
}) => {
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
        data?.map((item, index) => {
          return (
            <View
              key={index}
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
  textExtra: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White2,
    fontFamily: FONTFAMILY.regular,
  },
  textMain: {
    fontSize: FONTSIZE.size_30,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.bold,
  },
  wrapper: {
    overflow: "hidden",
    borderRadius: BORDERRADIUS.radius_8,
    width: width,
    height: 400,
    position: "relative",
  },
  item: {
    width: width,
    height: 400,
    backgroundColor: COLORS.Black2,
  },
  gradient: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    height: "100%",
    width: "100%",
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_16,
  },
  listen: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_8,
    backgroundColor: COLORS.BlackRGB32,
    paddingHorizontal: SPACING.space_12,
    paddingVertical: 6,
    borderRadius: BORDERRADIUS.radius_14,
    position: "absolute",
    top: SPACING.space_16,
    right: SPACING.space_16,
  },
});
