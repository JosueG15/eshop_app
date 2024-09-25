import axiosClient from "./axiosClient";
import { ICategoryResponse } from "../../types/category";

export const getCategories = async (): Promise<ICategoryResponse> => {
  const { data } = await axiosClient.get<ICategoryResponse>("/v1/categories");
  return data;
};
