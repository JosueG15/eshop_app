import axiosClient from "../../../shared/clients/axiosClient";
import { AxiosResponse } from "axios";
import { IOrder } from "../../../shared/types/orderType";

interface PaymentIntentResponse {
  clientSecret: string;
}

export const createPaymentIntent = async (
  amount: number,
  token: string
): Promise<PaymentIntentResponse> => {
  const { data } = await axiosClient.post<PaymentIntentResponse>(
    "/v1/payments/create-payment-intent",
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const createOrder = async (
  orderData: Partial<IOrder>,
  token: string
): Promise<IOrder> => {
  const { data } = await axiosClient.post<AxiosResponse<IOrder>>(
    "/v1/orders",
    orderData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};

export const getUserOrders = async (
  token: string,
  filters: Record<string, any> = {},
  page: number = 1,
  limit: number = 10
): Promise<{ data: IOrder[]; totalOrders: number; totalPages: number }> => {
  const { data } = await axiosClient.get<{
    data: IOrder[];
    totalOrders: number;
    totalPages: number;
  }>("/v1/orders", {
    params: { ...filters, page, limit },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const updateOrder = async (
  orderId: string,
  status: string,
  token: string
): Promise<IOrder> => {
  const { data } = await axiosClient.put<{ data: IOrder }>(
    `/v1/orders/${orderId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data.data;
};
