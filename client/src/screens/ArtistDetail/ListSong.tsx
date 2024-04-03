import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface ListSongProps {}

const ListSong = (props: ListSongProps) => {
  return (
    <View style={styles.container}>
      <Text>ListSong</Text>
    </View>
  );
};

export default ListSong;

const styles = StyleSheet.create({
  container: {}
});
