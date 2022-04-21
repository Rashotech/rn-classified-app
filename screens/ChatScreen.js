import React, { useEffect, useState } from "react";
import { Bubble, Send, GiftedChat } from "react-native-gifted-chat";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import messagesApi from "../api/messages";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
import {
  joinRoom,
  sendMessage,
  subscribeToMessages,
  Typing,
  stopTyping,
  subscribeToTyping,
  subscribeToStopTyping
} from "../hooks/socket.service";

export default function ChatScreen({ route, navigation }) {
  const chatId = route.params.data._id;
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const getMessagesApi = useApi(messagesApi.messages);
  const sendMessageApi = useApi(messagesApi.sendMessage);
  const markAllMessagesAsReadApi = useApi(messagesApi.markAllMessagesAsRead);

  useEffect(() => {
    getMessages();
    joinRoom(chatId);

    subscribeToMessages((err, data) => {
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, data.message)
      );
    });

    subscribeToTyping((err, data) => {setIsTyping(true)});

    subscribeToStopTyping((err, data) => {setIsTyping(false)});
  }, []);

  const getMessages = async () => {
    await markAllMessagesAsReadApi.request(chatId);
    const result = await getMessagesApi.request(chatId);
    setMessages(result.data.reverse().map(mapMessage));
  };

  const handleInputTextChanged = async (text) => {
    setText(text);
    if(text.length > 0) {
      updateTyping();
    }
  };

  const onSend = async (newMessages = []) => {
    newMessages[0].sent = true;
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    const result = await sendMessageApi.request(chatId, text);
    sendMessage({ data: result.data, message: newMessages });
  };

  function updateTyping() {
    if (!typing) {
      Typing(chatId);
      setTyping(true);
    }

    var lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        setTyping(false);
        stopTyping(chatId);
      }
    }, timerLength);
  }

  const renderSend = (props) => (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
      }}
    >
      <MaterialCommunityIcons name="send" color="black" size={20} />
    </Send>
  );

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#d3d3d3",
          },
        }}
      />
    );
  }

  return (
    <>
      <ActivityIndicator visible={getMessagesApi.loading} />
      <GiftedChat
        messages={messages}
        user={mapUser(user)}
        text={text}
        onInputTextChanged={handleInputTextChanged}
        onSend={onSend}
        renderSend={renderSend}
        isTyping={isTyping}
        renderBubble={renderBubble}
      />
    </>
  );
}

function mapMessage(message) {
  return {
    _id: message._id,
    text: message.content,
    createdAt: new Date(message.createdAt),
    sent: true,
    received: message.readBy.length === 2,
    user: mapUser(message.sender),
  };
}

function mapUser(user) {
  return {
    _id: user._id,
    name: user.firstName + " " + user.lastName,
    avatar: user.profilePic,
  };
}
