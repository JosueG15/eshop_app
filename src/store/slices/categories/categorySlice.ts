import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IError } from "../../../shared/types/globalType";
import { showToast } from "../../../shared/components/Toast";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../../features/product/services/categoryService";
import {
  ICategory,
  ICategoryResponse,
} from "../../../features/product/types/categoryType";

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
  { rejectValue: IError }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await getCategories();
    return response;
  } catch (error) {
    return rejectWithValue(
      (error as IError) || { message: "Error al obtener categorías" }
    );
  }
});

export const createCategory = createAsyncThunk<
  ICategory,
  Partial<ICategory>,
  { rejectValue: IError; state: RootState }
>(
  "categories/createCategory",
  async (category, { rejectWithValue, getState }) => {
    try {
      const { token } = (getState() as RootState).auth;

      if (!token) {
        throw new Error("No authentication token available");
      }

      const response = await addCategory(category, token);
      showToast(
        "Categoría agregada",
        "La categoría fue agregada con éxito",
        "success"
      );
      return response;
    } catch (error) {
      showToast("Error", "Error al agregar la categoría", "error");
      return rejectWithValue(
        (error as IError) || { message: "Error al agregar la categoría" }
      );
    }
  }
);

export const modifyCategory = createAsyncThunk<
  ICategory,
  { categoryId: string; category: Partial<ICategory> },
  { rejectValue: IError; state: RootState }
>(
  "categories/modifyCategory",
  async ({ categoryId, category }, { rejectWithValue, getState }) => {
    try {
      const { token } = (getState() as RootState).auth;

      if (!token) {
        throw new Error("No authentication token available");
      }

      const response = await updateCategory(categoryId, category, token);
      showToast(
        "Categoría actualizada",
        "La categoría fue actualizada con éxito",
        "success"
      );
      return response;
    } catch (error) {
      showToast("Error", "Error al actualizar la categoría", "error");
      return rejectWithValue(
        (error as IError) || { message: "Error al actualizar la categoría" }
      );
    }
  }
);

export const removeCategory = createAsyncThunk<
  void,
  string,
  { rejectValue: IError; state: RootState }
>(
  "categories/removeCategory",
  async (categoryId, { rejectWithValue, getState }) => {
    try {
      const { token } = (getState() as RootState).auth;

      if (!token) {
        throw new Error("No authentication token available");
      }

      await deleteCategory(categoryId, token);
      showToast(
        "Categoría eliminada",
        "La categoría fue eliminada con éxito",
        "success"
      );
    } catch (error) {
      showToast("Error", "Error al eliminar la categoría", "error");
      return rejectWithValue(
        (error as IError) || { message: "Error al eliminar la categoría" }
      );
    }
  }
);

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
        state.error = action.payload?.message || "Error al obtener categorías";
      });

    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.isLoading = false;
          state.categories.push(action.payload);
        }
      )
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error =
          action.payload?.message || "Error al agregar la categoría";
      });

    builder
      .addCase(modifyCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(
        modifyCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.isLoading = false;
          const index = state.categories.findIndex(
            (category) => category.id === action.payload.id
          );
          if (index !== -1) {
            state.categories[index] = action.payload;
          }
        }
      )
      .addCase(modifyCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error =
          action.payload?.message || "Error al actualizar la categoría";
      });

    builder
      .addCase(removeCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(
          (category) => category.id !== action.meta.arg
        );
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error =
          action.payload?.message || "Error al eliminar la categoría";
      });
  },
});

export const { resetCategories } = categorySlice.actions;
export default categorySlice.reducer;
