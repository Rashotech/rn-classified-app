import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ListingsByUserScreen from "../screens/ListingsByUserScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatHeader from "../components/ChatHeader";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Mylistings" options={{ headerTitle: 'Your Listings'}} component={ListingsByUserScreen} />
    <Stack.Screen
      options={({ route }) => ({ headerTitle: () => <ChatHeader {...route} /> })}
      name="Chat"
      component={ChatScreen}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
