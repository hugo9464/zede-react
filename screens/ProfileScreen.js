import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import ProfilePage from '../components/ProfilePage'

export default function ProfileScreen() {
  return (
    <View style={styles.main_container}>
      <ProfilePage/>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  }
});
