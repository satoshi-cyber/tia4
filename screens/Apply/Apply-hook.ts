import { useForm } from "react-hook-form";
import { useEffect, } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { UpdateProfile, useDidApplyQuery, useJobQuery, useProfileQuery, useRemoveResumeMutation, useUpdateProfileMutation } from "@/graphql";

import { updateProfileSchema } from "./Apply-validations";
import { TOAST_MESSAGE, TOAST_OPTIONS } from './Apply-constants';
import { formatDefaultValues } from "./Apply-functions";
import { useRouter } from "next/router";
import { URLS } from "@/config";

export const useApply = () => {
  const router = useRouter()

  const jobId = String(router.query.applyJobId)

  const [{ fetching: didApplyFetching, data: didApplyData }] = useDidApplyQuery({ variables: { jobId } })
  const [{ fetching: fetchingJob, data: jobData }] = useJobQuery({
    variables: { id: jobId }
  })
  const [{ fetching: fetchingUser, data: userData }, onUpload] = useProfileQuery({ requestPolicy: 'network-only' })
  const [{ fetching: removingResume }, removeResume] = useRemoveResumeMutation()

  const loading = fetchingUser || didApplyFetching

  const [, updateProfile] = useUpdateProfileMutation();

  const form = useForm<UpdateProfile>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(updateProfileSchema),
  });

  const { reset } = form

  useEffect(() => {
    if (!fetchingUser && userData && !form.formState.isDirty) {
      reset(formatDefaultValues(userData?.profile))
    }
  }, [fetchingUser, reset, userData])

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

  const avatar = userData?.profile?.avatarUrl || undefined
  const avatarUploadUrl = userData?.profile?.avatarUploadUrl || undefined

  const resumeOnUpload = async (resumeFileName: string) => {
    await updateProfile({ input: { resumeFileName } }, { additionalTypenames: ['User'] })
  }

  const onRemoveResume = async () => {
    await removeResume({}, { additionalTypenames: ['User'] })
  }

  const resumeProps = {
    src: userData?.profile?.resumeUrl || undefined,
    uploadUrl: userData?.profile?.resumeUploadUrl || undefined,
    fileName: userData?.profile?.resumeFileName || undefined,
    onUpload: resumeOnUpload,
    onRemove: onRemoveResume,
    isLoading: loading || removingResume
  }

  const jobTitle = jobData?.job.title || 'placeholder'

  const didApply = didApplyData?.didApply

  const title = `Apply to ${jobData?.job.company?.name}`

  const companyLogo = jobData?.job?.company?.avatarUrl || undefined


  return {
    title,
    jobTitle,
    fetchingJob,
    form,
    loading,
    didApply,
    onUpload,
    handleSubmit,
    avatarUploadUrl,
    companyLogo,
    avatar,
    resumeProps
  };
};
