import axiosClient from "../../../shared/clients/axiosClient";
import { ICategoryResponse } from "../types/categoryType";

export const getCategories = async (): Promise<ICategoryResponse> => {
  const { data } = await axiosClient.get<ICategoryResponse>("/v1/categories");
  return data;
};
