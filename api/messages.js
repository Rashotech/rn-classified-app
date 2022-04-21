import client from "./client";

const createChat = (seller, listingId) =>
  client.post("/chat", {
    user: seller,
    listingId,
  });

const sendMessage = (chatId, content) =>
  client.post("/chat/message", {
    chatId,
    content,
  });

const markAllMessagesAsRead = (chatId) =>
  client.put(`/chat/${chatId}/messages/markAsRead`, {});

const chatList = () => client.get("/chat");

const messages = (chatId) => client.get(`/chat/${chatId}/messages`);

export default {
  createChat,
  sendMessage,
  chatList,
  messages,
  markAllMessagesAsRead,
};
