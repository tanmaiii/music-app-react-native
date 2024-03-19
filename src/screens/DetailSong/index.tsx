import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface DetailSongProps {}

const DetailSong = (props: DetailSongProps) => {
  return (
    <View style={styles.container}>
      <Text>DetailSong</Text>
    </View>
  );
};

export default DetailSong;

const styles = StyleSheet.create({
  container: {}
});
