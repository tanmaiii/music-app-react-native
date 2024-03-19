import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import IMAGES from "../../constants/images";
interface LibraryScreenProps {}

const LibraryScreen = (props: LibraryScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Image source={IMAGES.AVATAR} style={styles.headerImage} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Library</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="add-outline" size={24} color="black" style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LibraryScreen;
