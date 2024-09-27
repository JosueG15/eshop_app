import { createTheme } from "@rneui/themed";

export const lightTheme = createTheme({
  lightColors: {
    background: "#FFFFFF",
    primary: "#F5F5F5",
    primaryText: "#000000",
    secondary: "#333333",
    accentColor: "#A6A6A6",
    borderColor: "#E0E0E0",
    priceText: "#fdc500",
    buttonColor: "#ffd60a",
    error: "#ff5252",
    infoColor: "#0d47a1",
    nextColor: "#0d47a1",
    infoTextColor: "white",
  },
  mode: "light",
});

export const darkTheme = createTheme({
  darkColors: {
    background: "#2C2C2C",
    primary: "#3A3A3A",
    primaryText: "#fff",
    secondary: "#B3B3B3",
    accentColor: "#444444",
    borderColor: "#444444",
    priceText: "#686201",
    buttonColor: "#ffffa3",
    error: "#cf6679",
    infoColor: "#fcdd00",
    nextColor: "#0d47a1",
    infoTextColor: "white",
  },
  mode: "dark",
});
