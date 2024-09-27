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
  const { data } = await axiosClient.post<IRegisterResponse>(
    "/v1/register",
    user
  );
  return data;
};

export const getUserProfile = async (
  userId: string,
  token: string
): Promise<IUser> => {
  const { data } = await axiosClient.get<IUser>(`/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
