import { resolve } from "styled-jsx/css";
import { addHook } from "../lib";

export const JobService = {
  createAJob: "JobService-creatAJob",
};

addHook(JobService.createAJob, () => {
  return (data) =>
    new Promise((resolve) => {
      console.log(data);

      setTimeout(() => resolve(true), 2000);
    });
});
