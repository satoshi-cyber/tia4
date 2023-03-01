import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import { UpdateCompany, useDeleteCompanyMutation, useEditCompanyQuery, useUpdateCompanyMutation } from "@/graphql";
import { useUser } from "@/hooks";
import { TOAST_OPTIONS, URLS } from "@/config";
import { useEffect, useMemo } from "react";

import { setupCompanySchema } from "./EditCompany-validations";
import { PUSH_DELAY, TOAST_MESSAGE } from './EditCompany-constants';
import { formatDefaultValues } from "./EditCompany-functions";


export const useEditCompany = () => {
  const router = useRouter()
  const { companyId, refreshToken } = useUser()

  const context = useMemo(() => ({ additionalTypenames: ['Company'] }), [])

  const [{ fetching, data }] = useEditCompanyQuery({ context, variables: { companyId: companyId || '' }, pause: !companyId, requestPolicy: 'cache-first' })
  const [{ fetching: updatingCompany }, updateCompany] = useUpdateCompanyMutation();
  const [{ fetching: deletingCompany }, deleteCompany] = useDeleteCompanyMutation()

  const submitting = updatingCompany || deletingCompany

  const avatar = data?.company?.avatarUrl || undefined
  const avatarUploadUrl = data?.company?.avatarUploadUrl || undefined

  const onUpload = () => {
    updateCompany({ companyId: companyId!, input: data?.company ? formatDefaultValues(data?.company) : {} })
  }

  const form = useForm<UpdateCompany>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(setupCompanySchema),
    defaultValues: data ? formatDefaultValues(data?.company) : undefined
  });

  const { reset } = form

  useEffect(() => {
    if (!fetching && data) {
      reset(formatDefaultValues(data?.company))
    }
  }, [fetching, reset])

  const handleSubmit = async (input: UpdateCompany) => {
    if (!companyId)
      return

    const toastMessage = TOAST_MESSAGE.updateCompany

    const { error } = await updateCompany({ companyId, input }, { additionalTypenames: ['Company'] })

    if (error) {
      toast.error(toastMessage.error, TOAST_OPTIONS)

      return
    }

    toast.success(toastMessage.success, TOAST_OPTIONS)

    setTimeout(() => router.push(URLS.COMPANY), PUSH_DELAY)
  };

  const handleDeleteCompany = async () => {
    const { error } = await deleteCompany({ companyId: companyId! })

    const toastMessage = TOAST_MESSAGE.deleteCompany

    if (error) {
      toast.error(toastMessage.error, TOAST_OPTIONS)

      return
    }

    await refreshToken()

    toast.success(toastMessage.success, TOAST_OPTIONS)

    setTimeout(() => router.push(URLS.HOME), PUSH_DELAY)
  };

  const settingItems = [{
    label: 'Delete company',
    activeColor: 'text-red-800',
    onClick: handleDeleteCompany
  }]

  return {
    form,
    handleSubmit,
    submitting,
    fetching,
    avatar,
    avatarUploadUrl,
    onUpload,
    settingItems
  };
};
