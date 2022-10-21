import * as yup from "yup";

export const createAJobSchema = yup.object({
  title: yup.string().required("You must set a title!"),
});
