import axiosClient from "../../../shared/clients/axiosClient";
import {
  IProductQueryParams,
  IProductListResponse,
  IProduct,
} from "../../../shared/types/productType";

const createFormData = (product: Partial<IProduct>): FormData => {
  const formData = new FormData();

  Object.entries(product).forEach(([key, value]) => {
    if (key === "images" && Array.isArray(value)) {
      value.forEach((imageUri) => {
        const fileName = imageUri.split("/").pop() ?? "image";
        const fileType = fileName.split(".").pop() ?? "jpeg";

        formData.append("images", {
          uri: imageUri,
          name: fileName,
          type: `image/${fileType}`,
        } as unknown as Blob);
      });
    } else if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });

  return formData;
};

const sendProductRequest = async (
  url: string,
  method: "post" | "put",
  data: FormData | Partial<IProduct>,
  token: string
): Promise<IProduct> => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  }

  const response = await axiosClient({
    url,
    method,
    data,
    headers,
  });

  return response.data.data;
};

export const getProducts = async (
  params: IProductQueryParams
): Promise<IProductListResponse> => {
  const { data } = await axiosClient.get<IProductListResponse>("/v1/products", {
    params,
  });
  return data;
};

export const addProduct = async (
  product: Partial<IProduct>,
  token: string
): Promise<IProduct> => {
  const formData = createFormData(product);
  return await sendProductRequest("/v1/products", "post", formData, token);
};

export const updateProduct = async (
  productId: string,
  product: Partial<IProduct>,
  token: string
): Promise<IProduct> => {
  const formData = createFormData(product);
  return await sendProductRequest(
    `/v1/products/${productId}`,
    "put",
    formData,
    token
  );
};

export const deleteProduct = async (
  productId: string,
  token: string
): Promise<void> => {
  await axiosClient.delete(`/v1/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
