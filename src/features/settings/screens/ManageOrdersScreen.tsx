import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  SectionList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@rneui/themed";

import { AppDispatch, RootState } from "../../../store/store";
import { fetchUserOrders } from "../../../store/slices/order/userOrderSlice";
import { IOrder } from "../../../shared/types/orderType";
import OrderCard from "../../user/components/OrderCard";

const ManageOrdersScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, isLoading } = useSelector(
    (state: RootState) => state.userOrders
  );
  const { theme } = useTheme();
  const { colors } = theme;
  const [isStatsModalVisible, setStatsModalVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

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

  const stats = useMemo(() => {
    const totalSales = orders.reduce(
      (acc, order) => acc + (order.totalPrice || 0),
      0
    );
    const totalProductsSold = orders.reduce(
      (acc, order) =>
        acc +
        order.orderItems.reduce((count, item) => count + item.quantity, 0),
      0
    );
    const totalCanceled = orders.filter(
      (order) => order.status === "Canceled"
    ).length;
    const totalCompleted = orders.filter(
      (order) => order.status === "Completed"
    ).length;

    return { totalSales, totalProductsSold, totalCanceled, totalCompleted };
  }, [orders]);

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

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

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
      textAlign: "center",
    },
    statsButton: {
      paddingVertical: 10,
      backgroundColor: colors.buttonColor,
      borderRadius: 5,
      alignItems: "center",
      marginVertical: 15,
    },
    statsButtonText: {
      color: colors.secondary,
      fontWeight: "bold",
      fontSize: 16,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: "bold",
      paddingVertical: 8,
      paddingLeft: 10,
      borderRadius: 5,
      marginVertical: 5,
      textAlign: "center",
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
    // Modal styles
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      padding: 20,
      backgroundColor: colors.background,
      borderRadius: 10,
    },
    statRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 5,
    },
    statLabel: {
      fontSize: 16,
      color: colors.secondary,
    },
    statValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.priceText,
    },
    closeButton: {
      marginTop: 20,
      paddingVertical: 10,
      backgroundColor: colors.buttonColor,
      borderRadius: 5,
      alignItems: "center",
    },
    closeButtonText: {
      color: colors.secondary,
      fontWeight: "bold",
      fontSize: 16,
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
      <Text style={styles.header}>Gestión de Órdenes</Text>

      <TouchableOpacity
        style={styles.statsButton}
        onPress={() => setStatsModalVisible(true)}
      >
        <Text style={styles.statsButtonText}>Ver Estadísticas</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isStatsModalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.header}>Estadísticas de Órdenes</Text>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Ventas Totales:</Text>
              <Text style={styles.statValue}>
                ${stats.totalSales.toFixed(2)}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Productos Vendidos:</Text>
              <Text style={styles.statValue}>{stats.totalProductsSold}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Órdenes Canceladas:</Text>
              <Text style={styles.statValue}>{stats.totalCanceled}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Órdenes Completadas:</Text>
              <Text style={styles.statValue}>{stats.totalCompleted}</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setStatsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <SectionList
        sections={groupedOrders}
        keyExtractor={(order) => order.id}
        renderItem={({ item, index, section }) =>
          expandedSections[section.title] ? (
            <OrderCard index={index} order={item} />
          ) : null
        }
        renderSectionHeader={({ section: { title, color } }) => (
          <TouchableOpacity onPress={() => toggleSection(title)}>
            <Text
              style={[
                styles.sectionHeader,
                { backgroundColor: color, color: colors.primaryText },
              ]}
            >
              {title}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ManageOrdersScreen;
