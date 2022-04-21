import { useEffect } from "react";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import expoPushTokenApi from "../api/expoPushTokens";
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
});

export default useNotifications = () => {
  const navigation = useNavigation();
    useEffect(() => {
        registerForPushNotification();
        // (notification) => {
//   navigation.navigate('Settings', { screen: 'Messages' });
// }

        Notifications.addNotificationReceivedListener((notification) => {
          console.log('new notification');
        });
        Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
          navigation.navigate('Settings', { screen: 'Messages' });
          // navigation.navigate('Settings', { screen: 'Chat' });
        });
       }, []);
     
       const registerForPushNotification = async () => {
         if (Constants.isDevice) {
           try {
             const { status: existingStatus } =
               await Notifications.getPermissionsAsync();
             let finalStatus = existingStatus;
             if (existingStatus !== "granted") {
               const { status } = await Notifications.requestPermissionsAsync();
               finalStatus = status;
             }
             if (finalStatus !== "granted") {
               console.log("Failed to get push token for push notification!");
               return;
             }
             const token = (await Notifications.getExpoPushTokenAsync()).data;
             console.log(token)
             expoPushTokenApi.register(token);
           } catch (error) {
             console.log('Error getting a push token', error);
           }
         } else {
           console.log("Must use physical device for Push Notifications");
         }
     
         if (Platform.OS === "android") {
           Notifications.setNotificationChannelAsync("default", {
             name: "default",
             importance: Notifications.AndroidImportance.MAX,
             vibrationPattern: [0, 250, 250, 250],
             lightColor: "#FF231F7C",
           });
         }
       };
};