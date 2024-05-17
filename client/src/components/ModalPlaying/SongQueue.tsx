import { TouchableHighlight, TouchableOpacity, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import * as React from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { ScrollView } from "react-native-gesture-handler";
import { IMAGES } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import LottieView from "lottie-react-native";
import { TSong } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { songApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import { usePlaying } from "../../context/PlayingContext";
import { apiConfig } from "../../configs";
import { useAudio } from "../../context/AudioContext";

interface SongQueueProps {}

const SongQueue = (props: SongQueueProps) => {
  const { songIdPlaying } = usePlaying();
  const { token } = useAuth();

  const {
    data: songs,
    refetch: refetchSongs,
    isLoading: loadingSongs,
  } = useQuery({
    queryKey: ["songs", "03ef6e3f-5c08-4bcd-b516-580aae618854"],
    queryFn: async () => {
      const res = await songApi.getAllByPlaylistId(
        token,
        "03ef6e3f-5c08-4bcd-b516-580aae618854",
        1,
        50
      );
      console.log(res.data);

      return res.data;
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.songTop}>
        <Song play songId={songIdPlaying} />
      </View>
      <View style={{ paddingVertical: SPACING.space_8 }}>
        <Text style={[styles.textMain]}>Song next</Text>
      </View>

      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {songs &&
          songs?.map((item, index) => {
            if (songIdPlaying === item.id) return <View key={index}></View>;
            return <Song key={index} songId={item.id} />;
          })}
      </ScrollView>
      {/* <FlatList
        style={styles.listSongs}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={songs}
        renderItem={({ item, index }) => {
          if (songIdPlaying === item.id) return <View key={index}></View>;
          return <Song key={index} songId={item.id} />;
        }}
      /> */}
    </View>
  );
};

export default SongQueue;

const Song = ({ play = false, songId }: { play?: boolean; songId: string }) => {
  const { token } = useAuth();
  const { songIdPlaying, changeSongPlaying, setOpenBarSong } = usePlaying();
  const { stopSound, playSound, isPlaying } = useAudio();
  // const [song, setSong] = React.useState<TSong>(null);

  const handlePlay = () => {
    if (songId === songIdPlaying && isPlaying) {
      stopSound();
    } else {
      changeSongPlaying(songId);
      playSound();
    }
  };

  // const handleGetDetails = async () => {
  //   try {
  //     const res = await songApi.getDetail(songId, token);
  //     setSong(res);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

  const { data: song } = useQuery({
    queryKey: ["song", songId],
    queryFn: async () => {
      const res = await songApi.getDetail(songId, token);
      return res;
    },
  });

  // React.useEffect(() => {
  //   handleGetDetails();
  // }, [songId]);

  return (
    song && (
      <View style={[styles.card, play && styles.play]}>
        <TouchableHighlight
          underlayColor={COLORS.WhiteRGBA32}
          style={{ borderRadius: BORDERRADIUS.radius_8 }}
          onPress={() => handlePlay()}
        >
          <View style={styles.cardSwapper}>
            <View style={styles.cardCenter}>
              <View style={styles.cardImage}>
                <Image
                  source={
                    song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG
                  }
                  style={styles.image}
                />
              </View>
              <View style={styles.cardBody}>
                <View>
                  <Text numberOfLines={1} style={styles.textMain}>
                    {song?.title}
                  </Text>
                  <Text numberOfLines={1} style={styles.textExtra}>
                    {song?.author}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.cardRight}>
              <TouchableOpacity style={styles.cardIcon}>
                {songIdPlaying === songId && isPlaying ? (
                  <LottieView
                    source={require("../../assets/images/music.json")}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    autoPlay
                    loop
                  />
                ) : (
                  <FontAwesomeIcon icon={faBars} size={20} color={COLORS.WhiteRGBA32} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: "100%",
    paddingHorizontal: SPACING.space_8,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  songTop: {},
  listSongs: {
    gap: SPACING.space_12,
    flexDirection: "column",
  },
  card: {
    padding: SPACING.space_4,
  },
  play: {
    backgroundColor: COLORS.WhiteRGBA32,
    borderRadius: BORDERRADIUS.radius_8,
  },
  cardSwapper: {
    flexDirection: "row",
    gap: SPACING.space_8,
    width: "100%",
    paddingHorizontal: SPACING.space_4,
    paddingVertical: SPACING.space_4,
    alignItems: "center",
  },
  cardLeft: {},
  cardCenter: {
    flex: 1,
    flexDirection: "row",
    gap: SPACING.space_8,
    alignItems: "center",
  },
  cardRight: {},
  cardImage: {
    width: 60,
    height: 60,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: BORDERRADIUS.radius_8,
    backgroundColor: COLORS.Black2,
  },
  cardBody: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardIcon: {
    padding: SPACING.space_8,
  },
});
