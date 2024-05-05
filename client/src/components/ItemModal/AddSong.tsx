import {
  faMagnifyingGlass,
  faXmark,
  faPlusCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Constants from "expo-constants";
import { IMAGES } from "../../constants";
import CustomModal from "../CustomModal";
import { TSong } from "../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { playlistApi, songApi } from "../../apis";
import { apiConfig } from "../../configs";
import { useAuth } from "../../context/AuthContext";
import { Skeleton } from "moti/skeleton";
import CustomInput from "../CustomInput";

const statusBarHeight = Constants.statusBarHeight;

const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 1000,
  },
  backgroundColor: COLORS.Black3,
} as const;

interface AddSongProps {
  id: string;
  setIsOpen: (boolean) => void;
}

const AddSong = ({ setIsOpen, id }: AddSongProps) => {
  const textInputRef = React.useRef<TextInput>();
  const queryClient = useQueryClient();
  const [songs, setSongs] = React.useState<TSong[]>(null);

  const [state, setState] = React.useState({
    page: 1,
    limit: 7,
    loading: false,
    totalPages: 1,
    totalCount: 0,
    refreshing: false,
    keyword: "",
  });

  const { limit, page, loading, totalPages, keyword } = state;

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const handleGetData = async () => {
    const res = await songApi.getAll(page, limit, keyword && keyword);
    if (res.pagination.page === 1) {
      setSongs(null);
      updateState({ totalPages: res.pagination.totalPages });
      setSongs(res.data);
    } else {
      setSongs((prev) => [...prev, ...res.data]);
    }
    return res;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["all-songs", id],
    queryFn: handleGetData,
  });

  React.useEffect(() => {
    updateState({ page: 1 });
    queryClient.invalidateQueries({ queryKey: ["all-songs", id] });
  }, [keyword]);

  React.useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["all-songs", id],
    });
  }, [page]);

  const loadMore = () => {
    page < totalPages && updateState({ page: page + 1 });
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={[styles.header]}>
          <View>
            <View style={styles.groupTitle}>
              <TouchableOpacity style={styles.buttonClose} onPress={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faXmark} size={24} color={COLORS.White2} />
              </TouchableOpacity>
              <View>
                <Text style={styles.textMain}>Add song to playlist</Text>
              </View>
              <TouchableOpacity style={styles.buttonClose}></TouchableOpacity>
            </View>
            <CustomInput onSubmit={(text) => updateState({ keyword: text })} />
          </View>
        </SafeAreaView>
        <FlatList
          data={songs}
          onEndReached={loadMore}
          renderItem={({ item, index }) => (
            <SongItem key={index} song={item} playlistId={id} loading={isLoading} />
          )}
        />
      </View>
    </>
  );
};

export default AddSong;

type TSongItem = {
  song: TSong;
  playlistId: string;
  loading?: boolean;
};

const SongItem = ({ song, playlistId, loading = false }: TSongItem) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const { data: countSongs } = useQuery({
    queryKey: ["count-songs", playlistId],
    queryFn: async () => {
      const res = await songApi.getAllByPlaylistId(token, playlistId, 1, 0);
      return res.pagination.totalCount;
    },
  });

  const { data: isAdd, isLoading } = useQuery({
    queryKey: ["check-song", song.id, playlistId],
    queryFn: async () => {
      try {
        const res = await playlistApi.checkSongInPlaylist(playlistId, song.id, token);
        return res.isAdd;
      } catch (error) {
        console.log(error.response.data);
        return false;
      }
    },
  });

  const mutationAdd = useMutation({
    mutationFn: async (isAdd: boolean) => {
      if (isAdd) return await playlistApi.removeSong(playlistId, song.id, token);
      if (countSongs < 10) return await playlistApi.addSong(playlistId, song.id, token);
      setOpenModal(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["check-song", song.id, playlistId],
      });
      queryClient.invalidateQueries({
        queryKey: ["count-songs", playlistId],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs", playlistId],
      });
    },
  });

  return (
    <>
      <TouchableOpacity onPress={() => mutationAdd.mutate(isAdd)}>
        <View style={styles.card} onTouchStart={Keyboard.dismiss}>
          <View style={styles.cardImage}>
            {loading ? (
              <Skeleton {...SkeletonCommonProps} height={"100%"} width={"100%"} />
            ) : (
              <Image
                source={
                  song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG
                }
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.cardBody}>
            <View style={{ gap: SPACING.space_4 }}>
              {loading ? (
                <Skeleton {...SkeletonCommonProps} radius={4} height={18} width={100} />
              ) : (
                <Text numberOfLines={1} style={styles.textMain}>
                  {song.title}
                </Text>
              )}

              {loading ? (
                <Skeleton {...SkeletonCommonProps} radius={4} height={14} width={100} />
              ) : (
                <Text numberOfLines={1} style={styles.textEtra}>
                  {song.author}
                </Text>
              )}
            </View>
          </View>
          {loading ? (
            <Skeleton {...SkeletonCommonProps} height={30} width={30} radius={"round"} />
          ) : (
            <TouchableOpacity onPress={() => mutationAdd.mutate(isAdd)} style={styles.cardIcon}>
              {isAdd ? (
                <FontAwesomeIcon icon={faCheckCircle} size={24} color={COLORS.Primary} />
              ) : (
                <FontAwesomeIcon icon={faPlusCircle} size={24} color={COLORS.White2} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      {openModal && (
        <CustomModal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          header="Number of songs"
          modalFunction={() => console.log("Xin chao")}
        >
          <View>
            <Text style={styles.textMain}>The maximum playlist can only be 50 songs !</Text>
          </View>
        </CustomModal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black2,
  },
  textMain: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.medium,
    color: COLORS.White1,
  },
  textEtra: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  header: {
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_16,
    gap: SPACING.space_12,
  },
  buttonClose: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  groupTitle: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: SPACING.space_12,
  },
  boxInput: {
    backgroundColor: COLORS.Black3,
    paddingHorizontal: SPACING.space_14,
    paddingVertical: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: "row",
    gap: SPACING.space_12,
    alignItems: "center",
  },
  textInput: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.regular,
    flex: 1,
  },
  body: {},
  card: {
    flexDirection: "row",
    gap: SPACING.space_12,
    width: "100%",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_8,
    alignItems: "center",
  },
  cardImage: {
    width: 60,
    height: 60,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: BORDERRADIUS.radius_8,
    backgroundColor: COLORS.Black3,
    borderColor: COLORS.WhiteRGBA15,
    borderWidth: 0.6,
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
