import axiosClient from "../../../shared/clients/axiosClient";
import {
  IProductQueryParams,
  IProductListResponse,
} from "../../../shared/types/productType";

export const getProducts = async (
  params: IProductQueryParams
): Promise<IProductListResponse> => {
  const { data } = await axiosClient.get<IProductListResponse>("/v1/products", {
    params,
  });
  return data;
};
