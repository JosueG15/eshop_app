import React, { useState } from "react";
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

const ProductScreen: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: productListResponse,
    isLoading,
    isError,
    error,
  } = useProducts({
    name: debouncedSearch,
  });

  const { theme } = useTheme();
  const colors = theme.colors;

  const products = productListResponse?.data ?? [];

  const handleProductSelect = (product: IProduct) => {
    // ToDO: Add functionality to redirect to single product page.
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ProductSearchBar
        search={search}
        setSearch={setSearch}
        searchResults={products}
        onSelectProduct={handleProductSelect}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Show Banner when no search is happening */}
        {!search && <Banner />}

        {/* Loader and error handling */}
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loader}
          />
        ) : isError ? (
          <Text style={[styles.errorText, { color: colors.error }]}>
            Error fetching products: {error.message}
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
});

export default ProductScreen;
