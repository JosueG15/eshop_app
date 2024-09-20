import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/api/products";
import { IProductListResponse, IError } from "../types/products";

export const useProducts = () => {
  return useQuery<IProductListResponse, IError>({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
