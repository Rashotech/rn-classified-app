import React from "react";
import { View, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import AppText from "./AppText";

export default function AppTextInput({ title, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      <Checkbox style={styles.checkbox} {...otherProps} />
      <AppText>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
});
