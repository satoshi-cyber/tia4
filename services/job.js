import { addHook } from "../lib";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const JobService = {
  createAJob: "JobService-creatAJob",
  form: "JobService-form",
};

const schema = yup.object().shape({
  jobTitle: yup.string().required(),
});

addHook(JobService.form, () => {
  return {
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      questions: [[], []],
    },
  };
});

addHook(JobService.createAJob, () => {
  return (data) =>
    new Promise((resolve) => {
      console.log(data);

      setTimeout(() => resolve(true), 2000);
    });
});
