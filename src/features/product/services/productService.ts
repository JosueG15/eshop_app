import { AxiosResponse } from "axios";
import axiosClient from "../../../shared/clients/axiosClient";
import {
  IProductQueryParams,
  IProductListResponse,
  IProduct,
} from "../../../shared/types/productType";

export const getProducts = async (
  params: IProductQueryParams
): Promise<IProductListResponse> => {
  const { data } = await axiosClient.get<IProductListResponse>("/v1/products", {
    params,
  });
  return data;
};

export const addProduct = async (
  product: Partial<IProduct>,
  token: string
): Promise<IProduct> => {
  const { data } = await axiosClient.post<AxiosResponse<IProduct>>(
    "/v1/products",
    product,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};

export const updateProduct = async (
  productId: string,
  product: Partial<IProduct>,
  token: string
): Promise<IProduct> => {
  const { data } = await axiosClient.put<IProduct>(
    `/v1/products/${productId}`,
    product,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteProduct = async (
  productId: string,
  token: string
): Promise<void> => {
  await axiosClient.delete(`/v1/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
