import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ListingCategoryScreen from "../screens/LIstingCategoryScreen";
import LIstingSearchScreen from "../screens/LIstingSearchScreen";
import ListingFilterScreen from "../screens/LIstingFilterScreen";
import SearchBar from "../components/SearchBar";
const Stack = createNativeStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Listings"
      component={ListingsScreen}
    />
    <Stack.Screen
      options={{ headerTitle: "" }}
      name="ListingDetails"
      component={ListingDetailsScreen}
    />
    <Stack.Screen
      // options={{ headerTitle: 'Search Results' }}
      options={({ route }) => ({
        headerTitle: () => <SearchBar {...route} />,
      })}
      name="ListingSearch"
      component={LIstingSearchScreen}
    />
    <Stack.Screen
      options={{ headerTitle: "Filter Results" }}
      name="ListingFilter"
      component={ListingFilterScreen}
    />
    <Stack.Screen
      options={({ route }) => ({ headerTitle: route.params.name })}
      name="categoryListings"
      component={ListingCategoryScreen}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
