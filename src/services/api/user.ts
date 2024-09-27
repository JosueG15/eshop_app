import axiosClient from "./axiosClient";
import {
  IUser,
  ILoginResponse,
  IRegisterResponse,
  LoginFormValues,
} from "../../types/user";

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
