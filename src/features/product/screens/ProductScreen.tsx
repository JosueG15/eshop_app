import React, { useState, useCallback } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";

import Banner from "../../../shared/components/Banner";
import CategoryFilter from "../components/CategoryFilter";
import CustomSearchBar from "../../../shared/components/CustomSearchBar";
import { useCategories } from "../hooks/useCategories";
import { useDebounce } from "../hooks/useDebounce";
import ProductList from "../components/ProductList";

const ProductScreen: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { theme } = useTheme();

  const { data: categoryListResponse } = useCategories();
  const categories = categoryListResponse?.data ?? [];

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
