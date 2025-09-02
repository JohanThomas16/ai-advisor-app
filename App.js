import React from 'react';
import { StyleSheet, View } from 'react-native';
import AdvisorScreen from './src/AdvisorScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <AdvisorScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});