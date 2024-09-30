import React, { useMemo } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";

interface ThemeOptionProps {
  mode: "light" | "dark";
  selectedMode: "light" | "dark";
  handleThemeChange: (mode: "light" | "dark") => void;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  label: string;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({
  mode,
  selectedMode,
  handleThemeChange,
  iconName,
  iconColor,
  label,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        option: {
          flex: 1,
          padding: 20,
          margin: 10,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.themeUnselectedOption,
          shadowColor: theme.colors.borderColor,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
        },
        selectedOption: {
          backgroundColor: theme.colors.themeSelectedOption,
        },
      }),
    [theme]
  );

  return (
    <TouchableOpacity
      style={[styles.option, selectedMode === mode && styles.selectedOption]}
      onPress={() => handleThemeChange(mode)}
    >
      <Ionicons name={iconName} size={36} color={iconColor} />
    </TouchableOpacity>
  );
};

export default ThemeOption;
