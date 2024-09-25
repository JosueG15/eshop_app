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
        placeholder="Buscar Productos..."
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
          backgroundColor: colors.primary,
          borderRadius: 20,
          borderColor: colors.primary,
        }}
        inputStyle={{ color: colors.secondary }}
        placeholderTextColor={colors.secondary}
        lightTheme={theme.mode === "light"}
      />
    </View>
  );
};

export default SharedSearchBar;
