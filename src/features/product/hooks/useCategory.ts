import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categoryService";
import { ICategoryResponse } from "../types/categoryType";
import { IError } from "../../../shared/types/globalType";

export const useCategories = () => {
  return useQuery<ICategoryResponse, IError>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
