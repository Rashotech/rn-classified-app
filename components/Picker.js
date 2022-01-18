import React, { useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
  Alert
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import state from '../utility/state';

import Text from "./AppText";
import defaultStyles from "../config/styles";
import PickerItem from "./PickerItem";
import Screen from "./Screen";

function AppPicker({
  icon,
  items,
  name,
  values,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [lga, setLga] = useState([]);

  const handleOpening = () => {
    if(name === "lga" && values.region === "") {
      Alert.alert("Select a region first");
    } else {
      if(values.region !== "" && name === "lga"){
        const stateList = state[values.region.name].map((key) => ({
          name: key,
          _id: uuidv4(),
        }));
        setLga(stateList);
      }
      setModalVisible(true);
    }
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={handleOpening}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.name}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={lga.length === 0 ? items : lga}
            keyExtractor={(item) => item._id.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.name}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
