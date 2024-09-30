import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IError } from "../../../shared/types/globalType";
import { ICategoryResponse } from "../../../features/product/types/categoryType";
import { getCategories } from "../../../features/product/services/categoryService";

interface CategoryState {
  categories: ICategoryResponse["data"];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<
  ICategoryResponse,
  void,
  { rejectValue: IError; state: RootState }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await getCategories();
    return response;
  } catch (error) {
    return rejectWithValue((error as IError) || { message: "Error" });
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategories: (state) => {
      state.categories = [];
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<ICategoryResponse>) => {
          state.isLoading = false;
          state.categories = action.payload.data;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload?.message || "Error al obtener categorias";
      });
  },
});

export const { resetCategories } = categorySlice.actions;
export default categorySlice.reducer;
