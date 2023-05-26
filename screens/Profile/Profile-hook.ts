import { mutate } from 'swr';
import { toast } from 'react-toastify';
import { TOAST_OPTIONS } from '@/config';
import { UseCases } from '@/useCases';

import { TOAST_MESSAGE } from './Profile-constants';
import { updateProfileSchema } from '@/types';
import { FormSubmit } from '@/components/Form';

export const useProfile = () => {
  const { data, isLoading, mutate: onUpload } = UseCases.profile.load();

  const { trigger: updateProfile } = UseCases.updateProfile.mutate();
  const { trigger: updateResume } = UseCases.updateResume.mutate();

  const handleSubmit: FormSubmit<typeof updateProfileSchema> = async (
    input,
    { reset }
  ) => {
    try {
      const data = await updateProfile(input);

      toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS);

      mutate(UseCases.profile.getKey());

      if (data) {
        reset(data);
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

  const formProps = {
    data,
    schema: updateProfileSchema,
    onSubmit: handleSubmit,
  };

  return {
    isLoading,
    formProps,
    avatarProps,
    resumeProps,
  };
};
