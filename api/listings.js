import client from "./client";

const endpoint = "/ads/listings";

const getListings = (page, search='false') => {
  let filters = "";
  if(search !== 'false') {
    Object.entries(search).forEach(([key, value]) => {
      if (["keyword", "lga", "minprice", "maxprice", "category", "region"].includes(key)) {
        if(key === "lga" || key === "region") {
          filters += !!value ? `${key}=${value.name}&` : "";
        } else if(key === "category") {
          filters += !!value ? `${key}=${value._id}&` : "";
        } else {
          filters += !!value ? `${key}=${value}&` : "";
        }
      }
    });
  }
  return client.get(`/ads/listings?page=${page}&size=5&${filters}`);
};

const getListingById = (id) => client.get(`/ads/listing/${id}`);

const getlistingsByUser = () => client.get(`/ads/mylisting`);

const getListingByCategory = (id) => client.get(`/ads/listing/category/${id}`);

const addListing = (listing) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("category", listing.category._id);
  data.append("description", listing.description);
  data.append("condition", listing.condition.uid);
  data.append("negotiable", listing.negotiable);
  data.append("region", listing.region.name);
  data.append("lga", listing.lga.name);

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location)
    data.append("longitude", listing.location.longitude);
    data.append("latitude", listing.location.latitude);

  return client.post(endpoint, data);
};

export default {
  addListing,
  getListings,
  getListingById,
  getListingByCategory,
  getlistingsByUser
};
