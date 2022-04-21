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

function LIstingCategoryScreen({ navigation , route}) {
  const searchTerm = route.params;
  const getListingsApi = useApi(listingsApi.getListings);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings();
  }, [searchTerm]);

  const getListings = async () => {
    const result = await getListingsApi.request(1, searchTerm);
    setListings(result.data.data);
  };

  return (
    <>
      <ActivityIndicator
        visible={getListingsApi.loading}
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
              {(listings.length === 0 && !getListingsApi.loading && !getListingsApi.error) && (
                <View style={styles.empty}>
                  <AppText>No Result found</AppText>
                </View>
              )}
              {getListingsApi.error && (
                <>
                  <AppText>Couldn't retrieve the listings.</AppText>
                  <AppButton title="Retry" onPress={getListingsApi.request} />
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

export default LIstingCategoryScreen;
