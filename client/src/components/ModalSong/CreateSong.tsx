import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface CreateSongProps {}

const CreateSong = (props: CreateSongProps) => {
  return (
    <View style={styles.container}>
      <Text>CreateSong</Text>
    </View>
  );
};

export default CreateSong;

const styles = StyleSheet.create({
  container: {}
});
