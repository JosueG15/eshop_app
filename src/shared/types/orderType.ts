import { IProduct } from "./productType";
import { IUser } from "./userType";

export interface IOrderItem extends Document {
  product: IProduct;
  quantity: number;
}

export interface IOrder {
  id: string;
  orderItems: IOrderItem[];
  address: string;
  address2?: string;
  state: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status: string;
  totalPrice?: number;
  user: IUser;
  dateOrdered: Date;
}
