import React, { useState, useCallback } from "react";
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { useProducts } from "../../hooks/useProduct";
import ProductItem from "../../components/product/ProductItem";
import { IProduct } from "../../types/products";
import { useTheme } from "@rneui/themed";
import ProductSearchBar from "../../components/shared/SharedSearchBar";
import { useDebounce } from "../../hooks/useDebounce";
import Banner from "../../components/shared/Banner";
import CategoryFilter from "../../components/product/CategoryFilter";
import { useCategories } from "../../hooks/useCategory";

const ProductScreen: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {
    data: productListResponse,
    isLoading,
    isError,
    error,
  } = useProducts({
    name: debouncedSearch,
    category: selectedCategories.length
      ? selectedCategories.join(",")
      : undefined,
  });

  const { data: categoryListResponse } = useCategories();

  const { theme } = useTheme();
  const colors = theme.colors;

  const products = productListResponse?.data ?? [];
  const categories = categoryListResponse?.data ?? [];

  const handleProductSelect = (product: IProduct) => {
    // TODO: Add functionality to redirect to single product page.
  };

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      setSelectedCategories((prevSelected) =>
        prevSelected.includes(categoryId)
          ? prevSelected.filter((id) => id !== categoryId)
          : [...prevSelected, categoryId]
      );
    },
    [selectedCategories]
  );

  const clearCategoryFilters = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ProductSearchBar search={search} setSearch={setSearch} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {!search && <Banner />}

        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={handleCategorySelect}
          onClearCategories={clearCategoryFilters}
        />

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={colors.secondary}
            style={styles.loader}
          />
        ) : isError ? (
          <Text style={[styles.errorText, { color: colors.error }]}>
            Error al obtener los productos: {error.message}
          </Text>
        ) : products.length === 0 ? (
          <Text style={styles.emptyMessage}>
            Ooops! No hay productos disponibles en este momento.
          </Text>
        ) : (
          <View style={styles.productListContainer}>
            {products.map((item: IProduct) => (
              <ProductItem key={item.id} product={item} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  loader: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  productListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 10,
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
  },
  emptyMessage: {
    textAlign: "center",
    color: "gray",
    fontSize: 18,
    marginTop: 20,
  },
});

export default ProductScreen;
