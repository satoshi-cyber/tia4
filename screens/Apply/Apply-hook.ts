import { useForm } from "react-hook-form";
import { useEffect, } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { UpdateProfile, useJobQuery, useProfileQuery, useRemoveResumeMutation, useUpdateProfileMutation } from "@/graphql";

import { updateProfileSchema } from "./Apply-validations";
import { TOAST_MESSAGE, TOAST_OPTIONS } from './Apply-constants';
import { formatDefaultValues } from "./Apply-functions";
import { useRouter } from "next/router";
import { URLS } from "@/config";

export const useApply = () => {
  const router = useRouter()

  const [{ fetching: fetchingJob, data: jobData }] = useJobQuery({
    variables: { id: String(router.query.applyJobId) }
  })
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
      router.push(URLS.RECORD.replace('[applyJobId]', router.query.applyJobId as string))
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

  const jobTitle = jobData?.job.title || 'placeholder'

  const title = `Apply to ${jobData?.job.company?.name}`

  return {
    title,
    jobTitle,
    fetchingJob,
    form,
    fetching,
    onUpload,
    handleSubmit,
    avatarUploadUrl,
    avatar,
    resumeProps
  };
};
