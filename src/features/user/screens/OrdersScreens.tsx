import React, { useCallback, useMemo } from "react";
import {
  View,
  SectionList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@rneui/themed";

import { AppDispatch, RootState } from "../../../store/store";
import { fetchUserOrders } from "../../../store/slices/order/userOrderSlice";
import OrderCard from "../components/OrderCard";

import { IOrder } from "../../../shared/types/orderType";

const OrdersScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, isLoading } = useSelector(
    (state: RootState) => state.userOrders
  );
  const { theme } = useTheme();
  const { colors } = theme;

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchUserOrders({ page: 1, limit: 10 }));
    }, [dispatch])
  );

  const statusInfo: Record<string, { label: string; color: string }> = {
    Pending: { label: "Pendiente", color: colors.statusPending || "#FFA500" },
    "Payment Pending": {
      label: "Pendiente de pago",
      color: colors.statusPaymentPending || "#FFD700",
    },
    Shipped: { label: "Enviado", color: colors.statusShipped || "#1E90FF" },
    Completed: {
      label: "Completado",
      color: colors.statusCompleted || "#32CD32",
    },
    Canceled: { label: "Cancelado", color: colors.statusCanceled || "#FF4500" },
  };

  const groupedOrders = useMemo(() => {
    const sortedOrders = [...orders].sort(
      (a, b) =>
        new Date(b.dateOrdered).getTime() - new Date(a.dateOrdered).getTime()
    );

    const groups = sortedOrders.reduce(
      (acc: Record<string, IOrder[]>, order) => {
        const status = order.status;
        if (!acc[status]) acc[status] = [];
        acc[status].push(order);
        return acc;
      },
      {}
    );

    return Object.keys(groups).map((status) => ({
      title: statusInfo[status]?.label || status,
      color: statusInfo[status]?.color || colors.primaryText,
      data: groups[status],
    }));
  }, [orders, colors]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      color: colors.primaryText,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: "bold",
      paddingVertical: 8,
      paddingLeft: 10,
      borderRadius: 5,
      marginVertical: 5,
    },
    listContainer: {
      paddingBottom: 15,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: colors.secondary,
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.infoColor} />
        <Text style={[styles.loadingText, { color: colors.secondary }]}>
          Cargando órdenes...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SectionList
        sections={groupedOrders}
        keyExtractor={(order) => order.id}
        renderItem={({ item, index }) => (
          <OrderCard index={index} order={item} />
        )}
        renderSectionHeader={({ section: { title, color } }) => (
          <Text
            style={[
              styles.sectionHeader,
              { backgroundColor: color, color: colors.primaryText },
            ]}
          >
            {title}
          </Text>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default OrdersScreen;
