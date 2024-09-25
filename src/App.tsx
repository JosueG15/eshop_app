import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import QueryClientProvider from "./contexts/QueryClientProvider";
import ProductScreen from "./screens/products/ProductScreen";
import Header from "./components/shared/Header";
import { ThemeProvider, useThemeMode } from "@rneui/themed";
import { lightTheme, darkTheme } from "./styles/themes";

export default function App() {
  const { mode } = useThemeMode();

  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <QueryClientProvider>
        <SafeAreaView style={styles.container}>
          <Header />
          <ProductScreen />
        </SafeAreaView>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
