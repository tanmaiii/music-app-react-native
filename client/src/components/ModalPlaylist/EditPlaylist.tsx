import {
  faBars,
  faCheckCircle,
  faMagnifyingGlass,
  faMinusCircle,
  faPlusCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import { Text, View, StyleSheet, Platform, SafeAreaView, Image, Keyboard } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, HEIGHT, SPACING } from "../../theme/theme";
import Constants from "expo-constants";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import ButtonSwitch from "../ButtonSwitch/ButtonSwitch";
import Modal from "../Modal";
import { TSong } from "../../types";
import { IMAGES } from "../../constants";
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
  { id: 8, title: "Shape of My Heart", image_path: "shape_of_my_heart.jpg", author: "Sting" },
  { id: 9, title: "Someone Like You", image_path: "someone_like_you.jpg", author: "Adele" },
  { id: 10, title: "Bohemian Rhapsody", image_path: "bohemian_rhapsody.jpg", author: "Queen" },
];

interface EditPlaylistProps {
  closeModal: () => void;
}

const EditPlaylist = ({ closeModal }: EditPlaylistProps) => {
  const [name, setName] = React.useState<string>("");
  const [isPrivate, setIsPrivate] = React.useState<boolean>(false);

  const handleCloseModal = () => {
    console.log("Close edit playlist");
    
    closeModal()
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ zIndex: 999 }}>
        <View
          style={[
            styles.header,
            Platform.OS === "ios" && { paddingTop: statusBarHeight + SPACING.space_12 },
          ]}
        >
          <TouchableOpacity style={[styles.buttonClose]} onPress={() => handleCloseModal()}>
            <FontAwesomeIcon icon={faXmark} size={20} color={COLORS.White1} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.textMain}>Edit playlist</Text>
          </View>
          <TouchableOpacity>
            <Text style={[styles.textExtra, { color: COLORS.Primary }]}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <FlatList
        data={songs}
        style={styles.body}
        ListHeaderComponent={
          <View style={styles.headerBody}>
            <View style={styles.inputBox}>
              <Text style={styles.textExtra}>Name playlist</Text>
              <BottomSheetTextInput
                // ref={textInputRef}
                value={name}
                style={styles.textInput}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.textMain}>Private</Text>
              </View>
              <ButtonSwitch isOn={isPrivate} setIsOn={setIsPrivate} />
            </View>
          </View>
        }
        renderItem={({ item, index }) => <SongItem song={item} />}
      />
    </View>
  );
};

type TSongItem = {
  song: TSong;
};

const SongItem = (props: TSongItem) => {
  const { song } = props;
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <>
      <TouchableOpacity>
        <View style={styles.card} onTouchStart={Keyboard.dismiss}>
          <View style={styles.cardLeft}>
            <TouchableOpacity style={styles.cardIcon}>
              <FontAwesomeIcon icon={faMinusCircle} size={24} color={COLORS.WhiteRGBA32} />
            </TouchableOpacity>
          </View>
          <View style={styles.cardCenter}>
            <View style={styles.cardImage}>
              <Image source={IMAGES.POSTER} style={styles.image} />
            </View>
            <View style={styles.cardBody}>
              <View>
                <Text numberOfLines={1} style={styles.textMain}>
                  {song.title}
                </Text>
                <Text numberOfLines={1} style={styles.textExtra}>
                  {song.author}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardRight}>
            <TouchableOpacity style={styles.cardIcon}>
              <FontAwesomeIcon icon={faBars} size={24} color={COLORS.WhiteRGBA32} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default EditPlaylist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black1,
  },
  header: {
    padding: SPACING.space_12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.Black3,
    // backgroundColor: 'pink',
    zIndex: 999,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    // height: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
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
  buttonClose: {},
  body: {
    marginTop: HEIGHT.UPPER_HEADER_SEARCH_HEIGHT,
  },
  headerBody: {
    paddingHorizontal: SPACING.space_12,
    flexDirection: "column",
    marginBottom: SPACING.space_14,
  },
  inputBox: {
    width: "100%",
    flexDirection: "column",
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_12,
  },
  textInput: {
    width: "100%",
    borderBottomColor: COLORS.WhiteRGBA15,
    borderBottomWidth: 0.6,
    paddingVertical: SPACING.space_8,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White1,
    fontFamily: FONTFAMILY.regular,
  },
  card: {
    flexDirection: "row",
    gap: SPACING.space_8,
    width: "100%",
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_8,
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
