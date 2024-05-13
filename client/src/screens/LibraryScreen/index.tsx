import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableHighlight,
  FlatList,
  RefreshControl,
} from "react-native";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import IMAGES from "../../constants/images";
import ItemHorizontal from "../../components/ItemHorizontal";
import { COLORS, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faMusic, faPlus, faSort, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigators/TStack";
import CustomBottomSheet from "../../components/CustomBottomSheet";
import { CreateSongPlaylist, CreatePlaylist } from "../../components/ItemModal";
import { useAuth } from "../../context/AuthContext";
import { ResFavourite, TPlaylist, TUser } from "../../types";
import { favouriteApi, playlistApi, userApi } from "../../apis";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../context/ToastContext";

interface LibraryScreenProps {}

const LibraryScreen = (props: LibraryScreenProps) => {
  const [active, setActive] = useState("All");

  const [heightModal, setHeightModal] = useState<number>(50);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isOpenModalAddPlaylist, setIsOpenModalAddPlaylist] = React.useState<boolean>(false);

  const { setToastMessage } = useToast();

  return (
    <>
      <View style={[styles.container]}>
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => setToastMessage("xin chao")}>
                <Image source={IMAGES.LOGO} style={styles.headerImage} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Library</Text>
            </View>
            <TouchableOpacity onPress={() => setOpenModal(!openModal)}>
              <FontAwesomeIcon icon={faPlus} size={24} style={styles.headerIcon} />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.category}
          >
            <TouchableOpacity
              onPress={() => setActive("All")}
              style={[styles.categoryItem, active === "All" && styles.categoryItemActive]}
            >
              <Text style={styles.categoryItemText}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActive("Playlists")}
              style={[styles.categoryItem, active === "Playlists" && styles.categoryItemActive]}
            >
              <Text style={styles.categoryItemText}>Playlists</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActive("Artists")}
              style={[styles.categoryItem, active === "Artists" && styles.categoryItemActive]}
            >
              <Text style={styles.categoryItemText}>Artists</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>

        <View style={{ height: 10 }}></View>

        {active === "All" && <AllFavorites />}
        {active === "Playlists" && <PlaylistFavourites />}
        {active === "Artists" && <ArtistFavourites />}
      </View>

      {openModal && (
        <CustomBottomSheet
          isOpen={true}
          closeModal={() => setOpenModal(false)}
          height1={heightModal}
        >
          <View onLayout={(event) => setHeightModal(event.nativeEvent.layout.height)}>
            <CreateSongPlaylist setAddPlaylist={setIsOpenModalAddPlaylist} />
          </View>
        </CustomBottomSheet>
      )}

      {isOpenModalAddPlaylist && (
        <CustomBottomSheet
          isOpen={true}
          closeModal={() => setIsOpenModalAddPlaylist(false)}
          height1={"100%"}
          enableClose={false}
          border={false}
        >
          <CreatePlaylist setCreatePlaylist={setIsOpenModalAddPlaylist} />
        </CustomBottomSheet>
      )}
    </>
  );
};

export default LibraryScreen;

