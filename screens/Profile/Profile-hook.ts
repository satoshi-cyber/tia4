import { mutate } from 'swr';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { TOAST_OPTIONS } from '@/config';
import { UseCases } from '@/useCases';

import { updateProfileSchema } from './Profile-validations';
import { TOAST_MESSAGE } from './Profile-constants';
import { pickValues } from './Profile-functions';

export const useProfile = () => {
  const { data, isLoading, mutate: onUpload } = UseCases.profile.load();

  const { trigger: updateProfile } = UseCases.updateProfile.mutate();

  const form = useForm<Zod.infer<typeof updateProfileSchema>>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(updateProfileSchema),
    defaultValues: data && pickValues(data),
  });

  const { reset } = form;

  useEffect(() => {
    if (!isLoading && data && !form.formState.isDirty) {
      reset(pickValues(data));
    }
  }, [isLoading, reset, data]);

  const handleSubmit = async (input: Zod.infer<typeof updateProfileSchema>) => {
    try {
      const data = await updateProfile(input);

      toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS);

      mutate(UseCases.profile.getKey());

      if (data) {
        reset(pickValues(data));
      }
    } catch (e) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS);
    }
  };

  const resumeOnUpload = async (resumeFileName: string) => {
    await updateProfile({
      resumeFileName,
    });

    mutate(UseCases.profile.getKey());
  };

  const onRemoveResume = async () => {
    await updateProfile({
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

  const src = data?.avatarUrl || undefined;
  const uploadUrl = data?.avatarUploadUrl || undefined;

  const avatarProps = {
    src,
    uploadUrl,
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
