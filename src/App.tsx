import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import QueryClientProvider from "./contexts/QueryClientProvider";
import ProductContainer from "./screens/products/ProductContainer";
import Header from "./components/shared/Header";

export default function App() {
  return (
    <QueryClientProvider>
      <SafeAreaView style={styles.container}>
        <Header />
        <ProductContainer />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
