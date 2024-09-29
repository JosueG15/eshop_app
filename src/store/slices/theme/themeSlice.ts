import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "../../store";

interface ThemeState {
  themeMode: "light" | "dark";
}

const initialState: ThemeState = {
  themeMode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<"light" | "dark">) {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;

export default themeSlice.reducer;

export const loadTheme = () => async (dispatch: AppDispatch) => {
  try {
    const savedTheme = await AsyncStorage.getItem("themeMode");
    if (savedTheme) {
      dispatch(setThemeMode(savedTheme as "light" | "dark"));
    }
  } catch (error) {
    console.error("Failed to load theme from storage:", error);
  }
};

export const saveTheme =
  (mode: "light" | "dark") => async (dispatch: AppDispatch) => {
    try {
      await AsyncStorage.setItem("themeMode", mode);
      dispatch(setThemeMode(mode));
    } catch (error) {
      console.error("Failed to save theme to storage:", error);
    }
  };
