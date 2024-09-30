import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";

import Banner from "../../../shared/components/Banner";
import CategoryFilter from "../components/CategoryFilter";
import CustomSearchBar from "../../../shared/components/CustomSearchBar";
import { useDebounce } from "../hooks/useDebounce";
import ProductList from "../components/ProductList";
import { fetchCategories } from "../../../store/slices/categories/categorySlice";
import { AppDispatch, RootState } from "../../../store/store";

const ProductScreen: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });

  const renderHeader = () => (
    <>
      {!search && <Banner />}
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onSelectCategory={handleCategorySelect}
        onClearCategories={clearCategoryFilters}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomSearchBar
        placeholder="Buscar Productos"
        search={search}
        setSearch={setSearch}
      />
      <ProductList
        params={{
          name: debouncedSearch,
          category: selectedCategories.length
            ? selectedCategories.join(",")
            : undefined,
        }}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

export default ProductScreen;
