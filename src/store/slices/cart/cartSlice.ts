import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../shared/types/productType";
import { CartItem } from "../../../shared/types/cartType";

interface CartState {
  items: Array<CartItem>;
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      const existingItem = state.items.find(
        (item: CartItem) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const index = state.items.findIndex(
        (item: CartItem) => item.id === action.payload
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.items = [];
    },
    updateCartQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const existingItem = state.items.find(
        (item: CartItem) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
