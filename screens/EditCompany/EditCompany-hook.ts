import { mutate } from 'swr';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { UseCases } from '@/useCases';
import { editCompanySchema } from '@/types';
import { FormSubmit } from '@/components/Form';
import { useUser } from '@/hooks';
import { TOAST_OPTIONS, URLS } from '@/config';

import { PUSH_DELAY, TOAST_MESSAGE } from './EditCompany-constants';

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

  const onSubmit: FormSubmit<typeof editCompanySchema> = async (input) => {
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

  const formProps = {
    data,
    schema: editCompanySchema,
    onSubmit,
  };

  const avatarProps = {
    src: avatar,
    uploadUrl: avatarUploadUrl,
    onUpload,
  };

  return {
    formProps,
    submitting,
    isLoading,
    avatarProps,
    settingItems,
  };
};
