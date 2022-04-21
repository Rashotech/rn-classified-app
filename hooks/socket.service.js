import { io } from "socket.io-client";
import settings from '../config/settings';

let socket;
let connected;

export const initiateSocketConnection = (user) => {
  socket = io(settings.apiUrl, {pingTimeout: 30000});
  console.log(`Connecting socket...`);

  socket.emit("setup", user);
  socket.on("connected", () => {
    connected = true;
    console.log("connected");
  });
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToMessages = (cb) => {
  if (!socket) return true;
  socket.on("messageReceived", (msg) => {
    console.log("Room event received!");
    return cb(null, msg);
  });
};

export const sendMessage = (data) => {
  if (socket) socket.emit("newMessage", data);
};

export const Typing = (data) => {
  if (socket) socket.emit("typing", data);
};

export const subscribeToStopTyping = (cb) => {
   socket.on("stop typing", data => {
    return cb(null, data);
  });
};

export const subscribeToTyping = (cb) => {
   socket.on("typing", data => {
    return cb(null, data);
  });
};


export const stopTyping = (data) => {
  if (socket) socket.emit("stop typing", data);
};

export const joinRoom = (roomName) => {
  socket.emit("joinRoom", roomName);
};
