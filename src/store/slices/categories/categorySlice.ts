import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../../../features/product/types/categoryType";

interface CategoryState {
  categories: ICategory[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: null,
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<ICategory>) {
      if (state.categories) {
        state.categories.push(action.payload);
      }
    },
    updateCategory(state, action: PayloadAction<ICategory>) {
      if (state.categories) {
        const index = state.categories.findIndex(
          (category) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      }
    },
    deleteCategory(state, action: PayloadAction<string>) {
      if (state.categories) {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      }
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
