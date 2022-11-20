import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email('You must enter a valid email').required("You must enter your email!"),
})
