import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../shared/types/userType";
import {
  uploadUserAvatar,
  updateUser,
} from "../../../features/user/services/userService";
import { IError } from "../../../shared/types/globalType";

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const uploadAvatar = createAsyncThunk<
  IUser,
  { imageUri: string },
  { state: { auth: AuthState }; rejectValue: IError }
>("auth/uploadAvatar", async ({ imageUri }, { getState, rejectWithValue }) => {
  const { token, user } = getState().auth;
  if (!token || !user) {
    return rejectWithValue({ message: "User is not authenticated" });
  }
  try {
    return await uploadUserAvatar(user.id, imageUri, token);
  } catch (error) {
    return rejectWithValue(
      (error as IError) || { message: "Failed to upload avatar" }
    );
  }
});

export const updateUserInfo = createAsyncThunk<
  IUser,
  Partial<IUser>,
  { state: { auth: AuthState }; rejectValue: IError }
>("auth/updateUserInfo", async (updateData, { getState, rejectWithValue }) => {
  const { token, user } = getState().auth;
  if (!token || !user) {
    return rejectWithValue({ message: "Usuario no esta autenticado" });
  }
  try {
    return await updateUser(user.id, updateData, token);
  } catch (error) {
    return rejectWithValue(
      (error as IError) || {
        message: "Error al actualizar la informacion del usuario",
      }
    );
  }
});

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
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          "Error al subir la imagen, archivo muy grande";
      })

      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Error al actualizar el perfil";
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
