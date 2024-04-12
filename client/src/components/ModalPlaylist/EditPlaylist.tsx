import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface EditPlaylistProps {}

const EditPlaylist = (props: EditPlaylistProps) => {
  return (
    <View style={styles.container}>
      <Text>EditPlaylist</Text>
    </View>
  );
};

const Item = (props: any) => {

}

export default EditPlaylist;

const styles = StyleSheet.create({
  container: {}
});
