import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { IProduct } from "./productType";

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
  EditPersonalInfo: undefined;
  EditShippingInfo: undefined;
  Orders: undefined;
};

export type SettingStackParamList = {
  Settings: undefined;
  ChangeTheme: undefined;
  ManageCategories: undefined;
  ManageInventory: undefined;
  ManageOrders: undefined;
  ProductFormScreen: { product?: IProduct };
};

export type CheckoutStackParamList = {
  Shipping: undefined;
  Payment: undefined;
  Confirm: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  CartTab: undefined;
  UserTab: undefined;
  SettingsTab: undefined;
};

export type HomeNavigationProp = StackNavigationProp<HomeStackParamList>;
export type SettingNavigationProp = StackNavigationProp<SettingStackParamList>;
export type UserNavigationProp = StackNavigationProp<UserStackParamList>;
export type CartNavigationProp = StackNavigationProp<CartStackParamList>;
export type CheckoutNavigationProp =
  StackNavigationProp<CheckoutStackParamList>;
export type MainNavigatorProp = BottomTabNavigationProp<BottomTabParamList>;
