import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import {
  ILoginResponse,
  LoginFormValues,
  IUser,
  IDecodedToken,
} from "../../../shared/types/userType";
import { IError } from "../../../shared/types/globalType";
import {
  getUserProfile,
  login,
  uploadUserAvatar,
  updateUser,
  registerUser as registerUserService,
} from "../../../features/user/services/userService";
import { showToast } from "../../../shared/components/Toast";
import {
  HomeNavigationProp,
  UserNavigationProp,
} from "../../../shared/types/routeType";
import { RootState } from "../../store";

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAdmin: boolean;
  isLoadingLogin: boolean;
  isLoadingAvatar: boolean;
  isError: boolean;
  errorMessage: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAdmin: false,
  isLoadingLogin: false,
  isLoadingAvatar: false,
  isError: false,
  errorMessage: null,
  isAuthenticated: false,
  isLoading: false,
};

export const loadTokenFromStorage = createAsyncThunk(
  "auth/loadTokenFromStorage",
  async (_, { dispatch }) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const decoded: IDecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          await AsyncStorage.removeItem("authToken");
          dispatch(logout());
          return;
        }

        const userProfile = await getUserProfile(decoded.userId, token);
        dispatch(loginSuccess({ user: userProfile, token }));
      }
    } catch (error) {
      console.error("Failed to load or validate token from storage:", error);
    }
  }
);

export const registerUser = createAsyncThunk<
  IUser,
  IUser,
  { rejectValue: IError }
>("auth/registerUser", async (userData, { rejectWithValue, dispatch }) => {
  try {
    const response = await registerUserService(userData);

    const { token, user } = response;

    await AsyncStorage.setItem("authToken", token);

    dispatch(loginSuccess({ user, token }));

    showToast("Registro Exitoso", "Te has registrado con éxito", "success");

    return user;
  } catch (error) {
    return rejectWithValue({ message: "Usuario ya existe" });
  }
});

export const loginUser = createAsyncThunk<
  ILoginResponse,
  {
    data: LoginFormValues;
    navigation: UserNavigationProp & HomeNavigationProp;
  },
  { rejectValue: IError }
>(
  "auth/loginUser",
  async ({ data, navigation }, { rejectWithValue, dispatch }) => {
    try {
      const response = await login(data);
      const { token } = response;
      const decoded: IDecodedToken = jwtDecode(token);

      await AsyncStorage.setItem("authToken", token);

      const userProfile = await getUserProfile(decoded.userId, token);

      dispatch(loginSuccess({ user: userProfile, token }));

      showToast("Login Exitoso", "Inicio de sesión exitoso", "success");

      navigation.navigate("Home");

      return response;
    } catch (error) {
      const err = error as IError;
      showToast("Error", err.message || "Error desconocido", "error");
      return rejectWithValue((err || { message: "Login failed" }) as IError);
    }
  }
);

export const uploadAvatar = createAsyncThunk<
  IUser,
  { imageUri: string },
  { rejectValue: IError }
>(
  "auth/uploadAvatar",
  async ({ imageUri }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token, user } = (getState() as RootState).auth;

      if (!token || !user) {
        throw new Error("No authentication token available");
      }

      const updatedUser = await uploadUserAvatar(user.id, imageUri, token);
      dispatch(updateUserProfile(updatedUser));
      return updatedUser;
    } catch (error) {
      const err = error as IError;
      showToast("Error", err.message || "Error al subir el avatar", "error");
      return rejectWithValue(err || { message: "Failed to upload avatar" });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      await AsyncStorage.removeItem("authToken");
      dispatch(logout());
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }
);

export const updateUserInfo = createAsyncThunk<
  IUser,
  Partial<IUser>,
  { rejectValue: IError }
>(
  "auth/updateUserInfo",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token, user } = (getState() as RootState).auth;

      if (!token || !user) {
        throw new Error("No authentication token available");
      }

      const updatedUser = await updateUser(user.id, userData, token);
      dispatch(updateUserProfile(updatedUser));
      return updatedUser;
    } catch (error) {
      const err = error as IError;
      showToast(
        "Error",
        err.message || "Error al actualizar la información",
        "error"
      );
      return rejectWithValue(err || { message: "Failed to update user info" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAdmin = action.payload.user.isAdmin;
      state.isLoadingLogin = false;
      state.isError = false;
      state.errorMessage = null;
      state.isAuthenticated = true;
    },
    updateUserProfile: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      state.isAuthenticated = false;
      state.isError = false;
      state.errorMessage = null;
    },
    clearError: (state) => {
      state.isError = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoadingLogin = true;
      state.isError = false;
      state.errorMessage = null;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isLoadingLogin = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoadingLogin = false;
      state.isError = true;
      state.errorMessage =
        action.payload?.message || "Credenciales incorrectas";
    });

    builder.addCase(uploadAvatar.pending, (state) => {
      state.isLoadingAvatar = true;
      state.isError = false;
      state.errorMessage = null;
    });
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoadingAvatar = false;
      showToast(
        "Avatar actualizado",
        "Tu avatar fue actualizado con éxito",
        "success"
      );
    });
    builder.addCase(uploadAvatar.rejected, (state, action) => {
      state.isLoadingAvatar = false;
      state.isError = true;
      state.errorMessage =
        action.payload?.message || "Error al subir el avatar";
    });
    builder.addCase(updateUserInfo.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      showToast(
        "Información actualizada",
        "Tu información fue actualizada con éxito",
        "success"
      );
    });
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage =
        action.payload?.message || "Error al actualizar la información";
    });
  },
});

export const { loginSuccess, updateUserProfile, logout, clearError } =
  authSlice.actions;
export default authSlice.reducer;
