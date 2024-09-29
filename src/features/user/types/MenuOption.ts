import { GestureResponderEvent } from "react-native";

export interface MenuOption {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}
