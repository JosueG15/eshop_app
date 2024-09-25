import axiosClient from "./axiosClient";
import { IProductListResponse, ProductQueryParams } from "../../types/products";

export const getProducts = async (
  params: ProductQueryParams
): Promise<IProductListResponse> => {
  const { data } = await axiosClient.get<IProductListResponse>("/v1/products", {
    params,
  });
  return data;
};
