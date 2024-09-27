import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { SearchBar, useTheme } from "@rneui/themed";

interface ProductSearchBarProps {
  search: string;
  setSearch: (text: string) => void;
}

const ProductSearchBar: React.FC<ProductSearchBarProps> = ({
  search,
  setSearch,
}) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          paddingBottom: 25,
        },
        inputContainer: {
          backgroundColor: colors.primary,
          borderRadius: 20,
          borderColor: colors.primary,
        },
        input: { color: colors.secondary },
      }),
    [colors]
  );

  return (
    <SearchBar
      placeholder="Buscar Productos..."
      onChangeText={setSearch}
      value={search}
      round
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      placeholderTextColor={colors.secondary}
      lightTheme={theme.mode === "light"}
      accessible={true}
      accessibilityLabel="Buscar Productos"
    />
  );
};

export default ProductSearchBar;
