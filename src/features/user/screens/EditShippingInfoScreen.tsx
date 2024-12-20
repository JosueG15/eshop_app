import React, { useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet } from "react-native";
import CustomForm from "../../../shared/components/CustomForm";
import { Field } from "../../../shared/types/formTypes";
import { IUser } from "../../../shared/types/userType";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { updateUserInfo } from "../../../store/slices/auth/authSlice";
import { showToast } from "../../../shared/components/Toast";
import { useTheme } from "@rneui/themed";

const EditShippingInfoScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const { theme } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IUser>>({
    defaultValues: {
      phone: user?.phone || "",
      address: user?.address || "",
      address2: user?.address2 || "",
      city: user?.city || "",
      state: user?.state || "",
      zip: user?.zip || "",
    },
  });

  const onSubmit = (data: FieldValues) => {
    const updateData: Partial<IUser> = {
      phone: data.phone,
      address: data.address,
      address2: data.address2,
      city: data.city,
      state: data.state,
      zip: data.zip,
    };

    dispatch(updateUserInfo(updateData))
      .unwrap()
      .then(() => {
        showToast(
          "Información actualizada",
          "Tu información de envío fue actualizada con éxito",
          "success"
        );
      })
      .catch((error) => {
        showToast(
          "Error",
          error.message || "Error al actualizar la información de envío",
          "error"
        );
      });
  };

  const fields: Field[] = [
    {
      name: "phone",
      label: "Teléfono",
      placeholder: "Ingrese su número de teléfono",
      keyboardType: "phone-pad",
      required: true,
    },
    {
      name: "address",
      label: "Dirección",
      placeholder: "Ingrese su dirección",
      required: true,
    },
    {
      name: "address2",
      label: "Punto de referencia (Opcional)",
      placeholder: "Ingrese punto de referencia",
    },
    {
      name: "city",
      label: "Municipio",
      placeholder: "Municipio",
      required: true,
    },
    {
      name: "state",
      label: "Departamento",
      placeholder: "Departamento",
      required: true,
    },
    {
      name: "zip",
      label: "Código Postal",
      placeholder: "Código Postal",
      keyboardType: "numeric",
      required: true,
    },
  ];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexGrow: 1,
          justifyContent: "center",
          padding: 20,
          backgroundColor: theme.colors.background,
        },
      }),
    [theme]
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={20}
      enableOnAndroid={true}
    >
      <CustomForm
        fields={fields}
        control={control}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        buttonTitle={isLoading ? "Guardando..." : "Guardar"}
        isLoading={isLoading}
      />
    </KeyboardAwareScrollView>
  );
};

export default EditShippingInfoScreen;
