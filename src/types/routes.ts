import { IProduct } from "./products";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type HomeStackParamList = {
  Home: undefined;
  "Product Detail": { item: IProduct };
};

export type HomeNavigationProp = StackNavigationProp<HomeStackParamList>;
