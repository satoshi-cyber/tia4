import * as yup from "yup";

export const updateProfileSchema = yup.object({
  firstName: yup.string().required("You must enter your name"),
  lastName: yup.string().required("You must enter your last name"),
})
