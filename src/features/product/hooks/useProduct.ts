import { useQuery } from "@tanstack/react-query";
import { IProductListResponse } from "../../../shared/types/productType";
import { IError } from "../../../shared/types/globalType";
import { getProducts } from "../services/productService";

export const useProducts = (params: Record<string, any>) => {
  return useQuery<IProductListResponse, IError>({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
