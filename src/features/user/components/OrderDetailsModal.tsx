import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { IOrder } from "../../../shared/types/orderType";
import { useTheme, Button } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { updateOrderStatus } from "../../../store/slices/order/orderSlice";
import {
  generateOrderId,
  statusTranslations,
} from "../../../shared/utils/orderUtil";

interface OrderDetailsModalProps {
  isVisible: boolean;
  order: IOrder;
  index: number;
  onClose: () => void;
  onCancelOrder: () => void;
  userIsAdmin?: boolean;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isVisible,
  order,
  index,
  onClose,
  onCancelOrder,
  userIsAdmin = false,
}) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const dispatch = useDispatch<AppDispatch>();

  const handleCancelOrder = async () => {
    try {
      await dispatch(
        updateOrderStatus({ orderId: order.id, status: "Canceled" })
      ).unwrap();
      onClose();
    } catch (error) {
      console.error("Error canceling the order:", error);
    }
  };

  const isCancellable =
    order.status !== "Completed" && order.status !== "Canceled";

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View
          style={[styles.modalContainer, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.modalTitle, { color: colors.primaryText }]}>
            Detalles de Orden{" "}
            {generateOrderId(order.dateOrdered.toString(), index + 1)}
          </Text>

          <Text style={[styles.modalText, { color: colors.secondary }]}>
            Estado: {statusTranslations[order.status]}
          </Text>
          <Text style={[styles.modalText, { color: colors.secondary }]}>
            Fecha: {new Date(order.dateOrdered).toLocaleDateString()}
          </Text>
          <Text style={[styles.modalText, { color: colors.secondary }]}>
            Total: ${order.totalPrice?.toFixed(2)}
          </Text>

          {order.orderItems.map((item) => (
            <Text
              key={item.product.id}
              style={[styles.modalText, { color: colors.secondary }]}
            >
              {item.quantity} x {item.product.name} (${item.product.price})
            </Text>
          ))}

          <View style={styles.buttonContainer}>
            <Button
              title="Cerrar"
              onPress={onClose}
              buttonStyle={{ backgroundColor: colors.accentColor }}
            />
            {isCancellable && (
              <Button
                title="Cancelar Orden"
                onPress={handleCancelOrder}
                buttonStyle={{ backgroundColor: colors.error, marginLeft: 10 }}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
});

export default OrderDetailsModal;
