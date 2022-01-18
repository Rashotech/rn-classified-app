import client from "./client";

const register = (pushToken) => client.put("/auth/expo-push-tokens", { token: pushToken });

export default {
  register,
};