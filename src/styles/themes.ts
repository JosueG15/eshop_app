import { createTheme } from "@rneui/themed";

export const lightTheme = createTheme({
  lightColors: {
    background: "#FFFFFF",
    primary: "#F5F5F5",
    primaryText: "#000000",
    accentColor: "#A6A6A6",
    borderColor: "#E0E0E0",
    priceText: "#fdc500",
    buttonColor: "#ffd60a",
    error: "#ff5252",
    infoColor: "#0d47a1",

    secondary: "#333333",
    black: "#000000",
    searchBg: "#f1f1f1",
    text: "#212121",
    cardBackground: "#fafafa",
    cardShadow: "rgba(0, 0, 0, 0.1)",
    buttonBackground: "#ff6f61",
    buttonText: "#ffffff",
    customBg: "#f8f8f8",
    inactiveCategoryBg: "#f8f8f8",
    priceColor: "#ff6f61",
    clearCartBg: "#ff5252",
    tabBarBg: "#ffffff",
    tabBarIndicator: "#6200ea",
    infoIconColor: "#1976d2",
    selectedInfoIconColor: "#0d47a1",
  },
  mode: "light",
});

export const darkTheme = createTheme({
  darkColors: {
    background: "#2C2C2C",
    primary: "#3A3A3A",
    primaryText: "#fff",
    accentColor: "#444444",
    borderColor: "#444444",
    secondary: "#B3B3B3",
    priceText: "#686201",
    buttonColor: "#ffffa3",
    error: "#cf6679",
    infoColor: "#1976d2",

    white: "#ffffff",
    searchBg: "#333333",
    text: "#e0e0e0",
    cardBackground: "#1e1e1e",
    cardShadow: "rgba(0, 0, 0, 0.8)",
    buttonBackground: "#ff6f61",
    buttonText: "#ffffff",
    customBg: "#121212",
    inactiveCategoryBg: "#121212",
    priceColor: "#ff6f61",
    clearCartBg: "#cf6679",
    tabBarBg: "#121212",
    tabBarIndicator: "#bb86fc",
    infoIconColor: "#81d4fa",
    selectedInfoIconColor: "#0288d1",
  },
  mode: "dark",
});
