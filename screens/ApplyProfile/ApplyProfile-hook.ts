import { useForm } from "react-hook-form";
import { useEffect, } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { UpdateProfile, useProfileQuery, useRemoveResumeMutation, useUpdateProfileMutation } from "@/graphql";

import { updateProfileSchema } from "./ApplyProfile-validations";
import { TOAST_MESSAGE, TOAST_OPTIONS } from './ApplyProfile-constants';
import { formatDefaultValues } from "./ApplyProfile-functions";
import { useRouter } from "next/router";
import { URLS } from "@/config";

export const useProfile = () => {
  const router = useRouter()

  const [{ fetching, data }, onUpload] = useProfileQuery({ requestPolicy: 'network-only' })
  const [{ fetching: removingResume }, removeResume] = useRemoveResumeMutation()

  const [, updateProfile] = useUpdateProfileMutation();

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
  }, [fetching, reset, data])

  const handleSubmit = async (input: UpdateProfile) => {
    const { error, data } = await updateProfile({ input }, { additionalTypenames: ['User'] })

    if (error) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS)

      return
    }

    if (data) {
      router.push(URLS.APPLY_PROFILE.replace('[applyJobId]', router.query.applyJobId as string))
    }

  };

  const avatar = data?.profile?.avatarUrl || undefined
  const avatarUploadUrl = data?.profile?.avatarUploadUrl || undefined

  const resumeOnUpload = async (resumeFileName: string) => {
    await updateProfile({ input: { resumeFileName } }, { additionalTypenames: ['User'] })
  }

  const onRemoveResume = async () => {
    await removeResume({}, { additionalTypenames: ['User'] })
  }

  const resumeProps = {
    src: data?.profile?.resumeUrl || undefined,
    uploadUrl: data?.profile?.resumeUploadUrl || undefined,
    fileName: data?.profile?.resumeFileName || undefined,
    onUpload: resumeOnUpload,
    onRemove: onRemoveResume,
    isLoading: fetching || removingResume
  }

  return {
    form,
    fetching,
    onUpload,
    handleSubmit,
    avatarUploadUrl,
    avatar,
    resumeProps
  };
};
