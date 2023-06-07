import { mutate } from 'swr';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { TOAST_OPTIONS, URLS } from '@/config';
import { UseCases } from '@/useCases';
import { updateProfileSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';

import { TOAST_MESSAGE } from './Apply-constants';
import { parseDefaults } from './Apply-functions';

export const useApply = () => {
  const router = useRouter();

  const jobId = String(router.query.applyJobId);

  const { data: jobData, isLoading: isJobLoading } = UseCases.publicJob.load({
    id: jobId,
  });

  const { isLoading: isDidApplyLoading, data: didApply } =
    UseCases.didApply.load({ jobId });

  const {
    data: userData,
    isLoading: isProfileLoading,
    mutate: onUpload,
  } = UseCases.profile.load();

  const { trigger: updateProfile } = UseCases.updateProfile.mutate();
  const { trigger: updateResume } = UseCases.updateResume.mutate();

  const isLoading = isProfileLoading || isDidApplyLoading;

  const form = useForm<Zod.infer<typeof updateProfileSchema>>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(updateProfileSchema),
    defaultValues: userData ? parseDefaults(userData) : undefined,
  });

  const { reset } = form;

  useEffect(() => {
    if (!userData) {
      return;
    }

    reset(parseDefaults(userData), {
      keepDirtyValues: true,
      keepDirty: true,
    });
  }, [reset, userData]);

  const handleSubmit = async (input: Zod.infer<typeof updateProfileSchema>) => {
    try {
      await updateProfile(input);

      mutate(UseCases.profile.getKey());

      router.push(
        URLS.RECORD.replace('[applyJobId]', router.query.applyJobId as string)
      );
    } catch (e) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS);
    }
  };

  const resumeOnUpload = async (resumeFileName: string) => {
    await updateResume({
      resumeFileName,
    });

    mutate(UseCases.profile.getKey());
  };

  const onRemoveResume = async () => {
    await updateResume({
      resumeFileName: null,
    });

    mutate(UseCases.profile.getKey());
  };

  const resumeProps = {
    src: userData?.resumeUrl || undefined,
    uploadUrl: userData?.resumeUploadUrl || undefined,
    fileName: userData?.resumeFileName || undefined,
    onUpload: resumeOnUpload,
    onRemove: onRemoveResume,
    isLoading: isLoading,
  };

  const avatarProps = {
    src: userData?.avatarUrl,
    uploadUrl: userData?.avatarUploadUrl,
    onUpload,
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
    handleSubmit,
    avatarProps,
    companyLogo,
    companyName,
    resumeProps,
  };
};
