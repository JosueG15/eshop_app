import { AxiosResponse } from "axios";
import axiosClient from "../../../shared/clients/axiosClient";
import {
  LoginFormValues,
  ILoginResponse,
  IUser,
  IRegisterResponse,
} from "../../../shared/types/userType";

export const login = async (user: LoginFormValues): Promise<ILoginResponse> => {
  const { data } = await axiosClient.post<ILoginResponse>("/v1/login", user);

  return data;
};

export const registerUser = async (user: IUser): Promise<IRegisterResponse> => {
  try {
    const response = await axiosClient.post("/v1/register", user);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (
  userId: string,
  token: string
): Promise<IUser> => {
  const { data } = await axiosClient.get<AxiosResponse<IUser>>(
    `/v1/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};

export const uploadUserAvatar = async (
  userId: string,
  imageUri: string,
  token: string
): Promise<IUser> => {
  const formData = new FormData();
  formData.append("avatar", {
    uri: imageUri,
    type: "image/jpeg",
    name: "avatar.jpg",
  } as unknown as Blob);

  const { data } = await axiosClient.post<AxiosResponse<IUser>>(
    `/v1/users/${userId}/avatar`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.data;
};

export const updateUser = async (
  userId: string,
  updateData: Partial<IUser>,
  token: string
): Promise<IUser> => {
  const { data } = await axiosClient.put<AxiosResponse<IUser>>(
    `/v1/users/${userId}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data.data;
};
