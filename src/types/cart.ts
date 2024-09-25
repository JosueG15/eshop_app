import { IProduct } from "./products";

export type CartItem = IProduct & { quantity: number };
