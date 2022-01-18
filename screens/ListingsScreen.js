import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator as ActivityIndicator1 } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Card from "../components/Card";
import Screen from "../components/Screen";

import colors from "../config/colors";
import routes from "../navigation/routes";
import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";
import categoryApi from "../api/category";
import CategoryPickerItem from "../components/CategoryPickerItem";

function ListingsScreen({ navigation }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const getListingsApi = useApi(listingsApi.getListings);
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [listings, setListings] = useState([]);
  const categoriesApi = useApi(categoryApi.getCategories);

  useEffect(() => {
    getCategory();
    getListings();
  }, []);

  const getCategory = async () => {
    const result = await categoriesApi.request();
    setCategories(result.data);
  };

  const getListings = async () => {
    const result = await getListingsApi.request(page);
    setListings(
      page === 1 ? result.data.data : [...listings, ...result.data.data]
    );
    setTotalPages(result.data.totalPages);
    setLoadingMore(false);
  };

  const handleLoadMore = () => {
    if(totalPages !== page) {
      setPage(page + 1);
      setLoadingMore(true);
      getListings();
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          paddingVertical: 20,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <ActivityIndicator1 animating size="large" />
      </View>
    );
  };

  return (
    <>
      <ActivityIndicator
        visible={getListingsApi.loading || categoriesApi.loading}
      />
      <Screen style={styles.screen}>
        <FlatList
          data={categories}
          style={styles.categories}
          keyExtractor={(item) => item._id.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <CategoryPickerItem
              item={item}
              onPress={() => navigation.navigate(routes.CATEORY_LISTINGS, item)}
            />
          )}
          refreshing={refreshing}
          onRefresh={getListingsApi.request}
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <AppText style={styles.text}>
                  Welcome to The Classified App where you can sell what you
                  don't need
                </AppText>
              </View>
              {getListingsApi.error && (
                <>
                  <AppText>Couldn't retrieve the listings.</AppText>
                  <AppButton title="Retry" onPress={getListingsApi.request(page)} />
                </>
              )}
            </>
          }
          ListFooterComponent={
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
                  onPress={() =>
                    navigation.navigate(routes.LISTING_DETAILS, item)
                  }
                />
              )}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              initialNumToRender={10}
              ListFooterComponent={renderFooter}
            />
          }
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
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
  screen: {
    backgroundColor: colors.primary,
  },
});

export default ListingsScreen;
