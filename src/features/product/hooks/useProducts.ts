import { useInfiniteQuery } from "@tanstack/react-query";
import {
  IProductListResponse,
  IProductQueryParams,
} from "../../../shared/types/productType";
import { IError } from "../../../shared/types/globalType";
import { getProducts } from "../services/productService";

export const useProducts = (params: IProductQueryParams) => {
  return useInfiniteQuery<IProductListResponse, IError>({
    queryKey: ["products", params],
    queryFn: ({ pageParam = 1 }) =>
      getProducts({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
    initialPageParam: 1,
  });
};
