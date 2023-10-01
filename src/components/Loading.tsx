import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={50} color="grey" />
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
