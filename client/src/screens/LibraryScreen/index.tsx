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
import { TPlaylist, TUser } from "../../types";
import { playlistApi, userApi } from "../../apis";
import { useQuery } from "@tanstack/react-query";

interface LibraryScreenProps {}

const LibraryScreen = (props: LibraryScreenProps) => {
  const [active, setActive] = useState("Playlists");
  const [sort, setSort] = useState("new");
  const [heightModal, setHeightModal] = useState<number>(50);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isOpenModalAddPlaylist, setIsOpenModalAddPlaylist] = React.useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [playlists, setPlaylists] = React.useState<TPlaylist[]>(null);
  const [artists, setArtists] = React.useState<TUser[]>(null);
  const [limitPlaylists, setLimitPlaylists] = useState<number>(6);
  const [limitArtists, setLimitArtists] = useState<number>(6);
  const [pagePlaylists, setPagePlaylists] = useState<number>(1);
  const [totalPagePlaylists, setTotalPagePlaylists] = useState<number>(1);
  const [totalPageArtists, settotalPageArtists] = useState<number>(1);
  const [pageArtists, setPageArtists] = useState<number>(1);
  const { token, currentUser } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const getPlaylists = async () => {
    const res = await playlistApi.getAllFavoritesByUser(
      token,
      pagePlaylists,
      limitPlaylists,
      null,
      sort
    );
    if (res.pagination.page === 1) {
      setPlaylists(res.data);
      setTotalPagePlaylists(res.pagination.totalPages);
    } else {
      setPlaylists((prevSongs) => [...prevSongs, ...res.data]);
    }
    return res.data;
  };

  const getArtist = async () => {
    const res = await userApi.getFollowing(currentUser.id, pageArtists, limitArtists, null, sort);
    if (res.pagination.page === 1) {
      setArtists(res.data);
      settotalPageArtists(res.pagination.totalPages);
    } else {
      setArtists((prevSongs) => [...prevSongs, ...res.data]);
    }
    return res.data;
  };

  const {} = useQuery({
    queryKey: ["playlists-favorites"],
    queryFn: async () => {
      return getPlaylists();
    },
  });

  const {} = useQuery({
    queryKey: ["artists-follow"],
    queryFn: async () => {
      return getArtist();
    },
  });

  const handleRefresh = () => {
    setRefreshing(true);

    active === "Playlists" && (setPageArtists(1), getPlaylists());

    active === "Artists" && (setPagePlaylists(1), getArtist());

    setRefreshing(false);
  };

  const loadMore = () => {
    console.log("Load more");

    active === "Playlists" &&
      pagePlaylists < totalPagePlaylists &&
      setPagePlaylists(pagePlaylists + 1);

    active === "Artists" && pageArtists < totalPageArtists && setPageArtists(pageArtists + 1);
  };
  React.useEffect(() => {
    setPageArtists(1);
    setPagePlaylists(1);
    getPlaylists();
    getArtist();
  }, [sort]);

  React.useEffect(() => {
    getPlaylists();
    getArtist();
  }, [currentUser, , pageArtists, pagePlaylists, limitArtists, limitPlaylists]);

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

        {active === "Playlists" && (
          <FlatList
            data={playlists}
            refreshing={refreshing}
            onEndReached={loadMore}
            onRefresh={handleRefresh}
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
                    onPress={() => setSort((sort) => (sort === "new" ? "old" : "new"))}
                  >
                    <View style={styles.headerListLeft}>
                      <FontAwesomeIcon icon={faSort} size={16} color={COLORS.White2} />
                      <Text style={styles.headerListText}>
                        {sort === "new" ? "Recently add" : "Oldest add"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {active === "Playlists" && (
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
                          <Text style={styles.descText}>Playlist - 26 songs</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableHighlight>
                )}
              </>
            }
            renderItem={({ item, index }) => <ItemHorizontal playlist={item} key={index} />}
          />
        )}

        {active === "Artists" && (
          <FlatList
            data={artists}
            onEndReached={loadMore}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            keyExtractor={(item: any) => item.id}
            style={[styles.scroll]}
            contentContainerStyle={{
              paddingBottom: HEIGHT.playingCard + HEIGHT.navigator + 50,
            }}
            ListHeaderComponent={
              <View style={styles.headerList}>
                <TouchableOpacity
                  onPress={() => setSort((sort) => (sort === "new" ? "old" : "new"))}
                >
                  <View style={styles.headerListLeft}>
                    <FontAwesomeIcon icon={faSort} size={16} color={COLORS.White2} />
                    <Text style={styles.headerListText}>
                      {sort === "new" ? "Recently add" : "Oldest add"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            }
            renderItem={({ item, index }) => {
              return <ItemHorizontal artist={item} key={index} />;
            }}
          />
        )}
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
