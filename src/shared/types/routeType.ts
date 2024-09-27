import { IProduct } from "./productType";
import { StackNavigationProp } from "@react-navigation/stack";

export type HomeStackParamList = {
  Home: undefined;
  ProductDetail: { item: IProduct };
};

export type CartStackParamList = {
  Cart: undefined;
  Checkout: undefined;
};

export type UserStackParamList = {
  Login: undefined;
  Register: undefined;
  Profile: undefined;
};

export type CheckoutStackParamList = {
  Shipping: undefined;
  Payment: undefined;
  Confirm: undefined;
};

export type HomeNavigationProp = StackNavigationProp<HomeStackParamList>;
export type UserNavigationProp = StackNavigationProp<UserStackParamList>;
export type CartNavigationProp = StackNavigationProp<CartStackParamList>;
