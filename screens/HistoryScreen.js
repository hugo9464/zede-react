import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import HistoryPage from '../components/HistoryPage'

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.main_container}>
      <HistoryPage/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  }
});
