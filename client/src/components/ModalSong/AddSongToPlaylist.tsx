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
} from "react-native";
import { IMAGES } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faGlassCheers,
  faHeart,
  faMagnifyingGlass,
  faMusic,
  faPlus,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFlag,
  faHeart as faHeartRegular,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { FlatList, TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { TSong } from "../../types";
import CustomBottomSheet from "../CustomBottomSheet";
import { AddPlaylist, AddSong } from "../ModalPlaylist";
import Constants from "expo-constants";
import EditPlaylist from "../ModalPlaylist/EditPlaylist";
const statusBarHeight = Constants.statusBarHeight;

const songs: TSong[] = [
  {
    id: 1,
    title: "Despacito, Despacito ,Despacito, Despacito",
    image_path: "despacito.jpg",
    author: "Luis Fonsi",
  },
  { id: 2, title: "Shape of You", image_path: "shape_of_you.jpg", author: "Ed Sheeran" },
  {
    id: 3,
    title: "Uptown Funk",
    image_path: "uptown_funk.jpg",
    author: "Mark Ronson ft. Bruno Mars",
  },
  { id: 4, title: "Closer", image_path: "closer.jpg", author: "The Chainsmokers ft. Halsey" },
  {
    id: 5,
    title: "See You Again",
    image_path: "see_you_again.jpg",
    author: "Wiz Khalifa ft. Charlie Puth",
  },
  { id: 6, title: "God's Plan", image_path: "gods_plan.jpg", author: "Drake" },
  {
    id: 7,
    title: "Old Town Road",
    image_path: "old_town_road.jpg",
    author: "Lil Nas X ft. Billy Ray Cyrus",
  },
];

interface AddSongToPlaylistProps {}

const AddSongToPlaylist = (props: AddSongToPlaylistProps) => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);

  return (
    <>
      <View style={styles.container} onTouchStart={Keyboard.dismiss}>
        <View style={[styles.header]}>
          <Text style={styles.textMain}>Add song to playlist</Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 0.6,
            backgroundColor: COLORS.WhiteRGBA15,
            marginBottom: SPACING.space_12,
          }}
        />
        <FlatList
          data={songs}
          style={styles.body}
          ListHeaderComponent={
            <>
              <View style={{ paddingHorizontal: SPACING.space_4, marginBottom: SPACING.space_4 }}>
                <View style={styles.inputBox}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size={18} color={COLORS.White2} />
                  <BottomSheetTextInput
                    style={styles.textInput}
                    placeholderTextColor={COLORS.WhiteRGBA32}
                    placeholder="Search playlist ..."
                  />
                </View>
              </View>

              <TouchableHighlight
                underlayColor={COLORS.Black3}
                onPress={() => setIsOpenModal(true)}
                style={{ borderRadius: BORDERRADIUS.radius_8 }}
              >
                <View style={styles.itemAdd}>
                  <View style={styles.leftItem}>
                    <FontAwesomeIcon icon={faPlus} size={30} color={COLORS.White2} />
                  </View>
                  <View style={styles.rightItem}>
                    <Text style={styles.textMain}>Add playlist</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </>
          }
          renderItem={({ item, index }) => <Item />}
        />
      </View>
      {isOpenModal && (
        <CustomBottomSheet
          isOpen={true}
          closeModal={() => setIsOpenModal(false)}
          height1={"100%"}
          enableClose={false}
        >
          {/* <EditPlaylist closeModal={() => setIsOpenModal(false)} />  */}
          <AddPlaylist closeModal={() => setIsOpenModal(false)} />
        </CustomBottomSheet>
      )}
    </>
  );
};

const Item = () => {
  return (
    <TouchableHighlight
      underlayColor={COLORS.Black3}
      onPress={() => console.log("press")}
      style={{ borderRadius: BORDERRADIUS.radius_8 }}
    >
      <View style={styles.item}>
        <View style={styles.leftItem}>
          <Image style={styles.imageItem} source={IMAGES.POSTER} />
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.textMain}>Netfix and chill</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default AddSongToPlaylist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.space_8,
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
    paddingVertical: SPACING.space_16,
    paddingHorizontal: SPACING.space_12,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flexDirection: "column",
    paddingVertical: SPACING.space_12,
    gap: SPACING.space_8,
  },
  inputBox: {
    width: "100%",
    backgroundColor: COLORS.Black3,
    flexDirection: "row",
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_20,
    gap: SPACING.space_12,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.regular,
  },
  itemAdd: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_12,
    padding: SPACING.space_4,
  },
  leftItem: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.Black3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDERRADIUS.radius_8,
    overflow: "hidden",
  },
  rightItem: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_12,
    padding: SPACING.space_4,
  },
  imageItem: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
