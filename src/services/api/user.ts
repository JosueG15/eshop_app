import axiosClient from "./axiosClient";
import { IUser, ILoginResponse } from "../../types/user";

export const login = async (user: IUser): Promise<ILoginResponse> => {
  const { data } = await axiosClient.post<ILoginResponse>("/v1/login", user);
  return data;
};
