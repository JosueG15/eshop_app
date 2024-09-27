import { useState, useCallback } from "react";
import { useDebounce } from "./useDebounce";
import { useProducts } from "./useProducts";
import { useCategories } from "./useCategories";

const useProductFilters = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categoriesQuery = useCategories();
  const categories = categoriesQuery.data?.data ?? [];

  const productsQuery = useProducts({
    name: debouncedSearch,
    category: selectedCategories.length
      ? selectedCategories.join(",")
      : undefined,
  });

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  }, []);

  const clearCategoryFilters = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  return {
    search,
    setSearch,
    selectedCategories,
    handleCategorySelect,
    clearCategoryFilters,
    productsQuery,
    categories,
  };
};

export default useProductFilters;
