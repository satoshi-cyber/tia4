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

import { updateProfileSchema } from './Profile-validations';
import { TOAST_MESSAGE } from './Profile-constants';
import { formatDefaultValues } from './Profile-functions';
import { TOAST_OPTIONS } from '@/config';
import { mutate } from 'swr';
import { UseCases } from '@/useCases';

export const useProfile = () => {
  const [{ fetching, data }, onUpload] = useProfileQuery({
    requestPolicy: 'network-only',
  });
  const [{ fetching: removingResume }, removeResume] =
    useRemoveResumeMutation();

  const [, updateProfile] = useUpdateProfileMutation();

  const form = useForm<UpdateProfile>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(updateProfileSchema),
    defaultValues: data && formatDefaultValues(data?.profile),
  });

  const { reset } = form;

  useEffect(() => {
    if (!fetching && data && !form.formState.isDirty) {
      reset(formatDefaultValues(data?.profile));
    }
  }, [fetching, reset, data]);

  const handleSubmit = async (input: UpdateProfile) => {
    const { error, data } = await updateProfile(
      { input },
      { additionalTypenames: ['User'] }
    );

    if (error) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS);

      return;
    }

    toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS);

    if (data) {
      reset(formatDefaultValues(data?.updateProfile));
    }

    mutate(UseCases.profile.getKey(), undefined, true);
  };

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
    src: data?.profile?.resumeUrl || undefined,
    uploadUrl: data?.profile?.resumeUploadUrl || undefined,
    fileName: data?.profile?.resumeFileName || undefined,
    onUpload: resumeOnUpload,
    onRemove: onRemoveResume,
    isLoading: fetching || removingResume,
  };

  const src = data?.profile?.avatarUrl || undefined;
  const uploadUrl = data?.profile?.avatarUploadUrl || undefined;

  const avatarProps = {
    src,
    uploadUrl,
    onUpload,
  };

  return {
    form,
    fetching,
    handleSubmit,
    avatarProps,
    resumeProps,
  };
};
