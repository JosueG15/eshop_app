import { useMutation } from "@tanstack/react-query";
import { login } from "../services/api/user";
import { IUser, ILoginResponse } from "../types/user";
import { useState } from "react";
import { IError } from "../types/global";
import { Alert } from "react-native";

export const useAuth = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation<ILoginResponse, IError, IUser>({
    mutationFn: (user) => login(user),
    onError: (error) => {
      setErrorMessage(error.message || "Error desconocido");
    },
    onSuccess: (data) => {
      Alert.alert("Éxito", "Inicio de sesión exitoso");
      console.log("Token:", data.token);
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage,
  };
};
