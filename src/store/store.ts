import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import authSlice from "./slices/auth/authSlice";
import cartSlice from "./slices/cart/cartSlice";
import themeSlice from "./slices/theme/themeSlice";
import categorySlice from "./slices/categories/categorySlice";

const rootReducer = combineReducers({
  cart: cartSlice,
  auth: authSlice,
  theme: themeSlice,
  categories: categorySlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
