import { createTheme } from "@rneui/themed";

export const lightTheme = createTheme({
  lightColors: {
    background: "#ffffff",
    primary: "#6200ea",
    black: "#000000",
    searchBg: "#f1f1f1",
    text: "#212121",
    cardBackground: "#fafafa",
    cardShadow: "rgba(0, 0, 0, 0.1)",
    error: "#ff5252",
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
    background: "#121212",
    primary: "#bb86fc",
    white: "#ffffff",
    searchBg: "#333333",
    text: "#e0e0e0",
    cardBackground: "#1e1e1e",
    cardShadow: "rgba(0, 0, 0, 0.8)",
    error: "#cf6679",
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
