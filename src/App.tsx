import { StyleSheet } from "react-native";
import QueryClientProvider from "./contexts/QueryClientProvider";

import ProductContainer from "./screens/products/ProductContainer";

export default function App() {
  return (
    <QueryClientProvider>
      <ProductContainer />
    </QueryClientProvider>
  );
}
