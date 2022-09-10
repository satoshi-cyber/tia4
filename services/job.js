import { addHook } from "../lib";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const JobService = {
  createAJob: "JobService-creatAJob",
  formOptions: "JobService-formOptiosn",
};

const schema = yup.object().shape({
  jobTitle: yup.string().email().required(),
});

addHook(JobService.formOptions, () => {
  return {
    mode: "onBlur",
    resolver: yupResolver(schema),
  };
});

addHook(JobService.createAJob, () => {
  return (data) =>
    new Promise((resolve) => {
      console.log(data);

      setTimeout(() => resolve(true), 2000);
    });
});
