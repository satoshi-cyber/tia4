import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { UpdateProfile, useProfileQuery, useUpdateProfileMutation } from "@/graphql";

import { updateProfileSchema } from "./Profile-validations";
import { TOAST_MESSAGE, TOAST_OPTIONS } from './Profile-constants';
import { formatDefaultValues } from "./Profile-functions";

export const useProfile = () => {
  const [{ fetching, data }] = useProfileQuery()
  const [{ fetching: submitting }, updateProfile] = useUpdateProfileMutation();

  const form = useForm<UpdateProfile>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(updateProfileSchema),
  });

  const { reset } = form

  useEffect(() => {
    if (!fetching && data) {
      reset(formatDefaultValues(data?.profile))
    }
  }, [fetching, reset])

  const handleSubmit = async (input: UpdateProfile) => {
    const { error } = await updateProfile({ input }, { additionalTypenames: ['User'] })

    if (error) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS)

      return
    }

    toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS)

  };

  return {
    form,
    handleSubmit,
    fetching,
    submitting,
  };
};
