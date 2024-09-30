import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "../services/categoryService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { showToast } from "../../../shared/components/Toast";
import {
  addCategory as addCategoryToStore,
  updateCategory as updateCategoryInStore,
  deleteCategory as deleteCategoryFromStore,
} from "../../../store/slices/categories/categorySlice";
import { ICategory, ICategoryResponse } from "../types/categoryType";
import { IError } from "../../../shared/types/globalType";

export const useCategoryMutations = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const queryClient = useQueryClient();

  if (!token) throw new Error("User is not authenticated");

  const addMutation = useMutation<ICategory, Error, Partial<ICategory>>({
    mutationFn: (categoryData) => addCategory(categoryData, token),
    onSuccess: (newCategory) => {
      dispatch(addCategoryToStore(newCategory));
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      showToast(
        "Categoría agregada",
        "La categoría fue agregada con éxito",
        "success"
      );
    },
    onError: (error) => {
      showToast(
        "Error",
        error.message || "Error al agregar la categoría",
        "error"
      );
    },
  });

  const updateMutation = useMutation<
    ICategory,
    Error,
    { id: string; data: Partial<ICategory> }
  >({
    mutationFn: ({ id, data }) => updateCategory(id, data, token),
    onSuccess: (updatedCategory) => {
      dispatch(updateCategoryInStore(updatedCategory));
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      showToast(
        "Categoría actualizada",
        "La categoría fue actualizada con éxito",
        "success"
      );
    },
    onError: (error) => {
      showToast(
        "Error",
        error.message || "Error al actualizar la categoría",
        "error"
      );
    },
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (categoryId) => deleteCategory(categoryId, token),
    onSuccess: (_, categoryId) => {
      dispatch(deleteCategoryFromStore(categoryId));
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      showToast(
        "Categoría eliminada",
        "La categoría fue eliminada con éxito",
        "success"
      );
    },
    onError: (error) => {
      showToast(
        "Error",
        error.message || "Error al eliminar la categoría",
        "error"
      );
    },
  });

  return {
    addCategory: addMutation.mutate,
    updateCategory: updateMutation.mutate,
    deleteCategory: deleteMutation.mutate,
  };
};

export const useCategories = () => {
  return useQuery<ICategoryResponse, IError>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
