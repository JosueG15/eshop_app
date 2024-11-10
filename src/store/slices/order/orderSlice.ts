import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IError } from "../../../shared/types/globalType";
import { showToast } from "../../../shared/components/Toast";
import {
  createOrder,
  createPaymentIntent,
  updateOrder,
} from "../../../features/checkout/services/paymentService";
import { IOrder } from "../../../shared/types/orderType";
import { WritableDraft } from "immer";
import { statusTranslations } from "../../../shared/utils/orderUtil";

interface OrderState {
  currentOrder: WritableDraft<IOrder> | null;
  clientSecret: string | null;
  isLoading: boolean;
}

const initialState: OrderState = {
  currentOrder: null,
  clientSecret: null,
  isLoading: false,
};

export const initiatePayment = createAsyncThunk<
  { clientSecret: string },
  { amount: number },
  { rejectValue: IError; state: RootState }
>(
  "orders/initiatePayment",
  async ({ amount }, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    if (!token) throw new Error("No authentication token available");

    try {
      const response = await createPaymentIntent(amount, token);

      return { clientSecret: response.clientSecret };
    } catch (error) {
      return rejectWithValue(
        (error as IError) || { message: "Error initiating payment" }
      );
    }
  }
);

export const placeOrder = createAsyncThunk<
  IOrder,
  Partial<IOrder>,
  { rejectValue: IError; state: RootState }
>("orders/placeOrder", async (orderData, { rejectWithValue, getState }) => {
  const { token } = getState().auth;
  if (!token) throw new Error("No authentication token available");

  try {
    const newOrder = await createOrder(orderData, token);
    showToast("Orden creada", "Tu orden fue creada exitosamente", "success");
    return newOrder;
  } catch (error) {
    showToast("Error", "Error al crear la orden", "error");
    return rejectWithValue(
      (error as IError) || { message: "Error creating order" }
    );
  }
});

export const updateOrderStatus = createAsyncThunk<
  IOrder,
  { orderId: string; status: string },
  { rejectValue: IError; state: RootState }
>(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    if (!token) throw new Error("No authentication token available");

    try {
      const updatedOrder = await updateOrder(orderId, status, token);
      showToast(
        "Estado actualizado",
        `El estado de la orden ha sido actualizado a ${statusTranslations[status]}`,
        "success"
      );
      return updatedOrder;
    } catch (error) {
      showToast("Error", "Error al actualizar el estado de la orden", "error");
      return rejectWithValue(
        (error as IError) || { message: "Error updating order status" }
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
      state.clientSecret = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        initiatePayment.fulfilled,
        (state, action: PayloadAction<{ clientSecret: string }>) => {
          state.clientSecret = action.payload.clientSecret;
          state.isLoading = false;
        }
      )
      .addCase(initiatePayment.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<IOrder>) => {
        state.currentOrder = action.payload as WritableDraft<IOrder>;
        state.isLoading = false;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<IOrder>) => {
          state.currentOrder = action.payload as WritableDraft<IOrder>;
          state.isLoading = false;
        }
      )
      .addCase(updateOrderStatus.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
