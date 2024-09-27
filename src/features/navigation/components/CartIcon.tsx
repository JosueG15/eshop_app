import { ICON_SIZE } from "../constants/iconConstants";
import Icon from "react-native-vector-icons/FontAwesome";
import iconStyles from "../styles/iconStyle";
import { createSelector } from "@reduxjs/toolkit";
import { Badge } from "@rneui/base";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const CartIcon: React.FC<{ color: string }> = ({ color }) => {
  const selectCartItems = (state: RootState) => state.cart.items;
  const selectTotalCartItems = createSelector([selectCartItems], (items) =>
    items.reduce((total, item) => total + item.quantity, 0)
  );

  const totalCartItems = useSelector(selectTotalCartItems);
  return (
    <View style={iconStyles.iconContainer}>
      <Icon
        name="shopping-cart"
        style={iconStyles.icon}
        color={color}
        size={ICON_SIZE}
        accessible={true}
        accessibilityLabel="Carrito de compras"
      />
      {totalCartItems > 0 && (
        <Badge
          value={totalCartItems}
          status="error"
          containerStyle={iconStyles.badgeContainer}
          textStyle={iconStyles.badgeText}
        />
      )}
    </View>
  );
};

export default CartIcon;
