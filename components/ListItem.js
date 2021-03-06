import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Time from '../utility/time'

import AppText from "./AppText";
import colors from "../config/colors";

function ListItem({
  title,
  subTitle,
  listing,
  timestamp,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={{ uri: image }} />}
          <View style={styles.detailsContainer}>
            <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center'}}>
              <AppText style={styles.title} numberOfLines={1}>
                {title}
              </AppText>
              {timestamp && (<AppText style={{ fontSize: 13}}>{Time(timestamp)}</AppText>)}
            </View>
            <AppText style={styles.listing} numberOfLines={1}>
              {listing}
            </AppText>
            {subTitle && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </AppText>
            )}
          </View>
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
  listing: {
    fontWeight: "400",
    fontSize: 15,
  },
});

export default ListItem;
