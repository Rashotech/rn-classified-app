import React from "react";
import { Image, StyleSheet, View } from "react-native";

import colors from "../config/colors";

function ImageScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: colors.primary,
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOffset: { width: -20, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20
  },
});

export default ImageScreen;
