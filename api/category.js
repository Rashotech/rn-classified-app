import client from "./client";

const endpoint = "/category";

const getCategories = () => client.get(endpoint);

export default {
   getCategories
};
