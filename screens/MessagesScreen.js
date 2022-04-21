import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import { subscribeToMessages, disconnectSocket } from "../hooks/socket.service";

import useAuth from "../auth/useAuth";
import messagesApi from "../api/messages";
import useApi from "../hooks/useApi";

function MessagesScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getMessagesApi = useApi(messagesApi.chatList);
  const { user } = useAuth();

  useEffect(() => {
    getChatList();
  }, []);

  useEffect(() => {
    subscribeToMessages((err, data) => {
      getChatList();
    });
    return () => {
      disconnectSocket();
    };
  }, [user]);

  const getChatList = async () => {
    const result = await getMessagesApi.request();
    setMessages(result.data);
  };

  const handleDelete = (message) => {
    // Delete the message from messages
    // setMessages(messages.filter((m) => m.id !== message.id));
  };

  const chatName = (users) => {
    const result = users.filter((userId) => {
      return userId._id !== user._id;
    });
    return result[0].firstName + " " + result[0].lastName;
  };

  const chatPic = (users) => {
    const result = users.filter((userId) => {
      return userId._id !== user._id;
    });
    return result[0].profilePic;
  };

  return (
    <>
      <ActivityIndicator visible={getMessagesApi.loading} />
      <>
        {messages.length === 0 && !getMessagesApi.error && (
          <View style={styles.empty}>
            <AppText>No Messages yet</AppText>
          </View>
        )}
        {getMessagesApi.error && (
          <>
            <AppText>Couldn't retrieve the messages.</AppText>
            <AppButton title="Retry" onPress={getMessagesApi.request} />
          </>
        )}
      </>
      <Screen>
        <FlatList
          data={messages}
          keyExtractor={(message) => message._id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={chatName(item.users)}
              listing={item.ads.title}
              timestamp={item.latestMessage.updatedAt}
              subTitle={item.latestMessage.content}
              image={chatPic(item.users)}
              onPress={() => {
                const displayName = chatName(item.users);
                const displayPic = chatPic(item.users);
                const data = {
                  displayName,
                  displayPic,
                  data: item,
                };
                navigation.navigate("Chat", data);
              }}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={getChatList}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  empty: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default MessagesScreen;
