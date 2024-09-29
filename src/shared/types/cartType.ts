import { IProduct } from "../../../shared/types/productType";

export type CartItem = IProduct & { quantity: number };

export interface ShippingInfo {
  phone: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  paymentMethod: string;
}
