import client from "./client";

const endpoint = "/ads/listings";

const getListings = (page) => client.get(`/ads/listings?page=${page}&size=5`);

const getListingById = (id) => client.get(`/ads/listing/${id}`);

const getListingByCategory = (id) => client.get(`/ads/listing/category/${id}`);

export const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("category", listing.category._id);
  data.append("description", listing.description);
  data.append("condition", "used");
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

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addListing,
  getListings,
  getListingById,
  getListingByCategory
};
