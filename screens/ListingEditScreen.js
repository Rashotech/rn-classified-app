import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import {
  Form,
  FormField,
  FormCheckbox,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import RegionPicker from "../components/RegionPicker";
import Screen from "../components/Screen";
import FormImagePicker from "../components/formz/FormImagePicker";
import listingsApi from "../api/listings";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";

import categoryApi from "../api/category";
import useApi from "../hooks/useApi";
import states from "../utility/state";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(10).label("Title"),
  price: Yup.number().required().min(500).max(10000).label("Price"),
  description: Yup.string().required().min(20).label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
  region: Yup.object().required().nullable().label("State"),
  lga: Yup.object().required().nullable().label("Local Government Area"),
});

const ListingEditScreen = () => {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [categories, setCategories] = useState([]);
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
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <Form
          initialValues={{
            title: "",
            price: "",
            description: "",
            region: "",
            lga: "",
            negotiable: false,
            category: null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="images" />
          <FormField maxLength={255} name="title" placeholder="Title" />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            width={120}
          />
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
          <FormCheckbox
            title="Negotiable"
            name="negotiable"
          />
          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <SubmitButton title="Post" />
        </Form>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ListingEditScreen;
