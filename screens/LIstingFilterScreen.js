import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import * as Yup from "yup";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import RegionPicker from "../components/RegionPicker";
import Screen from "../components/Screen";
import routes from "../navigation/routes";


import categoryApi from "../api/category";
import useApi from "../hooks/useApi";
import states from "../utility/state";

const validationSchema = Yup.object().shape({
  keyword: Yup.string().label("Title"),
  minprice: Yup.number().label("Min Price"),
  maxprice: Yup.number().label("Max Price"),
  category: Yup.object().nullable().label("Category"),
  region: Yup.object().nullable().label("State"),
  lga: Yup.object().nullable().label("Local Government Area"),
});

const ListingEditScreen = ({ navigation, route }) => {
  const [categories, setCategories] = useState([]);
  const [clear, setClear] = useState(false);
  const searchTerm = route.params;
  const categoriesApi = useApi(categoryApi.getCategories);

  const stateList = Object.keys(states).map((key) => ({
    name: key,
    _id: uuidv4(),
  }));

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const result = await categoriesApi.request();
    setCategories(result.data);
  };

  const handleSubmit = async (listing, { resetForm }) => {
    if (clear) {
      resetForm();
      setClear(false);
      return;
    }
    navigation.navigate(routes.LISTING_SEARCH, listing)
    // resetForm();
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
            keyword: searchTerm ? searchTerm : '',
            minprice: "",
            maxprice: "",
            description: "",
            region: "",
            lga: "",
            category: null,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField maxLength={255} name="keyword" placeholder="Title" />
          <View style={styles.range}>
            <FormField
              keyboardType="numeric"
              maxLength={8}
              name="minprice"
              placeholder="`Min Price"
              width="49%"
            />
            <FormField
              keyboardType="numeric"
              maxLength={8}
              name="maxprice"
              placeholder="Max Price"
              width="49%"
            />
          </View>
          <Picker
            items={categories}
            name="category"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            width="50%"
          />
          <Picker
            items={stateList}
            name="region"
            PickerItemComponent={RegionPicker}
            placeholder="State"
          />
          <Picker
            items={[]}
            name="lga"
            PickerItemComponent={RegionPicker}
            placeholder="Local Government Area"
          />
          <View style={styles.range}>
            <SubmitButton type="clear" width="49%" title="Clear" />
            <SubmitButton title="Filter" width="49%" />
          </View>
        </Form>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  range: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ListingEditScreen;
