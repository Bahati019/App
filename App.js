import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/Home'

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open</Text> */}
      <StatusBar style='auto'/>
      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

