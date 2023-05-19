import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/hooks';
import { TOAST_OPTIONS, URLS } from '@/config';
import { useEffect } from 'react';

import { PUSH_DELAY, TOAST_MESSAGE } from './EditCompany-constants';
import { formatDefaultValues } from './EditCompany-functions';
import { mutate } from 'swr';
import { UseCases } from '@/useCases';
import { editCompanySchema } from '@/types';

export const useEditCompany = () => {
  const router = useRouter();
  const { companyId, refreshToken, fetching: refeshingToken } = useUser();

  const { data, isLoading } = UseCases.myCompany.load(
    companyId && { companyId }
  );

  const { trigger: updateCompany, isMutating: updatingCompany } =
    UseCases.editCompany.mutate();

  const { trigger: deleteCompany, isMutating: deletingCompany } =
    UseCases.deleteCompany.mutate();

  const submitting = updatingCompany || deletingCompany || refeshingToken;

  const avatar = data?.avatarUrl || undefined;
  const avatarUploadUrl = data?.avatarUploadUrl || undefined;

  const onUpload = () => {
    mutate(UseCases.myCompany.getKey());
    mutate(UseCases.company.getKey());
  };

  const form = useForm<Zod.infer<typeof editCompanySchema>>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(editCompanySchema),
    defaultValues: data ? formatDefaultValues(data) : undefined,
  });

  const { reset } = form;

  useEffect(() => {
    if (!isLoading && data) {
      reset(formatDefaultValues(data), {
        keepDirty: true,
        keepDefaultValues: true,
      });
    }
  }, [isLoading, reset]);

  const handleSubmit = async (input: Zod.infer<typeof editCompanySchema>) => {
    if (!companyId) return;

    const toastMessage = TOAST_MESSAGE.updateCompany;

    try {
      await updateCompany({ ...input, companyId });

      mutate(UseCases.myCompany.getKey());
      mutate(UseCases.company.getKey());

      toast.success(toastMessage.success, TOAST_OPTIONS);

      setTimeout(() => router.push(URLS.COMPANY), PUSH_DELAY);
    } catch (e) {
      toast.error(toastMessage.error, TOAST_OPTIONS);
    }
  };

  const handleDeleteCompany = async () => {
    const toastMessage = TOAST_MESSAGE.deleteCompany;
    try {
      await deleteCompany({ companyId: companyId! });

      await refreshToken();

      toast.success(toastMessage.success, TOAST_OPTIONS);

      setTimeout(() => router.push(URLS.HOME), PUSH_DELAY);
    } catch (e) {
      toast.error(toastMessage.error, TOAST_OPTIONS);
    }
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
