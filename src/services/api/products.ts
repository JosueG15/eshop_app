import axiosClient from "./axiosClient";

export const getProducts = async () => {
  try {
    const response = await axiosClient.get("v1/products");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products", error);
    throw error;
  }
};
