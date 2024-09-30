import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  IProductListResponse,
  IProductQueryParams,
} from "../../../shared/types/productType";
import { IError } from "../../../shared/types/globalType";
import { RootState } from "../../store";
import { getProducts } from "../../../features/product/services/productService";

interface ProductState {
  products: IProductListResponse["data"];
  page: number;
  totalPages: number;
  isLoading: boolean;
  isRefreshing: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  isRefreshing: false,
  isError: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  IProductListResponse,
  { params: IProductQueryParams; page: number },
  { rejectValue: IError; state: RootState }
>("products/fetchProducts", async ({ params, page }, { rejectWithValue }) => {
  try {
    const response = await getProducts({ ...params, page });
    return response;
  } catch (error) {
    return rejectWithValue((error as IError) || { message: "Unknown error" });
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.page = 1;
      state.totalPages = 1;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    },
    refreshProducts: (state) => {
      state.isRefreshing = true;
      state.page = 1;
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        if (state.isRefreshing) {
          state.isRefreshing = false;
        } else {
          state.isLoading = true;
        }
        state.isError = false;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<IProductListResponse>) => {
          state.isLoading = false;
          state.isRefreshing = false;
          state.products = [
            ...state.products,
            ...action.payload.data.filter(
              (product) => !state.products.some((p) => p.id === product.id)
            ),
          ];
          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.isError = true;
        state.error = action.payload?.message || "Failed to fetch products";
      });
  },
});

export const { resetProducts, refreshProducts } = productsSlice.actions;
export default productsSlice.reducer;
