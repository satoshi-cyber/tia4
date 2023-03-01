import * as yup from "yup";

export const companyValidations = yup.object({
  teamMembers: yup.array().min(1)
    .of(
      yup.object({
        email: yup.string().required("You must add recipient email").email('Email should be valid'),
        role: yup.string().required("You must specify the role")
      })
    )
})
