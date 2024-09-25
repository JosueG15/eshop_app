export const paymentMethodDetails = {
  cash: {
    title: "Pago Contra Entrega",
    description: "Recogeremos el pago cuando entreguemos el pedido.",
  },
  bank: {
    title: "Transferencia Bancaria",
    description:
      "Por favor realice la transferencia bancaria antes de la entrega.",
  },
  card: {
    title: "Pago con Tarjeta",
    description: "El pago se procesará mediante tarjeta de crédito/débito.",
  },
};

export type PaymentMethod = keyof typeof paymentMethodDetails;

export const getPaymentMethodTitle = (method: PaymentMethod): string => {
  return paymentMethodDetails[method]?.title || "Método de pago desconocido";
};

export const getPaymentMethodDescription = (method: PaymentMethod): string => {
  return paymentMethodDetails[method]?.description || "Sin descripción";
};
