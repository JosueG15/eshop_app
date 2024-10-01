import { AxiosResponse } from "axios";
import axiosClient from "../../../shared/clients/axiosClient";
import { ICategory, ICategoryResponse } from "../types/categoryType";

export const getCategories = async (): Promise<ICategoryResponse> => {
  const { data } = await axiosClient.get<ICategoryResponse>("/v1/categories");
  return data;
};

export const addCategory = async (
  category: Partial<ICategory>,
  token: string
): Promise<ICategory> => {
  const { data } = await axiosClient.post<AxiosResponse<ICategory>>(
    "/v1/categories",
    category,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};

export const updateCategory = async (
  categoryId: string,
  category: Partial<ICategory>,
  token: string
): Promise<ICategory> => {
  const { data } = await axiosClient.put<ICategory>(
    `/v1/categories/${categoryId}`,
    category,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteCategory = async (
  categoryId: string,
  token: string
): Promise<void> => {
  await axiosClient.delete(`/v1/categories/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
