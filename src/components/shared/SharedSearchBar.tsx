import React from "react";
import { View } from "react-native";
import { SearchBar, useTheme } from "@rneui/themed";

interface SharedSearchBarProps {
  search: string;
  setSearch: (text: string) => void;
}

const SharedSearchBar: React.FC<SharedSearchBarProps> = ({
  search,
  setSearch,
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
          paddingBottom: 25,
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

export default SharedSearchBar;
