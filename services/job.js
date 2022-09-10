import { useCallback } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { addHook } from "../lib";

export const JobService = {
  createAJob: "JobService-creatAJob",
  addQuestion: "JobService-addQuestion",
  questions: "JobService-questions",
};

addHook(JobService.createAJob, () => {
  return () => alert("test");
});
