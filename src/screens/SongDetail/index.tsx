import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface SongDetailProps {}

const SongDetail = (props: SongDetailProps) => {
  return (
    <View style={styles.container}>
      <Text>SongDetail</Text>
    </View>
  );
};

export default SongDetail;

const styles = StyleSheet.create({
  container: {}
});
