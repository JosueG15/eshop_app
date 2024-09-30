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
  isError: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  IProductListResponse,
  IProductQueryParams,
  { rejectValue: IError }
>("products/fetchProducts", async (params, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const pageParam = state.products.page;
    const response = await getProducts({ ...params, page: pageParam });
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<IProductListResponse>) => {
          state.isLoading = false;
          state.products = [...state.products, ...action.payload.data];
          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload?.message || "Failed to fetch products";
      });
  },
});

export const { resetProducts } = productsSlice.actions;
export default productsSlice.reducer;