const AllFavorites = () => {
  const navigation = useNavigation<NavigationProp>();
  const { token, currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [data, setData] = useState<ResFavourite[]>(null);

  const [state, setState] = React.useState({
    page: 1,
    limit: 10,
    loading: false,
    totalPages: 1,
    totalCount: 0,
    refreshing: false,
    keyword: "",
    sort: "new",
  });

  const { limit, page, loading, sort, totalPages, keyword, refreshing } = state;

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const { data: countSongs } = useQuery({
    queryKey: ["count-songs-favorites"],
    queryFn: async () => {
      const res = await favouriteApi.getSongs(token, 1, 0);
      return res.pagination.totalCount;
    },
  });

  const getAllData = async () => {
    const res = await favouriteApi.getAll(token, page, limit, sort);

    if (res.pagination.page === 1) {
      setData(null);
      updateState({ totalPages: res.pagination.totalPages });
      setData(res.data);
    } else {
      setData((pres) => [...pres, ...res.data]);
    }

    return res;
  };

  const { data: dataAll } = useQuery({
    queryKey: ["all-favorites"],
    queryFn: getAllData,
  });

  const handleRefresh = () => {
    updateState({ refreshing: true });
    setTimeout(() => {
      updateState({ page: 1 });
      queryClient.invalidateQueries({
        queryKey: ["all-favorites"],
      });
      updateState({ refreshing: false });
    }, 2000);
  };

  const loadMore = () => {
    page < totalPages && updateState({ page: page + 1 });
  };

  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["all-favorites"] });
  }, [page]);

  React.useEffect(() => {
    updateState({ page: 1 });
    queryClient.invalidateQueries({ queryKey: ["all-favorites"] });
  }, [sort]);

  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          title="Refresh now"
          tintColor={COLORS.White1}
          titleColor={COLORS.White1}
        />
      }
      onEndReached={loadMore}
      keyExtractor={(item: any) => item.id}
      horizontal={false}
      style={styles.scroll}
      contentContainerStyle={{
        paddingBottom: HEIGHT.playingCard + HEIGHT.navigator + 50,
      }}
      ListHeaderComponent={
        <>
          <View style={styles.headerList}>
            <TouchableOpacity
              onPress={() =>
                updateState({ sort: sort === "new" ? "old" : sort === "old" ? "alpha" : "new" })
              }
            >
              <View style={styles.headerListLeft}>
                <FontAwesomeIcon icon={faSort} size={16} color={COLORS.White2} />
                <Text style={styles.headerListText}>
                  {sort === "new"
                    ? "Recently added"
                    : sort === "old"
                    ? "Oldest added"
                    : "Alphabetical"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableHighlight
            underlayColor={COLORS.Black}
            onPress={() => navigation.navigate("ListSongLike", { userId: currentUser.id })}
          >
            <View style={styles.likeSong}>
              <View style={styles.boxImage}>
                <FontAwesomeIcon icon={faHeart} size={24} color={COLORS.White1} />
              </View>
              <View style={styles.body}>
                <Text style={styles.title}>Like Song</Text>
                <View style={styles.desc}>
                  <FontAwesomeIcon icon={faThumbTack} size={14} color={COLORS.Primary} />
                  <Text style={styles.descText}>{`Playlist - ${countSongs || 0} songs`}</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </>
      }
      renderItem={({ item, index }) => <ItemHorizontal type={item?.type} data={item} key={index} />}
    />
  );
};

