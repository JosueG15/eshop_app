import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { showToast } from "../../../shared/components/Toast";
import { IUser } from "../../../shared/types/userType";
import { uploadUserAvatar } from "../services/userService";
import { updateAvatarSuccess } from "../../../store/slices/auth/authSlice";

export const useUser = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const avatarUploadMutation = useMutation<IUser, Error, { imageUri: string }>({
    mutationFn: async ({ imageUri }) => {
      if (!token || !user) throw new Error("User is not authenticated");

      return uploadUserAvatar(user.id, imageUri, token);
    },
    onSuccess: (updatedUser) => {
      dispatch(updateAvatarSuccess({ user: updatedUser }));
      showToast(
        "Avatar actualizado",
        "Tu avatar fue actualizado con éxito",
        "success"
      );
    },
    onError: (error) => {
      showToast("Error", error.message || "Error al subir el avatar", "error");
    },
  });

  return {
    avatarUpload: avatarUploadMutation.mutate,
    isLoading: avatarUploadMutation.isPending,
  };
};
