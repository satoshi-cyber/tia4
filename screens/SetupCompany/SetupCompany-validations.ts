import * as yup from "yup";

export const updateProfileSchema = yup.object({
  name: yup.string().required("You must a company name"),
  website: yup.string().url("You must provide a valid url"),
})
