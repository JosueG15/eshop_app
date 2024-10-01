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
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
};

export const fetchCategories = createAsyncThunk<
  ICategoryResponse,
  void,
  { rejectValue: IError }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    return await getCategories();
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
    const { token } = getState().auth;
    if (!token) throw new Error("No authentication token available");

    try {
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
    const { token } = getState().auth;
    if (!token) throw new Error("No authentication token available");

    try {
      return { id: categoryId, ...category } as ICategory;
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
    const { token } = getState().auth;
    if (!token) throw new Error("No authentication token available");

    try {
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
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<ICategoryResponse>) => {
          state.isLoading = false;
          state.categories = action.payload.data;
        }
      )
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.isLoading = false;
          state.categories.push(action.payload);
        }
      )
      .addCase(createCategory.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(modifyCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        modifyCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.isLoading = false;
          state.categories = state.categories.map((category) =>
            category.id === action.payload.id ? action.payload : category
          );
        }
      )
      .addCase(modifyCategory.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(removeCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(
          (category) => category.id !== action.meta.arg
        );
      })
      .addCase(removeCategory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetCategories } = categorySlice.actions;
export default categorySlice.reducer;
