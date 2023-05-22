import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import {
  UpdateProfile,
  useProfileQuery,
  useRemoveResumeMutation,
  useUpdateProfileMutation,
} from '@/graphql';

import { updateProfileSchema } from './Apply-validations';
import { TOAST_MESSAGE } from './Apply-constants';
import { formatDefaultValues } from './Apply-functions';
import { useRouter } from 'next/router';
import { TOAST_OPTIONS, URLS } from '@/config';
import { UseCases } from '@/useCases';

export const useApply = () => {
  const router = useRouter();

  const jobId = String(router.query.applyJobId);

  const { data: jobData, isLoading: isJobLoading } = UseCases.publicJob.load({
    id: jobId,
  });

  const { isLoading: isDidApplyLoading, data: didApply } =
    UseCases.didApply.load({ jobId });

  const [{ fetching: fetchingUser, data: userData }, onUpload] =
    useProfileQuery({ requestPolicy: 'cache-and-network' });
  const [{ fetching: removingResume }, removeResume] =
    useRemoveResumeMutation();

  const isLoading = fetchingUser || isDidApplyLoading;

  const [, updateProfile] = useUpdateProfileMutation();

  const form = useForm<UpdateProfile>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(updateProfileSchema),
  });

  const { reset } = form;

  useEffect(() => {
    if (!fetchingUser && userData && !form.formState.isDirty) {
      reset(formatDefaultValues(userData?.profile));
    }
  }, [fetchingUser, reset, userData]);

  const handleSubmit = async (input: UpdateProfile) => {
    const { error, data } = await updateProfile(
      { input },
      { additionalTypenames: ['User'] }
    );

    if (error) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS);

      return;
    }

    if (data) {
      router.push(
        URLS.RECORD.replace('[applyJobId]', router.query.applyJobId as string)
      );
    }
  };

  const avatar = userData?.profile?.avatarUrl || undefined;
  const avatarUploadUrl = userData?.profile?.avatarUploadUrl || undefined;

  const resumeOnUpload = async (resumeFileName: string) => {
    await updateProfile(
      { input: { resumeFileName } },
      { additionalTypenames: ['User'] }
    );
  };

  const onRemoveResume = async () => {
    await removeResume({}, { additionalTypenames: ['User'] });
  };

  const resumeProps = {
    src: userData?.profile?.resumeUrl || undefined,
    uploadUrl: userData?.profile?.resumeUploadUrl || undefined,
    fileName: userData?.profile?.resumeFileName || undefined,
    onUpload: resumeOnUpload,
    onRemove: onRemoveResume,
    isLoading: isLoading || removingResume,
  };

  const jobTitle = jobData?.title || 'placeholder';

  const title = `Apply to ${jobData?.company?.name}`;

  const companyLogo = jobData?.company?.avatarUrl || undefined;

  const companyName = jobData?.company?.name ?? undefined;

  return {
    title,
    jobTitle,
    isJobLoading,
    form,
    isLoading,
    didApply,
    onUpload,
    handleSubmit,
    avatarUploadUrl,
    companyLogo,
    companyName,
    avatar,
    resumeProps,
  };
};
