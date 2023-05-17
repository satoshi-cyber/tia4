import { mutate } from 'swr';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { TOAST_OPTIONS } from '@/config';
import { UseCases } from '@/useCases';

import { TOAST_MESSAGE } from './Profile-constants';
import { updateProfileSchema } from '@/types';
import { parseDefaults } from './Profile-functions';

export const useProfile = () => {
  const { data, isLoading, mutate: onUpload } = UseCases.profile.load();
  const { trigger: updateProfile } = UseCases.updateProfile.mutate();
  const { trigger: updateResume } = UseCases.updateResume.mutate();

  const form = useForm<Zod.infer<typeof updateProfileSchema>>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(updateProfileSchema),
    defaultValues: data && parseDefaults(data),
  });

  const { reset } = form;

  useEffect(() => {
    if (!data) {
      return;
    }

    reset(parseDefaults(data), {
      keepDirtyValues: true,
      keepDirty: true,
    });
  }, [reset, data]);

  const handleSubmit = async (input: Zod.infer<typeof updateProfileSchema>) => {
    try {
      const data = await updateProfile(input);

      toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS);

      mutate(UseCases.profile.getKey());

      if (data) {
        reset(parseDefaults(data));
      }
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
    src: data?.resumeUrl || undefined,
    uploadUrl: data?.resumeUploadUrl || undefined,
    fileName: data?.resumeFileName || undefined,
    onUpload: resumeOnUpload,
    onRemove: onRemoveResume,
    isLoading: isLoading,
  };

  const avatarProps = {
    src: data?.avatarUrl,
    uploadUrl: data?.avatarUploadUrl,
    onUpload,
  };

  return {
    form,
    isLoading,
    handleSubmit,
    avatarProps,
    resumeProps,
  };
};
