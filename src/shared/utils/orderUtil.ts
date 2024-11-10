export const generateOrderId = (orderDate: string, orderIndex: number) => {
  const date = new Date(orderDate);
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");

  const orderNumber = String(orderIndex).padStart(4, "0");

  return `SHOP-${formattedDate}-${orderNumber}`;
};

export const statusTranslations: Record<string, string> = {
  Pending: "Pendiente",
  "Payment Pending": "Pendiente de pago",
  Shipped: "Enviado",
  Completed: "Completado",
  Canceled: "Cancelado",
};
