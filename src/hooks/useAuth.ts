import { useMutation } from "@tanstack/react-query";
import { login, registerUser } from "../services/api/user";
import {
  IUser,
  ILoginResponse,
  IRegisterResponse,
  LoginFormValues,
} from "../types/user";
import { useState } from "react";
import { IError } from "../types/global";
import { showToast } from "../components/shared/Toast";

export const useAuth = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutationHandler = <TResponse, TError, TVariables>(
    fn: (variables: TVariables) => Promise<TResponse>,
    onSuccessMessage: string
  ) => {
    return useMutation<TResponse, TError, TVariables>({
      mutationFn: fn,
      onError: (error: TError) => {
        setErrorMessage((error as any).message || "Error desconocido");
        showToast((error as Error).message || "Error desconocido", "error");
      },
      onSuccess: (data) => {
        showToast(onSuccessMessage, "success");
      },
    });
  };

  const loginMutation = mutationHandler<
    ILoginResponse,
    IError,
    LoginFormValues
  >(login, "Inicio de sesión exitoso");

  const registerMutation = mutationHandler<IRegisterResponse, IError, IUser>(
    registerUser,
    "Registro exitoso"
  );

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    isLoadingLogin: loginMutation.isPending,
    isLoadingRegister: registerMutation.isPending,
    errorMessage,
  };
};
