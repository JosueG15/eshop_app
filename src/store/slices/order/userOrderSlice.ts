import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";

import { RootState } from "../../store";
import { IOrder } from "../../../shared/types/orderType";
import { IError } from "../../../shared/types/globalType";
import { getUserOrders } from "../../../features/checkout/services/paymentService";
import { updateOrderStatus } from "./orderSlice";

interface UserOrdersState {
  orders: WritableDraft<IOrder>[];
  totalOrders: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserOrdersState = {
  orders: [],
  totalOrders: 0,
  totalPages: 0,
  isLoading: false,
  error: null,
};

export const fetchUserOrders = createAsyncThunk<
  {
    data: IOrder[];
    totalOrders: number;
    totalPages: number;
  },
  { filters?: Record<string, any>; page?: number; limit?: number },
  { rejectValue: IError; state: RootState }
>(
  "userOrders/fetchUserOrders",
  async (
    { filters = {}, page = 1, limit = 10 },
    { rejectWithValue, getState }
  ) => {
    const { token, user } = getState().auth;
    if (!token || !user?.id)
      throw new Error("No authentication token or user available");

    const updatedFilters = user.isAdmin
      ? { ...filters }
      : { ...filters, userId: user.id };

    try {
      const response = await getUserOrders(token, updatedFilters, page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(
        (error as IError) || { message: "Error fetching user orders" }
      );
    }
  }
);

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {
    resetUserOrders: (state) => {
      state.orders = [];
      state.totalOrders = 0;
      state.totalPages = 0;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: IOrder[];
            totalOrders: number;
            totalPages: number;
          }>
        ) => {
          state.orders = action.payload.data as WritableDraft<IOrder>[];
          state.totalOrders = action.payload.totalOrders;
          state.totalPages = action.payload.totalPages;
          state.isLoading = false;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })

      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<IOrder>) => {
          const updatedOrder = action.payload;
          const index = state.orders.findIndex(
            (order) => order.id === updatedOrder.id
          );
          if (index !== -1) {
            state.orders[index] = updatedOrder as WritableDraft<IOrder>;
          }
        }
      );
  },
});

export const { resetUserOrders } = userOrdersSlice.actions;
export default userOrdersSlice.reducer;
