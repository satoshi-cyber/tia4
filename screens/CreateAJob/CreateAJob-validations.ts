import * as yup from "yup";

export const createAJobSchema = yup.object({
  title: yup.string().required("You must set a title!"),
  deadline: yup.date().min(new Date(), "Deadline must me in the future").typeError("Please enter a valid date"),
  questions: yup.array()
    .of(
      yup.object({
        question: yup.string().required("You must set the question"),
        time: yup.number().required("You must set question duration")
      })
    )
})
