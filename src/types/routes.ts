import { IProduct } from "./products";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type HomeStackParamList = {
  Home: undefined;
  "Product Detail": { item: IProduct };
};

export type CartStackParamList = {
  Cart: undefined;
  Checkout: undefined;
};

export type HomeNavigationProp = StackNavigationProp<HomeStackParamList>;
