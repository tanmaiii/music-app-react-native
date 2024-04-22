import {
  faMagnifyingGlass,
  faXmark,
  faPlusCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Platform, Image, Keyboard } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Constants from "expo-constants";
import { IMAGES } from "../../constants";
import CustomModal from "../CustomModal";
import { TSong } from "../../types";
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

  {
    id: 8,
    title: "See You Again",
    image_path: "see_you_again.jpg",
    author: "Wiz Khalifa ft. Charlie Puth",
  },
  { id: 9, title: "God's Plan", image_path: "gods_plan.jpg", author: "Drake" },
  {
    id: 10,
    title: "Old Town Road",
    image_path: "old_town_road.jpg",
    author: "Lil Nas X ft. Billy Ray Cyrus",
  },
];

interface AddSongProps {
  setIsOpen: (boolean) => void;
}

const AddSong = ({ setIsOpen }: AddSongProps) => {
  const textInputRef = React.useRef<TextInput>();

  React.useEffect(() => {
    textInputRef.current.focus();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          Platform.OS === "ios" && {
            paddingTop: statusBarHeight + SPACING.space_12,
          },
        ]}
      >
        <View style={styles.groupTitle}>
          <View>
            <Text style={styles.textMain}>Add song to playlist</Text>
          </View>
          <TouchableOpacity onPress={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faXmark} size={24} color={COLORS.White2} />
          </TouchableOpacity>
        </View>

        <View style={styles.boxInput}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color={COLORS.WhiteRGBA32} />
          <BottomSheetTextInput
            ref={textInputRef}
            style={styles.textInput}
            placeholder="Search for songs to add to playlist"
            placeholderTextColor={COLORS.WhiteRGBA32}
          />
        </View>
      </View>
      <FlatList data={songs} renderItem={({ item, index }) => <SongItem song={item} />} />
    </View>
  );
};

export default AddSong;

type TSongItem = {
  song: TSong;
};

const SongItem = (props: TSongItem) => {
  const { song } = props;
  const [isAdd, setIsAdd] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => isAdd && setOpenModal(true)}>
        <View style={styles.card} onTouchStart={Keyboard.dismiss}>
          <View style={styles.cardImage}>
            <Image source={IMAGES.POSTER} style={styles.image} />
          </View>
          <View style={styles.cardBody}>
            <View>
              <Text numberOfLines={1} style={styles.textMain}>
                {song.title}
              </Text>
              <Text numberOfLines={1} style={styles.textEtra}>
                {song.author}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => (!isAdd ? setIsAdd(true) : setOpenModal(true))}
            style={styles.cardIcon}
          >
            {isAdd ? (
              <FontAwesomeIcon icon={faCheckCircle} size={24} color={COLORS.Primary} />
            ) : (
              <FontAwesomeIcon icon={faPlusCircle} size={24} color={COLORS.White1} />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {isAdd && (
        <CustomModal
          withInput={true}
          isOpen={openModal}
          setIsOpen={setOpenModal}
          header={song.title}
          modalFunction={() => setIsAdd(false)}
        >
          <Text style={{ color: COLORS.White1, fontSize: FONTSIZE.size_16 }}>
            Are you sure delete the song from the playlist ?
          </Text>
        </CustomModal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: SPACING.space_8,
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
    padding: SPACING.space_12,
    gap: SPACING.space_12,
  },
  groupTitle: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
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
    // borderRadius: BORDERRADIUS.radius_8,
    // overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: BORDERRADIUS.radius_8,
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
