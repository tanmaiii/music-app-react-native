import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface EditSongProps {}

const EditSong = (props: EditSongProps) => {
  return (
    <View style={styles.container}>
      <Text>EditSong</Text>
    </View>
  );
};

export default EditSong;

const styles = StyleSheet.create({
  container: {}
});
