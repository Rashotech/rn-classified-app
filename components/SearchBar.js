import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import TextInput from "./SearchInput";
import { useNavigation } from "@react-navigation/native";
import routes from "../navigation/routes";

function ChatHeader({ params }) {
  const { keyword } = params;
  const [searchTerm, setSearchTerm] = useState(keyword ? keyword : "");
  const navigation = useNavigation();

  const handleSubmit = () => {
    const searchItem = {
      keyword: searchTerm,
    };
    navigation.navigate(routes.LISTING_SEARCH, searchItem);
  };
  return (
    <View style={styles.main}>
      <TextInput
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
        placeholder="Search Anything here..."
        maxLength={50}
        search="search"
        send="filter"
        blurOnSubmit={true}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        onPress={() => navigation.navigate(routes.LISTING_FILTER, searchTerm)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatHeader;
