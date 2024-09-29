import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../shared/types/userType";

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

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
    updateAvatarSuccess: (state, action: PayloadAction<{ user: IUser }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { loginSuccess, logout, updateAvatarSuccess } = authSlice.actions;
export default authSlice.reducer;
