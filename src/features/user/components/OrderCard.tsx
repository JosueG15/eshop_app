import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IOrder } from "../../../shared/types/orderType";
import { useTheme, Icon } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { updateOrderStatus } from "../../../store/slices/order/orderSlice";
import OrderDetailsModal from "./OrderDetailsModal";
import {
  generateOrderId,
  statusTranslations,
} from "../../../shared/utils/orderUtil";

interface OrderCardProps {
  order: IOrder;
  index: number;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, index }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();
  const { colors } = theme;
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const statusColors: Record<string, string> = {
    Pending: colors.statusPending || "#FFA500",
    "Payment Pending": colors.statusPaymentPending || "#FFD700",
    Shipped: colors.statusShipped || "#1E90FF",
    Completed: colors.statusCompleted || "#32CD32",
    Canceled: colors.statusCanceled || "#FF4500",
  };

  const statusColor = statusColors[order.status] || colors.primaryText;
  const translatedStatus = statusTranslations[order.status] || order.status;
  const formattedOrderId = generateOrderId(
    order.dateOrdered.toString(),
    index + 1
  );

  const handleStatusUpdate = (newStatus: string) => {
    dispatch(updateOrderStatus({ orderId: order.id, status: newStatus }));
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View
          style={[
            styles.card,
            { borderColor: statusColor, backgroundColor: colors.primary },
          ]}
        >
          <Text style={[styles.title, { color: colors.secondary }]}>
            {formattedOrderId}
          </Text>
          <Text style={[styles.label, { color: colors.primaryText }]}>
            Estado:{" "}
            <Text style={[styles.status, { color: statusColor }]}>
              {translatedStatus}
            </Text>
          </Text>
          <Text style={[styles.label, { color: colors.primaryText }]}>
            Fecha de Orden: {new Date(order.dateOrdered).toLocaleDateString()}
          </Text>
          <Text style={[styles.label, { color: colors.primaryText }]}>
            Total: ${order.totalPrice?.toFixed(2)}
          </Text>

          {user?.isAdmin && (
            <View style={styles.adminButtons}>
              {["Payment Pending", "Pending"].includes(order.status) && (
                <TouchableOpacity onPress={() => handleStatusUpdate("Shipped")}>
                  <Icon
                    name="local-shipping"
                    type="material"
                    color={colors.secondary}
                  />
                </TouchableOpacity>
              )}
              {order.status === "Shipped" && (
                <TouchableOpacity
                  onPress={() => handleStatusUpdate("Completed")}
                >
                  <Icon
                    name="check-circle"
                    type="material"
                    color={colors.secondary}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>

      <OrderDetailsModal
        isVisible={isModalVisible}
        order={order}
        index={index}
        onClose={() => setModalVisible(false)}
        onCancelOrder={() => handleStatusUpdate("Canceled")}
        userIsAdmin={user?.isAdmin}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 2,
  },
  status: {
    fontWeight: "bold",
  },
  adminButtons: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
});

export default OrderCard;
