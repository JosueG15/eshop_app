import { useMutation } from "@tanstack/react-query";
import {
  ILoginResponse,
  IRegisterResponse,
  IUser,
  LoginFormValues,
} from "../types/userType";
import { useState } from "react";
import { IError } from "../types/globalType";
import { useDispatch } from "react-redux";
import { showToast } from "../components/Toast";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp, CartNavigationProp } from "../types/routeType";
import { jwtDecode } from "jwt-decode";
import {
  getUserProfile,
  login,
  registerUser,
} from "../../features/user/services/userService";
import { loginSuccess } from "../../store/slices/auth/authSlice";

interface DecodedToken {
  userId: string;
  isAdmin: boolean;
}

export const useAuth = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeNavigationProp & CartNavigationProp>();

  const mutationHandler = <
    TResponse extends { token: string },
    TError,
    TVariables
  >(
    fn: (variables: TVariables) => Promise<TResponse>,
    onSuccessMessage: string,
    redirectTo: "home" | "cart" = "home"
  ) => {
    return useMutation<TResponse, IError, TVariables>({
      mutationFn: fn,
      onError: (error) => {
        setErrorMessage(error.message || "Error desconocido");
        showToast("Error", error.message || "Error desconocido", "error");
      },
      onSuccess: async (data) => {
        const token = data.token;
        const decoded: DecodedToken = jwtDecode(token);
        const { userId } = decoded;

        try {
          const userProfile = await getUserProfile(userId, token);
          dispatch(loginSuccess({ user: userProfile, token }));

          showToast("Login Exitoso", onSuccessMessage, "success");

          if (redirectTo === "home") {
            navigation.navigate("Home");
          } else {
            navigation.navigate("Cart");
          }
        } catch (error) {
          const err = error as IError;
          setErrorMessage(err.message || "Error al obtener el perfil");
          showToast(
            "Error",
            err.message || "Error al obtener el perfil",
            "error"
          );
        }
      },
    });
  };

  const loginMutation = mutationHandler<
    ILoginResponse,
    IError,
    LoginFormValues
  >(login, "Inicio de sesión exitoso", "home");

  const registerMutation = mutationHandler<IRegisterResponse, IError, IUser>(
    registerUser,
    "Registro exitoso",
    "home"
  );

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    isLoadingLogin: loginMutation.isPending,
    isLoadingRegister: registerMutation.isPending,
    errorMessage,
  };
};
