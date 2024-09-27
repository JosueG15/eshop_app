import axiosClient from "../../../shared/clients/axiosClient";
import {
  ProductQueryParams,
  IProductListResponse,
} from "../../../shared/types/productType";

export const getProducts = async (
  params: ProductQueryParams
): Promise<IProductListResponse> => {
  const { data } = await axiosClient.get<IProductListResponse>("/v1/products", {
    params,
  });
  return data;
};
