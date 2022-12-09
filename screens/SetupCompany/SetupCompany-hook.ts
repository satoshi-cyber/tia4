import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { UpdateProfile, useAuthenticateUserMutation, useProfileQuery, useUpdateProfileMutation } from "@/graphql";

import { updateProfileSchema } from "./SetupCompany-validations";
import { TOAST_MESSAGE, TOAST_OPTIONS } from './SetupCompany-constants';

export const useSetupCompany = () => {
  const [{ fetching: submitting }, updateProfile] = useUpdateProfileMutation();

  const form = useForm<UpdateProfile>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(updateProfileSchema),
  });

  const handleSubmit = async (input: UpdateProfile) => {
    const { error, data } = await updateProfile({ input }, { additionalTypenames: ['Company'] })

    if (error) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS)

      return
    }

    toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS)
  };

  return {
    form,
    handleSubmit,
    submitting,
  };
};
