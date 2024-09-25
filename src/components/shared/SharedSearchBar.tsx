import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { SearchBar, useTheme } from "@rneui/themed";
import { IProduct } from "../../types/products";

interface SharedSearchBarProps {
  search: string;
  setSearch: (text: string) => void;
  searchResults: IProduct[];
  onSelectProduct: (product: IProduct) => void;
}

const SharedSearchBar: React.FC<SharedSearchBarProps> = ({
  search,
  setSearch,
  searchResults,
  onSelectProduct,
}) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  return (
    <View>
      <SearchBar
        placeholder="Search Products..."
        onChangeText={setSearch}
        value={search}
        round
        containerStyle={{
          backgroundColor: colors.background,
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        inputContainerStyle={{
          backgroundColor: colors.searchBg,
          borderRadius: 20,
          borderColor: colors.primary,
        }}
        inputStyle={{ color: colors.primary }}
        placeholderTextColor={colors.grey2}
        lightTheme={theme.mode === "light"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownList: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 5,
  },
  dropdownItem: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productImage: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  productInfo: {
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#999",
  },
});

export default SharedSearchBar;
