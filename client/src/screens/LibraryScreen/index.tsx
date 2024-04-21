import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableHighlight,
  Alert,
  Dimensions,
  StatusBar,
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
import { faHeart, faMusic, faPlus, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigation/TStack";
import CustomBottomSheet from "../../components/CustomBottomSheet";
import { AddSongPlaylist, AddPlaylist } from "../../components/ItemModal";
import { useAuth } from "../../context/AuthContext";
import { TPlaylist, TUser } from "../../types";
import { playlistApi, userApi } from "../../apis";
const { width, height } = Dimensions.get("window");

interface LibraryScreenProps {}

const LibraryScreen = (props: LibraryScreenProps) => {
  const [active, setActive] = useState("Playlists");
  const navigation = useNavigation<NavigationProp>();
  const [heightModal, setHeightModal] = useState<number>(50);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isOpenModalAddPlaylist, setIsOpenModalAddPlaylist] = React.useState<boolean>(false);
  const { currentUser } = useAuth();
  const [artists, setArtists] = useState<TUser[]>(null);
  const [playlists, setPlaylists] = useState<TPlaylist[]>(null);
  const [data, setData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { token } = useAuth();

  const getData = async () => {
    try {
      console.log("Goi ne");
      const resArtist = await userApi.getFollowing(currentUser.id, 1, 10);
      const resPlaylist = await playlistApi.getAllFavoritesByUser(token, 1, 10);
      setPlaylists(resPlaylist.data);
      setArtists(resArtist.data);
    } catch (err) {
      console.log(err.response.data.conflictError);
    }
  };

  React.useEffect(() => {}, [artists, playlists]);

  const handleRefresh = () => {
    setRefreshing(true);
    getData();
    console.log("Load");
    setRefreshing(false);
  };

  React.useEffect(() => {
    getData();
  }, [currentUser]);

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
                  <View style={styles.headerListLeft}>
                    <FontAwesome
                      name="sort"
                      size={24}
                      color="black"
                      style={{ fontSize: FONTSIZE.size_14, color: COLORS.White2 }}
                    />
                    <Text style={styles.headerListText}>Recently played</Text>
                  </View>
                  <View style={styles.headerListRight}>
                    <MaterialIcons
                      style={styles.headerListIcon}
                      name="grid-view"
                      size={24}
                      color="black"
                    />
                  </View>
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
            refreshing={refreshing}
            onRefresh={handleRefresh}
            keyExtractor={(item: any) => item.id}
            horizontal={false}
            style={[
              styles.scroll,
              { paddingVertical: SPACING.space_12, width: "100%" },
            ]}
            contentContainerStyle={{
              paddingBottom: HEIGHT.playingCard + HEIGHT.navigator + 50,
            }}
            ListHeaderComponent={
              <View style={styles.headerList}>
                <View style={styles.headerListLeft}>
                  <FontAwesome
                    name="sort"
                    size={24}
                    color="black"
                    style={{ fontSize: FONTSIZE.size_14, color: COLORS.White2 }}
                  />
                  <Text style={styles.headerListText}>Recently played</Text>
                </View>
                <View style={styles.headerListRight}>
                  <MaterialIcons
                    style={styles.headerListIcon}
                    name="grid-view"
                    size={24}
                    color="black"
                  />
                </View>
              </View>
            }
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{ width: WINDOW_WIDTH / 3 - SPACING.space_8, padding: SPACING.space_8 }}
                >
                  <ArtistCard artist={item} />
                </View>
              );
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
