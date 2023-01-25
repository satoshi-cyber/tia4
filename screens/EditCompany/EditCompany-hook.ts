import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import { UpdateCompany, useCompanyQuery, useUpdateCompanyMutation, } from "@/graphql";
import { useUser } from "@/hooks";
import { URLS } from "@/config";
import { useEffect } from "react";

import { setupCompanySchema } from "./EditCompany-validations";
import { PUSH_DELAY, TOAST_MESSAGE, TOAST_OPTIONS } from './EditCompany-constants';
import { formatDefaultValues } from "./EditCompany-functions";


export const useEditCompany = () => {
  const router = useRouter()
  const { companyId } = useUser()

  const [{ fetching, data }] = useCompanyQuery({ variables: { companyId: companyId || '' }, pause: !companyId })
  const [{ fetching: submitting }, updateCompany] = useUpdateCompanyMutation();

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

    const { error } = await updateCompany({ companyId, input }, { additionalTypenames: ['Company'] })

    if (error) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS)

      return
    }

    toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS)

    setTimeout(() => router.push(URLS.COMPANY), PUSH_DELAY)
  };

  return {
    form,
    handleSubmit,
    submitting,
    fetching
  };
};
