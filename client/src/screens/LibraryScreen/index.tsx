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
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { COLORS, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ArtistCard from "../../components/ArtistCard";
import { WINDOW_WIDTH } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faMusic, faPlus, faSort, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigation/TStack";
import CustomBottomSheet from "../../components/CustomBottomSheet";
import { AddSongPlaylist, AddPlaylist } from "../../components/ItemModal";
import { useAuth } from "../../context/AuthContext";
import { ResFavourite, TPlaylist, TUser } from "../../types";
import { favouriteApi, playlistApi, userApi } from "../../apis";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface LibraryScreenProps {}

const LibraryScreen = (props: LibraryScreenProps) => {
  const [active, setActive] = useState("All");

  const [heightModal, setHeightModal] = useState<number>(50);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isOpenModalAddPlaylist, setIsOpenModalAddPlaylist] = React.useState<boolean>(false);

  return (
    <>
      <View style={[styles.container]}>
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity>
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
            <AddSongPlaylist setAddPlaylist={setIsOpenModalAddPlaylist} />
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
          <AddPlaylist setAddPlaylist={setIsOpenModalAddPlaylist} />
        </CustomBottomSheet>
      )}
    </>
  );
};

export default LibraryScreen;

const AllFavorites = () => {
  const navigation = useNavigation<NavigationProp>();
  const { token, currentUser } = useAuth();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<ResFavourite[]>(null);
  const [sort, setSort] = useState("new");

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [totalPage, setTotalPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const { data: countSongs } = useQuery({
    queryKey: ["count-songs-favorites"],
    queryFn: async () => {
      const res = await favouriteApi.getSongs(token, 1, 0);
      console.log(res.pagination.totalCount);

      return res.pagination.totalCount;
    },
  });

  const getAllData = async () => {
    const res = await favouriteApi.getAll(token, page, limit, sort);

    if (res.pagination.page === 1) {
      setData(null);
      setTotalPage(res.pagination.totalPages);
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
    setRefreshing(true);
    setTimeout(() => {
      setPage(1);
      queryClient.invalidateQueries({
        queryKey: ["all-favorites"],
      });
      setRefreshing(false);
    }, 2000);
  };

  const loadMore = () => {
    page < totalPage && setPage(page + 1);
  };

  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["all-favorites"] });
  }, [page]);

  React.useEffect(() => {
    setPage(1);
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
            <TouchableOpacity onPress={() => setSort((sort) => (sort === "new" ? "old" : "new"))}>
              <View style={styles.headerListLeft}>
                <FontAwesomeIcon icon={faSort} size={16} color={COLORS.White2} />
                <Text style={styles.headerListText}>
                  {sort === "new" ? "Recently add" : "Oldest add"}
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
                  <Text style={styles.descText}>{`Playlist - ${countSongs} songs`}</Text>
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
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<ResFavourite[]>(null);
  const [sort, setSort] = useState("new");

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [totalPage, setTotalPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const getAllData = async () => {
    const res = await favouriteApi.getPlaylists(token, page, limit, sort);
    console.log(data);

    if (res.pagination.page === 1) {
      setData(null);
      setTotalPage(res.pagination.totalPages);
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
    setRefreshing(true);
    setTimeout(() => {
      setPage(1);
      queryClient.invalidateQueries({
        queryKey: ["playlists-favorites"],
      });
      setRefreshing(false);
    }, 2000);
  };

  const loadMore = () => {
    page < totalPage && setPage(page + 1);
  };

  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["playlists-favorites"] });
  }, [page]);

  React.useEffect(() => {
    setPage(1);
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
            <TouchableOpacity onPress={() => setSort((sort) => (sort === "new" ? "old" : "new"))}>
              <View style={styles.headerListLeft}>
                <FontAwesomeIcon icon={faSort} size={16} color={COLORS.White2} />
                <Text style={styles.headerListText}>
                  {sort === "new" ? "Recently add" : "Oldest add"}
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
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<ResFavourite[]>(null);
  const [sort, setSort] = useState("new");

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [totalPage, setTotalPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const getAllData = async () => {
    const res = await favouriteApi.getArtists(token, page, limit, sort);
    console.log(data);

    if (res.pagination.page === 1) {
      setData(null);
      setTotalPage(res.pagination.totalPages);
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
    setRefreshing(true);
    setTimeout(() => {
      setPage(1);
      queryClient.invalidateQueries({
        queryKey: ["artists-follow"],
      });
      setRefreshing(false);
    }, 2000);
  };

  const loadMore = () => {
    page < totalPage && setPage(page + 1);
  };

  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["artists-follow"] });
  }, [page]);

  React.useEffect(() => {
    setPage(1);
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
            <TouchableOpacity onPress={() => setSort((sort) => (sort === "new" ? "old" : "new"))}>
              <View style={styles.headerListLeft}>
                <FontAwesomeIcon icon={faSort} size={16} color={COLORS.White2} />
                <Text style={styles.headerListText}>
                  {sort === "new" ? "Recently add" : "Oldest add"}
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
