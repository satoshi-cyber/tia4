import * as yup from "yup";

export const updateProfileSchema = yup.object({
  firstName: yup.string().nullable().required("You must enter your name"),
  lastName: yup.string().nullable().required("You must enter your last name"),
  linkedInProfile: yup.string().nullable().url("You must provide a valid url"),
})
