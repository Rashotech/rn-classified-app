import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import navigation from '../navigation/rootNavigation';

import FeedNavigator from "../navigation/FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import AccountNavigator from "./AccountNavigator";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import useNotifications from "../hooks/useLocation";

const Tab = createBottomTabNavigator();

// (notification) => {
//   navigation.navigate('Settings', { screen: 'Messages' });
// }


const AppNavigator = () => {
  useNotifications();
  return (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Feed"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="ListingEdit"
      component={ListingEditScreen}
      options={({ navigation }) => ({
          tabBarButton: () => <NewListingButton onPress={() => navigation.navigate(routes.LISTING_EDIT)}/>,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              size={size}
              color={color}
            />
          ),
      })}
    />
    <Tab.Screen
      name="Settings"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
        title: "Account"
      }}
    />
  </Tab.Navigator>
)};

export default AppNavigator;