const PlaylistFavourites = () => {
  const navigation = useNavigation<NavigationProp>();
  const { token, currentUser } = useAuth();
  const [data, setData] = useState<ResFavourite[]>(null);
  const queryClient = useQueryClient();

  const [state, setState] = React.useState({
    page: 1,
    limit: 10,
    loading: false,
    totalPages: 1,
    totalCount: 0,
    refreshing: false,
    keyword: "",
    sort: "new",
  });

  const { limit, page, loading, sort, totalPages, keyword, refreshing } = state;

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const getAllData = async () => {
    const res = await favouriteApi.getPlaylists(token, page, limit, sort);
    if (res.pagination.page === 1) {
      setData(null);
      updateState({ totalPages: res.pagination.totalPages });
      setData(res.data);
    } else {
      setData((pres) => [...pres, ...res.data]);
    }

    return res;
  };

  const { data: dataAll } = useQuery({
    queryKey: ["playlists-favorites"],
    queryFn: getAllData,
  });

  const handleRefresh = () => {
    updateState({ refreshing: true });
    setTimeout(() => {
      updateState({ page: 1 });
      queryClient.invalidateQueries({
        queryKey: ["playlists-favorites"],
      });
      updateState({ refreshing: false });
    }, 2000);
  };

  const loadMore = () => {
    page < totalPages && updateState({ page: true });
  };

  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["playlists-favorites"] });
  }, [page]);

  React.useEffect(() => {
    updateState({ page: 1 });
    queryClient.invalidateQueries({ queryKey: ["playlists-favorites"] });
  }, [sort]);

  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          title="Refresh now"
          tintColor={COLORS.White1}
          titleColor={COLORS.White1}
        />
      }
      onEndReached={loadMore}
      keyExtractor={(item: any) => item.id}
      horizontal={false}
      style={styles.scroll}
      contentContainerStyle={{
        paddingBottom: HEIGHT.playingCard + HEIGHT.navigator + 50,
      }}
      ListHeaderComponent={
        <>
          <View style={styles.headerList}>
            <TouchableOpacity
              onPress={() =>
                updateState({ sort: sort === "new" ? "old" : sort === "old" ? "alpha" : "new" })
              }
            >
              <View style={styles.headerListLeft}>
                <FontAwesomeIcon icon={faSort} size={16} color={COLORS.White2} />
                <Text style={styles.headerListText}>
                  {sort === "new"
                    ? "Recently added"
                    : sort === "old"
                    ? "Oldest added"
                    : "Alphabetical"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      }
      renderItem={({ item, index }) => <ItemHorizontal type={"playlist"} data={item} key={index} />}
    />
  );
};

const ArtistFavourites = () => {
  const navigation = useNavigation<NavigationProp>();
  const { token, currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [data, setData] = useState<ResFavourite[]>(null);

  const [state, setState] = React.useState({
    page: 1,
    limit: 10,
    loading: false,
    totalPages: 1,
    totalCount: 0,
    refreshing: false,
    keyword: "",
    sort: "new",
  });

  const { limit, page, loading, sort, totalPages, keyword, refreshing } = state;

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const getAllData = async () => {
    const res = await favouriteApi.getArtists(token, page, limit, sort);
    if (res.pagination.page === 1) {
      setData(null);
      updateState({ totalPages: res.pagination.totalPages });
      setData(res.data);
    } else {
      setData((pres) => [...pres, ...res.data]);
    }

    return res;
  };

  const { data: dataAll } = useQuery({
    queryKey: ["artists-follow"],
    queryFn: getAllData,
  });

  const handleRefresh = () => {
    updateState({ refreshing: true });
    setTimeout(() => {
      updateState({ page: 1 });
      queryClient.invalidateQueries({
        queryKey: ["artists-follow"],
      });
      updateState({ refreshing: false });
    }, 2000);
  };

  const loadMore = () => {
    page < totalPages && updateState({ page: page + 1 });
  };

  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["artists-follow"] });
  }, [page]);

  React.useEffect(() => {
    updateState({ page: 1 });
    queryClient.invalidateQueries({ queryKey: ["artists-follow"] });
  }, [sort]);

  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          title="Refresh now"
          tintColor={COLORS.White1}
          titleColor={COLORS.White1}
        />
      }
      onEndReached={loadMore}
      keyExtractor={(item: any) => item.id}
      horizontal={false}
      style={styles.scroll}
      contentContainerStyle={{
        paddingBottom: HEIGHT.playingCard + HEIGHT.navigator + 50,
      }}
      ListHeaderComponent={
        <>
          <View style={styles.headerList}>
            <TouchableOpacity
              onPress={() =>
                updateState({ sort: sort === "new" ? "old" : sort === "old" ? "alpha" : "new" })
              }
            >
              <View style={styles.headerListLeft}>
                <FontAwesomeIcon icon={faSort} size={16} color={COLORS.White2} />
                <Text style={styles.headerListText}>
                  {sort === "new"
                    ? "Recently added"
                    : sort === "old"
                    ? "Oldest added"
                    : "Alphabetical"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      }
      renderItem={({ item, index }) => <ItemHorizontal type={"artist"} data={item} key={index} />}
    />
  );
};
