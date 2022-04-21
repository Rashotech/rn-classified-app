import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Card from "../components/Card";
import Screen from "../components/Screen";

import colors from "../config/colors";
import routes from "../navigation/routes";
import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";

function ListingsByUserScreen({ navigation }) {
  const getlistingsByUserApi = useApi(listingsApi.getlistingsByUser);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    const result = await getlistingsByUserApi.request();
    setListings(result.data);
  };

  return (
    <>
      <ActivityIndicator
        visible={getlistingsByUserApi.loading}
      />
      <Screen style={styles.screen}>
        <FlatList
          data={listings}
          style={styles.list}
          keyExtractor={(listing) => listing._id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"₦ " + item.price}
              condition={item.condition}
              region={item.region}
              thumbnailUrl={item.images[0].thumbnailUrl}
              imageUrl={item.images[0].originalUrl}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
          ListHeaderComponent={
            <>
              {(listings.length === 0 && !getlistingsByUserApi.loading && !getlistingsByUserApi.error) && (
                <View style={styles.empty}>
                  <AppText>You don't have any listing yet</AppText>
                </View>
              )}
              {getlistingsByUserApi.error && (
                <>
                  <AppText>Couldn't retrieve the listings.</AppText>
                  <AppButton title="Retry" onPress={getlistingsByUserApi.request} />
                </>
              )}
            </>
          }
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
    empty:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
  categories: {
    backgroundColor: colors.light,
  },
  header: {
    padding: 20,
    textAlign: "center",
    backgroundColor: colors.primary,
  },
  text: {
    padding: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
  list: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsByUserScreen;
