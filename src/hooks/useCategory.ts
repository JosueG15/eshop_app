import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/api/categories";
import { ICategoryResponse } from "../types/category";
import { IError } from "../types/global";

export const useCategories = () => {
  return useQuery<ICategoryResponse, IError>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
