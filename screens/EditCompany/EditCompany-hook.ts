import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {
  UpdateCompany,
  useDeleteCompanyMutation,
  useUpdateCompanyMutation,
} from '@/graphql';
import { useUser } from '@/hooks';
import { TOAST_OPTIONS, URLS } from '@/config';
import { useEffect } from 'react';

import { setupCompanySchema } from './EditCompany-validations';
import { PUSH_DELAY, TOAST_MESSAGE } from './EditCompany-constants';
import { formatDefaultValues } from './EditCompany-functions';
import { mutate } from 'swr';
import { UseCases } from '@/useCases';

export const useEditCompany = () => {
  const router = useRouter();
  const { companyId, refreshToken, fetching: refeshingToken } = useUser();

  const { data, isLoading } = UseCases.myCompany.load(
    companyId && { companyId }
  );

  const [{ fetching: updatingCompany }, updateCompany] =
    useUpdateCompanyMutation();
  const [{ fetching: deletingCompany }, deleteCompany] =
    useDeleteCompanyMutation();

  const submitting = updatingCompany || deletingCompany || refeshingToken;

  const avatar = data?.avatarUrl || undefined;
  const avatarUploadUrl = data?.avatarUploadUrl || undefined;

  const onUpload = () => {
    updateCompany({
      companyId: companyId!,
      input: data ? formatDefaultValues(data) : {},
    });
  };

  const form = useForm<UpdateCompany>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(setupCompanySchema),
    defaultValues: data ? formatDefaultValues(data) : undefined,
  });

  const { reset } = form;

  useEffect(() => {
    if (!isLoading && data) {
      reset(formatDefaultValues(data));
    }
  }, [isLoading, reset]);

  const handleSubmit = async (input: UpdateCompany) => {
    if (!companyId) return;

    const toastMessage = TOAST_MESSAGE.updateCompany;

    const { error } = await updateCompany(
      { companyId, input },
      { additionalTypenames: ['Company'] }
    );

    mutate(UseCases.myCompany.getKey());
    mutate(UseCases.company.getKey());

    if (error) {
      toast.error(toastMessage.error, TOAST_OPTIONS);

      return;
    }

    toast.success(toastMessage.success, TOAST_OPTIONS);

    setTimeout(() => router.push(URLS.COMPANY), PUSH_DELAY);
  };

  const handleDeleteCompany = async () => {
    const { error } = await deleteCompany({ companyId: companyId! });

    const toastMessage = TOAST_MESSAGE.deleteCompany;

    if (error) {
      toast.error(toastMessage.error, TOAST_OPTIONS);

      return;
    }

    await refreshToken();

    toast.success(toastMessage.success, TOAST_OPTIONS);

    setTimeout(() => router.push(URLS.HOME), PUSH_DELAY);
  };

  const settingItems = [
    {
      label: 'Delete company',
      activeColor: 'text-red-800',
      onClick: handleDeleteCompany,
    },
  ];

  return {
    form,
    handleSubmit,
    submitting,
    isLoading,
    avatar,
    avatarUploadUrl,
    onUpload,
    settingItems,
  };
};
