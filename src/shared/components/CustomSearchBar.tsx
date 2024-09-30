import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { SearchBar, useTheme } from "@rneui/themed";

interface SearchBarProps {
  search: string;
  setSearch: (text: string) => void;
  placeholder?: string;
}

const CustomSearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  placeholder = "Buscar",
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
          paddingBottom: 15,
          paddingTop: 0,
        },
        inputContainer: {
          backgroundColor: colors.primary,
          borderRadius: 20,
          borderColor: colors.primary,
        },
        input: { color: colors.secondary },
      }),
    [theme]
  );

  return (
    <SearchBar
      placeholder={placeholder}
      onChangeText={setSearch}
      value={search}
      round
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      placeholderTextColor={colors.secondary}
      lightTheme={theme.mode === "light"}
      accessible={true}
      accessibilityLabel={placeholder}
    />
  );
};

export default CustomSearchBar;
