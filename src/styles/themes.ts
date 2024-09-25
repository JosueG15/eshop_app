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
  },
  mode: "dark",
});
