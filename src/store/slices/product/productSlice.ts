import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IError } from "../../../shared/types/globalType";
import { showToast } from "../../../shared/components/Toast";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../features/product/services/productService";
import {
  IProduct,
  IProductListResponse,
  IProductQueryParams,
} from "../../../shared/types/productType";

interface ProductState {
  products: IProduct[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  isRefreshing: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  isRefreshing: false,
  isError: false,
  isSuccess: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  IProductListResponse,
  { params: IProductQueryParams; page: number },
  { rejectValue: IError }
>("products/fetchProducts", async ({ params, page }, { rejectWithValue }) => {
  try {
    return await getProducts({ ...params, page });
  } catch (error) {
    return rejectWithValue(
      (error as IError) || { message: "Error fetching products" }
    );
  }
});

export const createProduct = createAsyncThunk<
  IProduct,
  Partial<IProduct>,
  { rejectValue: IError; state: RootState }
>("products/createProduct", async (product, { rejectWithValue, getState }) => {
  const { token } = getState().auth;
  if (!token) throw new Error("No authentication token available");

  try {
    const response = await addProduct(product, token);
    showToast(
      "Producto agregado",
      "El producto fue agregado con éxito",
      "success"
    );
    return response;
  } catch (error) {
    showToast("Error", "Error al agregar el producto", "error");
    return rejectWithValue(
      (error as IError) || { message: "Error creating product" }
    );
  }
});

export const modifyProduct = createAsyncThunk<
  IProduct,
  { productId: string; product: Partial<IProduct> },
  { rejectValue: IError; state: RootState }
>(
  "products/modifyProduct",
  async ({ productId, product }, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    if (!token) throw new Error("No authentication token available");

    try {
      const response = await updateProduct(productId, product, token);
      showToast(
        "Producto actualizado",
        "El producto fue actualizado con éxito",
        "success"
      );
      return response;
    } catch (error) {
      showToast("Error", "Error al actualizar el producto", "error");
      return rejectWithValue(
        (error as IError) || { message: "Error updating product" }
      );
    }
  }
);

export const removeProduct = createAsyncThunk<
  void,
  string,
  { rejectValue: IError; state: RootState }
>(
  "products/removeProduct",
  async (productId, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    if (!token) throw new Error("No authentication token available");

    try {
      await deleteProduct(productId, token);
      showToast(
        "Producto eliminado",
        "El producto fue eliminado con éxito",
        "success"
      );
    } catch (error) {
      showToast("Error", "Error al eliminar el producto", "error");
      return rejectWithValue(
        (error as IError) || { message: "Error deleting product" }
      );
    }
  }
);

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
    resetSuccess: (state) => {
      state.isSuccess = false;
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
          state.products = action.payload.data;
          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload?.message || "Failed to fetch products";
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.products.push(action.payload);
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.payload?.message || "Failed to create product";
      })
      .addCase(modifyProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(
        modifyProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.products = state.products.map((product) =>
            product.id === action.payload.id ? action.payload : product
          );
        }
      )

      .addCase(removeProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.meta.arg
        );
      });
  },
});

export const { resetProducts, refreshProducts, resetSuccess } =
  productsSlice.actions;
export default productsSlice.reducer;
