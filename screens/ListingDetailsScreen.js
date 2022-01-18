import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Linking,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Ionicons, Feather } from "@expo/vector-icons";

import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";

const { width } = Dimensions.get("window");

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import ListItem from "../components/ListItem";
import { Image as CacheImage } from "react-native-expo-image-cache";
import ContactSellerForm from "../components/ContactSellerForm";
import listingsApi from "../api/listings";

export default function ListingDetailsScreen({ route }) {
  const listingId = route.params;
  const [listing, setListing] = useState();
  const [phone, setPhone] = useState(false);
  const listingApi = useApi(listingsApi.getListingById);

  useEffect(() => {
    getListing();
  }, []);

  const getListing = async () => {
    const result = await listingApi.request(listingId._id);
    setListing(result.data);
  };

  const types = {
    used: "Used",
    brand_new: "Brand New",
  };

  const [indexSelected, setIndexSelected] = useState(0);

  const onSelect = (indexSelected) => {
    setIndexSelected(indexSelected);
  };

  return (
    <>
      <ActivityIndicator visible={listingApi.loading} />
      {listingApi.error && (
        <Screen style={styles.error}>
          <AppText>Couldn't retrieve the listings.</AppText>
          <AppButton
            title="Retry"
            onPress={listingApi.request(listingId._id)}
          />
        </Screen>
      )}
      {listing && (
        <Screen>
          <ScrollView>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
            >
              <View style={styles.image}>
                <Carousel
                  layout="default"
                  data={listing.images}
                  sliderWidth={width}
                  itemWidth={width}
                  onSnapToItem={(index) => onSelect(index)}
                  renderItem={({ item, index }) => (
                    <CacheImage
                      style={styles.image}
                      key={index}
                      tint="light"
                      preview={{ uri: item.thumbnailUrl }}
                      uri={item.originalUrl}
                    />
                  )}
                />
                <View style={styles.pagination}>
                  <Pagination
                    inactiveDotColor="white"
                    dotColor={"red"}
                    activeDotIndex={indexSelected}
                    dotsLength={listing.images.length}
                    animatedDuration={150}
                    inactiveDotScale={1}
                  />
                </View>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.info}>
                  <AppText style={styles.title}>{listing.title}</AppText>
                  <AppText style={styles.price}> ₦{listing.price}</AppText>
                </View>
                <View style={styles.info}>
                  <AppText style={{ fontWeight: '500', fontSize: 13 }}>
                    <Ionicons name="location-outline" size={16} color="black" />
                    {listing.lga}, {listing.region} State
                  </AppText>

                  <View style={styles.phoneContainer}>
                    {phone ? (
                      <View style={styles.phone}>
                      <AppText
                        style={styles.phone}
                        onPress={() =>
                          Linking.openURL(
                            `tel: ${listing.postedBy.phoneNumber}`
                          )
                        }
                      >
                        <Feather name="phone" size={16} color="white" />
                        {listing.postedBy.phoneNumber}
                      </AppText>
                      </View>
                    ) : (
                      <View style={styles.phone}>
                        <Feather name="phone" size={16} color="white" />
                        <AppText
                          style={styles.phone}
                          onPress={() => setPhone(true)}
                        >
                          Call
                        </AppText>
                      </View>
                    )}
                  </View>
                </View>
                <View>
                  <AppText
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Listing Details
                  </AppText>
                  <View style={styles.details}>
                    <AppText style={{ fontWeight: "bold", paddingBottom: 10 }}>
                      Description
                    </AppText>
                    <AppText> Category: {listing.category.name}</AppText>
                    <AppText> Condition: {types[listing.condition]}</AppText>
                    <AppText style={{ paddingVertical: 10 }}>
                      {listing.description}
                    </AppText>
                  </View>
                </View>
                <View style={styles.userContainer}>
                  <ListItem
                    image={require("../assets/mosh.jpg")}
                    title={`${listing.postedBy.firstName} ${listing.postedBy.lastName}`}
                    subTitle="Poster"
                  />
                </View>
                <ContactSellerForm listing={listing} />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </Screen>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  pagination: {
    zIndex: 1,
    position: "relative",
    bottom: 50,
  },
  phone: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "white",
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  phoneContainer: {
    borderRadius: 200,
    backgroundColor: colors.primary,
  },
  details: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    paddingHorizontal: 20,
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    marginTop: -50,
  },
  image: {
    width: "100%",
    height: 300,
  },
  info: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 10,
  },
});
