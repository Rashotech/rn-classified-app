import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FeedNavigator from "../navigation/FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import AccountNavigator from "./AccountNavigator";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import useNotifications from "../hooks/useNotifications";
import { initiateSocketConnection, disconnectSocket } from '../hooks/socket.service';
import useAuth from '../auth/useAuth';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { user } = useAuth();
  useEffect(() => {
    initiateSocketConnection(user);
    return () => {
      disconnectSocket();
    };
  }, [user]);
  
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
