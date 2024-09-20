import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const getContainerWidth = (divisor: number) => width / divisor;
