import { songApi } from "@/apis";
import { apiConfig } from "@/configs";
import { IMAGES } from "@/constants";
import { useAudio } from "@/context/AudioContext";
import { useAuth } from "@/context/AuthContext";
import { useBarSong } from "@/context/BarSongContext";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "@/theme/theme";
import { TSong } from "@/types";
import { WINDOW_WIDTH } from "@/utils";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useQuery } from "@tanstack/react-query";
import LottieView from "lottie-react-native";
import * as React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList, {
  OpacityDecorator,
  RenderItemParams,
  ScaleDecorator,
  ShadowDecorator,
} from "react-native-draggable-flatlist";
import { Swipeable } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

interface SongQueueProps {
  setIsOpen: (value: boolean) => void;
}

const SongQueue = ({ setIsOpen }: SongQueueProps) => {
  const { songIdPlaying } = useAudio();
  const { token } = useAuth();
  const [songs, setSongs] = React.useState<TSong[]>([]);

  const {
    data,
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
      setSongs(res.data);
      return res.data;
    },
  });

  const renderItem = ({ item, drag, isActive }: RenderItemParams<TSong>) => {
    if (item.id === songIdPlaying) return;
    return (
      <ScaleDecorator>
        <OpacityDecorator>
          <ShadowDecorator>
            <Animated.View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onLongPress={drag}
                activeOpacity={1}
                style={[{ elevation: isActive ? 30 : 0 }]}
              >
                <Song songId={item.id} songsNew={songs} setSongsNew={setSongs} />
              </TouchableOpacity>
            </Animated.View>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faXmark} size={28} color={COLORS.White2} />
        </TouchableOpacity>
        <Text style={styles.textMain}>{`Danh sách phát (${songs.length})`}</Text>
      </View>

      <View style={styles.songTop}>
        <Song play songId={songIdPlaying} songsNew={songs} setSongsNew={setSongs} />
      </View>

      <View style={{ padding: SPACING.space_12 }}>
        <Text style={[styles.textMain]}>Next song</Text>
      </View>

      <View style={{ flex: 1 }}>
        {songs && (
          <DraggableFlatList
            showsVerticalScrollIndicator={false}
            data={songs}
            onDragEnd={({ data }) => setSongs(data)}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
};

export default SongQueue;

type SongProps = {
  play?: boolean;
  songId: string;
  songsNew: TSong[];
  setSongsNew: (value: TSong[]) => void;
};

const Song = ({ play = false, songId, songsNew, setSongsNew }: SongProps) => {
  const { token } = useAuth();
  const { stopSound, playSound, isPlaying, songIdPlaying } = useAudio();
  const [swipingRight, setSwipingRight] = React.useState(false);

  const handlePlay = () => {
    if (songId === songIdPlaying && isPlaying) {
      stopSound();
    } else {
      playSound(songId);
    }
  };

  const handleDelete = () => {
    const updatedSongs = songsNew.filter((song) => song.id !== songId);
    setSongsNew(updatedSongs);
  };

  const { data: song } = useQuery({
    queryKey: ["song", songId],
    queryFn: async () => {
      const res = await songApi.getDetail(songId, token);
      return res;
    },
  });

  const RightSwipe = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          paddingHorizontal: SPACING.space_12,
        }}
      >
        <TouchableOpacity
          onPress={() => handleDelete()}
          style={{
            backgroundColor: COLORS.Red,
            padding: SPACING.space_12,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 60,
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} color={COLORS.White1} size={18} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    song && (
      <Swipeable renderRightActions={RightSwipe}>
        <View style={[styles.card]}>
          <View style={{ borderRadius: BORDERRADIUS.radius_8 }}>
            <View style={[styles.cardSwapper, play && styles.play]}>
              <TouchableOpacity onPress={() => handlePlay()} style={[styles.cardCenter]}>
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
              </TouchableOpacity>
              {!swipingRight && (
                <View style={styles.cardRight}>
                  <View style={[styles.cardIcon]}>
                    {songIdPlaying === songId ? (
                      <LottieView
                        source={require("@/assets/images/music.json")}
                        style={{
                          width: 20,
                          height: 20,
                        }}
                        speed={isPlaying ? 1 : 0}
                        autoPlay
                        loop
                      />
                    ) : (
                      <FontAwesomeIcon icon={faBars} size={20} color={COLORS.WhiteRGBA32} />
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </Swipeable>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: "100%",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_12,
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_12,
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
    // width: "100%",
    // flex: 1,
    width: WINDOW_WIDTH,
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_4,
    // backgroundColor: 'pink'
  },
  play: {
    backgroundColor: COLORS.WhiteRGBA32,
    borderRadius: BORDERRADIUS.radius_8,
  },
  cardSwapper: {
    width: "100%",
    // backgroundColor: "pink",
    flexDirection: "row",
    gap: SPACING.space_8,
    paddingHorizontal: SPACING.space_4,
    paddingVertical: SPACING.space_4,
    // textAlign: 'center',
    // alignItems: "center",
    justifyContent: "space-between",
  },
  cardCenter: {
    flex: 1,
    flexDirection: "row",
    gap: SPACING.space_8,
    alignItems: "center",
  },
  cardRight: {
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
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
