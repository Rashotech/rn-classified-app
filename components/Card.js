import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import { Image } from "react-native-expo-image-cache";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { Ionicons } from "@expo/vector-icons";

export default function Card({
  title,
  subTitle,
  condition,
  region,
  imageUrl,
  thumbnailUrl,
  onPress,
}) {
  const types = {
    "used": "Used",
    "brand_new": "Brand New",
    "refurbished": "Refurbished"
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <AppText style={styles.title}>{title}</AppText>
            <View style={styles.condition}>
            <AppText style={styles.text}>
              {types[condition]}
            </AppText>
            </View>
          </View>
          <View style={styles.details}>
            <AppText style={styles.title}>
              <Ionicons name="location-outline" size={16} color="black" />
               {region} State
            </AppText>
            <AppText style={styles.subTitle}>{subTitle}</AppText>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  condition: {
    padding: 5,
    backgroundColor: colors.medium,
    borderRadius: 10
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  title: {
    marginBottom: 7,
    fontSize: 15
  },
  text: {
    fontSize: 12,
    color: colors.white,
    fontWeight: "700",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});
