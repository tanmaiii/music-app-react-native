import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  Modal,
  Platform,
  SafeAreaView,
} from "react-native";
import { IMAGES } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckCircle,
  faGlobe,
  faLock,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { FlatList, TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { TPlaylist, TSong } from "../../types";
import CustomBottomSheet from "../CustomBottomSheet";
import CreatePlaylist from "./CreatePlaylist";
import Constants from "expo-constants";
import { playlistApi, songApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiConfig } from "../../configs";
import CustomInput from "../CustomInput";
import ItemHorizontal from "../ItemHorizontal";
import { Skeleton } from "moti/skeleton";
import CustomModal from "../CustomModal";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
const statusBarHeight = Constants.statusBarHeight;

const SkeletonCommonProps = {
  colorMode: "dark",
  type: "timing",
  duration: 1000,
  backgroundColor: COLORS.Black3,
} as const;

interface AddSongToPlaylistProps {
  songId: string;
}

const AddSongToPlaylist = ({ songId }: AddSongToPlaylistProps) => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const { currentUser, token } = useAuth();
  const queryClient = useQueryClient();
  const [playlists, setPlaylists] = React.useState(null);

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

  const getPlaylists = async () => {
    const res = await playlistApi.getMe(token, page, limit, keyword);
    if (res.pagination.page === 1) {
      setPlaylists(null);
      updateState({ totalPages: res.pagination.totalPages });
      setPlaylists(res.data);
    } else {
      setPlaylists((prev) => [...prev, ...res.data]);
    }
    return res;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["playlists", currentUser.id],
    queryFn: getPlaylists,
  });

  React.useEffect(() => {
    updateState({ page: 1 });
    queryClient.invalidateQueries({ queryKey: ["playlists", currentUser.id] });
  }, [keyword]);

  React.useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["playlists", currentUser.id],
    });
  }, [page]);

  const loadMore = () => {
    page < totalPages && updateState({ page: page + 1 });
  };

  return (
    <>
      <View style={styles.container} onTouchStart={Keyboard.dismiss}>
        <SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.textMain}>Add to playlist</Text>
          </View>
        </SafeAreaView>

        <View style={styles.headerSearch}>
          <CustomInput onSubmit={(text) => updateState({ keyword: text })} />
        </View>

        <FlatList
          data={playlists}
          style={styles.body}
          onEndReached={loadMore}
          contentContainerStyle={{
            paddingBottom: SPACING.space_20,
          }}
          ListHeaderComponent={
            <TouchableHighlight
              underlayColor={COLORS.Black3}
              onPress={() => setIsOpenModal(true)}
              style={{ borderRadius: BORDERRADIUS.radius_8 }}
            >
              <View style={styles.card}>
                <View
                  style={[styles.cardImage, { justifyContent: "center", alignItems: "center" }]}
                >
                  <FontAwesomeIcon icon={faPlus} size={30} color={COLORS.White2} />
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.textMain}>Add playlist</Text>
                </View>
              </View>
            </TouchableHighlight>
          }
          renderItem={({ item, index }) => (
            <Item key={index} playlist={item} songId={songId} loading={isLoading} />
          )}
        />
      </View>
      {isOpenModal && (
        <CustomBottomSheet
          isOpen={true}
          closeModal={() => setIsOpenModal(false)}
          height1={"100%"}
          enableClose={false}
          border={false}
        >
          <CreatePlaylist setCreatePlaylist={setIsOpenModal} />
        </CustomBottomSheet>
      )}
    </>
  );
};

const Item = ({
  playlist,
  songId,
  loading = false,
}: {
  playlist: TPlaylist;
  songId: string;
  loading?: boolean;
}) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const { data: countSongs } = useQuery({
    queryKey: ["count-songs", playlist.id],
    queryFn: async () => {
      const res = await songApi.getAllByPlaylistId(token, playlist.id, 1, 0);
      return res.pagination.totalCount;
    },
  });

  const { data: isAdd, isLoading } = useQuery({
    queryKey: ["check-song", songId, playlist.id],
    queryFn: async () => {
      try {
        const res = await playlistApi.checkSongInPlaylist(playlist.id, songId, token);
        return res.isAdd;
      } catch (error) {
        console.log(error.response.data);
        return false;
      }
    },
  });

  const mutationAdd = useMutation({
    mutationFn: async (isAdd: boolean) => {
      if (isAdd) return await playlistApi.removeSong(playlist.id, songId, token);
      if (countSongs < 10) return await playlistApi.addSong(playlist.id, songId, token);
      setOpenModal(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["check-song", songId, playlist.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["count-songs", playlist.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["songs", playlist.id],
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
                  playlist?.image_path
                    ? { uri: apiConfig.imageURL(playlist.image_path) }
                    : IMAGES.PLAYLIST
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
                  {playlist.title}
                </Text>
              )}

              {loading ? (
                <Skeleton {...SkeletonCommonProps} radius={4} height={14} width={100} />
              ) : (
                <View style={{ flexDirection: "row", gap: SPACING.space_4, alignItems: "center" }}>
                  {playlist?.public === 0 ? (
                    <FontAwesomeIcon icon={faLock} color={COLORS.White2} size={10} />
                  ) : (
                    <FontAwesomeIcon icon={faGlobe} color={COLORS.White2} size={10} />
                  )}
                  <Text numberOfLines={1} style={styles.textEtra}>
                    {`${countSongs} songs`}
                  </Text>
                </View>
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

export default AddSongToPlaylist;

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
    flexDirection: "row",
    padding: SPACING.space_14,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.space_8,
    borderBottomColor: COLORS.WhiteRGBA15,
    borderBottomWidth: 0.6,
  },
  headerSearch: {
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_8,
  },
  body: {
    flexDirection: "column",
  },
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
    backgroundColor: COLORS.Black3,
    borderRadius: BORDERRADIUS.radius_8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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
