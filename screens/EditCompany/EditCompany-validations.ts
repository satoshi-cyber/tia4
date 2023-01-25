import * as yup from "yup";

export const setupCompanySchema = yup.object({
  name: yup.string().required("You must a company name"),
  website: yup.string().nullable().url("You must provide a valid url"),
  description: yup.string().nullable(),
})
