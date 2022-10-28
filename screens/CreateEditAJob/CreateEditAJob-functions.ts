import { formatISO } from 'date-fns'
import { Job } from "@/graphql";

export const formatDefaultValues = ({ __typename, ...job }: Job) =>
  ({ ...job, deadline: formatISO(new Date(job.deadline), { representation: 'date' }), questions: job.questions.map(({ __typename, ...question }) => question) })
