import { Job } from "@/graphql";

export const formatDefaultValues = ({ __typename, ...job }: Job) =>
  ({ ...job, questions: job.questions.map(({ __typename, ...question }) => question) })

