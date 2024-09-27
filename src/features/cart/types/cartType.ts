import { IProduct } from "../../../shared/types/productType";

export type CartItem = IProduct & { quantity: number };

export interface ShippingInfo {
  phone: string;
  shippingAddress1: string;
  shippingAddress2?: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: string;
}
