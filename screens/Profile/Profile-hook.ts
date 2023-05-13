import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import {
  UpdateProfile,
  useRemoveResumeMutation,
  useUpdateProfileMutation,
} from '@/graphql';

import { updateProfileSchema } from './Profile-validations';
import { TOAST_MESSAGE } from './Profile-constants';
import { formatValues } from './Profile-functions';
import { TOAST_OPTIONS } from '@/config';
import { UseCases } from '@/useCases';
import { mutate } from 'swr';

export const useProfile = () => {
  const { data, isLoading, mutate: onUpload } = UseCases.profile.load();

  const [{ fetching: removingResume }, removeResume] =
    useRemoveResumeMutation();

  const [, updateProfile] = useUpdateProfileMutation();

  const form = useForm<UpdateProfile>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(updateProfileSchema),
    defaultValues: data,
  });

  const { reset } = form;

  useEffect(() => {
    if (!isLoading && data && !form.formState.isDirty) {
      reset(data);
    }
  }, [isLoading, reset, data]);

  const handleSubmit = async (input: UpdateProfile) => {
    const { error, data } = await updateProfile(
      { input: formatValues(input) },
      { additionalTypenames: ['User'] }
    );

    if (error) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS);

      return;
    }

    toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS);

    mutate(UseCases.profile.getKey());

    if (data) {
      reset({
        firstName: data.updateProfile.firstName,
        lastName: data.updateProfile.lastName,
        linkedInProfile: data.updateProfile.linkedInProfile,
        bio: data.updateProfile.bio,
      });
    }
  };

  const resumeOnUpload = async (resumeFileName: string) => {
    await updateProfile(
      { input: { resumeFileName } },
      { additionalTypenames: ['User'] }
    );
  };

  const onRemoveResume = async () => {
    await removeResume({}, { additionalTypenames: ['User'] });

    mutate(UseCases.profile.getKey());
  };

  const resumeProps = {
    src: data?.resumeUrl || undefined,
    uploadUrl: data?.resumeUploadUrl || undefined,
    fileName: data?.resumeFileName || undefined,
    onUpload: resumeOnUpload,
    onRemove: onRemoveResume,
    isLoading: isLoading || removingResume,
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
