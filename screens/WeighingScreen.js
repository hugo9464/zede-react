import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import WeighingPage from '../components/WeighingPage'

export default function WeighingScreen() {
  return (
    <View style={styles.main_container}>
      <WeighingPage/>
    </View> 
  );
}

WeighingScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  main_container: {
    flex: 1
  }
});
